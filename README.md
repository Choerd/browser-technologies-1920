# Browser Technologies @cmda-minor-web 1920

## Inhoudsopgave
* [Introductie](#Introductie)
* [Progressive Enhancement/Layers](#Progressive-Enhancement/Layers)
* [Feature Detection](#Feature-Detection)
* [Browser Testing](#Browser-Testing)
* [8-Features Testing](#8-Features-Testing)
* [Wireframes](#Wireframes)
* [Install notes](#Install-notes)
<!-- * [Credits](#Credits) -->

<hr>

## Introductie

**Case**  
`"Ik wil mij toe kunnen voegen aan het Online Vriendenboek met verschillende antwoordmogelijkheden. Als ik het formulier niet in een keer af kan krijgen wil ik later weer verder gaan waar ik was gebleven."`

**Hoe werkt dit in mijn applicatie**  
Wanneer de gebruiker de applicatie opent krijgt hij/zij de keuze om opnieuw te beginnen of om verder te gaan waar hij/zij is gebleven. Dit kan aan de hand van een unieke user ID die je krijgt bij het toevoegen van jezelf. Deze user ID en de antwoorden die de gebruiker invult worden naar een json geschreven waar deze worden opgeslagen. Wanneer de gebruiker later weer terugkomt en zijn user ID invult wordt er in de json gekeken welke antwoorden er nog ontbreken, de gebruiker wordt dan naar de pagina gestuurd waar het eerst ontbrekende antwoord voorkomt.

<hr>

## Progressive Enhancement/Layers

**Core-functionality/Functional Layer | Code snippets**  
Deze code is allemaal afkomstig uit mijn `server.js`. Dit zorgt voor een goede structuur in de HTML en zorgt ervoor dat de gebruiker interactie kan hebben met het formulier en dat de data wordt opgeslagen in het json bestand.

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

<hr>

**Usable Layer | Code snippets**  
Deze laag zie ik meer als de laag om de gebruikerservaring te verbeteren. Dit heb ik eigelijk voornamelijk gedaan door middel van CSS. Hierdoor krijgt de gebruiker een beter overzicht van de pagina en spreken de elementen voor zich. Bijvoorbeeld door de 'volgende'-knop aan de rechterkant te plaatsen en de 'vorige'-knop aan de linkerkant.
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

<hr>

**Pleasurable Layer | Code snippets**  
De laatste laag, de pleasurable laag, zie ik meer als een extra toevoeging voor de gebruiker. Hier heb ik voor de gebruiker een validatie gemaakt van het formulier. Dit gebeurt wanneer hij van de ene naar de andere input gaat. 

<details><summary>Form validation door middel van JavaScript</summary>

Hieronder heb ik een voorbeeld van de code die wordt gebruikt voor het valideren van de `input type='text'`. Door middel van `Regular Expressions` controlleer ik de string op blur en geeft ik de gebruiker feedback basis van zijn input door middel van een bericht en een icoontje in het inputveld.

`JavaScript`
```javascript
function checkTextInput(input) {
  if (input.value.match(/^[A-Za-z]+$/)) {
    niceFeedback(input)
  } else if (input.value.match(/\d+/g)) {
    badFeedback(input, 'Whoops! Je hebt hier getallen ingevult, het moet tekst zijn.')
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.')
  }
}

// All different types of feedback to the user
function niceFeedback(input) {
  const label = input.parentElement
  label.classList.add('correct')
}

function badFeedback(input, message) {
  const label = input.parentElement

  label.classList.add('wrong')
  label.setAttribute('data-message', message)
}

function emptyFeedback(input, message) {
  const label = input.parentElement

  label.classList.add('wrong')
  label.setAttribute('data-message', message)
}
```

<br>

`CSS`
```css
.survey form .correct input, .survey form .wrong input {
    background-size: 13px 13px;
    background-repeat: no-repeat;
    background-position: center right 8px;
    margin-bottom: 12px;
}

.survey form .correct:after, .survey form .wrong:after {
    content: attr(data-message);
    display: block;
    margin-bottom: 12px;
    font-size: 14px;
}

.survey form .correct input {
    background-image: url('../images/correct.png');
}

.survey form .wrong input {
    background-image: url('../images/wrong.png');
}
```

</details>

<hr>

## Feature Detection

**Detection**  
In mijn client-side JavaScript wordt mijn formulier gevalideerd. Voor deze code doe ik feature detection op de volgende manier:

```javascript
function documentChecker() {
  const features = ['querySelectorAll', 'addEventListener']
  const checker = (feature) =>
    feature in document && typeof document.body[feature] === 'function'

  return features.every(checker)
}

function documentBodyChecker() {
  const features = ['setAttribute']
  const checker = (feature) =>
    feature in document.body && typeof document.body[feature] === 'function'

  return features.every(checker)
}

function documentObjectChecker() {
  const features = ['classList', 'parentElement']
  const checker = (feature) =>
    feature in document.documentElement && typeof document.body[feature] === 'object'

  return features.every(checker)
}
```

Wanneer een van deze functies geen `true` teruggeeft ondersteunt de browser het niet en is er geen form validatie door middel van JavaScript. De fallback is hiervoor de validatie wanneer de gebruiker op 'Submit' drukt en de normale validatie het overneemt.

<br>

**Fallback**  
Omdat sommige browsers geen `addEventListener` ondersteunen heb ik hiervoor een fallback geschreven op de volgende manier:

```js
// feature-fallback.js
function addEventListener() {
    if ('addEventListener' in document && typeof document.body.addEventListener === 'function') {
        return true
    } else {
        return false
    }
}

// index.js
inputs.forEach(input => {
  if (addEventListener()) {
    input.addEventListener('blur', () => {
      if (input.type === 'text' && !input.pattern.includes('[0-9]')) {
        checkTextInput(input)
      }
        ...
    })
  } else {
    input.attachEvent('onblur', () => {
      if (input.type === 'text' && !input.pattern.includes('[0-9]')) {
        checkTextInput(input)
      }
        ...
    })
  }
})
``` 

<hr>

## Browser Testing

`Chrome`  
**Waar ik achter kwam tijdens het testen**    
IK gebruik Chrome als mijn browser om op te developen, hier heb ik dus in de beginfase vooral alleen maar op getest. Hierdoor kan ik nergens foutjes vinden omdat wanneer ik deze tegen kwam ik ze er meteen heb uitgehaald.
<details><summary>GIF van de interactie</summary>

![Chrome-_online-video-cutter com_](https://user-images.githubusercontent.com/45365598/78007078-11adf080-733e-11ea-81b1-b325c44776a9.gif)

</details>

<hr>

`Firefox`  
**Waar ik achter kwam tijdens het testen**  
Firefox heeft hele mooie kleuren, ze zijn veel feller dan in andere browsers. Op Firefox werkt de `font-size: max(..vw, ..px)` niet. Dit zou je ook op andere manieren op kunnen lossen. Verder werkt alles prima. 
<details><summary>GIF van de interactie</summary>

![Firefox-_online-video-cutter com_](https://user-images.githubusercontent.com/45365598/78007070-107cc380-733e-11ea-8b5e-0667f0c9a3d0.gif)

</details>

<hr>

`Safari`  
**Waar ik achter kwam tijdens het testen**  
Op Safari werkt vanaf het begin heb tabben niet. Je kunt alleen maar door de 'chrome' tabben. Dit moet je zelf handmatig aanzetten in de developer-tools. 
<details><summary>GIF van de interactie</summary>

![Safari-_online-video-cutter com_](https://user-images.githubusercontent.com/45365598/78007054-0bb80f80-733e-11ea-8b96-76ed5364a56d.gif)

</details>

<hr>

`Internet Explorer`  
**Waar ik achter kwam tijdens het testen**  
Tijdens het testen op IE kwam ik erachter dat dit geen fijne browser is om voor te programmeren. Alle semantische HTML zoals `<main>` en `<section>` etc wordt niet ondersteund omdat ze geen HTML5 ondersteunen. Hierdoor heb ik mijn HTML meerdere malen moeten herschrijven wat niet fijn was.

<details><summary>GIF van de interactie</summary>

![Internet-Explorer-_online-video-cutter com_](https://user-images.githubusercontent.com/45365598/78007041-06f35b80-733e-11ea-86ab-477bfd25584a.gif)

</details>

<hr>

`Microsoft Edge`  
**Waar ik achter kwam tijdens het testen**  
Ik had verwacht dat Microsoft Edge net zo zou zijn als IE maar dat bleek dus niet zo te zijn. Op Microsoft Edge deed mijn app het meteen goed vanaf de eerste test, zij ondersteunden dus meer dingen dan verwacht.
<details><summary>GIF van de interactie</summary>

![Microsoft-Edge-_online-video-cutter com_](https://user-images.githubusercontent.com/45365598/78007066-0eb30000-733e-11ea-9a8f-e39de40602a6.gif)

</details>

<hr>

## 8-Features Testing

`Afbeeldingen uitzetten`  
Aan het einde van het inputveld zou normaal gesproken een vinkje of een kruisje komen wanneer het goed of fout is. Nu de afbeeldingen uitstaan krijg je deze niet te zien, maar je krijgt wel nogsteeds een foutmelding als je iets verkeerds invult.

<details><summary>Afbeelding</summary>

<img src="https://user-images.githubusercontent.com/45365598/78009878-f6dd7b00-7341-11ea-8f75-bc559ff097c6.png">

</details>

<hr>

`Custom fonts uitzetten`  
Voor mijn webapplicatie gebruik ik geen custom fonts. Heel veel 'basic' fonts vind ik zelf al mooi genoeg en een custom font vind ik vaak niet heel veel specialer of mooier.

<hr>

`Kleur uitzetten en kleurenblindheid instellen`  
Om dit te kunnen meten heb ik een website gebruikt die contrast voor mij weergeeft. Ik heb de kleur van de tekst vergeleken met de kleur van de achtergrond aangezien dat het belangrijkst is, tekst moet altijd te lezen zijn natuurlijk!

<details><summary>Afbeelding</summary>

<img src="https://user-images.githubusercontent.com/45365598/78011224-96e7d400-7343-11ea-8e14-6bc0a594cee8.png">

</details>

<hr>

`Muis/trackpad werkt niet`  
Een zeer belangrijk punt om op te letten, hier heb ik tot nu toe eigelijk nooit echt rekening mee gehouden. Vooral een simpele `:focus` aan je styling toevoegen doet al een hele hoop!

<details><summary>GIF hoe ik door mijn formulier tab</summary>

![Schermopname-2020-03-31-om-11 41 44-_online-video-cutter com_](https://user-images.githubusercontent.com/45365598/78012437-3ce80e00-7345-11ea-8aad-dadb3ca72a68.gif)


</details>

<hr>

`Breedband internet uitzetten`  
Wanneer ik mijn network op `Slow 3G` zet werkt mijn website nog precies hetzelfde, het is alleen iets langzamer.

<hr>

`Javascript uitzetten`
Aangezien de core functionaliteit van mijn webapplicatie wordt gedaan via de server kan de applicatie gewoon gebruikt worden zonder Javascript. Alleen de validatie van het formulier wordt niet gedaan. De validatie die een formulier normaal heeft wanneer je op submit drukt is daarom ook de fallback hiervoor. 

<hr>

`Cookies niet accepteren`  
In deze webapplicatie worden geen cookies gebruikt.

<hr>

`LocalStorage uitzetten`  
In deze webapplicatie wordt geen LocalStorage gebruikt.


<hr>

## Wireframes
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

## Install notes
1. Clone de repo van Github
2. `https://github.com/Choerd/browser-technologies-1920.git`
3. Installeer of zorg ervoor dat je `nodejs` en `npm` geinstalleerd hebt.
4. Installeer alle node modules met `npm install`
5. Gebruik de applicatie met `npm start`
6. Open een browser en ga naar `http://localhost:4000/`

<!-- <hr>

## Credits
`None...` -->