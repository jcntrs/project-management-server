const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');

const app = express(); // Crea servidor

connectDB(); // Conecta base de datos

app.use(cors()); // Habilitar cors

app.use(express.json({ extended: true })); // Habilitar express.json | equivalente a body.parser

const port = process.env.port || 4000; // Puerto de la app

app.use('/api/users', require('./routes/users'));
app.use('/api/authentication', require('./routes/authentication'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => {
    res.send('Hi World!');
});
// Arranca la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});