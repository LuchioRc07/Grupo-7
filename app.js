const express = require('express');
const app = express();
const path = require("path");
const router = require('./routes/main');
// const routers = require("./routes/users");
const methodOverride = require("method-override");


const routersMain = require("./routes/main");
// const routersUser = require("./routes/users");
const { use } = require('./routes/main');

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use("/", routersMain);
// app.use("/users", routersUser);

app.use(express.urlencoded( { extended: false } ) );

app.use(express.json());

app.use(methodOverride("_method"));

app.use((req, res, next)=>{
    res.status(404).render("not-found")
    });

app.listen(3010, ()=>{
    console.log('Servidor Grupal corriendo');
});


