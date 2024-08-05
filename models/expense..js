module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "Expense",
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
      fuel_cost: {
        type: DataTypes.DOUBLE,
        AllowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        AllowNull: false,
      },
    },
    {}
  );

  Expense.associate = function (models) {
    Expense.belongsTo(models.Tractor, { foreignKey: "tractor_id" });
    Expense.hasMany(models.Report, { foreignKey: "expense_id" });
  };

  return Expense;
};
