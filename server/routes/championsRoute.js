const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get('/getChampList', async (req, res) => {
    await db.query(`SELECT * FROM champions WHERE cost = ${req.query.cost}`, (err, data) => {
        if (!err) {
            res.json({champlist : data});
       } else {
            console.log(err);
       }
    });
});

module.exports = router;