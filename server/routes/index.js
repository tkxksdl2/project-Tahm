const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send({test : "this is a test"});
});


module.exports = router;