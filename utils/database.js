const Sequelize = require('sequelize');
const con = new Sequelize(process.env.mysqldatabase, process.env.mysqluser, process.env.mysqlpassword, {
    host: process.env.mysqlhost,
    dialect: 'mysql'
})
module.exports = con