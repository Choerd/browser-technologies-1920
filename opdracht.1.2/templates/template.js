export const overviewPersonBook = `
<h1>Jouw boeken</h1>
<p>Zet de boeken uit die je niet in je aangeraden boeken wilt zien</p>
<section class="yourBooks">
{{#.}}

{{#genres}}<article recommend="on" genre={{genres}}>{{/genres}}
{{^genres}}<article>{{/genres}}

{{#genres}}<p>Genre: {{genres}}</p>{{/genres}}
{{^genres}}<p>Genre: Onbekend</p>{{/genres}}
    <a>
        <div>
            <div class="front">
                <img src={{coverimages.1}}>
            </div>

            <div class="back">
                <h1>{{titles.0}}</h1>

                {{#summaries.0}}<p>{{summaries.0}}</p>{{/summaries.0}}
                {{^summaries.0}}<p>Geen samenvatting beschikbaar</p>{{/summaries.0}}
            </div>
            </div>
    </a>
</article>
{{/.}}
</section>
`

export const overviewGenreBook = `
<h1>Aangeraden boeken</h1>
<p>Boeken die mogelijk interessant zijn op basis van jouw leeshistorie</p>
<section class="sampleBooks">
{{#.}}
    <article genre={{genres}}>
    <a href="#{{isbn}}">
        <div>
            <div class="front">
                <img src={{coverimages.1}}>
            </div>

            <div class="back">
                <h1>{{titles.0}}</h1>

                {{#summaries.0}}<p>{{summaries.0}}</p>{{/summaries.0}}
                {{^summaries.0}}<p>Geen samenvatting beschikbaar</p>{{/summaries.0}}
            </div>
        </div>
    </a>
</article>
{{/.}}
</section>
`

export const detailBook = `
{{#.}}
<article class="book-detailpage">
    <img src={{coverimages.1}}>
    
    <div>
    <h3>{{titles.0}}</h3>
        {{#summaries.0}}<p>{{summaries.0}}</p>{{/summaries.0}}
        {{^summaries.0}}<p>Geen samenvatting beschikbaar</p>{{/summaries.0}}
        <p>ISBN: {{isbn}}</p>
        <p>Talen: {{languages}}</p>
        <p>Gepubliceerd door: {{publisher}}</p>
        <p>Voor meer informatie klik 
            <a href="{{detailLink}}">hier</a>
        </p>
    </div>
</article>
{{/.}}
`

export const home = `
<div class="home-options">
    <a href="#orienteren">Oriënteren voor een werkstuk/spreekbeurt</a>
    <a href="#gerelateerd_boeken">Zoeken naar gerelateerde boeken</a>
</div>
`

export const genres = `
<section class="orient-genre">
{{#.}}
    <a href="#genre/{{genre}}">
        <article>
            <p>{{genre}}</p>
        </article>
    </a>
{{/.}}
</section>
`

export const genresDetails = `
<section class="sampleBooks">
{{#.}}
    <article>
    <a href="#{{isbn}}">
        <div>
            <div class="front">
                <img src={{coverimages.1}}>
            </div>

            <div class="back">
                <h1>{{titles.0}}</h1>

                {{#summaries.0}}<p>{{summaries.0}}</p>{{/summaries.0}}
                {{^summaries.0}}<p>Geen samenvatting beschikbaar</p>{{/summaries.0}}
            </div>
        </div>
    </a>
</article>
{{/.}}
</section>
`