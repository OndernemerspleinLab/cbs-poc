# CBS Proof-Of-Concept

Experiment met CBS Open Data en ReactJS grafieken.

Dit zijn de bevindingen specifiek voor dit proof-of-concept. 


## Documentatie API

- [CBS Opendata uitleg](https://www.cbs.nl/nl-nl/onze-diensten/open-data/databank-cbs-statline-als-open-data)
- [OData standaard v3](http://www.odata.org/documentation/odata-version-3-0/)
- [CBS API docs (pdf)](https://www.cbs.nl/-/media/_pdf/2017/13/handleiding-cbs-open-data-services.pdf?la=nl-nl)


## Opendata API catalogus

### Index catalogus

http://opendata.cbs.nl/ODataCatalog/?$format=json


### Overzicht tabellen

http://opendata.cbs.nl/ODataCatalog/Tables?$format=json


## Opendata API

Voor *Horeca; omzetontwikkeling, index 2010 = 100* met id `82439NED`.


### Overicht tabel:

https://opendata.cbs.nl/ODataApi/odata/82439NED


### Titel, beschrijving etc:

https://opendata.cbs.nl/ODataApi/odata/82439NED/TableInfos

- Title
- ShortTitle
- Summary
- Period
- ShortDescription
- Description

### Presentatie informatie

https://opendata.cbs.nl/ODataApi/odata/82439NED/TableInfos

- DefaultPresentation
- DefaultSelection
- GraphTypes


### Beschrijving van velden

http://opendata.cbs.nl/ODataApi/odata/82439NED/DataProperties

- Key
- Type
- Title
- Description
- Unit
- Decimals

Als het `Type` `Dimension` of `TimeDimension` is dan hoort het op de x-as. `Dimension` kan ook gebruikt worden om resultaten te groeperen in meerdere lijnen.

Als het `Type` `Topic` is dan hoort het op de y-as. `Type` kan ook `TopicGroup` zijn.



### Dataset

https://opendata.cbs.nl/ODataApi/odata/82439NED/TypedDataSet


### Ander voorbeeld dataset

http://opendata.cbs.nl/ODataApi/odata/81266ned/


## Perioden

[CBS API docs (pdf), pagina 16](https://www.cbs.nl/-/media/_pdf/2017/13/handleiding-cbs-open-data-services.pdf?la=nl-nl)

CBS heeft een eigen format om periodes aan te geven.

In [src/cbsPeriod.js](src/cbsPeriod.js) is een Javascript parser voor een deel van de periodetypes.

Een periode bestaat uit 8 tekens:

- Eerste 4 tekens: jaar
- Volgende 2 tekens: indicator type periode, kan ook informatie bevatten over de periode
- Laatste 2 tekens: informatie over periode

Bijvoorbeeld `2017KW04` is “Vierde kwartaal 2017”.


## Benodigde informatie voor grafiek

- ID van datatabel, bijvoorbeeld `82439NED`.
- Dimensie x-as, bijvoorbeeld `Perioden`.
- Welke waarde voor y-as, bijvoorbeeld `Waarde_1`.
- In het geval van eeh grafiek met meerdere lijnen: een groepering van waardes op y-as, bijvoorbeeld `BedrijfstakkenBranches`.

