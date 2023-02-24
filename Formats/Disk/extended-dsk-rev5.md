# Extended DSK image definition

The extended DSK image is a file designed to describe copy-protected floppy disk software. It's definition was defined by Marco Vieth, Ulrich Doewich and Kevin Thacker.

This format has been widely adopted and is one of the major file formats used (the other major format is the standard disk image with the "MV - CPC" identifier).

The extended disk image format should be used for copy-protected disc software, or in place of a standard disk image if the resulting image is smaller than in the standard disk image form.

## Extended DiSK Format (Rev.5)

The disc image has the following format:

| DISK INFORMATION BLOCK (256 bytes)                             |
| -------------------------------------------------------------- |
| TRACK INFORMATION BLOCK \* number of tracks \* number of sides |

The track blocks are stored in increasing order 0..number of tracks, with alternating sides interleaved if the disc image describes a double sided disk. e.g. if the disk image represents a double sided disk, the order of tracks is: track 0 side 0, track 0 side 1, track 1 side 0, track 1 side 1.... track (number of tracks-1) side 0, track (number of tracks-1) side 1

The tracks are **always** ordered in this way regardless of the disc-format described by the disc image.

The location of the track information block is found by using the track size table.

## DISK INFORMATION BLOCK

The "DISK INFORMATION BLOCK" is always located at offset 0 in the disk image file, and has the following structure:

| offset  | description                              | bytes                               |
| ------- | ---------------------------------------- | ----------------------------------- |
| 00 - 21 | `EXTENDED CPC DSK File\r\nDisk-Info\r\n` | 34                                  |
| 22 - 2f | name of creator (utility/emulator)       | 14                                  |
| 30      | number of tracks                         | 1                                   |
| 31      | number of sides                          | 1                                   |
| 32 - 33 | unused                                   | 2                                   |
| 34 - xx | track size table                         | number of tracks \* number of sides |

NOTES:

* An extended DSK image is identified by the `EXTENDED` tag. The track size at offset 32h and 33h, used by the STANDARD disk image is ignored for extended format DSK images.
* If track data exists, then it starts at offset 100h.
* The `EXTENDED` tag is present to prevent existing emulators which support the standard DSK image from interpreting the data wrong and possibly crashing.
* `\r` is the C programming language equivalent of ASCII character 13.
* `\n` is the C programming language equivalent of ASCII character 10.

## TRACK OFFSET TABLE

| offset | description                                                  | bytes |
| ------ | ------------------------------------------------------------ | ----- |
| 01     | high byte of track 0 length (equivalent to track length/256) | 1     |
| ...    | ...                                                          | ...   |

NOTES:

*   Depending on the information in the disk information block, the table contains
    *   track lengths for a single sided floppy disc
    *   track lengths for a double sided floppy disc
*   track lengths are stored in the same order as the tracks in the image e.g. In the case of a double sided disk: Track 0 side 0, Track 0 side 1, Track 1 side 0 etc...
*   A size of "0" indicates an unformatted track. In this case there is no data, and no track information block for this track in the image file!
*   Actual length of track data = (high byte of track length) \* 256
*   Track length includes the size of the TRACK INFORMATION BLOCK (256 bytes)
*   The location of a Track Information Block for a chosen track is found by summing the sizes of all tracks up to the chosen track plus the size of the Disc Information Block (&100 bytes). The first track is at offset &100 in the disc image.

## TRACK INFORMATION BLOCK

| offset  | description             | bytes |
| ------- | ----------------------- | ----- |
| 00 - 0c | `Track-Info\r\n`        | 13    |
| 0d - 0f | unused                  | 3     |
| 10      | track number            | 1     |
| 11      | side number             | 1     |
| 12 - 13 | unused                  | 2     |
| 14      | sector size             | 1     |
| 15      | number of sectors       | 1     |
| 16      | GAP#3 length            | 1     |
| 17      | filler byte             | 1     |
| 18 - xx | Sector Information List | xx    |


NOTES:

*   Identical to the original DSK format definition.

## SECTOR INFORMATION LIST


| offset  | description                                                      | bytes |
| ------- | ---------------------------------------------------------------- | ----- |
| 00      | track (equivalent to C parameter in NEC765 commands)             | 1     |
| 01      | side (equivalent to H parameter in NEC765 commands)              | 1     |
| 02      | sector ID (equivalent to R parameter in NEC765 commands)         | 1     |
| 03      | sector size (equivalent to N parameter in NEC765 commands)       | 1     |
| 04      | FDC status register 1 (equivalent to NEC765 ST1 status register) | 1     |
| 05      | FDC status register 2 (equivalent to NEC765 ST2 status register) | 1     |
| 06 - 07 | actual data length in bytes                                      | 2     |

NOTES:

*   Identical to the original definition except for the addition of the sector data length. This value is in bytes and stored in little endian notation. (low byte followed by high byte)
*   The location of each sectors data is found by adding the size of the previous sectors, plus the size of the 256 byte header.
*   For 8k Sectors (N="6"), only 1800h bytes is stored. Please see extensions below!!!

# Extensions to the above specification

## 1. This extension was proposed by John Elliott.
    
Extension to TRACK INFORMATION BLOCK:


| offset | description                             | bytes |
| ------ | --------------------------------------- | ----- |
| 12     | Data rate. (See note 1 and note 3)      | 1     |
| 13     | Recording mode. (See note 2 and note 3) | 1     |

Notes:

1.  Data rate defines the rate at which data was written to the track. This value applies to the entire track.
    
    | Date rate | Description              |
    | --------- | ------------------------ |
    | 0         | Unknown.                 |
    | 1         | Single or double density |
    | 2         | High Density             |
    | 3         | Extended density         |
    
    Existing files should have zeroes in these bytes; hence the use of 0 for unknown.
        
2.  Recording mode is used to define how the data was written. It defines the encoding used to write the data to the disc and the structure of the data on the disc including the layout of the sectors. This value applies to the entire track.
    
    | Date rate | Description |
    | --------- | ----------- |
    | 0         | Unknown     |
    | 1         | FM          |
    | 2         | MFM         |
    
    Existing files should have zeroes in these bytes; hence the use of 0 for unknown.
    
3.  How to determine the actual rate.
    
    The NEC765 floppy disc controller is supplied with a single clock. When reading from and writing to a disc using the NEC765 you can choose FM or MFM recording modes. Use of these modes and the clock into the NEC765 define the final rate at which the data is written to the disc.
    
    When FM recording mode is used, data is read from or written to at a rate which is double that of when MFM is used. The time for each bit will be twice the time for MFM.
    
    Examples:
    
    | NEC765 Clock | FM/MFM | Actual rate |
    | ------------ | ------ | ----------- |
    | 4Mhz         | FM     | 4us per bit |
    | 4Mhz         | MFM    | 2us per bit |
        
## 2. This extension was proposed by Simon Owen.

1.  It has been found that many protections using 8K Sectors (N="6") do store more than &1800 bytes of useable data. It was thought that &1800 was the maximum useable limit, but this has proved wrong. So you should support 8K of data to ensure this data is read correctly. The size of the sector will be reported in the SECTOR INFORMATION LIST as described above.

    For sector size N="7" the full 16K will be stored. It is assumed that sector sizes are defined as 3 bits only, so that a sector size of N="8" is equivalent to N="0".

2.  Storing Multiple Versions of Weak/Random Sectors.

    Some copy protections have what is described as 'weak/random' data. Each time the sector is read one or more bytes will change, the value may be random between consecutive reads of the same sector.

    To support these formats the following extension has been proposed.

    Where a sector has weak/random data, there are multiple copies stored. The actual sector size field in the SECTOR INFORMATION LIST describes the size of all the copies. To determine if a sector has multiple copies then compare the actual sector size field to the size defined by the N parameter. For multiple copies the actual sector size field will have a value which is a multiple of the size defined by the N parameter. The emulator should then choose which copy of the sector it should return on each read.