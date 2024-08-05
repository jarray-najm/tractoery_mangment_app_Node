const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Route files
const clientRoutes = require("./routes/clientRoute");
const driverRoutes = require("./routes/driverRoute");
const equipmentRoutes = require("./routes/equipmentRoute");
const expenseRoutes = require("./routes/expenseRoute");
const invoiceRoutes = require("./routes/invoiceRoute");
const rentalRoutes = require("./routes/rentalRoute");
const reportRoutes = require("./routes/reportRoute");
const tractorRoutes = require("./routes/tractorRoute");
const usageRoutes = require("./routes/usageRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use the routes
app.use("/clients", clientRoutes);
app.use("/drivers", driverRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/expenses", expenseRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/rentals", rentalRoutes);
app.use("/reports", reportRoutes);
app.use("/tractors", tractorRoutes);
app.use("/usages", usageRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// {
//   "development": {
//     "username": "gooitdb_owner",
//     "password": "xKJ6oz3SMIWu",
//     "database": "tractorydb",
//     "host": "ep-tiny-river-a2k3f3w5.eu-central-1.aws.neon.tech",
//     "dialect": "postgres",
//     "logging": true
//   },
//   "test": {
//     "username": "gooitdb_owner",
//     "password": "xKJ6oz3SMIWu",
//     "database": "tractorydb",
//     "host": "ep-tiny-river-a2k3f3w5.eu-central-1.aws.neon.tech",
//     "dialect": "postgres",
//     "logging": false
//   },
//   "production": {
//     "username": "gooitdb_owner",
//     "password": "xKJ6oz3SMIWu",
//     "database": "tractorydb",
//     "host": "ep-tiny-river-a2k3f3w5.eu-central-1.aws.neon.tech",
//     "dialect": "postgres",
//     "logging": false
//   }
// }
