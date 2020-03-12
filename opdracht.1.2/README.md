# ObA - Books Based On History

## Table of Contents
* [Assignment](#Assignment)
* [Concept](#Concept)
* [Install notes](#Install-notes)
* [Main features](#Main-features)
* [API](#API)
* [Data transformation](#Data-transformation)

<hr>

## Assignment
In this project I had to create a single page webapp which is helping to create a lecture or paper for children. This webapps content is based on the data from the ObA API.

<hr>

## Concept
`Situation`  
A user is member of the ObA library and has lend a few books to read for fun. On a day he has te make a paper for school and loans a few more books to do some research. When is almost done with his paper he needs some little more information and wants to get a few more books. 

`Solution`  
He goes to his loanhistory and get's a lot of books recommended, also some books he doesn't want to because those results are based on the books he read for fun.

With this feature you can toggle books in your loanhistory and get books based on the books you have turned on.

<img alt="Schermafbeelding 2020-03-05 om 19 10 56" src="https://user-images.githubusercontent.com/45365598/76011559-146f1e80-5f15-11ea-9d48-f589809a3c84.png">

<hr>

## Install notes
Clone the repository on your computer

https://github.com/Choerd/project-1-1920.git

Open the file in a code editor and use a live preview or host the code with Github Pages and run the `index.html`

<hr>

## Main features
* Orientate on subjects to choose for your paper or lecture
* Find books based on your loanhistory and be able to manipulate the results

<hr>

## API
In this webapp the data comes from two sources:
* A Excel document where I took one persons loanhistory
* The ObA API with all the data of every book

`How did I use the API?`  
**Orientating**  
I had six categories. For each category I fetch 20 books to give the user some inspiration about those categories.

**Related books**   
First I fetched all the books from the person based on his loanhistory. At this point I had 4 books. These 4 books all had a genre. I took those and fetched 20 books per genre. 

For every book there is a detailpage where you can find more information or can go to the ObA website.

<hr>

## Data transformation
The data was really good to use, only not really consistent. Some of the books had no genre and the ISBN numbers didn't work for some of the books. The ISBN numbers sometimes had really weird characters in it, which needed to be transformed. This is the only data I needed to clean because I was using this data to fetch the books.
