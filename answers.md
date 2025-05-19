# Github repository
In diesem projekt wurde mit einem github repository gearbetet. Die lokale entwicklungsumgebung Visual studio code macht eine textsuche mit CTRL+SHFIT+F deutlich leichter. 
Dennoch wurden viele linux commands verwendet. 
Die originaldatei der antwortendaten ist die markdown datei './answers.md' welche danach zu einem pdf konvertiert wurde. 
Das github repo ist open-source und befindet sich hier:
https://github.com/jonasfrey/cybersecurity_project


## 1. Wie lautet der Hashwert des Abbilds? Stimmen der Erfassungs- und Verifizierungs-
Hashwert überein? 
```sh
# * SCHARDT.001: From: 0, To: 1389747, Size: 1301248, MD5 Value:
md5sum ./SCHARDT001.sec
# * ...28A9B613D6EEFE8A0515EF0A675BDEBD...
# * SCHARDT.002: From: 1301248, To: 2690995, Size: 1301248, MD5 Value:
md5sum ./SCHARDT002.sec
# * ...C7227E7EEA82D218663257397679A7C4...
# * SCHARDT.003: From: 2602496, To: 3992243, Size: 1301248, MD5 Value:
md5sum ./SCHARDT003.sec
# * ...EBBA35ACD7B8AA85A5A7C13F3DD733D2...
# * SCHARDT.004: From: 3903744, To: 5293491, Size: 1301248, MD5 Value:
md5sum ./SCHARDT004.sec
# * ...669B6636DCB4783FD5509C4710856C59...
# * SCHARDT.005: From: 5204992, To: 6594739, Size: 1301248, MD5 Value:
md5sum ./SCHARDT005.sec
# * ...C46E5760E3821522EE81E675422025BB...
# * SCHARDT.006: From: 6506240, To: 7895987, Size: 1301248, MD5 Value:
md5sum ./SCHARDT006.sec
# * ...99511901DA2DEA772005B5D0D764E750...
# * SCHARDT.007: From: 7807488, To: 9197235, Size: 1301248, MD5 Value:
md5sum ./SCHARDT007.sec
# * ...99511901DA2DEA772005B5D0D764E750...
# * SCHARDT.008: From: 9108736, To: 10498483, Size: 405524, MD5 Value:
md5sum ./SCHARDT008.sec
# * ...8194A79A5356DF79883AE2DC7415929F...

  #output                                          
# 28a9b613d6eefe8a0515ef0a675bdebd  ./SCHARDT001.sec
# c7227e7eea82d218663257397679a7c4  ./SCHARDT002.sec
# ebba35acd7b8aa85a5a7c13f3dd733d2  ./SCHARDT003.sec
# 669b6636dcb4783fd5509c4710856c59  ./SCHARDT004.sec
# c46e5760e3821522ee81e675422025bb  ./SCHARDT005.sec
# 99511901da2dea772005b5d0d764e750  ./SCHARDT006.sec
# 99511901da2dea772005b5d0d764e750  ./SCHARDT007.sec
# 8194a79a5356df79883ae2dc7415929f  ./SCHARDT008.sec
```
file 006 und 007 sind gleich

## 2. Welches Betriebssystem war auf dem Computer installiert? 
`file filename` reveals '...DOS/MBR boot sector MS-MBR XP english at offset 0x12c...'

## 3. Wann wurde das Betriebssystem installiert? 
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

## 4. Welche Zeitzoneneinstellungen waren konfiguriert? 

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
Die eingestellte Zeitzone auf dem OS ist Central Standard Time (CST) mit:

    Bias: 0x00000168 = 360 Dezimal (Minute) = 6 Stunden (UTC-6)

    StandardName: Central Standard Time

    DaylightName: Central Daylight Time

    DaylightBias: 0xFFFFFFC4 = -60 Dezimal (Minute) = -1 Stunde (für Sommerzeit)

    ActiveTimeBias: 0x0000012C = 300 Dezimal (Minute) = 5 Stunden (aktiver Bias während Sommerzeit, also UTC-5)

Zusammenfassung:
Das Betriebssystem ist auf die Central Time Zone (US Central Time) eingestellt, mit Standardzeit UTC-6 und Sommerzeit UTC-5.
## 5. Wer ist als registrierter Besitzer des Systems eingetragen? 

ctrl + f 'RegisteredOwner'
ctrl + shift + l 
'/Microsoft/Windows NT/CurrentVersion/RegisteredOwner,SZ,Greg Schardt,'

## 6. Wie lautet der Name des Benutzerkontos? 
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
## 7. Welcher primäre Domänenname war eingetragen? 
`
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
`
Der primäre Domänenname ist nicht eingetragen.

Begründung:
Alle Schlüssel unter /ControlSet001/Services/Tcpip/Parameters/Domain sowie unter den Terminal Server Domains sind leer (SZ, ohne Wert). Ebenso sind keine anderen Domain-Namen im System hinterlegt.

Ergebnis:
Kein primärer Domänenname ist eingetragen.

## 8. Wann wurde der Computer zuletzt heruntergefahren? 


## 9. Wie viele Benutzerkonten sind insgesamt auf dem System vorhanden? 
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
Es sind insgesamt 6 Benutzerkonten auf dem System vorhanden:

    Administrator

    Guest

    HelpAssistant

    Mr. Evil

    SUPPORT_388945a0

## 10. Welcher Benutzer nutzt den Computer am häufigsten? 
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
## 11. Welcher Benutzer war zuletzt am System angemeldet? 
## welcher benutzer war zuletzt angemeldet?
grep -i 'DefaultUserName' ./hive_decoded/*
./hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_software.sav.txt:/Microsoft/Windows NT/CurrentVersion/Winlogon/DefaultUserName,SZ,,
./hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_software.txt:/Microsoft/Windows NT/CurrentVersion/Winlogon/DefaultUserName,SZ,Mr. Evil,
./hive_decoded/_mnt_SCHARDT_001_008_WINDOWS_system32_config_software.txt:/Microsoft/Windows NT/CurrentVersion/Winlogon/AltDefaultUserName,SZ,Mr. Evil,


## 12. Eine Suche nach dem Namen Greg Schardt führt zu mehreren Treffern. 
Einer davon 
beweist, dass Greg Schardt mit „Mr. Evil“ identisch ist und Administratorrechte auf 
diesem System hatte. 
o Frage: Wie heisst diese Datei und mit welchem Softwareprogramm steht sie 
in Verbindung? 
## 13. Welche Netzwerkkarten wurden in diesem Computer verwendet? 

DriverDesc
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
Die im Computer verwendeten Netzwerkkarten sind:

    Xircom Cardbus Ethernet 100 + Modem 56 (Modem Interface)

    Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface)

    Compaq WL110 Wireless LAN PC Card

    Texas Instruments PCI-1225 CardBus Controller (2 Einträge)

Das sind die eindeutigen Netzwerkkarten aus den DriverDesc-Einträgen.

## 14. Dieselbe Datei enthält die IP-Adresse und MAC-Adresse des Computers.
Wie lauten 
diese? 
/ControlSet002/Services/{6E4090C2-FAEF-489A-8575-505D21FC1049}/Parameters/Tcpip/IPAddress,MULTI_SZ,0.0.0.0,
/ControlSet002/Services/{6E4090C2-FAEF-489A-8575-505D21FC1049}/Parameters/Tcpip/SubnetMask,MULTI_SZ,0.0.0.0,
/ControlSet002/Services/{6E4090C2-FAEF-489A-8575-505D21FC1049}/Parameters/Tcpip/DefaultGateway,MULTI_SZ,,
/ControlSet002/Services/{6E4090C2-FAEF-489A-8575-505D21FC1049}/Parameters/Tcpip/DhcpIPAddress,SZ,192.168.1.111,

also 192.168.1.111 via DHCP

## 15. Mithilfe der MAC-Adresse kann über eine Internetrecherche der Hersteller der 
Netzwerkkarte ermittelt werden. Die ersten drei Hexadezimalstellen der MAC-
Adresse identifizieren den Hersteller. 
o Frage: Welche Netzwerkkarte wurde während der Installation und Einrichtung 
von LOOK@LAN verwendet? 
`
ConfigFile=C:\Program Files\Look@LAN\irunin.dat
LanguageFile=C:\Program Files\Look@LAN\irunin.lng
ImageFile=C:\Program Files\Look@LAN\irunin.bmp
`
/mnt/SCHARDT_001_008/Program Files/Look@LAN/irunin.ini
%LANNIC%=0010a4933e09 -> 00:10:A4:93:3E:09
MAC Address: 00:10:A4:93:3E:09

Manufacturer: Nokia (OUI 0010A4)
    Network Card Used: Likely an older Nokia network interface card (NIC) or embedded adapter.

This matches the installation environment (Windows XP era, based on %ISWINXP%=TRUE in your config).



## 16. Nennen Sie sechs installierte Programme, die möglicherweise für Hacking-Zwecke 
verwendet wurden. 
/mnt/SCHARDT_001_008/Program Files$ ls
 123WASP                 folder.htt            'Online Services'
 Accessories             GlobalSCAPE           'Outlook Express'
 Agent                  'Internet Explorer'    'PLUS!'
 Anonymizer              Look@LAN              'Uninstall Information'
 Cain                    Messenger              Whois
 CHAT                   'microsoft frontpage'  'Windows Media Player'
'Common Files'           mIRC                  'Windows NT'
'ComPlus Applications'  'Movie Maker'           WindowsUpdate
 desktop.ini             MSN                    WinPcap
 DirectX                'MSN Gaming Zone'       xerox
 Ethereal                NetMeeting
'Faber Toys'            'Network Stumbler'
1. Cain

    Typ: Passwort-Cracker / Netzwerk-Sniffer

    Hacking-Relevanz:

        Kann gespeicherte Passwörter (z. B. aus Browsern, WLAN) auslesen.

        Führt ARP-Spoofing (Man-in-the-Middle-Angriffe) durch.

        Brute-Force-Angriffe auf Hashes (LM/NTLM, WPA).

2. WinPcap

    Typ: Paket-Sniffing-Treiber

    Hacking-Relevanz:

        Wird von Wireshark, Nmap, Cain genutzt, um Netzwerkverkehr abzufangen.

        Ermöglicht Passwort-Diebstahl (z. B. unverschlüsselter HTTP-Traffic).

3. Ethereal (heute Wireshark)

    Typ: Netzwerk-Protokoll-Analyzer

    Hacking-Relevanz:

        Sniffing von unverschlüsselten Daten (FTP, Telnet, HTTP).

        Analyse von Angriffsversuchen (z. B. Port-Scans, Exploits).

4. mIRC

    Typ: IRC-Client

    Hacking-Relevanz:

        Wurde oft für Botnet-Kommunikation genutzt (z. B. via IRC-Bots).

        Scripting-Funktionen (mIRC-Skripte) für Automatisierung von Angriffen.

5. Network Stumbler

    Typ: WLAN-Scanner

    Hacking-Relevanz:

        Findet ungesicherte WLANs (War-Driving).

        Zeigt SSIDs, Signalstärke & Verschlüsselungstypen an.

6. Look@LAN

    Typ: Netzwerk-Monitoring-Tool

    Hacking-Relevanz:

        Scannt Hosts, offene Ports & Dienste (Reconnaissance).

        Kann für Schwachstellen-Scans im LAN genutzt werden.
    

## 17. Wie lautet die SMTP-E-Mail-Adresse von „Mr. Evil“? 
`reglookup "/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/NTUSER.DAT" > NTUSER.DAT.txt`


/Software/Microsoft/Internet Account Manager/Accounts/00000001/SMTP Server,SZ,smtp.sbcglobal.net,
/Software/Microsoft/Internet Account Manager/Accounts/00000001/SMTP Display Name,SZ,Mr Evil,
/Software/Microsoft/Internet Account Manager/Accounts/00000001/SMTP Email Address,SZ,whoknowsme@sbcglobal.net,


## 18. Welche NNTP-Einstellungen (Newsserver) sind für Mr. Evil konfiguriert? 

Ergebnis:

Newsserver:

news.dallas.sbcglobal.net

Registry-Pfad:

/Software/Microsoft/Internet Account Manager/Accounts/00000002/
Weitere SMTP-Details:
Schlüssel	Wert
SMTP Server	smtp.sbcglobal.net
SMTP Display Name	Mr Evil
SMTP Email Address	whoknowsme@sbcglobal.net


Weitere NNTP-Einstellungen:
Schlüssel	Wert
NNTP Server	news.dallas.sbcglobal.net
NNTP User Name	whoknowsme@sbcglobal.net
NNTP Password2 (verschl.)	%01%02n%00e%00w%00s...
NNTP Display Name	Mr Evil
NNTP Email Address	whoknowsme@sbcglobal.net
Connection Type	0x00000003 (vermutlich "LAN")


## 19. Welche zwei Programme zeigen diese Informationen? 
Die Informationen über SMTP/NNTP-Konten, Server, Benutzernamen und Passwörter stammen aus der Windows-Registry, genauer gesagt aus dem Hive NTUSER.DAT im Pfad:/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/NTUSER.DAT

## 20. Nennen Sie fünf Newsgroups, in denen Mr. Evil angemeldet ist. 


email verkehr kann auch hier gefunden werden 
`sudo apt install undbx`
`sudo undbx "/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express"`

Fünf Newsgroups:

    alt.2600.cardz

    alt.2600.crackz

    alt.2600.hackerz

    free.binaries.hacking.computers

    alt.binaries.hacking.utilities

Diese Gruppennamen stammen direkt aus den .dbx-Dateinamen. Outlook Express speichert für jede abonnierte Newsgroup eine separate .dbx-Datei. Die Namen vor .dbx entsprechen dabei exakt den Namen der Newsgroups.

## 21. Ein beliebtes IRC-Programm namens mIRC war installiert. 
o Frage: Welche Benutzereinstellungen wurden angezeigt, als der Nutzer online 
war und einen Chatraum betreten hatte? 
in der datei : `/mnt/SCHARDT_001_008/Program Files/mIRC/mirc.ini`
Die relevanten Benutzereinstellungen, die Mr. Evil beim Betreten eines Chatraums angezeigt wurden, sind:

    user: Mini Me

    email: none@of.ya

    nick: Mr

    anick (Alternativnick): mrevilrulez

    host: Undernet: US, CA, LosAngelesSERVER:losangeles.ca.us.undernet.org:6660GROUP:Undernet

Diese Werte geben seinen sichtbaren Nickname, Alternativnick, Benutzername, E-Mail und den Server/Host an.

## 22. Dieses IRC-Programm kann Chat-Sitzungen aufzeichnen. 
o Frage: Nennen Sie drei IRC-Channels, die der Nutzer betreten hat. 
`/mnt/SCHARDT_001_008/Program Files/mIRC/logs$ ls -latrh
total 26K
drwxrwxrwx 1 root root 4.0K Aug 20  2004  .
-rwxrwxrwx 2 root root  148 Aug 20  2004 '#ISO-WAREZ.EFnet.log'
-rwxrwxrwx 2 root root  335 Aug 20  2004 '#evilfork.EFnet.log'
-rwxrwxrwx 2 root root  589 Aug 20  2004 '#LuxShell.UnderNet.log'
-rwxrwxrwx 2 root root 1.3K Aug 20  2004 '#mp3xserv.UnderNet.log'
-rwxrwxrwx 2 root root  284 Aug 20  2004 '#ushells.UnderNet.log'
-rwxrwxrwx 2 root root  464 Aug 20  2004 '#Elite.Hackers.UnderNet.log'
-rwxrwxrwx 2 root root  265 Aug 20  2004 '#houston.UnderNet.log'
-rwxrwxrwx 2 root root  688 Aug 20  2004 '#Chataholics.UnderNet.log'
-rwxrwxrwx 2 root root  285 Aug 20  2004  m5tar.UnderNet.log
-rwxrwxrwx 2 root root 9.2K Aug 20  2004 '#CyberCafe.UnderNet.log'
-rwxrwxrwx 2 root root  578 Aug 20  2004 '#thedarktower.AfterNET.log'
-rwxrwxrwx 2 root root  263 Aug 20  2004 '#funny.UnderNet.log'
drwxrwxrwx 1 root root 4.0K Aug 25  2004  ..
`

Drei IRC-Channels, die der Nutzer betreten hat, sind:

    #ISO-WAREZ.EFnet

    #evilfork.EFnet

    #LuxShell.UnderNet

Diese kannst du anhand der Log-Dateien im Ordner logs/ erkennen.

## 23. Das Programm Ethereal (ein bekanntes Sniffing-Tool zum Abfangen von 
Netzwerkpaketen) war ebenfalls installiert. 
o Die gesammelten TCP-Pakete werden standardmässig im Ordner „Eigene 
Dateien“ gespeichert. 
o Frage: Wie heisst die Datei, die abgefangene Daten enthält? 
`
(base) jf18j492@aitne:/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Application Data/Ethereal$ cat recent 
# Recent settings file for Ethereal 0.10.6.
#
# This file is regenerated each time Ethereal is quit.
# So be careful, if you want to make manual changes here.

######## Recent capture files (latest last) ########

`recent.capture_file: C:\Documents and Settings\Mr. Evil\interception`

######## Recent display filters (latest last) ########
...
`
Die Datei recent aus dem Ethereal-Ordner zeigt:

Die abgefangene Datei heißt:
`C:\Documents and Settings\Mr. Evil\interception`

Das ist der Speicherort der Capture-Datei mit den aufgezeichneten Netzwerkpaketen.

## 24. Durch die Ansicht dieser Datei im Textformat lässt sich viel über die betroffene 
Person erkennen. 
o Frage: Welchen Typ von drahtlosem Computer benutzte die betroffene 
Person? 
Die Details zeigen, dass die betroffene Person ein mobiles Gerät mit Windows CE (Pocket PC) Version 4.20 verwendet hat, das auf einem Intel PXA255 CPU basiert.

Das ist ein klassisches PDA-/Handheld-Gerät mit Farbdisplay (240x320 Pixel) und Internet Explorer 4.01 kompatiblen Browser.

Antwort auf Frage 24:
Der Typ des drahtlosen Computers ist ein Pocket PC (Windows CE-basiert), also ein PDA (Personal Digital Assistant).

## 25. Welche Webseiten rief die betroffene Person auf? 
strings interception | less > interception_strings.txt
grep -o -E "https?://[][[:alnum:]._~:/?#@interception_strings.txt&'()*+,;%=-]+" interception_strings.txt > urls.txt

awk '!seen[$0]++' urls.txt > urls_unique.txt
`http://mobile.msn.com/hm/folder.aspx?ts=1093601294&fts=1093566459&folder=ACTIVE&msg=0
http://mobile.msn.com/hm/folder.aspx?ts=1093601294&amp;fts=1093566459&amp;folder=ACTIVE&amp;msg=0'
http://login.passport.com/logout.srf?lc=1033&id=961&ru=http%3a%2f%2fmobile.msn.com%2fscripts%2flogoutgif.asp%3fru%3d%2f&tw=14400&kv=5&ct=1093620995&ems=1&ver=2.5.1016.0&tpf=b8ccd6c1f528c699542236fcee0d1593
http://www.passportimages.com/1033/signout.gif
http://go.msn.com/ad/4/
http://go.msn.com/ac/6/
http://192.168.254.254:80/upnp/service/descrip.xml
http://login.passport.com/logout.srf?lc=1033&id=961&ru=http%3a%2f%2fmobile.msn.com%2fscripts%2flogoutgif.asp%3fru%3d%2f&tw=14400&kv=5&ct=1093621004&ems=1&ver=2.5.1016.0&tpf=76adf7b34c2cc6ca027fcfce760dc182
http://mobile.msn.com/hm/composeppc.aspx
http://mobile.msn.com/hm/docompose.aspx?__redir=1&rru=folder.aspx&time=632292178755527999
http://mobile.msn.com/hm/docompose.aspx?__redir=1&amp;rru=folder.aspx&amp;time=632292178755527999'
http://login.passport.com/logout.srf?lc=1033&id=961&ru=http%3a%2f%2fmobile.msn.com%2fscripts%2flogoutgif.asp%3fru%3d%2f&tw=14400&kv=5&ct=1093621076&ems=1&ver=2.5.1016.0&tpf=9b89da28be314acd249279639d83d955
http://login.passport.com/logout.srf?lc=1033&id=961&ru=http%3a%2f%2fmobile.msn.com%2fscripts%2flogoutgif.asp%3fru%3d%2f&tw=14400&kv=5&ct=1093621085&ems=1&ver=2.5.1016.0&tpf=e5d150bc02380575db2ca2981ca00dea
http://login.passport.net/uilogout.srf?lc=1033&id=961&ru=http%3a%2f%2fmobile.msn.com%2fscripts%2flogoutgif.asp%3fru%3d%2f&tw=14400&kv=5&ct=1093621085&ems=1&ver=2.5.1016.0&tpf=e5d150bc02380575db2ca2981ca00dea
http://www.passportimages.com/1033/PassportLogoTrans.gif
http://mobile.msn.com
http://mobile.msn.com/scripts/cobrandcss.asp?PP_PAGE=ppLogout&lid=1033
http://www.passportimages.com/1033/signout_bad.gif
http://www.passportimages.com/1033/signout_good.gif
http://login.passport.net/uilogout.srf?lc=1033&id=961&ru=http%3a%2f%2fmobile.msn.com%2fscripts%2flogoutgif.asp%3fru%3d%2f&tw=14400&kv=5&ct=1093621085&ems=1&ver=2.5.1016.0&tpf=e5d150bc02380575db2ca2981ca00dea&ec=1&vis=
http://mobile.msn.com/images/ppcobrandimage.gif
http://mobile.msn.com?lc=1033
http://mobile.msn.com/scripts/cobrand.asp?PP_PAGE=ppLogout&lid=1033
http://www.passport.net/default.asp?lc=1033&id=961
http://www.passportimages.com/1033/dotnetlogoBIG.gif
http://mobile.msn.com/scripts/logoutgif.asp?ct=1093621215
http://help.msn.com/en_us/frameset.asp?INI=ppv2.ini&H_APP=Microsoft%20Passport&Topic=SISOToSignOut.htm&H_VER=1.5&v3=1033
http://memberservices.passport.net/memberservice.srf?ru=http%3a%2f%2fmobile.msn.com%2fscripts%2flogoutgif.asp%3fru%3d%2f&tw=14400&kv=5&ct=1093621085&ems=1&ver=2.5.1016.0&tpf=e5d150bc02380575db2ca2981ca00dea&lc=1033&id=961
http://www.passport.net/consumer/termsofuse.asp?lc=1033&id=961
http://www.passport.net/consumer/privacypolicy.asp?lc=1033&id=961
http://sc.msn.com/global/scr/lg/hdr35.js'
http://sc.msn.com/global/c/sf/sfg_mb.gif);border-bottom:1px
http://go.msn.com/AC/1/'
http://sc.msn.com/global/c/lg/TESE_118x35.gif'
http://mobile.msn.com'
http://sc.msn.com/global/c/sf/sf_mb.jpg'
http://mobile.msn.com/content/images/img_PassportBackground.gif'
http://www.rsac.org/ratingsv01.html
http://www.passport.com
http://www.passportimages.com/1033/PassportLogo140x44.gif
http://www.passport.com/memberservices.asp
http://mobile.msn.com/pocketpc/default.aspx?msppchlg=1&mspplogin=http://login.passport.com/login.srf%3Flc%3D1033%26id%3D961%26ru%3Dhttp%253a%252f%252fmobile.msn.com%252fpocketpc%252fdefault.aspx%26tw%3D14400%26kv%3D5%26ct%3D1093621223%26ns%3Dhotmail.com%26ver%3D2.5.1016.0%26tpf%3D45ab41b989db44e211b719cbf6dc7b97
http://www.passportimages.com/1033/signin.gif
http://windowsmedia.com/mobile
http://usmoneymobile.msn.com
http://pocket.espn.go.com/
http://mobile.msn.com/`

## 26. Suchen Sie die webbasierte E-Mail-Adresse des Hauptnutzers. Wie lautet diese? 

`
/mnt/SCHARDT_001_008/Documents and Settings/Mr. Evil/Local Settings/History/History.IE5$ tree . 
`

`   
├── desktop.ini
├── index.dat
├── MSHist012004081620040823
│   └── index.dat
├── MSHist012004082520040826
│   └── index.dat
├── MSHist012004082620040827
│   └── index.dat
└── MSHist012004082720040828
    └── index.dat
`
4 directories, 6 fil
`sudo apt install pasco`
`
TYPE	URL	MODIFIED TIME	ACCESS TIME	FILENAME	DIRECTORY	HTTP HEADERS
URL	Visited: Mr. Evil@http://www.2600.com/hacked_pages/2000/01/thomas.loc.gov	08/20/2004 17:32:12	08/20/2004 17:32:12			 
URL	Visited: Mr. Evil@http://us.f613.mail.yahoo.com/ym/login?.rand=7lrrdoi00fl1k&.first=1	08/20/2004 17:38:23	08/20/2004 17:38:23			 
URL	Visited: Mr. Evil@mk:@MSITStore:C:\WINDOWS\help\msoe.chm::/cool_mail.htm08/20/2004 23:15:02	08/20/2004 23:15:02			 
URL	Visited: Mr. Evil@http://www.microsoft.com/windows/ie/getosver/javaxp.asp	08/25/2004 18:13:01	08/25/2004 18:13:01			 
URL	Visited: Mr. Evil@http://www.cnn.com/cnn_adspaces/adsPopup2.html?0	08/20/2004 21:05:23	08/20/2004 21:05:23			 
URL	Visited: Mr. Evil@http://www.wardriving.com/setup.php	08/27/2004 17:09:27	08/27/2004 17:09:27			 
URL	Visited: Mr. Evil@http://winpcap.mirror.ethereal.com/301a/download.htm	08/27/2004 17:11:33	08/27/2004 17:11:33			 
URL	Visited: Mr. Evil@http://www.yahoo.com/_ylh=X3oDMTB1M2EzYWFoBF9TAzI3MTYxNDkEdGVzdAMwBHRtcGwDaWUtYmV0YQ--/s/208739	08/25/2004 17:26:02	08/25/2004 17:26:02			 
URL	Visited: Mr. Evil@http://www.mosnews.com/interview/2004/08/24/arbatov.shtml	08/25/2004 17:52:59	08/25/2004 17:52:59			 
URL	Visited: Mr. Evil@http://www.maktoob.com	08/27/2004 17:43:19	08/27/2004 17:43:19			 
URL	Visited: Mr. Evil@http://www.t50.com/extra.html	08/20/2004 17:49:01	08/20/2004 17:49:01			 
URL	Visited: Mr. Evil@http://search.msn.com/results.aspx?FORM=MSNH&q=download%20rencode%20buddy	08/20/2004 23:27:44	08/20/2004 23:27:44		 
URL	Visited: Mr. Evil@ftp://ftp.volftp.mondadori.com/pub/pc/windows/win98/progs/network/tcpip/lalsetup250.exe	08/25/2004 17:51:24	08/25/2004 17:51:24			 
URL	Visited: Mr. Evil@file:///C:/Program%20Files/mIRC/channels/channels.txt08/20/2004 17:50:40	08/20/2004 17:50:40			 
URL	Visited: Mr. Evil@http://www.ethereal.com/distribution/win32/ethereal-setup-0.10.6.exe	08/27/2004 17:11:49	08/27/2004 17:11:49			 
URL	Visited: Mr. Evil@http://winpcap.mirror.ethereal.com/install/bin/WinPcap_3_01_a.exe	08/27/2004 17:14:20	08/27/2004 17:14:20			 
URL	Visited: Mr. Evil@http://www.majorgeeks.com	08/25/2004 17:27:45	08/25/2004 17:27:45			 
URL	Visited: Mr. Evil@file:///D:/Drivers/Anonyymizer/keys.txt	08/20/2004 17:04:51	08/20/2004 17:04:51			 
URL	Visited: Mr. Evil@file:///D:/Drivers/GhostWare/Receipt.rtf	08/20/2004 17:09:16	08/20/2004 17:09:16			 
URL	Visited: Mr. Evil@http://www.microsoft.com/isapi/redir.dll?prd=ie&pver=6&ar=msnhome	08/27/2004 17:42:47	08/27/2004 17:42:47			 
URL	Visited: Mr. Evil@http://edit.yahoo.com/config/eval_register?.v=&.intl=&new=1&.done=&.src=ym&.partner=&.p=&promo=&.last=	08/20/2004 17:34:27	08/20/2004 17:34:27			 
URL	Visited: Mr. Evil@http://www.google.com/search?hl=en&ie=UTF-8&q=who+am+i08/25/2004 18:07:32	08/25/2004 18:07:32			 
URL	Visited: Mr. Evil@http://www.mosnews.com/news/2004/08/24/internetend.shtml	08/25/2004 17:51:39	08/25/2004 17:51:39			 
URL	Visited: Mr. Evil@http://www.mosnews.com/commentary/2004/08/25/revolution.shtml	08/25/2004 17:54:07	08/25/2004 17:54:07			 
URL	Visited: Mr. Evil@http://www.msn.com	08/27/2004 17:42:54	08/27/2004 17:42:54			 
URL	Visited: Mr. Evil@http://us.f613.mail.yahoo.com/ym/ShowLetter?MsgId=6284_1110_22_443_55_0_1_-1_0&Idx=0&YY=60138&.first=1&inc=25&order=down&sort=date&pos=0&view=&head=&box=Inbox	08/20/2004 17:38:31	08/20/2004 17:38:31	 
URL	Visited: Mr. Evil@http://www.cnn.com	08/20/2004 21:05:25	08/20/2004 21:05:25			 
URL	Visited: Mr. Evil@http://us.f613.mail.yahoo.com/ym/ShowFolder?YY=78169&.first=1&box=Inbox&YN=1	08/20/2004 17:38:27	08/20/2004 17:38:27		 
URL	Visited: Mr. Evil@about:Home	08/20/2004 01:04:24	08/20/2004 01:04:24			 
URL	Visited: Mr. Evil@http://www.outpimp.com/?x=400928	08/20/2004 23:21:55	08/20/2004 23:21:55			 
URL	Visited: Mr. Evil@http://edit.yahoo.com/config/id_check	08/20/2004 17:35:47	08/20/2004 17:35:47			 
URL	Visited: Mr. Evil@http://www.magnescan.com/pricelist.asp	08/20/2004 23:27:53	08/20/2004 23:27:53			 
URL	Visited: Mr. Evil@http://www.drudgereport.com	08/25/2004 17:51:20	08/25/2004 17:51:20			 
URL	Visited: Mr. Evil@http://www.t50.com	08/20/2004 17:49:01	08/20/2004 17:49:01			 
URL	Visited: Mr. Evil@ftp://mirror.sg.depaul.edu/pub/security	08/27/2004 17:17:15	08/27/2004 17:17:15			 
URL	Visited: Mr. Evil@http://search.msn.com/results.aspx?FORM=MSNH&q=hacking08/20/2004 17:33:11	08/20/2004 17:33:11			 
URL	Visited: Mr. Evil@http://www.netstumbler.com/downloads	08/27/2004 17:10:00	08/27/2004 17:10:00			 
URL	Visited: Mr. Evil@http://winpcap.mirror.ethereal.com	08/27/2004 17:11:13	08/27/2004 17:11:13			 
URL	Visited: Mr. Evil@http://www.cleo-and-nacho.com/mainpages/hacking.htm	08/20/2004 17:33:35	08/20/2004 17:33:35			 
URL	Visited: Mr. Evil@about:blank	08/25/2004 17:51:02	08/25/2004 17:51:02			 
URL	Visited: Mr. Evil@ftp://mirror.sg.depaul.edu/pub/security/ethereal/win32/ethereal-setup-0.10.6.exe	08/27/2004 17:24:24	08/27/2004 17:24:24	 
URL	Visited: Mr. Evil@file://4.12.220.254/Temp/yng13.bmp	08/26/2004 17:08:12	08/26/2004 17:08:12			 
URL	Visited: Mr. Evil@http://www.majorgeeks.com/download3365.html	08/25/2004 17:49:42	08/25/2004 17:49:42			 
URL	Visited: Mr. Evil@http://www.netstumbler.com	08/27/2004 17:09:54	08/27/2004 17:09:54			 
URL	Visited: Mr. Evil@http://www.majorgeeks.com/downloadget.php?id=3365&file=1&evp=243ad7f7dbd42ca50abe8bf849b4423b	08/25/2004 17:50:14	08/25/2004 17:50:14			 
URL	Visited: Mr. Evil@http://www.google.com/search?q=what+is+my+ip&hl=en&lr=&ie=UTF-8	08/25/2004 18:07:51	08/25/2004 18:07:51			 
URL	Visited: Mr. Evil@http://www.ethereal.com/distribution/win32	08/27/2004 17:11:38	08/27/2004 17:11:38			 
URL	Visited: Mr. Evil@http://ads1.revenue.net/load/206178/benchmark.html?O_R_NUM=62579600&O_RANK=1&O_CREATIVE_ID=206178&O_SITE_ID=10162&	08/20/2004 23:21:57	08/20/2004 23:21:57			 
URL	Visited: Mr. Evil@http://home.microsoft.com	08/27/2004 17:42:46	08/27/2004 17:42:46			 
URL	Visited: Mr. Evil@http://www.2600.com/hacked_pages/2000/01/thomas.loc.gov/www.boza.com	08/20/2004 17:32:46	08/20/2004 17:32:46			 
URL	Visited: Mr. Evil@http://www.2600.org/hacked_pages/2000/01/thomas.loc.gov	08/20/2004 17:32:05	08/20/2004 17:32:05			 
URL	Visited: Mr. Evil@res://C:\WINDOWS\System32\shdoclc.dll/dnserror.htm	08/27/2004 17:32:40	08/27/2004 17:32:40			 
URL	Visited: Mr. Evil@http://edit.yahoo.com/config/register?	08/20/2004 17:38:01	08/20/2004 17:38:01			 
URL	Visited: Mr. Evil@http://us.f613.mail.yahoo.com/ym/Logout?YY=27630&.first=1&inc=25&order=down&sort=date&pos=0&view=&head=&box=Inbox&YY=27630	08/20/2004 17:38:45	08/20/2004 17:38:45			 
URL	Visited: Mr. Evil@http://story.news.yahoo.com/news?tmpl=story&cid=564&ncid=564&e=1&u=/nm/20040825/ts_nm/iraq_usa_beheading_dc	08/25/2004 17:26:09	08/25/2004 17:26:09			 
URL	Visited: Mr. Evil@http://www.google.com	08/25/2004 18:07:26	08/25/2004 18:07:26			 
URL	Visited: Mr. Evil@http://www.wardriving.com	08/27/2004 17:09:23	08/27/2004 17:09:23			 
URL	Visited: Mr. Evil@http://us.f613.mail.yahoo.com/ym/ShowLetter?Search=&Idx=0&YY=90802&.first=1&order=down&sort=date&pos=0	08/20/2004 17:38:34	08/20/2004 17:38:34			 
URL	Visited: Mr. Evil@http://www.yahoo.com/_ylh=X3oDMTB1M2EzYWFoBF9TAzI3MTYxNDkEdGVzdAMwBHRtcGwDaWUtYmV0YQ--/r/m7	08/20/2004 17:34:16	08/20/2004 17:34:16			 
URL	Visited: Mr. Evil@http://www.t50.com/cgi-bin/topvlog.cgi?897731691	08/20/2004 17:46:37	08/20/2004 17:46:37			 
URL	Visited: Mr. Evil@http://www.yahoo.com	08/25/2004 17:25:45	08/25/2004 17:25:45			 
URL	Visited: Mr. Evil@http://fosi.ural.net	08/25/2004 18:13:10	08/25/2004 18:13:10			 
URL	Visited: Mr. Evil@http://www.2600.org	08/20/2004 17:31:31	08/20/2004 17:31:31			 
URL	Visited: Mr. Evil@http://edit.yahoo.com/config/last_subscribe	08/20/2004 17:38:11	08/20/2004 17:38:11			 
URL	Visited: Mr. Evil@res://C:\WINDOWS\System32\shdoclc.dll/navcancl.htm	08/27/2004 17:10:20	08/27/2004 17:10:20			 
URL	Visited: Mr. Evil@http://www.majorgeeks.com/download.php?id=2&sort=25	08/25/2004 17:49:28	08/25/2004 17:49:28			 
URL	Visited: Mr. Evil@http://www.elitehackers.com	08/20/2004 17:46:03	08/20/2004 17:46:03			 
URL	Visited: Mr. Evil@file:///C:/Program%20Files/Anonymizer/thanks/index.html	08/20/2004 17:05:16	08/20/2004 17:05:16			 
URL	Visited: Mr. Evil@http://edit.yahoo.com/config/last?.scrumb=XNQeEEeu7HG&.crumb=XNQeEEeu7HG&.src=ym&.done=&.partner=&.branch=&.testid=none	08/20/2004 17:38:07	08/20/2004 17:38:07			 
URL	Visited: Mr. Evil@http://www.majorgeeks.com/downloads2.html	08/25/2004 17:29:30	08/25/2004 17:29:30			 
URL	Visited: Mr. Evil@http://www.wardriving.com/code.php	08/27/2004 17:09:30	08/27/2004 17:09:30			 
URL	Visited: Mr. Evil@http://www.netstumbler.com/downloads/netstumblerinstaller_0_4_0.exe	08/27/2004 17:11:07	08/27/2004 17:11:07			 
URL	Visited: Mr. Evil@mk:@MSITStore:C:\Program%20Files\Network%20Stumbler\netstumbler.chm::/readme.html	08/27/2004 17:12:19	08/27/2004 17:12:19	 
URL	Visited: Mr. Evil@http://www.ethereal.com/download.html	08/27/2004 17:17:05	08/27/2004 17:17:05			 
URL	Visited: Mr. Evil@ftp://mirror.sg.depaul.edu/pub/security/ethereal/win3208/27/2004 17:17:44	08/27/2004 17:17:44			 
URL	Visited: Mr. Evil@http://a.tribalfusion.com/p.media/GLNTEKHKEKLCJLBMNWPJLCXQQSNWFOVVGKOTHPSQKSRKANKKMQKMOFLEKUOSLNUKTDQKDLKGKY/171576/pop.html	08/25/2004 17:51:22	08/25/2004 17:51:22			 
URL	Visited: Mr. Evil@mk:@MSITStore:C:\WINDOWS\help\msoe.chm::/nwspr_changing_servers.htm	08/20/2004 23:15:11	08/20/2004 23:15:11			 
URL	Visited: Mr. Evil@http://www.whatismyip.com	08/25/2004 18:08:02	08/25/2004 18:08:02			 
URL	Visited: Mr. Evil@http://www.ethereal.com	08/27/2004 17:10:50	08/27/2004 17:10:50			 
URL	Visited: Mr. Evil@http://billing.mail.yahoo.com/bm/MailReg?.v=8	08/20/2004 17:34:19	08/20/2004 17:34:19			 
URL	Visited: Mr. Evil@http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000&.u=b568cfp0ic6g0	08/20/2004 17:35:05	08/20/2004 17:35:05			 
URL	Visited: Mr. Evil@ftp://mirror.sg.depaul.edu/pub/security/ethereal	08/27/2004 17:17:20	08/27/2004 17:17:20			 
URL	Visited: Mr. Evil@http://www.2600.org/hacked_pages	08/20/2004 17:31:54	08/20/2004 17:31:54			 
URL	Visited: Mr. Evil@http://www.maktoob.com/index.pl?mm=10844	08/27/2004 17:44:31	08/27/2004 17:44:31

## 27. Das E-Mail-Programm Yahoo Mail speichert E-Mails unter welchem Dateinamen? 
Yahoo Mail selbst speichert keine E-Mails unter einem bestimmten Dateinamen, da es webbasiert ist. Wenn E-Mails lokal gespeichert sind, dann hängt der Dateiname vom verwendeten E-Mail-Client ab.
Falls doch mail daten auf dem computer gespeichert sind sind es wohl cookies oder local Storage daten vom browser. 

## 28. Wie viele ausführbare Dateien (.exe) befinden sich im Papierkorb? 
ls  /mnt/SCHARDT_001_008/RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/
Dc1.exe  Dc2.exe  Dc3.exe  Dc4.exe  desktop.ini  INFO2
4 .exe dateien
## 29. Sind diese Dateien tatsächlich gelöscht? 
Ja, diese Dateien wurden gelöscht, sind aber noch nicht endgültig entfernt.
Erklärung:

Windows verschiebt gelöschte Dateien in den Papierkorb, statt sie sofort vom Dateisystem zu löschen. Dabei passiert Folgendes:

    Die Datei wird nach RECYCLER/<SID>/ (hier: S-1-5-21-...-1003) verschoben.

    Sie erhält einen neuen Namen (z. B. Dc1.exe).

    Die Datei INFO2 enthält Metadaten, z. B. den ursprünglichen Pfad und Löschzeitpunkt.

Fazit:

Die .exe-Dateien im RECYCLER-Verzeichnis:

    sind als gelöscht markiert,

    könnten vom Benutzer wiederhergestellt werden,

    sind noch physisch vorhanden (also nicht endgültig gelöscht).

## 30. Wie viele Dateien sind laut Dateisystem als gelöscht markiert? 
➡️ Es sind 4 Dateien als gelöscht markiert (Dc1.exe bis Dc4.exe).

## 31. Führen Sie eine Antivirenprüfung durch: 
o Frage: Wurden Viren auf dem Computer gefunden?
`sudo apt update`
`sudo apt install clamav`
`sudo freshclam `
`clamscan -r --infected --remove=no /mnt/SCHARDT_001_008/ > infected_files.txt`

/mnt/SCHARDT_001_008/My Documents/COMMANDS/enum.exe: Win.Tool.EnumPlus-1 FOUND
/mnt/SCHARDT_001_008/My Documents/COMMANDS/SAMDUMP.EXE: Win.Trojan.Pwdump-2 FOUND
/mnt/SCHARDT_001_008/My Documents/COMMANDS/snitch.exe: Win.Trojan.Snitch-1 FOUND
/mnt/SCHARDT_001_008/My Documents/ENUMERATION/NT/enum/enum.tar.gz: Win.Tool.EnumPlus-1 FOUND
/mnt/SCHARDT_001_008/My Documents/ENUMERATION/NT/enum/files/enum.exe: Win.Tool.EnumPlus-1 FOUND
/mnt/SCHARDT_001_008/My Documents/ENUMERATION/NT/Legion/Chrono.dl_: Win.Trojan.Bruteforce-3 FOUND
/mnt/SCHARDT_001_008/My Documents/ENUMERATION/NT/Legion/NetTools.ex_: Win.Trojan.Spion-4 FOUND
/mnt/SCHARDT_001_008/My Documents/ENUMERATION/NT/ntreskit.zip: Win.Trojan.Nemo-1 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/Brutus/BrutusA2.exe: Win.Tool.Brutus-3 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/brutus.zip: Win.Tool.Brutus-3 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe: Win.Exploit.WinNT-3 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe: Win.Trojan.Lsadump-1 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/lsadump2/lsadump2.zip: Win.Trojan.Lsadump-1 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/netbus/NetBus170.zip: Win.Trojan.Netbus-2 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE: Win.Trojan.Sehole-1 FOUND
/mnt/SCHARDT_001_008/My Documents/EXPLOITATION/NT/sechole/sechole3.zip: Win.Trojan.Sehole-1 FOUND
/mnt/SCHARDT_001_008/My Documents/FOOTPRINTING/NT/superscan/superscan.exe: Win.Trojan.Agent-6240252-0 FOUND
/mnt/SCHARDT_001_008/Program Files/Cain/Abel.dll: Win.Trojan.Cain-9 FOUND
