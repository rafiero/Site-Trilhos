//para mexer no banco com js
const Sequelize = require('sequelize')
//criacao de objeto de coneccao
const connection = new Sequelize('trilhos', 'rafiero', 'projetotrilhos', {
    host: 'mysql742.umbler.com',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection;

