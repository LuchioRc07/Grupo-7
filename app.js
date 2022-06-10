const express = require('express');
const app = express();
app.use(express.static('public'));


app.listen(3010, ()=>{
    console.log('Servidor Grupal corriendo');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/home.html')});


app.get('/login', (req,res)=>{
        res.sendFile(__dirname + '/views/login.html');
    });
    
app.get('/register', (req,res)=>{
        res.sendFile(__dirname + '/views/register.html');
    });
        
app.get('/productCart', (req,res)=>{
        res.sendFile(__dirname + '/views/productCart.html');
    });

app.get('/productDetail', (req,res)=>{
        res.sendFile(__dirname + '/views/productDetail.html');
    });     
    app.get('/home', (req,res)=>{
        res.sendFile(__dirname + '/views/home.html');
    });  