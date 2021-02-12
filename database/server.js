const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Users = require('../models/Users');
const Posts = require('../models/Posts');

const connection = new Sequelize(dbConfig);
Users.init(connection);
Posts.init(connection);

Posts.associate(connection.models);
Users.associate(connection.models);

module.exports = connection;