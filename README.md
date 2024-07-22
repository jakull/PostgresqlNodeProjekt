# Demoprojekt

## Beschreibung
Diese Projekt soll einen kurzen Überblick über gelernte Kommunikation zwischen Frontend und Backend aufzeigen.
Dabei kann ein Datensatz "angestellte" aus einer Postgres-datenbank gelesen und im Frontend dargestellt werden.
Weiterhin beinhaltet dieses Projekt einen Konverter, der WebVTT über ein drag&drop-Menü einlesen, ins .srt-Format konvertiern und anschließend als Download bereitstellen kann.

## Installation
Klone das Projekt in dein gewünschtes Verzeichnis und instaliere die erfordelichen Abhängigkeiten mit ``` npm install```. Anschließend müssen im file databaseORM.ts die erforderlichen Variablen zur initialisierung der Postgres-Datenbank gesetzt werden. Dieses file findet sich unter src/config/databaseORM.ts. Damit können Werte aus einer tabelle "angestellte" gelesen werden. Das Schema dieser tabelle ist unter src/entity/Angestellte.ts definiert und beinhaltet die Spalten id/name/dampft/email.
Anschließend kann das Express-Backend mit ```npm start``` gestartet werden und die Swagger-Dokumentation unter http://localhost:3000/docs aufgerufen werden.

Um das Frontend zu starten navigiere in den ordner angular 2 mit ```cd angular2``` und instaliere hier erneut die dependencies mit ``` npm install```.
Nun kann das angular Frontend mittels ```npm start``` gestartet werden und unter ```http://localhost:4200/``` im Browser geöffnet werden.

