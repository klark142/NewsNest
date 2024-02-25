const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('886f7e0e71aa4aa096e50488649ba232')
const app = express();
const port = process.env.PORT || 3000;
const Article = require("./models/Article");

app.use(express.urlencoded({ extended: true }));

// setting view engine to ejs
app.set('view engine', 'ejs');

// define views directory
app.set('views', __dirname + '/views');

// connect to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/news');

const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', itemSchema);

// ROUTES

// NewsAPI

// main page
app.get('/', async (req, res) => {
    // getting 6 most popular news
    const newsResponse = await newsapi.v2.topHeadlines({
        country: 'us',
        pageSize: 6
    });
    const articles = newsResponse.articles;
    formatAtrticlesDate(articles);

    // const articles = getNMostPopularArticles(6, countryString)
    res.render('index', {title: 'NewsNest', articles: articles});
});

// adding article by a user
app.post('/add-news/add', async (req, res) => {
    const { title, description, urlToImage } = req.body;
    const newArticle = new Article({ title, description, urlToImage });
    await newArticle.save();
    res.redirect('/contributed');
});


app.get('/contributed', async (req, res) => {
    const articles = await Article.find();
    res.render('newsContributed', { title: 'News contributed by the community', articles: articles });
});

app.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    const newsResponse = await newsapi.v2.everything({
        q: searchQuery,
        language: 'en'
    });
    const articles = newsResponse.articles
    formatAtrticlesDate(articles);
    res.render('news', {title: `Results for ${searchQuery}`, articles: articles})
});

app.get('/add-news', (req, res) => {
    res.render('addNews');
});

// category specific news
app.get('/category/:cat', async (req, res) => {
    const category = req.params.cat;
    const newsResponse = await newsapi.v2.topHeadlines({
        category: category,
        country: 'us'
    })
    const articles = newsResponse.articles;
    formatAtrticlesDate(articles)

    res.render('newsCategory', {category: category, articles: articles});
});

// adding news by the user
app.get('/articles')

function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if necessary
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if necessary, month is 0-indexed
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

function formatAtrticlesDate(articles) {
    for (const article of articles) {
        article.publishedAt = formatDate(article.publishedAt);
    }
}



// get n most popular news
async function getNMostPopularArticles(n, countryString) {
    const newsResponse = await newsapi.v2.topHeadlines({
        country: countryString,
        pageSize: n
    });

    return newsResponse.articles;
}












// const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = ('0' + (date.getMonth() + 1)).slice(-2);
//     const day = ('0' + date.getDate()).slice(-2);
//     return `${year}-${month}-${day}`;
// }

// const getFromToDate = (n) => {
//     const today = new Date();
//     const nDaysAgo = new Date(today);
//     nDaysAgo.setDate(today.getDate() - n);
//     const fromDate = formatDate(nDaysAgo);
//     const toDate = formatDate(today);

//     return fromDate, toDate;
// }


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
