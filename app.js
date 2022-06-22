const express = require('express');
const app = express();
const path = require("path");
const router = require('./routes/main');
// const routers = require("./routes/users");
const methodOverride = require("method-override");


const routersMain = require("./routes/main");
const routersUser = require("./routes/users");

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use("/", routersMain);
app.use("/users", routersUser);

app.use(express.urlencoded( { extended: false } ) );

app.use(express.json());

app.use(methodOverride("_method"));

// app.use((req, res, next)=>{
//     res.status(404).render("not-found")
//     });
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.path = req.path;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });
      

app.listen(3010, ()=>{
    console.log('Servidor Grupal corriendo');
});


