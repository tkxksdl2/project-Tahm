const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get('/getChampList', (req, res) => {
    db.query("SELECT * FROM champions ORDER BY cost", (err, data) => {
        if (!err) {
            res.json({champlist : data});
       } else {
            console.log(err);
       }
    });
});

module.exports = router;