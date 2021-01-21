const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category')


const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//1 artigo -> PERTENCE -> 1 categoria
Article.belongsTo(Category);
//1 categoria -> POSSUI -> N artigos
Category.hasMany(Article);
//Dois relacionamentos -> relacionamento de mão dupla

//Article.sync({force:true});

module.exports = Article;