//dummy script, tested few things
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.port || 1433

const app = express();


app.listen(port, () => {
    console.log("port is running");
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });