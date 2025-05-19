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

## When was the os installed 
ctrl + f 'InstallDate'
ctrl + shift + l to select all matches
finds : 
/cybersecurity_project/WINDOWS_system32_config_software.txt
`/Microsoft/Windows/CurrentVersion/Installer/UserData/S-1-5-18/Products/0B79C053C7D38EE4AB9A00CB3B5D2472/InstallProperties/InstallDate,SZ,20040819,
/Microsoft/Windows/CurrentVersion/Installer/UserData/S-1-5-18/Products/111E13C6BB69CDA4C9186E3DEEDD8D3D/InstallProperties/InstallDate,SZ,20040820,
/Microsoft/Windows/CurrentVersion/Uninstall/WinPcapInst/InstallDate,SZ,08/27/2004,
/Microsoft/Windows/CurrentVersion/Uninstall/{350C97B0-3D7C-4EE8-BAA9-00BCB3D54227}/InstallDate,SZ,20040819,
/Microsoft/Windows/CurrentVersion/Uninstall/{6C31E111-96BB-4ADC-9C81-E6D3EEDDD8D3}/InstallDate,SZ,20040820,
/Microsoft/Windows NT/CurrentVersion/InstallDate,DWORD,0x41252E3B,
`
the most relevant is 'InstallDate,SZ,20040820,
/Microsoft/Windows NT/CurrentVersion/InstallDate,DWORD,0x41252E3B'
the hexavalue is a unix timestamp and can be converted with
`date -d @$(printf "%d" 0x41252E3B)`
which reveals :Thursday, August 19, 2004 10:48:27 PM


## timezone information 


ctrl + f 'TimeZoneInformation'
ctrl + shift + l 
finds: 
'/ControlSet001/Control/TimeZoneInformation,KEY,,2004-08-19 17:20:02
/ControlSet001/Control/TimeZoneInformation/Bias,DWORD,0x00000168,
/ControlSet001/Control/TimeZoneInformation/StandardName,SZ,Central Standard Time,
/ControlSet001/Control/TimeZoneInformation/StandardBias,DWORD,0x00000000,
/ControlSet001/Control/TimeZoneInformation/StandardStart,BINARY,%00%00%0A%00%05%00%02%00%00%00%00%00%00%00%00%00,
/ControlSet001/Control/TimeZoneInformation/DaylightName,SZ,Central Daylight Time,
/ControlSet001/Control/TimeZoneInformation/DaylightBias,DWORD,0xFFFFFFC4,
/ControlSet001/Control/TimeZoneInformation/DaylightStart,BINARY,%00%00%04%00%01%00%02%00%00%00%00%00%00%00%00%00,
/ControlSet001/Control/TimeZoneInformation/ActiveTimeBias,DWORD,0x0000012C,
/ControlSet002/Control/TimeZoneInformation,KEY,,2004-08-19 17:20:02
/ControlSet002/Control/TimeZoneInformation/Bias,DWORD,0x00000168,
/ControlSet002/Control/TimeZoneInformation/StandardName,SZ,Central Standard Time,
/ControlSet002/Control/TimeZoneInformation/StandardBias,DWORD,0x00000000,
/ControlSet002/Control/TimeZoneInformation/StandardStart,BINARY,%00%00%0A%00%05%00%02%00%00%00%00%00%00%00%00%00,
/ControlSet002/Control/TimeZoneInformation/DaylightName,SZ,Central Daylight Time,
/ControlSet002/Control/TimeZoneInformation/DaylightBias,DWORD,0xFFFFFFC4,
/ControlSet002/Control/TimeZoneInformation/DaylightStart,BINARY,%00%00%04%00%01%00%02%00%00%00%00%00%00%00%00%00,
/ControlSet002/Control/TimeZoneInformation/ActiveTimeBias,DWORD,0x0000012C,
'
which accordint to deepSeek reveals 
Based on the registry data from /ControlSet001/Control/TimeZoneInformation, here are the configured timezone settings:

1. Timezone Information
Standard Time Name: Central Standard Time (CST)

Daylight Saving Time Name: Central Daylight Time (CDT)

Base UTC Offset (Bias): 0x00000168 (360 minutes = UTC-6:00)

Daylight Saving Bias: 0xFFFFFFC4 (-60 minutes = UTC-5:00 during DST)

2. Daylight Saving Time (DST) Rules
Standard Time Start:

Month: 0x0A (October)

Week: 0x05 (Last week)

Day: 0x02 (Sunday)

Time: 02:00 AM (switches from CDT to CST)

Daylight Saving Time Start:

Month: 0x04 (April)

Week: 0x01 (First week)

Day: 0x02 (Sunday)

Time: 02:00 AM (switches from CST to CDT)

3. Current Time Bias (ActiveTimeBias)
ActiveTimeBias: 0x0000012C (300 minutes = UTC-5:00)

This suggests the system was last running in Daylight Saving Time (CDT, UTC-5) before shutdown.

4. Summary of Timezone Settings
Setting	Value	Interpretation
Standard Time	Central Standard Time (CST)	UTC-6:00 (Winter)
Daylight Time	Central Daylight Time (CDT)	UTC-5:00 (Summer)
Standard Start	Last Sun of Oct, 2:00 AM	Switch to CST
Daylight Start	First Sun of Apr, 2:00 AM	Switch to CDT
Last Active Bias	UTC-5:00 (CDT)	System was in DST
5. Geographic Implications
This configuration matches the Central Time Zone (US & Canada), including:

Chicago, Dallas, Houston, Mexico City

Used in parts of the United States, Canada, and Mexico

6. Forensic Significance
The system was likely used in North America (Central Time Zone).

The last active bias (UTC-5:00) suggests the system was shut down during Daylight Saving Time (April–October).

This aligns with the August 2004 installation date (summer time).

## 5. Wer ist als registrierter Besitzer des Systems eingetragen? (Registered owner)

ctrl + f 'RegisteredOwner'
ctrl + shift + l 
'/Microsoft/Windows NT/CurrentVersion/RegisteredOwner,SZ,Greg Schardt,'

## Wie lautet der Name des Benutzerkontos? (User account name)
cybersecurity_project/hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_SAM.txt
contains:
'
/SAM/Domains/Account/Users/Names,KEY,,2004-08-19 23:03:54
/SAM/Domains/Account/Users/Names/,NONE,(null),
/SAM/Domains/Account/Users/Names/Administrator,KEY,,2004-08-19 16:59:24
/SAM/Domains/Account/Users/Names/Administrator/,0x000001F4,(null),
/SAM/Domains/Account/Users/Names/Guest,KEY,,2004-08-19 16:59:24
/SAM/Domains/Account/Users/Names/Guest/,0x000001F5,(null),
/SAM/Domains/Account/Users/Names/HelpAssistant,KEY,,2004-08-19 22:28:24
/SAM/Domains/Account/Users/Names/HelpAssistant/,0x000003E8,(null),
/SAM/Domains/Account/Users/Names/Mr. Evil,KEY,,2004-08-19 23:03:54
/SAM/Domains/Account/Users/Names/Mr. Evil/,0x000003EB,(null),
/SAM/Domains/Account/Users/Names/SUPPORT_388945a0,KEY,,2004-08-19 22:35:19
/SAM/Domains/Account/Users/Names/SUPPORT_388945a0/,0x000003EA,(null),
'
interesting here is the entry
/SAM/Domains/Account/Users/Names/Mr. Evil,KEY,,2004-08-19 23:03:54
which suggests a user with the name 'Mr. Evil' that may have been created '2004-08-19 23:03:54'
in the evening of the day the OS was installed
(Thursday, August 19, 2004 10:48:27 PM)

# what is the primary ADDS domain
/cybersecurity_project/hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_system.txt contains
/ControlSet001/Control/Lsa/disabledomaincreds,DWORD,0x00000000,
/ControlSet001/Control/Lsa/Kerberos/Domains,KEY,,2004-08-19 17:01:59
/ControlSet001/Control/Terminal Server/DefaultUserConfiguration/Domain,SZ,,
/ControlSet001/Control/Terminal Server/WinStations/Console/Domain,SZ,,
/ControlSet001/Control/Terminal Server/WinStations/RDP-Tcp/Domain,SZ,,
/ControlSet001/Services/Browser/Parameters/IsDomainMaster,SZ,FALSE,
/ControlSet001/Services/Dhcp/Parameters/Options/15/RegLocation,MULTI_SZ,SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\?\DhcpDomain|SYSTEM\CurrentControlSet\Services\TcpIp\Parameters\DhcpDomain,
/ControlSet001/Services/Dnscache/Description,SZ,Resolves and caches Domain Name System (DNS) names for this computer. If this service is stopped%2C this computer will not be able to resolve DNS names and locate Active Directory domain controllers. If this service is disabled%2C any services that explicitly depend on it will fail to start.,
/ControlSet001/Services/Eventlog/Security/LSA/ObjectNames/TrustedDomainObject,DWORD,0x00001620,
/ControlSet001/Services/Eventlog/Security/Security Account Manager/ObjectNames/SAM_DOMAIN,DWORD,0x00001510,
/ControlSet001/Services/lanmanworkstation/parameters/OtherDomains,MULTI_SZ,,
/ControlSet001/Services/Netlogon/Description,SZ,Supports pass-through authentication of account logon events for computers in a domain.,
/ControlSet001/Services/Tcpip/Parameters/Domain,SZ,,
/ControlSet001/Services/Tcpip/Parameters/UseDomainNameDevolution,DWORD,0x00000001,
/ControlSet001/Services/Tcpip/Parameters/Interfaces/{6E4090C2-FAEF-489A-8575-505D21FC1049}/Domain,SZ,,
/ControlSet001/Services/Tcpip/Parameters/Interfaces/{86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}/Domain,SZ,,
/ControlSet001/Services/TrkWks/Description,SZ,Maintains links between NTFS files within a computer or across computers in a network domain.,
/ControlSet002/Control/Lsa/disabledomaincreds,DWORD,0x00000000,
/ControlSet002/Control/Lsa/Kerberos/Domains,KEY,,2004-08-19 17:01:59
/ControlSet002/Control/Terminal Server/DefaultUserConfiguration/Domain,SZ,,
/ControlSet002/Control/Terminal Server/WinStations/Console/Domain,SZ,,
/ControlSet002/Control/Terminal Server/WinStations/RDP-Tcp/Domain,SZ,,
/ControlSet002/Services/Browser/Parameters/IsDomainMaster,SZ,FALSE,
/ControlSet002/Services/Dhcp/Parameters/Options/15/RegLocation,MULTI_SZ,SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\?\DhcpDomain|SYSTEM\CurrentControlSet\Services\TcpIp\Parameters\DhcpDomain,
/ControlSet002/Services/Dnscache/Description,SZ,Resolves and caches Domain Name System (DNS) names for this computer. If this service is stopped%2C this computer will not be able to resolve DNS names and locate Active Directory domain controllers. If this service is disabled%2C any services that explicitly depend on it will fail to start.,
/ControlSet002/Services/Eventlog/Security/LSA/ObjectNames/TrustedDomainObject,DWORD,0x00001620,
/ControlSet002/Services/Eventlog/Security/Security Account Manager/ObjectNames/SAM_DOMAIN,DWORD,0x00001510,
/ControlSet002/Services/lanmanworkstation/parameters/OtherDomains,MULTI_SZ,,
/ControlSet002/Services/Netlogon/Description,SZ,Supports pass-through authentication of account logon events for computers in a domain.,
/ControlSet002/Services/Tcpip/Parameters/Domain,SZ,,
/ControlSet002/Services/Tcpip/Parameters/UseDomainNameDevolution,DWORD,0x00000001,
/ControlSet002/Services/Tcpip/Parameters/Interfaces/{6E4090C2-FAEF-489A-8575-505D21FC1049}/Domain,SZ,,
/ControlSet002/Services/TrkWks/Description,SZ,Maintains links between NTFS files within a computer or across computers in a network domain.,

## How many users? 
cybersecurity_project/hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_SAM.txt
contains:
'
/SAM/Domains/Account/Users/Names,KEY,,2004-08-19 23:03:54
/SAM/Domains/Account/Users/Names/,NONE,(null),
/SAM/Domains/Account/Users/Names/Administrator,KEY,,2004-08-19 16:59:24
/SAM/Domains/Account/Users/Names/Administrator/,0x000001F4,(null),
/SAM/Domains/Account/Users/Names/Guest,KEY,,2004-08-19 16:59:24
/SAM/Domains/Account/Users/Names/Guest/,0x000001F5,(null),
/SAM/Domains/Account/Users/Names/HelpAssistant,KEY,,2004-08-19 22:28:24
/SAM/Domains/Account/Users/Names/HelpAssistant/,0x000003E8,(null),
/SAM/Domains/Account/Users/Names/Mr. Evil,KEY,,2004-08-19 23:03:54
/SAM/Domains/Account/Users/Names/Mr. Evil/,0x000003EB,(null),
/SAM/Domains/Account/Users/Names/SUPPORT_388945a0,KEY,,2004-08-19 22:35:19
/SAM/Domains/Account/Users/Names/SUPPORT_388945a0/,0x000003EA,(null),
'
suggests
KEY
Administrator
Guest
Guest
HelpAssistant
Mr. Evil
SUPPORT_388945a0
SUPPORT_388945a0

## welcher benutzer nutzt computer am haefigsten? 
/mnt/SCHARDT_001_008$ ls -lt "Documents and Settings"/*/Recent
'Documents and Settings/Mr. Evil/Recent':
total 6
-rwxrwxrwx 2 root root 460 ago 26  2004 'Temp on m1200 (4.12.220.254).lnk'
-rwxrwxrwx 1 root root 575 ago 26  2004  yng13.lnk
-rwxrwxrwx 2 root root 582 ago 20  2004 'channels (2).lnk'
-rwxrwxrwx 1 root root 759 ago 20  2004  channels.lnk
-rwxrwxrwx 2 root root 333 ago 20  2004  GhostWare.lnk
-rwxrwxrwx 1 root root 459 ago 20  2004  Receipt.lnk
-rwxrwxrwx 2 root root 339 ago 20  2004  Anonyymizer.lnk
-rwxrwxrwx 1 root root 458 ago 20  2004  keys.lnk
-rwxrwxrwx 1 root root 150 ago 20  2004  Desktop.ini

Der Benutzer Mr. Evil nutzt den Computer am häufigsten, da sich im Verzeichnis Documents and Settings/Mr. Evil/Recent mehrere zuletzt genutzte Dateien und Verknüpfungen befinden, die auf eine aktive Nutzung hinweisen.

## welcher benutzer war zuletzt angemeldet?
grep -i 'DefaultUserName' ./hive_decoded/*
./hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_software.sav.txt:/Microsoft/Windows NT/CurrentVersion/Winlogon/DefaultUserName,SZ,,
./hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_software.txt:/Microsoft/Windows NT/CurrentVersion/Winlogon/DefaultUserName,SZ,Mr. Evil,
./hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_software.txt:/Microsoft/Windows NT/CurrentVersion/Winlogon/AltDefaultUserName,SZ,Mr. Evil,


## Eine Suche nach dem Namen Greg Schardt führt zu mehreren Treffern.
Einer davon 
beweist, dass Greg Schardt mit „Mr. Evil“ identisch ist und Administratorrechte auf 
diesem System hatte. 
o Frage: Wie heisst diese Datei und mit welchem Softwareprogramm steht sie 
in Verbindung?


```
grep -ril "Greg Schardt" /mnt/SCHARDT_001_008/
/mnt/SCHARDT_001_008/Program Files/Look@LAN/irunin.ini
/mnt/SCHARDT_001_008/WINDOWS/Look@LAN Setup Log.txt
(base) jf18j492@aitne:~/code/cybersecurity_project$ grep -ril "Mr. Evil" /mnt/SCHARDT_001_008/
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Application Data/Ethereal/recent
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Application Data/Microsoft/Internet Explorer/brndlog.txt
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Cookies/index.dat
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/cleanup.log
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/History/History.IE5/index.dat
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/History/History.IE5/MSHist012004081620040823/index.dat
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/History/History.IE5/MSHist012004082520040826/index.dat
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/History/History.IE5/MSHist012004082620040827/index.dat
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/History/History.IE5/MSHist012004082720040828/index.dat
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/index.dat
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/My Documents/desktop.ini
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/My Documents/My Music/Desktop.ini
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/My Documents/My Pictures/Desktop.ini
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/NTUSER.DAT
/mnt/SCHARDT_001_008/hiberfil.sys
/mnt/SCHARDT_001_008/pagefile.sys
/mnt/SCHARDT_001_008/Program Files/123WASP/INSTALL.LOG
/mnt/SCHARDT_001_008/Program Files/Agent/INSTALL.LOG
/mnt/SCHARDT_001_008/Program Files/Cain/Install.log
/mnt/SCHARDT_001_008/Program Files/Faber Toys/unins000.dat
/mnt/SCHARDT_001_008/Program Files/GlobalSCAPE/CuteFTP/CuteHTML/INSTALL2.LOG
/mnt/SCHARDT_001_008/Program Files/GlobalSCAPE/CuteFTP/INSTALL.LOG
/mnt/SCHARDT_001_008/Program Files/Look@LAN/irunin.ini
/mnt/SCHARDT_001_008/RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/INFO2
/mnt/SCHARDT_001_008/WINDOWS/setuplog.txt
/mnt/SCHARDT_001_008/WINDOWS/system32/config/SAM
/mnt/SCHARDT_001_008/WINDOWS/system32/config/software
/mnt/SCHARDT_001_008/WINDOWS/system32/wbem/Repository/FS/OBJECTS.DATA
/mnt/SCHARDT_001_008/WINDOWS/Look@LAN Setup Log.txt
```
Der String „Greg Schardt“ taucht in irunin.ini auf – das ist die Konfigurationsdatei der Software Look@LAN. Gleichzeitig taucht „Mr. Evil“ an mehreren Stellen im Profilordner von Documents and Settings/Mr. Evil auf, was zeigt, dass dieses Benutzerkonto aktiv war.

Es ist sehr wahrscheinlich, dass in der Datei irunin.ini der Name „Greg Schardt“ mit einem Benutzerprofil, Task oder Konfigurationseintrag verknüpft ist — das belegt die Identität von „Mr. Evil“ = Greg Schardt.

in der datei '/mnt/SCHARDT_001_008/Program Files/Look@LAN/irunin.ini' findet man: 
...
%LANUSER%=Mr. Evil
...
%REGOWNER%=Greg Schardt
...

`

# Welche Netzwerkkarten wurden in diesem Computer verwendet?
/ControlSet001/Control/Class,KEY,,2004-08-19 16:56:15
/ControlSet001/Control/Class/{4D36E967-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E967-E325-11CE-BFC1-08002BE10318}/UpperFilters,MULTI_SZ,PartMgr,
/ControlSet001/Control/Class/{4D36E96B-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E96B-E325-11CE-BFC1-08002BE10318}/Class,SZ,Keyboard,
/ControlSet001/Control/Class/{4D36E96B-E325-11CE-BFC1-08002BE10318}/UpperFilters,MULTI_SZ,kbdclass,
/ControlSet001/Control/Class/{4D36E96F-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E96F-E325-11CE-BFC1-08002BE10318}/Class,SZ,Mouse,
/ControlSet001/Control/Class/{4D36E96F-E325-11CE-BFC1-08002BE10318}/UpperFilters,MULTI_SZ,mouclass,
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318},KEY,,2004-08-19 16:56:15
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0000,KEY,,2004-08-19 16:56:15
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0000/Linkage,KEY,,2004-08-19 16:56:15
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0000/Linkage/Export,MULTI_SZ,\Device\{54C7D140-09EF-11D1-B25A-F5FE627ED95E},
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0000/Linkage/Bind,MULTI_SZ,\Device\{54C7D140-09EF-11D1-B25A-F5FE627ED95E},
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0000/Linkage/UpperBind,MULTI_SZ,Tcpip,
/ControlSet001/Control/Class/{4D36E973-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E973-E325-11CE-BFC1-08002BE10318}/,SZ,Network Client,
/ControlSet001/Control/Class/{4D36E973-E325-11CE-BFC1-08002BE10318}/Class,SZ,NetClient,
/ControlSet001/Control/Class/{4D36E973-E325-11CE-BFC1-08002BE10318}/Icon,SZ,-7,
/ControlSet001/Control/Class/{4D36E973-E325-11CE-BFC1-08002BE10318}/Installer32,SZ,NetCfgx.Dll%2CNetClassInstaller,
/ControlSet001/Control/Class/{4D36E973-E325-11CE-BFC1-08002BE10318}/NoInstallClass,SZ,1,
/ControlSet001/Control/Class/{4D36E973-E325-11CE-BFC1-08002BE10318}/NoDisplayClass,SZ,1,
/ControlSet001/Control/Class/{4D36E974-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E974-E325-11CE-BFC1-08002BE10318}/,SZ,Network Service,
/ControlSet001/Control/Class/{4D36E974-E325-11CE-BFC1-08002BE10318}/Class,SZ,NetService,
/ControlSet001/Control/Class/{4D36E974-E325-11CE-BFC1-08002BE10318}/Icon,SZ,-8,
/ControlSet001/Control/Class/{4D36E974-E325-11CE-BFC1-08002BE10318}/Installer32,SZ,NetCfgx.Dll%2CNetClassInstaller,
/ControlSet001/Control/Class/{4D36E974-E325-11CE-BFC1-08002BE10318}/NoInstallClass,SZ,1,
/ControlSet001/Control/Class/{4D36E974-E325-11CE-BFC1-08002BE10318}/NoDisplayClass,SZ,1,
/ControlSet001/Control/Class/{4D36E975-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E975-E325-11CE-BFC1-08002BE10318}/,SZ,Network Protocol,
/ControlSet001/Control/Class/{4D36E975-E325-11CE-BFC1-08002BE10318}/Class,SZ,NetTrans,
/ControlSet001/Control/Class/{4D36E975-E325-11CE-BFC1-08002BE10318}/Icon,SZ,-6,
/ControlSet001/Control/Class/{4D36E975-E325-11CE-BFC1-08002BE10318}/NoInstallClass,SZ,1,
/ControlSet001/Control/Class/{4D36E975-E325-11CE-BFC1-08002BE10318}/NoDisplayClass,SZ,1,
/ControlSet001/Control/Class/{4D36E975-E325-11CE-BFC1-08002BE10318}/Installer32,SZ,NetCfgx.Dll%2CNetClassInstaller,
/ControlSet001/Control/Class/{4D36E97B-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E97B-E325-11CE-BFC1-08002BE10318}/LegacyAdapterDetection,DWORD,0x00000000,
/ControlSet001/Control/Class/{4D36E97E-E325-11CE-BFC1-08002BE10318},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{4D36E97E-E325-11CE-BFC1-08002BE10318}/,SZ,Other devices,
/ControlSet001/Control/Class/{4D36E97E-E325-11CE-BFC1-08002BE10318}/Class,SZ,Unknown,
/ControlSet001/Control/Class/{4D36E97E-E325-11CE-BFC1-08002BE10318}/Icon,SZ,-18,
/ControlSet001/Control/Class/{71A27CDD-812A-11D0-BEC7-08002BE2092F},KEY,,2004-08-19 16:56:09
/ControlSet001/Control/Class/{71A27CDD-812A-11D0-BEC7-08002BE2092F}/UpperFilters,MULTI_SZ,VolSnap,

# 
/ControlSet001/Control/Class/{36FC9E60-C465-11CF-8056-444553540000}/0000/DriverDesc,SZ,Intel(r) 82371AB/EB PCI to USB Universal Host Controller,
/ControlSet001/Control/Class/{36FC9E60-C465-11CF-8056-444553540000}/0001/DriverDesc,SZ,USB Root Hub,
/ControlSet001/Control/Class/{4D36E965-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,CD-ROM Drive,
/ControlSet001/Control/Class/{4D36E966-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Advanced Configuration and Power Interface (ACPI) PC,
/ControlSet001/Control/Class/{4D36E967-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Disk drive,
/ControlSet001/Control/Class/{4D36E968-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,NeoMagic MagicGraph256AV driver,
/ControlSet001/Control/Class/{4D36E969-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Standard floppy disk controller,
/ControlSet001/Control/Class/{4D36E96A-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Intel(r) 82371AB/EB PCI Bus Master IDE Controller,
/ControlSet001/Control/Class/{4D36E96A-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Primary IDE Channel,
/ControlSet001/Control/Class/{4D36E96A-E325-11CE-BFC1-08002BE10318}/0002/DriverDesc,SZ,Secondary IDE Channel,
/ControlSet001/Control/Class/{4D36E96B-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Standard 101/102-Key or Microsoft Natural PS/2 Keyboard,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,NeoMagic MagicMedia 256AV Audio Driver (WDM),
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Media Control Devices,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0002/DriverDesc,SZ,Video Codecs,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0003/DriverDesc,SZ,Audio Codecs,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0004/DriverDesc,SZ,Legacy Video Capture Devices,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0005/DriverDesc,SZ,Legacy Audio Drivers,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0006/DriverDesc,SZ,Microsoft Streaming Quality Manager Proxy,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0007/DriverDesc,SZ,Microsoft Kernel Audio Splitter,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0008/DriverDesc,SZ,Microsoft Kernel Acoustic Echo Canceller,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0009/DriverDesc,SZ,Microsoft Kernel GS Wavetable Synthesizer,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0010/DriverDesc,SZ,Microsoft Kernel DLS Synthesizer,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0011/DriverDesc,SZ,Microsoft Streaming Service Proxy,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0012/DriverDesc,SZ,Microsoft Streaming Clock Proxy,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0013/DriverDesc,SZ,Microsoft Kernel System Audio Device,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0014/DriverDesc,SZ,Microsoft Kernel Wave Audio Mixer,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0015/DriverDesc,SZ,Microsoft WINMM WDM Audio Compatibility Driver,
/ControlSet001/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0016/DriverDesc,SZ,Microsoft Kernel DRM Audio Descrambler,
/ControlSet001/Control/Class/{4D36E96D-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Xircom Cardbus Ethernet 100 + Modem 56 (Modem Interface),
/ControlSet001/Control/Class/{4D36E96E-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Default Monitor,
/ControlSet001/Control/Class/{4D36E96E-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Default Monitor,
/ControlSet001/Control/Class/{4D36E96F-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,PS/2 Compatible Mouse,
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0001/DriverDesc,SZ,Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface),
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0002/DriverDesc,SZ,RAS Async Adapter,
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0003/DriverDesc,SZ,Packet Scheduler Miniport,
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0004/DriverDesc,SZ,WAN Miniport (L2TP),
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0005/DriverDesc,SZ,WAN Miniport (PPTP),
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0006/DriverDesc,SZ,WAN Miniport (PPPOE),
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0007/DriverDesc,SZ,Direct Parallel,
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0008/DriverDesc,SZ,WAN Miniport (IP),
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0009/DriverDesc,SZ,Packet Scheduler Miniport,
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0010/DriverDesc,SZ,Compaq WL110 Wireless LAN PC Card,
/ControlSet001/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0011/DriverDesc,SZ,Packet Scheduler Miniport,
/ControlSet001/Control/Class/{4D36E977-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Texas Instruments PCI-1225 CardBus Controller,
/ControlSet001/Control/Class/{4D36E977-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Texas Instruments PCI-1225 CardBus Controller,
/ControlSet001/Control/Class/{4D36E978-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Communications Port,
/ControlSet001/Control/Class/{4D36E978-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,ECP Printer Port,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Plug and Play Software Device Enumerator,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Microcode Update Device,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0002/DriverDesc,SZ,Volume Manager,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0003/DriverDesc,SZ,Microsoft ACPI-Compliant System,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0004/DriverDesc,SZ,PCI bus,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0005/DriverDesc,SZ,ACPI Sleep Button,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0006/DriverDesc,SZ,ACPI Lid,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0007/DriverDesc,SZ,ACPI Thermal Zone,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0008/DriverDesc,SZ,Microsoft Composite Battery,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0009/DriverDesc,SZ,System board,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0010/DriverDesc,SZ,ACPI Power Button,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0011/DriverDesc,SZ,Intel 82443BX Pentium(r) II Processor to AGP Controller,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0012/DriverDesc,SZ,System board,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0013/DriverDesc,SZ,System board,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0014/DriverDesc,SZ,System board,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0015/DriverDesc,SZ,Intel 82371AB/EB PCI to ISA bridge (EIO mode),
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0016/DriverDesc,SZ,Intel 82443BX Pentium(r) II Processor to PCI Bridge,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0017/DriverDesc,SZ,ISAPNP Read Data Port,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0018/DriverDesc,SZ,Numeric data processor,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0019/DriverDesc,SZ,System board,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0020/DriverDesc,SZ,System CMOS/real time clock,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0021/DriverDesc,SZ,System speaker,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0022/DriverDesc,SZ,Direct memory access controller,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0023/DriverDesc,SZ,System timer,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0024/DriverDesc,SZ,Programmable interrupt controller,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0025/DriverDesc,SZ,Printer Port Logical Interface,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0026/DriverDesc,SZ,Terminal Server Device Redirector,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0027/DriverDesc,SZ,Terminal Server Mouse Driver,
/ControlSet001/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0028/DriverDesc,SZ,Terminal Server Keyboard Driver,
/ControlSet001/Control/Class/{50127DC3-0F36-415E-A6CC-4CB3BE910B65}/0000/DriverDesc,SZ,Processor,
/ControlSet001/Control/Class/{71A27CDD-812A-11D0-BEC7-08002BE2092F}/0000/DriverDesc,SZ,Generic volume,
/ControlSet001/Control/Class/{72631E54-78A4-11D0-BCF7-00AA00B7B32A}/0000/DriverDesc,SZ,Microsoft AC Adapter,
/ControlSet001/Control/Class/{72631E54-78A4-11D0-BCF7-00AA00B7B32A}/0001/DriverDesc,SZ,Microsoft ACPI-Compliant Control Method Battery,
/ControlSet001/Control/Class/{72631E54-78A4-11D0-BCF7-00AA00B7B32A}/0002/DriverDesc,SZ,Microsoft ACPI-Compliant Control Method Battery,
/ControlSet002/Control/Class/{36FC9E60-C465-11CF-8056-444553540000}/0000/DriverDesc,SZ,Intel(r) 82371AB/EB PCI to USB Universal Host Controller,
/ControlSet002/Control/Class/{36FC9E60-C465-11CF-8056-444553540000}/0001/DriverDesc,SZ,USB Root Hub,
/ControlSet002/Control/Class/{4D36E965-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,CD-ROM Drive,
/ControlSet002/Control/Class/{4D36E966-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Advanced Configuration and Power Interface (ACPI) PC,
/ControlSet002/Control/Class/{4D36E967-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Disk drive,
/ControlSet002/Control/Class/{4D36E968-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,NeoMagic MagicGraph256AV driver,
/ControlSet002/Control/Class/{4D36E969-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Standard floppy disk controller,
/ControlSet002/Control/Class/{4D36E96A-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Intel(r) 82371AB/EB PCI Bus Master IDE Controller,
/ControlSet002/Control/Class/{4D36E96A-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Primary IDE Channel,
/ControlSet002/Control/Class/{4D36E96A-E325-11CE-BFC1-08002BE10318}/0002/DriverDesc,SZ,Secondary IDE Channel,
/ControlSet002/Control/Class/{4D36E96B-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Standard 101/102-Key or Microsoft Natural PS/2 Keyboard,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,NeoMagic MagicMedia 256AV Audio Driver (WDM),
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Media Control Devices,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0002/DriverDesc,SZ,Video Codecs,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0003/DriverDesc,SZ,Audio Codecs,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0004/DriverDesc,SZ,Legacy Video Capture Devices,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0005/DriverDesc,SZ,Legacy Audio Drivers,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0006/DriverDesc,SZ,Microsoft Streaming Quality Manager Proxy,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0007/DriverDesc,SZ,Microsoft Kernel Audio Splitter,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0008/DriverDesc,SZ,Microsoft Kernel Acoustic Echo Canceller,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0009/DriverDesc,SZ,Microsoft Kernel GS Wavetable Synthesizer,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0010/DriverDesc,SZ,Microsoft Kernel DLS Synthesizer,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0011/DriverDesc,SZ,Microsoft Streaming Service Proxy,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0012/DriverDesc,SZ,Microsoft Streaming Clock Proxy,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0013/DriverDesc,SZ,Microsoft Kernel System Audio Device,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0014/DriverDesc,SZ,Microsoft Kernel Wave Audio Mixer,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0015/DriverDesc,SZ,Microsoft WINMM WDM Audio Compatibility Driver,
/ControlSet002/Control/Class/{4D36E96C-E325-11CE-BFC1-08002BE10318}/0016/DriverDesc,SZ,Microsoft Kernel DRM Audio Descrambler,
/ControlSet002/Control/Class/{4D36E96D-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Xircom Cardbus Ethernet 100 + Modem 56 (Modem Interface),
/ControlSet002/Control/Class/{4D36E96E-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Default Monitor,
/ControlSet002/Control/Class/{4D36E96E-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Default Monitor,
/ControlSet002/Control/Class/{4D36E96F-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,PS/2 Compatible Mouse,
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0001/DriverDesc,SZ,Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface),
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0002/DriverDesc,SZ,RAS Async Adapter,
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0003/DriverDesc,SZ,Packet Scheduler Miniport,
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0004/DriverDesc,SZ,WAN Miniport (L2TP),
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0005/DriverDesc,SZ,WAN Miniport (PPTP),
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0006/DriverDesc,SZ,WAN Miniport (PPPOE),
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0007/DriverDesc,SZ,Direct Parallel,
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0008/DriverDesc,SZ,WAN Miniport (IP),
/ControlSet002/Control/Class/{4D36E972-E325-11CE-BFC1-08002bE10318}/0009/DriverDesc,SZ,Packet Scheduler Miniport,
/ControlSet002/Control/Class/{4D36E977-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Texas Instruments PCI-1225 CardBus Controller,
/ControlSet002/Control/Class/{4D36E977-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Texas Instruments PCI-1225 CardBus Controller,
/ControlSet002/Control/Class/{4D36E978-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Communications Port,
/ControlSet002/Control/Class/{4D36E978-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,ECP Printer Port,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0000/DriverDesc,SZ,Plug and Play Software Device Enumerator,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0001/DriverDesc,SZ,Microcode Update Device,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0002/DriverDesc,SZ,Volume Manager,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0003/DriverDesc,SZ,Microsoft ACPI-Compliant System,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0004/DriverDesc,SZ,PCI bus,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0005/DriverDesc,SZ,ACPI Sleep Button,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0006/DriverDesc,SZ,ACPI Lid,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0007/DriverDesc,SZ,ACPI Thermal Zone,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0008/DriverDesc,SZ,Microsoft Composite Battery,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0009/DriverDesc,SZ,System board,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0010/DriverDesc,SZ,ACPI Power Button,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0011/DriverDesc,SZ,Intel 82443BX Pentium(r) II Processor to AGP Controller,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0012/DriverDesc,SZ,System board,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0013/DriverDesc,SZ,System board,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0014/DriverDesc,SZ,System board,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0015/DriverDesc,SZ,Intel 82371AB/EB PCI to ISA bridge (EIO mode),
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0016/DriverDesc,SZ,Intel 82443BX Pentium(r) II Processor to PCI Bridge,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0017/DriverDesc,SZ,ISAPNP Read Data Port,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0018/DriverDesc,SZ,Numeric data processor,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0019/DriverDesc,SZ,System board,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0020/DriverDesc,SZ,System CMOS/real time clock,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0021/DriverDesc,SZ,System speaker,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0022/DriverDesc,SZ,Direct memory access controller,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0023/DriverDesc,SZ,System timer,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0024/DriverDesc,SZ,Programmable interrupt controller,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0025/DriverDesc,SZ,Printer Port Logical Interface,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0026/DriverDesc,SZ,Terminal Server Device Redirector,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0027/DriverDesc,SZ,Terminal Server Mouse Driver,
/ControlSet002/Control/Class/{4D36E97D-E325-11CE-BFC1-08002BE10318}/0028/DriverDesc,SZ,Terminal Server Keyboard Driver,
/ControlSet002/Control/Class/{50127DC3-0F36-415E-A6CC-4CB3BE910B65}/0000/DriverDesc,SZ,Processor,
/ControlSet002/Control/Class/{71A27CDD-812A-11D0-BEC7-08002BE2092F}/0000/DriverDesc,SZ,Generic volume,
/ControlSet002/Control/Class/{72631E54-78A4-11D0-BCF7-00AA00B7B32A}/0000/DriverDesc,SZ,Microsoft AC Adapter,
/ControlSet002/Control/Class/{72631E54-78A4-11D0-BCF7-00AA00B7B32A}/0001/DriverDesc,SZ,Microsoft ACPI-Compliant Control Method Battery,
/ControlSet002/Control/Class/{72631E54-78A4-11D0-BCF7-00AA00B7B32A}/0002/DriverDesc,SZ,Microsoft ACPI-Compliant Control Method Battery,
### ComponentID
/Microsoft/Active Setup/FeatureComponentID,KEY,,2004-08-19 22:33:07
/Microsoft/Active Setup/FeatureComponentID/{08B0E5C0-4FCB-11CF-AAA5-00401C608500},SZ,JAVAVMJIT,
/Microsoft/Active Setup/FeatureComponentID/{45ea75a0-a269-11d1-b5bf-0000f8051515},SZ,HELPCONT,
/Microsoft/Active Setup/FeatureComponentID/{630b1da0-b465-11d1-9948-00c04f98bbc9},SZ,EXTRAPACK,
/Microsoft/Active Setup/FeatureComponentID/{76C19B30-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKJA,
/Microsoft/Active Setup/FeatureComponentID/{76C19B31-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKKO,
/Microsoft/Active Setup/FeatureComponentID/{76C19B32-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKPE,
/Microsoft/Active Setup/FeatureComponentID/{76C19B33-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKZHT,
/Microsoft/Active Setup/FeatureComponentID/{76C19B34-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKZHC,
/Microsoft/Active Setup/FeatureComponentID/{76C19B50-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKAD,
/Microsoft/Active Setup/FeatureComponentID/{4f645220-306d-11d2-995d-00c04f98bbc9},SZ,MSVBSCRIPT,
/Microsoft/Active Setup/FeatureComponentID/{10072CEC-8CC1-11D1-986E-00A0C955B42F},SZ,MSVML,
/Microsoft/Active Setup/FeatureComponentID/{76C19B35-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKTH,
/Microsoft/Active Setup/FeatureComponentID/{76C19B36-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKIW,
/Microsoft/Active Setup/FeatureComponentID/{76C19B37-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKVI,
/Microsoft/Active Setup/FeatureComponentID/{76C19B38-F0C8-11cf-87CC-0020AFEECF20},SZ,IELPKAR,
/Microsoft/Active Setup/FeatureComponentID/{44BBA848-CC51-11CF-AAFA-00AA00B6015C},SZ,MEDIAPLAYER,
/Microsoft/Active Setup/FeatureComponentID/{22d6f312-b0f6-11d0-94ab-0080c74c7e95},SZ,MEDIAPLAYER,
/Microsoft/Active Setup/FeatureComponentID/{47f67d00-9e55-11d1-baef-00c04fc2d130},SZ,AOLSUPP,
/Microsoft/Active Setup/FeatureComponentID/{3af36230-a269-11d1-b5bf-0000f8051515},SZ,MOBILEPK_NTx86,
/Microsoft/Active Setup/FeatureComponentID/{5A8D6EE0-3E18-11D0-821E-444553540000},SZ,ICW_NTx86,
/Microsoft/Active Setup/FeatureComponentID/{3bf42070-b3b1-11d1-b5c5-0000f8051515},SZ,USP10,
/Microsoft/Active Setup/FeatureComponentID/{89820200-ECBD-11cf-8B85-00AA005B4383},SZ,BASEIE40_NTx86,
/Microsoft/Active Setup/FeatureComponentID/{283807B5-2C60-11D0-A31D-00AA00B92C03},SZ,DIRECTANIMATION,
/Microsoft/Active Setup/FeatureComponentID/{9381D8F2-0288-11D0-9501-00AA00B911A5},SZ,TRIDATA,
/Microsoft/Active Setup/FeatureComponentID/{7790769C-0471-11d2-AF11-00C04FA35D02},SZ,ADDRESSBOOK,
/Microsoft/Active Setup/FeatureComponentID/{6BF52A52-394A-11D3-B153-00C04F79FAA6},SZ,WMPLAYER,
/Microsoft/Active Setup/Installed Components/>{60B49E34-C7CC-11D0-8953-00A0C90347FF}MICROS/ComponentID,SZ,BRANDING.CAB,
/Microsoft/Active Setup/Installed Components/{10072CEC-8CC1-11D1-986E-00A0C955B42F}/ComponentID,SZ,MSVML,
/Microsoft/Active Setup/Installed Components/{2179C5D3-EBFF-11CF-B6FD-00AA00B4E220}/ComponentID,SZ,NetShow,
/Microsoft/Active Setup/Installed Components/{22d6f312-b0f6-11d0-94ab-0080c74c7e95}/ComponentID,SZ,Microsoft Windows Media Player,
/Microsoft/Active Setup/Installed Components/{283807B5-2C60-11D0-A31D-00AA00B92C03}/ComponentID,SZ,DirectAnimation,
/Microsoft/Active Setup/Installed Components/{2C7339CF-2B09-4501-B3F3-F3508C9228ED}/ComponentID,SZ,Theme Component,
/Microsoft/Active Setup/Installed Components/{36f8ec70-c29a-11d1-b5c7-0000f8051515}/ComponentID,SZ,TridataJava,
/Microsoft/Active Setup/Installed Components/{3af36230-a269-11d1-b5bf-0000f8051515}/ComponentID,SZ,MobilePk,
/Microsoft/Active Setup/Installed Components/{3bf42070-b3b1-11d1-b5c5-0000f8051515}/ComponentID,SZ,USP10,
/Microsoft/Active Setup/Installed Components/{4278c270-a269-11d1-b5bf-0000f8051515}/ComponentID,SZ,AdvAuth,
/Microsoft/Active Setup/Installed Components/{44BBA840-CC51-11CF-AAFA-00AA00B6015C}/ComponentID,SZ,MailNews,
/Microsoft/Active Setup/Installed Components/{44BBA842-CC51-11CF-AAFA-00AA00B6015B}/ComponentID,SZ,NetMeeting,
/Microsoft/Active Setup/Installed Components/{44BBA848-CC51-11CF-AAFA-00AA00B6015C}/ComponentID,SZ,activemovie,
/Microsoft/Active Setup/Installed Components/{44BBA855-CC51-11CF-AAFA-00AA00B6015F}/ComponentID,SZ,DirectDrawEx,
/Microsoft/Active Setup/Installed Components/{45ea75a0-a269-11d1-b5bf-0000f8051515}/ComponentID,SZ,HelpCont,
/Microsoft/Active Setup/Installed Components/{4f216970-c90c-11d1-b5c7-0000f8051515}/ComponentID,SZ,DAJava,
/Microsoft/Active Setup/Installed Components/{4f645220-306d-11d2-995d-00c04f98bbc9}/ComponentID,SZ,MSVBScript,
/Microsoft/Active Setup/Installed Components/{5945c046-1e7d-11d1-bc44-00c04fd912be}/ComponentID,SZ,Messenger,
/Microsoft/Active Setup/Installed Components/{5A8D6EE0-3E18-11D0-821E-444553540000}/ComponentID,SZ,ICW,
/Microsoft/Active Setup/Installed Components/{5fd399c0-a70a-11d1-9948-00c04f98bbc9}/ComponentID,SZ,GenSetup,
/Microsoft/Active Setup/Installed Components/{630b1da0-b465-11d1-9948-00c04f98bbc9}/ComponentID,SZ,ExtraPack,
/Microsoft/Active Setup/Installed Components/{6BF52A52-394A-11d3-B153-00C04F79FAA6}/ComponentID,SZ,Microsoft Windows Media Player 8,
/Microsoft/Active Setup/Installed Components/{6fab99d0-bab8-11d1-994a-00c04f98bbc9}/ComponentID,SZ,MSN_Auth,
/Microsoft/Active Setup/Installed Components/{7790769C-0471-11d2-AF11-00C04FA35D02}/ComponentID,SZ,WAB,
/Microsoft/Active Setup/Installed Components/{89820200-ECBD-11cf-8B85-00AA005B4340}/ComponentID,SZ,IE4Shell_NT,
/Microsoft/Active Setup/Installed Components/{89820200-ECBD-11cf-8B85-00AA005B4383}/ComponentID,SZ,BASEIE40_W2K,
/Microsoft/Active Setup/Installed Components/{9381D8F2-0288-11D0-9501-00AA00B911A5}/ComponentID,SZ,Tridata,
/Microsoft/Active Setup/Installed Components/{ACC563BC-4266-43f0-B6ED-9D38C4202C7E}/ComponentID,SZ,IEACCESS,
/Microsoft/Active Setup/Installed Components/{C9E9A340-D1F1-11D0-821E-444553540600}/ComponentID,SZ,Fontcore,
/Microsoft/Active Setup/Installed Components/{CC2A9BA0-3BDD-11D0-821E-444553540000}/ComponentID,SZ,MSTASK,
/Microsoft/Active Setup/Installed Components/{D27CDB6E-AE6D-11cf-96B8-444553540000}/ComponentID,SZ,Flash,
/Microsoft/Active Setup/Installed Components/{de5aed00-a4bf-11d1-9948-00c04f98bbc9}/ComponentID,SZ,HTMLHelp,
/Microsoft/Active Setup/Installed Components/{E92B03AB-B707-11d2-9CBD-0000F87A369E}/ComponentID,SZ,ADSI,

### ProviderName
/Microsoft/Windows/CurrentVersion/Applets/DeluxeCD/Providers/Provider0000/ProviderName,SZ,Tunes.com,
/Microsoft/Windows/CurrentVersion/Applets/DeluxeCD/Providers/Provider0001/ProviderName,SZ,Music Boulevard,


## Dieselbe Datei enthält die IP-Adresse und MAC-Adresse des Computers. Wie lauten 
diese?