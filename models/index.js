const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite' });

const Cancha = sequelize.define('Cancha', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  apertura: { type: DataTypes.STRING, defaultValue: "08:00" },
  cierre: { type: DataTypes.STRING, defaultValue: "23:00" }
});

const Reserva = sequelize.define('Reserva', {
  nombreCliente: { type: DataTypes.STRING, allowNull: false },
  fecha: { type: DataTypes.STRING, allowNull: false },
  horaInicio: { type: DataTypes.STRING, allowNull: false }
});

Cancha.hasMany(Reserva);
Reserva.belongsTo(Cancha);

module.exports = { sequelize, Cancha, Reserva };