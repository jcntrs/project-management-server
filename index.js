const express = require('express');
const connectDB = require('./config/database');

const app = express(); // Crea servidor

connectDB(); // Conecta base de datos

app.use(express.json({ extended: true })); // Habilitar express.json | equivalente a body.parser

const PORT = process.env.PORT || 4000; // Puerto de la app

app.use('/api/users', require('./routes/users'));
app.use('/api/authentication', require('./routes/authentication'));
app.use('/api/projects', require('./routes/projects'));

app.get('/', (req, res) => {
    res.send('Hi World!');
});
// Arranca la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});