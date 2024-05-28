// npm install cors
const express = require('express');
const app = express();
const port = 3005;
//const tipoRoute = require('./routes/tipoRoute');
//const productoRoute = require('./routes/productoRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const adminRoute = require('./routes/adminRoute');
const loginRoute = require('./routes/loginRoute');
const productoRoute = require('./routes/productoRoute');
const categoriaRoute = require('./routes/categoriaRoute');
const cors = require('cors');
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/usuario',usuarioRoute);
app.use('/admin',adminRoute);
app.use('/login',loginRoute);
app.use('/producto',productoRoute);
app.use('/categoria',categoriaRoute);
app.use('/upload', express.static('upload'));

app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);  
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
