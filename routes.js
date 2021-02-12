const express = require('express');
const UsersController = require('./controllers/UsersController');
const PostsController = require('./controllers/PostsController');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({message : 'Hello World!'});
})

routes.get('/user', UsersController.findAllUsers);
routes.get('/user/:id', UsersController.findUserById);
routes.delete('/user/:id', UsersController.deleteUserById);
routes.post('/users', UsersController.createUser);
routes.post('/login', UsersController.login);

// routes.get('/post/search', PostsController.findAllPosts);
routes.get('/post/:id', PostsController.findPostById);
routes.get('/post', PostsController.findPostByTitle);

routes.delete('/post/:id', PostsController.deletePostById);
routes.post('/post/:userId', PostsController.createPost);
routes.put('/post/:id', PostsController.updatePost);

module.exports = routes;