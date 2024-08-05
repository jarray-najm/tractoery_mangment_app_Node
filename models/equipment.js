module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define(
    "Equipment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM("محراث", "حصادة", "مضخة دواء", "دواء", "زراعة"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      // hours_used: {
      //   type: DataTypes.INTEGER,
      //   AllowNull: false,
      // },
      Price_hours: {
        type: DataTypes.DOUBLE,
        AllowNull: false,
      },

      maintenance_status: {
        type: DataTypes.ENUM("Good", "Needs Service", "Under Repair"),
        allowNull: false,
        defaultValue: "Good", // Set a default value if needed
      }, // Change to MaintenanceStatus if using enums
    },
    {}
  );

  Equipment.associate = function (models) {
    Equipment.hasMany(models.Rental, { foreignKey: "equipment_id" });
    Equipment.hasMany(models.Usage, { foreignKey: "equipment_id" });
  };

  return Equipment;
};
