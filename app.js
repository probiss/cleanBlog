const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/post-dev')

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 5000;

app.get('/', async(req, res) => {
  const posts = await Post.find({})
  res.render('posts',{
    posts
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/posts', async(req, res) => {
  await Post.create(req.body);
  res.redirect('/');  
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})