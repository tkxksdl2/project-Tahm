const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: true,
    credentials: true
}

app.get('/', (req, res) => {
    res.send("Server Response Success");
});

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/test', require('./routes/index'));

app.listen(8080, () => {
    console.log("listening..");
});