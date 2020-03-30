# Browser Technologies @cmda-minor-web 1920

## Inhoudsopgave
* [Introductie](#Introductie)
* [Wireflow](#"Wireflow")
* [Code](#Code)
* [Install notes](#Install-notes)
* [Credits](#Credits)

<hr>

## Introductie

**Case**  
`"Ik wil mij toe kunnen voegen aan het Online Vriendenboek met verschillende antwoordmogelijkheden. Als ik het formulier niet in een keer af kan krijgen wil ik later weer verder gaan waar ik was gebleven."`

**Hoe werkt dit in mijn applicatie**  
Wanneer de gebruiker de applicatie opent krijgt hij/zij de keuze om opnieuw te beginnen of om verder te gaan waar hij/zij is gebleven. Dit kan aan de hand van een unieke user ID die je krijgt bij het toevoegen van jezelf. Deze user ID en de antwoorden die de gebruiker invult worden naar een json geschreven waar deze worden opgeslagen. Wanneer de gebruiker later weer terugkomt en zijn user ID invult wordt er in de json gekeken welke antwoorden er nog ontbreken, de gebruiker wordt dan naar de pagina gestuurd waar het eerst ontbrekende antwoord voorkomt.

**Core-functionality/Functional Layer | Code snippets**
<details><summary>Als de gebruiker terug wilt gaan naar een bestaand formulier</summary>

Als de gebruiker is begonnen aan het formulier en besluit te stoppen om later verder te gaan kan de gebruiker zijn user ID later gebruiken om verder gaan. Deze functie kijkt of de user ID bestaat, zoja gaat hij naar de goede page. Zo niet dan wordt de gebruiker naar de pagina gestuurt waar hij een nieuwe code krijgt.

```javascript
function check(input, res) {
    getUser(input) 
    ? renderNewRoute(input, res) 
    : res.redirect('/generate-user-code')
}
```

</details>

<details><summary>Toevoegen van data uit het formulier in de json</summary>

In deze functie wordt eerst json uitgelezen en vervolgens opgezocht welke user het formulier aan het invullen is aan de hand van de user ID. Vervolgens wordt de data hieraan toegevoegd en weer terug geschreven naar de json.

```javascript
function addDataToArray(data, name, route, res) {
    const json = readFromJson()
    const user = json.find(user => user.id === data.userid)
    const index = json.map((o) => o.id).indexOf(user.id)

    json[index][`${name}`] = data

    writeToJson(json)
}
```

</details>

<!-- hier -->

**Usable Layer | Code snippets**
<details><summary>De twee opties op het startscherm</summary>

De positie van de twee buttons wordt bepaald aan de hand van het supporten van flex of niet. Wanneer dit wel gesupport wordt worden de opties naast en uit elkaar gezet. Wanneer het scherm kleiner wordt worden deze opties onder elkaar gezet met `flex-direction: column;`.

Wanneer dit niet gesupport wordt worden de opties onder elkaar gezet met `display: block`. 

```css
[start-options] a {
    display: block;
    margin: auto;
    max-width: 320px;
}

@supports (display: flex) {
    [start-options] {
        display: flex;
        margin: 0;
        justify-content: space-around;
    }

    @media screen and (max-width: 800px) {
        [start-options] {
            flex-direction: column;
        }
    }
}
```

</details>

<details><summary>Padding op de twee opties op het startscherm</summary>

De padding op de buttons hangt ervan af of de browser `vw` en `vh` ondersteunt. Als de browser dit wel ondersteunt wordt deze gebruikt, ondersteunt de browser dit niet gaat het over naar `%`.

```css
[start-options] a {
    padding: 5% 3%;
}

@media screen and (max-width: 800px) {
    [start-options] a {
        padding: 70px 3%;
    }
}

@supports (padding: 1vw 1vh) {
    [start-options] a {
        padding: 6vh 3vw;
    }
}
```

</details>

**Pleasurable Layer | Code snippets**
<details><summary>Form validation door middel van Javascript</summary>


```javascript

```

</details>

<hr>

## "Wireflow"
**Homescreen**  
Hier geef ik de optie aan de gebruiker om te beginnen vanaf het begin of verder te kunnen gaan waar hij/zij was gebleven.

<details><summary>Afbeelding - Home</summary>
	
<img src="https://user-images.githubusercontent.com/45365598/76962044-bf70d680-691e-11ea-9d10-6c9d998f9d81.png">

</details>

<hr>

**Persoonlijke code**  
Aan de hand van gegenereerde code kan de gebruiker wanneer hij opnieuw op de site komt doorgaan met het invullen van de gegevens of naar de eindpagina.

<details><summary>Afbeelding - Persoonlijke code | Genereren </summary>

<img src="https://user-images.githubusercontent.com/45365598/76962116-e62f0d00-691e-11ea-832e-b5721857cfa4.png">

</details>

<details><summary>Afbeelding - Persoonlijke code | Invullen</summary>

<img src="https://user-images.githubusercontent.com/45365598/76962117-e6c7a380-691e-11ea-8c4c-3ffee811419a.png">

</details>

<hr>

**De enquete/vriendenboek**  
Door middel van verschillende pagina's/routes leid ik de gebruiker door het formulier heen. Dit gebeurt door middel van het opdelen in categorieën.

<details><summary>Afbeelding - Over jou</summary>

<img src="https://user-images.githubusercontent.com/45365598/76962074-d57e9700-691e-11ea-9f47-d28107187cf2.png">

</details>

<details><summary>Afbeelding - Persoonlijk</summary>

<img src="https://user-images.githubusercontent.com/45365598/76962114-e4fde000-691e-11ea-95d2-d68e1e48da61.png">

</details>

<details><summary>Afbeelding - Eetgewoonten</summary>

<img src="https://user-images.githubusercontent.com/45365598/76962121-e7603a00-691e-11ea-8a03-f86d94642cf2.png">

</details>

<details><summary>Afbeelding - Geld</summary>

<img src="https://user-images.githubusercontent.com/45365598/76962105-e16a5900-691e-11ea-9105-79b9364bb6cc.png">

</details>

<hr>

## Code
`Hier komen voorbeelden van gelezen artikelen en hoe ik dit op mijn code heb toegepast`

<hr>

## Install notes
1. Clone de repo van Github
2. `https://github.com/Choerd/browser-technologies-1920.git`
3. Installeer of zorg ervoor dat je `nodejs` en `npm` geinstalleerd hebt.
4. Installeer alle node modules met `npm install`
5. Gebruik de applicatie met `npm start`
6. Open een browser en ga naar `http://localhost:4000/`

<hr>

## Credits
`None...`