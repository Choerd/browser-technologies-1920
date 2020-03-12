# ObA - Books Based On History

## Three different devices
**Device: Huawai Ascemd Y300**  
You are using `Android Browser` on a `Huawai Ascemd Y300` running `Android 4.1.1`

`Mozilla/5.0 (Linux; U; Android 4.1.1; nl-nl; HUAWEI Y300-0100 Build/HuaweiY300-0100) AppleWebKit/534.30 (KHTML, like Gechko) Version/4.0 Mobile Safari/534.30`

**Device: Apple iPod Touch**  
You are using `Safari` on a `Apple iPod Touch` running `iOS 5.0.1`

`Mozilla/5.0 (iPod; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3`

**Device: Windows RT 8.1**  
You are using `Internet Explorer 11.0` on a `Windows RT 8.1`

`Mozilla/5.0 (Windows NT 6.3; ARM; Trident/7.0; Touch; .NET4.0E; NET4.0C; Tablet PC 2.0; rv:11.0) like Gecko`

<hr>

## Three different browsers 


**Geteste features:**
* Afbeeldingen uitzetten
* Muis/Trackpad werkt niet
* Breedband internet uitzetten
* Kleur uitzetten & kleurenblindheid instellen

**Browsers**
<details><summary>Lijst</summary>

**Browser: Chrome**  
You are using `Chrome 80` on `macOS Catalina 10.15`  

`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36`

**Browser: Safari**  
You are using `Safari 13.0.5` on `macOS Catalina 10.15`

`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15`

**Browser: Firefox**  
You are using `Firefox 74.0` on `macOS Catalina 10.15`

`Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:74.0) Gecko/20100101 Firefox/74.0`

</details>

<hr>

### Afbeeldingen uitzetten
**Chrome**  
`Wat doet de browser`:
Verbergt de afbeeldingen volgens mij door opacity: 0 te gebruiken. Ik kan namelijk wel de achtergrond kleur zien en de image 'bestaat' wel nogsteeds. Wanneer ik over de kaart hover draait hij ook nog om en is de content wel nog goed te zien.

**Safari**  
`Wat doet de browser`:
Verbergt de afbeeldingen en laat ook niet zien dat er eigenlijk een afbeelding zou horen te staan. Wel laat hij de achterkant van de kaart zien die ik heb gemaakt.

**Firefox**  
`Wat doet de browser`:
De afbeeldingen zijn onzichtbaar maar er wordt wel aangegeven dat er een afbeelding hoort te staan door middel van een icoon.

`De oplossing voor alle browsers`:
In dit geval zou ik ervoor zorgen dat de kaart niet meer omdraait maar gewoon de titel en beschrijving laat zien. Dit zou hij eigenlijk alleen maar horen te doen wanneer de gebruiker over de kaart heen gaat met de muis.

<hr>

### Muis/Trackpad werkt niet

**Chrome**  
> gebruik `tab` om te navigeren 

`Wat doet de browser`:
De browser gaat door de content heen maar er vindt geen interactie plaats omdat al mijn events alleen geburen op hover.

**Safari**  
> gebruik `option + tab` om te navigeren 

`Wat doet de browser`:
De browser gaat door de content heen maar er vindt geen interactie plaats omdat al mijn events alleen geburen op hover.

**Firefox**  
> niet mogelijk om door de content te 'tabben'

`Wat doet de browser`:
Niks

`De oplossing voor alle browsers`:
Een gemakkelijke fix is om dezelfde css toe te voegen voor zowel de hover als voor de focus state. Dit heb ik niet gedaan en zou de interactie gelijk een stuk verbeteren.

<hr>

### Breedband internet uitzetten

**Chrome**  
`Wat doet de browser`:
De website is redelijk snel omdat de data wordt hergebruikt en dus maar 1 keer hoeft worden ingeladen. De images zijn het voornaamste probleem. Deze nemen wel de gewenste ruimte vooraf in. Maar geven geen feedback dat er een image komt terwijl deze wel wordt geladen.

**Safari**  
`Niet te testen zonder extra programma`


**Firefox**  
`Wat doet de browser`:
De website is wederom snel wanneer de data is ingeladen, deze wordt namelijk hergebruikt. Ook de interactie met het toggelen werkt goed. Ook hier worden de afbeeldingen past later ingeladen maar zorgen niet voor het verspringen omdat de afbeeldingen een vaste grootte hebben. 

`De oplossing voor alle browsers`:
Ervoor zorgen dat het duidelijk is dat er nog content gaat komen. Door bijvoorbeeld de afbeeldingen een achtergrond kleur te geven. Hierdoor kun je zien dat er nog wel iets gaat komen en springt er niet ineens een afbeelding tevoorschijn. Een skeleton UI zou hier goed bij passen.

<hr>

### Kleur uitzetten & kleurenblindheid instellen
`Website test op basic van contrasten`
Mijn voornaamst voorkomende kleuren zijn `wit op zwart` en `wit op rood`. Dit zijn de kleuren van de ObA en heb ze om deze reden gekozen. Uit de test bleek dat het contrast tussen rood en wit te klein was om een voldoende te halen. Natuurlijk was het contrast van wit op zwart wél voldoende.

> https://color.a11y.com/Contrast/

`De oplossing voor alle browsers`:
Om mijn website te verbeteren zou ik kunnen overstappen van `wit op rood` naar `zwart op rood`. De tool gaf aan dat ik op deze manier wel een voldoende zou halen. Ikzelf vind het minder goed leesbaar maar een persoon met kleurenblindheid zal dit waarschijnlijk wel fijner vinden.

<hr>



