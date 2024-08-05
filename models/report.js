module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_type: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        AllowNull: false,
      },
    },
    {}
  );

  Report.associate = function (models) {
    Report.belongsTo(models.Usage, { foreignKey: "usage_id" });
    Report.belongsTo(models.Expense, { foreignKey: "expense_id" });
  };

  return Report;
};
