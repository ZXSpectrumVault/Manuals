# Further EDSK extensions, by Simon Owen

Current specification: http://www.cpctech.org.uk/docs/extdsk.html

This document includes further extensions to the ones I proposed in the
specification above.

2009-06-08 - track header maintains 256-byte blocks (thanks CNGsoft)
2009-03-21 - initial proposal


## Stored data length

The data length field in the sector header traditionally holds one of three values, depending on the sector size code:

  1) For size < 6, the full sector length of 2^(7+n) [128,256,512,1024,...]
  2) For size 6, only 6144 of the actual 8192 bytes is kept
  3) For size > 6, nothing is kept

'2)' causes problems for the +3/CPC title Coin-Op Hits (US Gold), which uses tighter bit-cell widths to extend the usable track length. Up to 6304 bytes of data is stored in each 8K sector, so the 6144 limit means some data is lost.

'3)' causes problems for some Opera Soft CPC titles, which read data from a sector with size=8 as part of the copy protection check. Since no data is stored the check always fails.

I propose that these rules are relaxed to remove the storage size limits:

  1) For size <= 8, up to the full sector length: 2^(7+n)
  2) For size > 8, treat as size = 8 (32K)
  
With special extensions for when the stored length exceeds sector length:

  3) If data length is an exact multiple of the full sector length, the data holds multiple copies of the sector data field, with:
     num_copies = data_length / sector_length

  4) If data length exceeds normal sector length, but is not an exact multiple of the normal length, the data also includes the CRC and gap3 bytes beyond the data field

'1)' now includes "up to" to allow less data to be stored, if required. Tracks containing many large (fake) sectors will have storage requirements that exceed the ~64K EDSK track size limit. In that case it will be necessary to reduce the amount stored for each sector, perhaps clipping to the track length or the next sector position where the stored data overlaps.

'2)' has been updated to match real uPD765 behaviour, which uses a size code of 8 for sizes >= 8. This is a correction from the previous proposal that only the lowest 3 bits of the size code are used.

'3)' permits multiple copies of error sectors to be stored, to transparently support +3/CPC Speedlock 'weak' and part-weak sectors, without emulator knowledge of the protection.

'4)' is needed for protections that hide data in the gap3 area following the first sector on a track, which is checked for using READ TRACK with a size larger than the first sector on the track. Around a dozen CPC titles are known to use this technique, including Jim Power and Skweek.

'3)' and '4)' are mutually exclusive, preventing weak sectors having gap data, but that's extremely unlikely to be an issue.

## Sector offsets

EDSK sectors are stored in the order they appeared on the track, starting at the index hole position, but without any indication of exactly where each was found. A close approximate position can be determined by taking time measurements during the dumping process. It can be used to reveal sector spacing, as well as identifying overlapping sectors and other ambiguous track layouts.

The "Disk Manager v2.3" CPC utility examines sector spacing as part of its copy protection check. It uses READ TRACK to read data and gap areas, then checks gap filler bytes are present only at specific offsets. Without positional information the unmodified disk won't work in emulators, and may not be correctly written back to real disk.

The EDSK sector header lacks the space to add positional information, so I propose appending it to the file as a new block type. I've tested an extended image in a number of EDSK-enabled applications and utilities and they all ignored the extra data. Of course, the extra block would be lost if the existing image was modified by a program not aware of the extra block, but in most cases it's not an essential part of the disk image.

The Sector Offset block is defined as follows:

 | Offset | Description            |
 | ------ | ---------------------- |
 | 00-0D  | `Offset-Info\r\n`      |
 | 0E     | unused, currently zero |

This is immediately followed by an entry for each track in the image, with the same order and count as the Track-Info blocks earlier in the image:

 | Offset | Description                      |
 | ------ | -------------------------------- |
 | 00-01  | Track length, in bytes           |
 | 02-03  | Sector 0 offset from index point |
 | 04-05  | Sector 1 offset                  |
 | ...    |                                  |
 | xx-yy  | Sector N-1 offset                |

All values are stored in little-endian (low-high) byte order. The offsets are only approximate and assume fixed bit-cell density across the track. Real-world factors also mean they will vary slightly with multiple reads of the same disk.

## Sector count

The fixed size of the track information block (256 bytes) leaves space for only 29 sectors on each track. This prevents legitimate formats such as 32x128-byte sectors from being stored in an EDSK image. Or with John Elliot's extension, up to potential 130x128-byte sectors on a ED (1Mbps) MFM track.

I propose adding any additional sector headers to the end of the current track header. The total header size can be calculated from the sector count, with the size rounded to the next multiple of 256-bytes. This maintains backwards compatibility for images with fewer than 30 sectors, and keeps the EDSK blocks aligned to neat 256-byte boundaries.

Each additional sector requires an 8-byte Sector Information List entry, so the 32-sector format above would need 24+32*8=280 bytes, which is then rounded up to 512 bytes. The space used for the rounding would likely be taken up by the overall track size rounding, so little extra space is wasted over storing just the extra headers.
