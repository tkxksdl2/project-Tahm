const express = require("express");
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query("SELECT * FROM champions", (err, data) => {
        if(!err) res.send({chmpions : data});
        else res.send(err);
    })
});


module.exports = router;