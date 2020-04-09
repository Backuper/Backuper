const mysql = require("mysql2")
let con = mysql.createConnection({
    host: process.env.mysqlhost,
    user: process.env.mysqluser,
    password: process.env.mysqlpassword,
    database: process.env.mysqldatabase
})

let backupscon = mysql.createConnection({
    host: process.env.mysql2host,
    user: process.env.mysql2user,
    password: process.env.mysql2password,
    database: process.env.mysql2database
})


module.exports = con;
module.exports.backuper = con;
module.exports.backups = backupscon;