const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    urlToImage: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;