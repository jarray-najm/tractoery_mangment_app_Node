module.exports = (sequelize, DataTypes) => {
  const Tractor = sequelize.define(
    "Tractor",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM("Tractor", "Harvester", "Bulldozer"),
        allowNull: false,
        defaultValue: "Tractor", // Set a default value if needed
      },
      name: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      power: {
        type: DataTypes.INTEGER,
        AllowNull: false,
      },
      // Price_hours: DataTypes.DOUBLE,
      // hours_used: {
      //   type: DataTypes.DOUBLE,
      //   AllowNull: false,
      // },
      maintenance_status: {
        type: DataTypes.ENUM("Good", "Needs Service", "Under Repair"),
        allowNull: false,
        defaultValue: "Good", // Set a default value if needed
      },
    },
    {}
  );

  Tractor.associate = function (models) {
    Tractor.hasMany(models.Rental, { foreignKey: "tractor_id" });
    Tractor.hasMany(models.Expense, { foreignKey: "tractor_id" });
    Tractor.hasMany(models.Usage, { foreignKey: "tractor_id" });
  };

  return Tractor;
};
