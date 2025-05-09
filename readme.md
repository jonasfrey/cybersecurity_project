r# Aufgabe 
Hacking-Fall – Analyseaufgabe
Beschreibung:
Dieses Prüfungsimage erfordert eine Vielzahl von Fähigkeiten, um die gestellten Fragen
korrekt beantworten zu können.
� Szenario:
Am 20.09.2004 wurde ein Dell-Notebook des Typs CPi mit der Seriennummer VLQLW
aufgefunden. Es lag verlassen da, zusammen mit einer drahtlosen PCMCIA-Karte und einer
selbstgebauten 802.11b-Antenne. Es besteht der Verdacht, dass dieses Gerät für HackingZwecke verwendet wurde. Es konnte bislang jedoch nicht eindeutig mit dem Verdächtigen
Greg Schardt in Verbindung gebracht werden. (Hinweis: Der Name wird hier bewusst mit
Sonderzeichen geschrieben, um eine Indexierung durch Suchmaschinen zu vermeiden. In den
Dateien selbst gibt es jedoch keine Sonderzeichen.)
Greg Schardt ist im Internet unter dem Alias „Mr. Evil“ bekannt. Bekannte von ihm
berichteten, dass er sein Fahrzeug oft in Reichweite von öffentlichen WLAN-Zugangspunkten
(z. B. Starbucks oder andere T-Mobile-Hotspots) parkte, um dort Internetdatenverkehr
abzufangen. Ziel war es offenbar, an Kreditkartennummern, Benutzernamen und
Passwörter zu gelangen.
Aufgabe:
Untersuchen Sie das System auf Hacking-Software, Hinweise auf deren Verwendung und
generierte Daten. Versuchen Sie, das System mit dem Verdächtigen Greg Schardt in
Verbindung zu bringen.
Ein DD-Image (in acht Teilen: 1 bis 8 sowie Notizen) sowie ein EnCase-Image (zweiter Teil)
des sichergestellten Computers liegen vor.
---

# Ausgangslage. 

Hardware wurde aufgefunden. Es wird vermutet dass jene von einer person zu hacking zwecken missbraucht wurde. 
## Hardware 
Folgende hardware wurde aufgefunden. Beispielbilder entsprechen den ungefähren hardware modellen. 
### Laptop 
DELL CPi seriennumer VLQLW
![dell_cpi](DELL_CPi.png)
### PCMCIA-Karte
![alt text](pcmcia.png)
### 802 11b wireless antenna
![alt text](802_11b.png)


# 1. merge files
the linux 'cat' binary can be used to merge files. 

`cat file1.sec file2.sec file3.sec file4.sec file5.sec file6.sec file7.sec file8.sec > merged.sec`

`cat SCHARDT001.sec \
SCHARDT002.sec \
SCHARDT003.sec \
SCHARDT004.sec \
SCHARDT005.sec \
SCHARDT006.sec \
SCHARDT007.sec \
SCHARDT008.sec > SCHARDT_001_008_merged.sec`


# check shasum of merged file 
depending on the algorithm the hash can be checked with 

`sha256sum SCHARDT_001_008_merged.sec`
65e2002fed0b286f49541c7e97dcec0dda913d51a063ceeed86782bdacda2312  SCHARDT_001_008_merged.sec

`md5sum SCHARDT_001_008_merged.sec`
aee4fcd9301c03b3b054623ca261959a  SCHARDT_001_008_merged.sec

`sha1sum SCHARDT_001_008_merged.sec`
da2fe30fe21711edf42310873af475859a68f300  SCHARDT_001_008_merged.sec

`sha512sum SCHARDT_001_008_merged.sec`
e07390a4ec8edfaa151c091633ca61f989a4d91b26467d4d48d3a5ac73e7d9833b1725b06184e66c5d40da6384ed4c49c6c6eb7c707e4b42ed0682dccc40cb19  SCHARDT_001_008_merged.sec


(Du kannst auch md5sum, sha1sum, oder sha512sum verwenden, je nach benötigtem Algorithmus.)


# get file infos
`file SCHARDT_001_008_merged.sec `
SCHARDT_001_008_merged.sec: DOS/MBR boot sector MS-MBR XP english at offset 0x12c "Invalid partition table" at offset 0x144 "Error loading operating system" at offset 0x163 "Missing   operating system", disk signature 0xec5dec5d; partition 1 : ID=0x7, active, start-CHS (0x0,1,1), end-CHS (0x24f,254,63), startsector 63, 9510417 sectors

If output says data (raw/unknown), further analysis is needed (try binwalk or fdisk). 

# check for filesystem 
`fdisk -l SCHARDT_001_008_merged.sec`
Disk SCHARDT_001_008_merged.sec: 4,54 GiB, 4871301120 bytes, 9514260 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xec5dec5d

Device                      Boot Start     End Sectors  Size Id Type
SCHARDT_001_008_merged.sec1 *       63 9510479 9510417  4,5G  7 HPFS/NTFS/exFAT

# what os is on the .sec file

`file filename` reveals '...DOS/MBR boot sector MS-MBR XP english at offset 0x12c...'


# try to mount entire image ( automatic)
`sudo losetup -fP --show SCHARDT_001_008_merged.sec`

This assigns a loop device (e.g., /dev/loop0).

## check partitions
lsblk

loop33        7:33   0   4,5G  0 loop 
└─loop33p1  259:3    0   4,5G  0 part 

# mount a partition
`sudo mkdir /mnt/SCHARDT_001_008`
`sudo mount /dev/loop33 /mnt/SCHARDT_001_008`
mount: /mnt/SCHARDT_001_008: wrong fs type, bad option, bad superblock on /dev/loop33, missing codepage or helper program, or other error.

The error you're encountering (wrong fs type, bad superblock) typically occurs when:

The filesystem is corrupted, encrypted, or not recognized.

You're trying to mount the wrong partition or entire image instead of a specific filesystem.

The filesystem type isn't specified (e.g., ext4, ntfs).

# verify if loop33 is assigned to the file 
`sudo losetup -l`

/dev/loop33         0      0         0  0 /home/zenbookuser/code/cys/SCHARDT_001_008_merged.sec     0     512

`sudo fdisk -l /dev/loop33`
Disk /dev/loop33: 4,54 GiB, 4871301120 bytes, 9514260 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xec5dec5d

Device        Boot Start     End Sectors  Size Id Type
/dev/loop33p1 *       63 9510479 9510417  4,5G  7 HPFS/NTFS/exFAT


# force mount with filesystem 
`sudo mount -t ntfs /dev/loop33 /mnt/SCHARDT_001_008`
NTFS signature is missing.
Failed to mount '/dev/loop33': Invalid argument
The device '/dev/loop33' doesn't seem to have a valid NTFS.
Maybe the wrong device is used? Or the whole disk instead of a
partition (e.g. /dev/sda, not /dev/sda1)? Or the other way around?

# check for filesystem corruption
`sudo fsck.{type} -f /dev/loop33`
`sudo fsck.ntfs -f /dev/loop33`
`sudo ntfsfix /dev/loop33`
 sudo ntfsfix /dev/loop33
Mounting volume... NTFS signature is missing.
FAILED
Attempting to correct errors... NTFS signature is missing.
FAILED
Failed to startup volume: Invalid argument
NTFS signature is missing.
Trying the alternate boot sector
Unrecoverable error
Volume is corrupt. You should run chkdsk.

# map or mount the partition itself 
`sudo apt install kpartx`
`sudo kpartx -av /dev/loop33`
then check 
`sudo file -s /dev/mapper/loop33p1`
/dev/mapper/loop33p1: symbolic link to ../dm-0

now check the actual partition content 
`sudo file -s /dev/dm-0`

now  
`sudo ntfsfix /dev/dm-0`
Mounting volume... OK
Processing of $MFT and $MFTMirr completed successfully.
Checking the alternate boot sector... OK
NTFS volume version is 3.1.
NTFS partition /dev/dm-0 was processed successfully.

now mount 
`sudo mount -t ntfs-3g /dev/dm-0 /mnt/SCHARDT_001_008`


# browse mounted files
use the simpmle denojs script to apply the 'reglookup' command to all hive files 
`deno run -A deno_reglookup.js`
then use vscode ctrl+f to find for interesting strings such as 'InstallDate'