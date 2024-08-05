module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define(
    "Rental",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Clients",
          key: "id",
        },
      },
      tractor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tractors",
          key: "id",
        },
      },
      equipment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Equipment",
          key: "id",
        },
      },
      rental_date: {
        type: DataTypes.DATE,
        AllowNull: false,
      },
      // duration_hours: DataTypes.INTEGER,
    },
    {}
  );

  Rental.associate = function (models) {
    Rental.belongsTo(models.Client, { foreignKey: "client_id" });
    Rental.belongsTo(models.Tractor, { foreignKey: "tractor_id" });
    Rental.belongsTo(models.Equipment, { foreignKey: "equipment_id" });
    Rental.hasMany(models.Usage, { foreignKey: "rental_id" });
  };

  return Rental;
};
