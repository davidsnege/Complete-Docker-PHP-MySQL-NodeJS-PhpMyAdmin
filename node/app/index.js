const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Ruta básica para probar la conexión
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Node.js');
});

// Importar las rutas CRUD
const create = require('./create');
const read = require('./read');
const update = require('./update');
const deleteRoute = require('./delete');

// Usar las rutas
app.use('/api', create);
app.use('/api', read);
app.use('/api', update);
app.use('/api', deleteRoute);

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});

module.exports = app;