const Users = require('../models/Users');
const GenericController = require('../controllers/GenericController');

module.exports = {
    async findAllUsers(req, res) {
        try {
            const users = await GenericController.findAll(Users);
            return res.status(200).json(users);
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async findUserById(req, res) {
        try {
            const _id = req.params.id;
            const user = await GenericController.findById(Users, _id);
            if (Object.keys(user).length == 0) {
                return res.status(404).json({message : 'Usuário não existe'});
            }
            else {
                return res.status(200).json(user);
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async deleteUserById(req, res) {
        try {
            const _id = req.params.id;
            const user = await GenericController.findById(Users, _id);
            if (Object.keys(user).length == 0) {
                return res.status(400).json({message : 'Usuário não existe'});
            }
            else {
                await GenericController.deleteById(Users, _id);
                return res.status(204).json({message : 'Usuário deletado'});
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async createUser(req, res) {
        try {
            const {id, displayName, email, password, image} = req.body;
            var success = 1;
            var _name = req.body.displayName;
            var _email = req.body.email;
            var _password = req.body.password;
    
            if (_name.length < 8) {
                success = 0;
                return res.status(400).json({message : 'displayName length must be at least 8 characters long.'});
            }
    
            if (_email == null) {
                success = 0;
                return res.status(400).json({message : 'email is required.'});
            }
    
            if (!GenericController.validateEmail(_email)) {
                success = 0;
                return res.status(400).json({message : 'email must be a valid email.'});
            }
    
            if (_password == null) {
                success = 0;
                return res.status(400).json({message : 'password is required.'});
            }
    
            if (_password.length < 6) {
                success = 0;
                return res.status(400).json({message : 'password length must be at least 6 characters long.'});
            }
    
            const usersEmail = await GenericController.findByEmail(Users, _email);
    
            if (Object.keys(usersEmail).length != 0) {
                return res.status(400).json({message : 'Usuário já existe'});
            }
    
            if (success) {
                const users = await Users.create({id, displayName, email, password, image});
                return res.status(201).json({token : 'user created'});
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
    async login(req, res) {
        try {
            const {email, password} = req.body;
            var success = 1;
            var _email = req.body.email;
            var _password = req.body.password;
    
            if (_email == null) {
                success = 0;
                return res.status(400).json({message : 'email is required.'});
            }
    
            if (_password == null) {
                success = 0;
                return res.status(400).json({message : 'password is required.'});
            }
    
            if (_email == "") {
                success = 0;
                return res.status(400).json({message : 'email is not allowed to be empty.'});
            }
    
            if (_password == "") {
                success = 0;
                return res.status(400).json({message : 'password is not allowed to be empty.'});
            }
    
            const usersEmail = await GenericController.findByEmail(Users, _email);
    
            if (Object.keys(usersEmail).length == 0) {
                return res.status(400).json({message : 'Campos inválidos'});
            }
    
            if (success) {
                return res.status(200).json({token : 'login'});
            }
        } catch (error) {
            return GenericController.logError(error, res);
        }
    },
};
