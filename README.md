# mongo-scrape
This app demonstrate the ability to scrape a website of choice, store it in a database and displaying it in front end html.

link to heroku: https://dark-ghost-32545.herokuapp.com/

The page layout is rather simple with just 2 buttons: scrape, and saved list.

Clicking on the scrape button will prompt the app to scrape echo.js for possible title and link data and save them into the database with mongoose. This object data is also assigned a key value pair of **isSaved boolean default false** to determine the state of the object. Each article object is also associated with the note collections for adding note to each unique article.

The home page only display article that have not been saved by the user. This is accomplished by using handlebars **unless** operator to render out only article that have a **boolean false** for *isSaved*. Likewise on the saved article page. All article that have **boolean false** for *isSaved* is rendered here. 

The state of *isSaved* can be changed by clicking on the **save** button. This button make a post to the controller and used *db.Article.update()* helper from mongoose to change *isSaved* from false to true.

On the saved page. The user also have the option to delete or add note to an article. Clicking on the note button will toggle modal for existing note and a add new note button. 

