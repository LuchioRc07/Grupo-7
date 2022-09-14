// ************ Require's ************
const createError = require('http-errors');
//const cookieParser = require('cookie-parser');
const express = require('express');
//const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cookies = require('cookie-parser');
const session = require('express-session');
const sequealize = require('sequealize');
const mysql = require('MySQL2');


// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
//app.use(logger('dev'));
app.use(express.json());
//app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(cookies());
app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));


// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

//  *************** Routes   ************** 
const routersMain = require("./routes/main");
// const routersUser = require("./routes/users");
const routersProduct = require("./routes/products");
const userRoutes = require('./routes/userRoutes');

app.use("/", routersMain);
// app.use("/users", routersUser);
app.use("/products", routersProduct);
app.use('/user', userRoutes);


// app.use(userLoggedMiddleware);
// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');falta termionar de arreglarlo!!!

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// ************ exports app - dont'touch ************
module.exports = app;


////////********------        CORRER LA APP CON:    nodemon     ------**********//////////