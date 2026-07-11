const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Reserva', {
    nombreCliente: { type: DataTypes.STRING, allowNull: false },
    fecha: { type: DataTypes.STRING, allowNull: false },
    horaInicio: { type: DataTypes.STRING, allowNull: false },
    CanchaId: { type: DataTypes.INTEGER, allowNull: false }
  });
};