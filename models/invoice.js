module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usage_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Usages",
          key: "id",
        },
      },
      total_price: {
        type: DataTypes.DOUBLE,
        AllowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM("Pending", "Paid", "Overdue"),
        allowNull: false,
        defaultValue: "Pending", // Set a default value if needed
      }, // Change to PaymentStatus if using enums
    },
    {}
  );

  Invoice.associate = function (models) {
    Invoice.belongsTo(models.Usage, { foreignKey: "usage_id" });
    Invoice.hasMany(models.Usage, { foreignKey: "invoice_id" });
  };

  return Invoice;
};
