const express = require ('express');
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, './public');


app.use(express.static(publicPath));

app.listen(3100, () =>{
    console.log("Servidor corriendo");
})

app.get('/', (req, res) =>{
    res.sendFile(path.resolve('./views/home.html'))
})
