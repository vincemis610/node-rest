require('./config/config'); 

const express = require('express')
const app = express();

const bodyParser  = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// === GET HOME === //
app.get('/', function (req, res) {
  res.send({index: 'home'});
});

// === GET === //
app.get('/usuario/:id', function (req, res) {
  let id = req.params.id;
  res.json({
    id
  });
});

// === POST === //
app.post('/usuario', (req, res) => {
  let body = req.body;

  if (body.name === undefined) {
    res.status(400).json({
      response: false,
      msg: 'El nombre es requerido'
    })
  } else {
    res.json({
      http: 'POST',
      persona: body
    });
  }
});

// === PUT === //
app.put('/usuario', (req, res) => {
  let body = req.body;

  if (body.name === undefined) {
    res.status(400).json({
      response: false,
      msg: 'El nombre es requerido'
    })
  } else {
    res.json({
      http: 'PUT',
      persona: body
    });
  }
});

// === PUT === //
app.delete('/usuario', (req, res) => {
  
    res.json({
      http: 'DELETE',
      msg: 'Deleted'
    });
  
});
 
// === SETTING PORT === //
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
})  