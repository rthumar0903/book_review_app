// All the instruction for the book-review-application.

-> first of all setup project in your local with git clone url.
-> now we have two folders in our local 1. book-review-api(backend)
                                        2. book-review-web(frontend)
----------- backend --------------------------
-> first goto backend cd book-review-api and run npm i.
-> create mongodb cluster on https://www.mongodb.com/atlas/database with your account.
    1) in app.js there is one uri in that change that uri with connection string. also set your username and password in connection string.
    2) now you have all the setup for backend. for run app use command npm start(used nodemon).

--------- frontend -------------------

-> go to frontend cd book-review-web and run npm i.
-> run the application npm start.

-> fetaures : 
list of books
details of book
sorting by author,book,book name
submit reviews
view all reviews for book.
validation of review form.

    
