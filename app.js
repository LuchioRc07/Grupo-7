const express = require('express');
const app = express();
app.use(express.static('public'));
//app.use('/static', express.static(__dirname + '/public'));

app.listen(3010, ()=>{
    console.log('Servidor Grupal corriendo');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html')});
