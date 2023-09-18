const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
const PostController = require('./controllers/postController');
const PageController = require('./controllers/pageController');
const app = express(); 

mongoose.connect('mongodb://127.0.0.1:27017/post-dev')

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {methods:['POST','GET']}));

app.get('/', PostController.getAllPosts);
app.get('/posts/:id', PostController.getPost);
app.post('/posts', PostController.createPost);
app.put('/posts/:id', PostController.updatePost);
app.delete('/posts/:id', PostController.deletePost);
app.get('/about', PageController.getAboutPage);
app.get('/add', PageController.getAddPage);
app.get('/posts/edit/:id', PageController.getEditPage);

app.get('/about', PageController.getAboutPage);

app.get('/add', PageController.getAddPage);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})