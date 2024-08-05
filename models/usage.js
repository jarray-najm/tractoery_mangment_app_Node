module.exports = (sequelize, DataTypes) => {
  const Usage = sequelize.define(
    "Usage",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      driver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Drivers",
          key: "id",
        },
      },
      rental_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Rentals",
          key: "id",
        },
      },
      location: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      invoice_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Invoices",
          key: "id",
        },
      },
      start_time: {
        type: DataTypes.DATE,
        AllowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        AllowNull: false,
      },
      hours_used: DataTypes.DOUBLE,
      task_description: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
    },
    {}
  );

  Usage.associate = function (models) {
    Usage.belongsTo(models.Tractor, { foreignKey: "tractor_id" });
    Usage.belongsTo(models.Equipment, { foreignKey: "equipment_id" });
    Usage.belongsTo(models.Driver, { foreignKey: "driver_id" });
    Usage.belongsTo(models.Rental, { foreignKey: "rental_id" });
    Usage.belongsTo(models.Invoice, { foreignKey: "invoice_id" });
    Usage.hasMany(models.Report, { foreignKey: "usage_id" });
  };

  return Usage;
};
