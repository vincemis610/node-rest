require('./config/config'); 

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser  = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario') );

// == MI DATABASE == //
mongoose.connect(process.env.dbURL, (err, res) => {
  if (err) throw err;

  console.log('Connect DB'); 
})

// === SETTING PORT === //
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
})  