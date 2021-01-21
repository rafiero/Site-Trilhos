const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//da sync só na primeira vez que rodar o projeto
User.sync({force:false});

module.exports = User;