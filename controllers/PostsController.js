const Posts = require('../models/Posts');
const GenericController = require('../controllers/GenericController');
const { Op } = require('sequelize');
const moment = require("moment");
const dateTime = moment();

module.exports = {
    async findAllPosts(req, res) {
        try {
            const posts = await Posts.findAll({
                include: {
                    association: 'user'
                }
            });
            return res.status(200).json(posts);
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async findPostById(req, res) {
        try {
            console.log('findPostById');
            const _id = req.params.id;
            const post = await Posts.findAll({
                where: {
                    id: _id
                },
                include: {
                    association: 'user'
                }
            });
            if (Object.keys(post).length == 0) {
                return res.status(400).json({message : 'Post não existe'});
            }
            else {
                return res.status(200).json(post);
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async findPostByFilter(req, res) {
        //http://localhost:3000/post/?title=Titulo
        try {
            console.log(req.query);
            const _title = req.query.title;
            const _content = req.query.content;
    
            let where = {};
            if (_title) {
                where ['title'] = {
                    [Op.like]: '%' + _title + '%'
                };
            }
            if (_content) {
                where ['content'] = {
                    [Op.like]: '%' + _content + '%'
                };
            }
    
            const post = await Posts.findAll({
                where,
                include: {
                    association: 'user'
                }
            });
    
            if (Object.keys(post).length == 0) {
                return res.status(200).json({});
            }
            else {
                return res.status(200).json(post);
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async deletePostById(req, res) {
        try {
            const _id = req.params.id;
            const post = await GenericController.findById(Posts, _id);
            if (Object.keys(post).length == 0) {
                return res.status(400).json({message : 'Post não existe'});
            }
            else {
                await GenericController.deleteById(Posts, _id);
                return res.status(204).json({message : 'Post deletado'});
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async createPost(req, res) {
        try {
            const _userId = req.params.userId;
            const {title, content} = req.body;
            var _published = dateTime.format();
            var success = 1;
    
            if (title == null) {
                success = 0;
                return res.status(400).json({message : 'title is required.'});
            }
    
            if (content == null) {
                success = 0;
                return res.status(400).json({message : 'content is required.'});
            }
    
            if (success) {
                const post = await Posts.create({title, content, userId: _userId, published: _published});
                return res.status(201).json({token : 'post created'});
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async updatePost(req, res) {
        try {
            const _id = req.params.id;
            const _userId = req.params.userId;
            const {title, content} = req.body;
            var _updated = dateTime.format();
            var success = 1;
    
            if (title == null) {
                success = 0;
                return res.status(400).json({message : 'title is required.'});
            }
    
            if (content == null) {
                success = 0;
                return res.status(400).json({message : 'content is required.'});
            }
    
            const postUser = await Posts.findAll({
                where: {
                    id: _id
                },
                include: {
                    association: 'user',
                    where: {
                        id: _userId
                    }
                }
            });
            
            if (Object.keys(postUser).length == 0) {
                success = 0;
                return res.status(401).json({message : 'Post não pertence a esse usuário'});
            }
            
            if (success) {
                const post = await Posts.update({title, content, updated: _updated}, {
                    where: {
                        id: _id
                    }
                });
                return res.status(200).json({token : 'post updated'});
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    }
};
