const express = require('express');
const app = express();

app.use('/static', express.static(__dirname + '/public'));

app.listen(3100, ()=>{
    console.log('Servidor operativo');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/home.html');
});
