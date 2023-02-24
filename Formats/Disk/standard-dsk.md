# Disk image file format

This document describes the standard disk image format. It has the file extension `.DSK`.

## Disc Information block

The "Disc Information block" is always at offset 0 in the disk image file. If track data exists, then this will immediately follow the Disc Information Block and will start at offset &100 in the disc image file.

The "Disc Information block" has the following structure:

| offset | description                                                     | bytes |
| ------ | --------------------------------------------------------------- | ----- |
| 00-21  | `MV - CPCEMU Disk-File\r\nDisk-Info\r\n`                        | 34    |
| 22-2f  | name of creator                                                 | 14    |
| 30     | number of tracks                                                | 1     |
| 31     | number of sides                                                 | 1     |
| 32-33  | size of a track (little endian; low byte followed by high byte) | 2     |
| 34-ff  | not used (0)                                                    | 204   |

Notes:

* Track 0 (or Track 0 side 0 for double sided disks) immediately follows the Disk Information Block, and is at offset &100 in the disk image.
* "MV - CPC" must be present, because it is used to identify the file as a disk image. It is sufficient to check this to identify the file as being a disk image.
* `\r` is the C programming language equivalent of ASCII character 13.
* `\n` is the C programming language equivalent of ASCII character 10.
* **All** tracks must be the same size.
* "size of track" is used to calculate the location of the data for a chosen track.
* "size of track" includes the &100 byte Track Information Block.
* **All** tracks must have a "Track Information Block"
* track lengths are stored in the same order as the tracks in the image e.g. In the case of a double sided disk: Track 0 side 0, Track 0 side 1, Track 1 side 0 etc...
* The track blocks are stored in increasing order 0..number of tracks, with alternating sides interleaved if the disc image describes a double sided disk. e.g. if the disk image represents a double sided disk, the order of tracks is: track 0 side 0, track 0 side 1, track 1 side 0, track 1 side 1.... track (number of tracks-1) side 0, track (number of tracks-1) side 1
    
    The tracks are **always** ordered in this way regardless of the disc-format described by the disc image.
    
* A standard disk image can be used to describe a copy-protected disk, but will often result in a file which is larger than the same disk described by a extended disk image. For a standard disk image to represent a copy-protected disk:
    * All track sizes in the standard disk image must be the same. This value therefore would be the size of the largest track, and other tracks would have unused space in them.
    * All sector sizes within each track must be the same size, but not necessarily the same size as the sectors for another track. If a track contained different sized sectors, the size of the largest sector should be used. This would result in some wasted space.

## Track Information Block

Each Track Block comprises a Track Information Block and sector data. The sector data is always at an offset of &100 bytes from the start of the track block. The data for the next track in the disc image immediately follows the data for the current track.

The first Track Block is located at offset &100 in the disk image file. The track block starts with the Track Information Block and has this form.

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

Notes:

* "number of sectors" is used to identify the number of valid entries in the sector information list.
* "sector size" parameter is used to calculate the location of each sector's data. Therefore, The data allocated for each sector must be the same.
    
    If the track contains different sized sectors, then the data allocated must be the size of the biggest sector. The "sector size" parameter is used to calculate the location of the sector data.
    
* Sector data always follows Track Information Block at offset &100 from the start of the track information block.
* Sector data is stored in the same order as the sectors in the sector info block.

### Sector info

| offset  | description                                                      | bytes |
| ------- | ---------------------------------------------------------------- | ----- |
| 00      | track (equivalent to C parameter in NEC765 commands)             | 1     |
| 01      | side (equivalent to H parameter in NEC765 commands)              | 1     |
| 02      | sector ID (equivalent to R parameter in NEC765 commands)         | 1     |
| 03      | sector size (equivalent to N parameter in NEC765 commands)       | 1     |
| 04      | FDC status register 1 (equivalent to NEC765 ST1 status register) | 1     |
| 05      | FDC status register 2 (equivalent to NEC765 ST2 status register) | 1     |
| 06 - 07 | not used (0)                                                     | 2     |

Notes:

* The following bits are used from NEC765 status register 1:
    * b7 EN (End of Cylinder)
    * b5 DE (Data Error)
    * b2 ND (No Data)
    * b0 MA (Missing Address Mark)
* The following bits are used from NEC765 status register 2:
    * b5 CM (Control Mark)
    * b5 DD (Data Error in Data field)
    * b0 MD (Missing address Mark in Data field)
* For 8k Sectors (N="6"), only 1800h bytes is stored.

## General format

### Single sided DSK images

* Disc Information Block
* Track 0 data
    * Track Information Block
    * Sector data
* Track 1 data
    * Track Information Block
    * Sector data. . . .
* Track (number\_of\_tracks-1) data
    * Track Information Block
    * Sector data

### Double sided DSK images

* Disc Information Block
* Track 0 side 0 data
    * Track Information Block
    * Sector data
* Track 0 side 1 data
    * Track Information Block
    * Sector data. . . .
* Track (number\_of\_tracks-1) side 1 data
    * Track Information Block
    * Sector data