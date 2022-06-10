const express = require('express');
const app = express();
const path = require("path");


app.use(express.static('public'));

app.set("view engine", "ejs");

const routersMain = require("./routes/main");

app.use("/", routersMain);

app.listen(3010, ()=>{
    console.log('Servidor Grupal corriendo');
});

