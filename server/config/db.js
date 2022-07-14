const mysql = require('mysql');

const db = mysql.createPool({
    host : 'db-tahm.cgwqzttravxz.us-east-2.rds.amazonaws.com',
    user : 'client',
    password : '1234',
    database : 'gluttons'
});

module.exports = db;