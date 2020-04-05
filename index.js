const express = require('express');
const connectDB = require('./config/database');

const app = express(); // Crea servidor

connectDB(); // Conecta base de datos

const PORT = process.env.PORT || 4000; // Puerto de la app

app.get('/', (req, res) => {
    res.send('Hi World!');
});
// Arranca la app
app.listen(PORT, () => { 
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});