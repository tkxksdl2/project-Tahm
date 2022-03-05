const mysql = require('mysql');

const db = mysql.createPool({
    host : 'localhost',
    user : 'test',
    password : '1111',
    database : 'gluttons'
});

module.exports = db;