const express = require('express');
const app = express();
const draw = require('./draw.js');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(5000);