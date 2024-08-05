module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        AllowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
    },
    {}
  );

  Client.associate = function (models) {
    Client.hasMany(models.Rental, { foreignKey: "client_id" });
  };

  return Client;
};
