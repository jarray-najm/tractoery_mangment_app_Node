module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      license_number: {
        type: DataTypes.STRING,
        AllowNull: false,
        unique: true,
      },

      phone: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
    },
    {}
  );
  Driver.associate = function (models) {
    Driver.hasMany(models.Usage, { foreignKey: "driver_id" });
  };
  return Driver;
};
