const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: "*" }));
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.sqlite');

// Inicialización de tablas
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS reservas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT, fecha TEXT, hora TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS bloqueos (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, motivo TEXT)");
});

// Obtener todas las reservas existentes
app.get('/api/reservas', (req, res) => {
    db.all("SELECT * FROM reservas", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Guardar nueva reserva
app.post('/api/reservas', (req, res) => {
    const { nombre, telefono, fecha, hora } = req.body;
    db.run("INSERT INTO reservas (nombre, telefono, fecha, hora) VALUES (?, ?, ?, ?)", [nombre, telefono, fecha, hora], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: "Reserva guardada" });
    });
});

// Bloquear día (Admin)
app.post('/api/bloqueos', (req, res) => {
    const { fecha, motivo } = req.body;
    db.run("INSERT INTO bloqueos (fecha, motivo) VALUES (?, ?)", [fecha, motivo], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Día bloqueado" });
    });
});

app.delete('/api/reservas/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM reservas WHERE id = ?", id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reserva eliminada con éxito" });
    });
});

const PORT = process.env.PORT || 3001; // Railway asigna un puerto dinámico

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});