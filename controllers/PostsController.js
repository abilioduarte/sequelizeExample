const Posts = require('../models/Posts');
const GenericController = require('../controllers/GenericController');
const {Op} = require('sequelize');
const moment = require("moment");
const dateTime = moment();

module.exports = {
    async findAllPosts(req, res) {
        const posts = await Posts.findAll({
            include: {
                association: 'user'
            }
        });
        return res.status(200).json(posts);
    },
    async findPostById(req, res) {
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
    },
    async findPostByTitle(req, res) {
        console.log('findPostByTitle');
        console.log(req.query);
        const _title_like = req.query.title_like;
        const _title_equals = req.query.title_equals;
        const _content = req.query.content;
        const _published_after = req.query.published_after;
        const _published_before = req.query.published_before;

        let where = {};
        if (_title_like) {
            where ['title'] = {
                [Op.like]: '%' + _title_like + '%'
            };
        }
        if (_content) {
            where ['content'] = {
                [Op.like]: '%' + _content + '%'
            };
        }
        if (_title_equals) {
            where ['title'] = {
                [Op.eq]: _title_equals 
            };
        }
        if (_published_after) {
            where ['published'] = {
                [Op.gt]: _published_after
            };
        }
        if (_published_before) {
            where ['published'] = {
                [Op.lt]: _published_before
            };
        }
        const post = await Posts.findAll({
            where,
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
    },
    async deletePostById(req, res) {
        const _id = req.params.id;
        const post = await GenericController.findById(Posts, _id);
        if (Object.keys(post).length == 0) {
            return res.status(400).json({message : 'Post não existe'});
        }
        else {
            await GenericController.deleteById(Posts, _id);
            return res.status(204).json({message : 'Post deletado'});
        }
    },
    async createPost(req, res) {
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
    },
    async updatePost(req, res) {
        const _id = req.params.id;
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
        
        if (success) {
            const post = await Posts.update({title, content, updated: _updated}, {
                where: {
                    id: _id
                }
            });
            return res.status(200).json({token : 'post updated'});
        }
    }
};
