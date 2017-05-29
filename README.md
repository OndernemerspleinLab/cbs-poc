# CBS Proof-Of-Concept

Experiment met CBS Open Data en ReactJS grafieken.

Dit zijn de bevindingen specifiek voor dit proof-of-concept. 


## Prototype

[Prototype Horeca; omzetontwikkeling](https://ondernemerspleinlab.github.io/cbs-poc/)


## Documentatie API

- [CBS Opendata uitleg](https://www.cbs.nl/nl-nl/onze-diensten/open-data/databank-cbs-statline-als-open-data)
- [OData standaard v3](http://www.odata.org/documentation/odata-version-3-0/)
- [CBS API docs (pdf)](https://www.cbs.nl/-/media/_pdf/2017/13/handleiding-cbs-open-data-services.pdf?la=nl-nl)


## Opendata API catalogus

### Index catalogus

http://opendata.cbs.nl/ODataCatalog/?$format=json


### Overzicht tabellen

http://opendata.cbs.nl/ODataCatalog/Tables?$format=json&$select=Identifier,ShortTitle


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
- Range x-as, bijvoorbeeld vanaf `januari 2016` tot en met `maart 2016`.
- Type van `Perioden` bijvoorbeeld `JJ` is per jaar en `KW` is per kwartaal.
- Welke waarde voor y-as, bijvoorbeeld `Waarde_1`.
- In het geval van eeh grafiek met meerdere lijnen: een groepering van waardes op y-as, bijvoorbeeld `BedrijfstakkenBranches`.
- Type grafiek, bijvoorbeeld `staafdiagram`.

## Plan workflow voor redacteur

1. De redacteur zoekt een dataset via https://opendata.cbs.nl/#/CBS/nl/
2. De redacteur kopieert de URL, bijvoorbeeld https://opendata.cbs.nl/#/CBS/nl/dataset/82439NED/line?graphtype=Line en plakt deze in de editor
3. De editing tool haalt de dataset ID uit de url en haalt de benodigde gegevens op.
4. De x-as is altijd de Periode.
5. De redacteur Kiest het type periode, bijvoorbeeld _per kwartaal_ of _per jaar_. Daarvan worden de meeste recente getoond. "De recentste `10` beschikbare `Kwartalen`".
6. De redacteur kan een va de topics kiezen om op de y-as te tonen, bijvoorbeeld `Waarde`, `Prijs` of `Volume`.
7. De editing tool leest labels van datasets in van het CBS. De redacteur kan deze labels overschrijven.
8. De redacteur voegt eventueel nog een beschrijving bij de grafiek toe.
9. De grafiek zal in de eerste versie altijd als lijngrafiek weergegeven worden.
