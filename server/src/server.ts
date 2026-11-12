import express from "express";
import { DataTypes } from "sequelize";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("../client/dist"));

app.use(express.json());

app.use(routes);

sequelize.sync().then(async () => {
  const queryInterface = sequelize.getQueryInterface();
  const userColumns = await queryInterface.describeTable("user");
  if (!userColumns.firstName) {
    await queryInterface.addColumn("user", "firstName", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    });
  }
  if (!userColumns.lastName) {
    await queryInterface.addColumn("user", "lastName", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    });
  }

  const maintenanceColumns = await queryInterface.describeTable("maintenances");
  if (/VARCHAR|CHARACTER VARYING/i.test(String(maintenanceColumns.parts_needed.type))) {
    await queryInterface.changeColumn("maintenances", "parts_needed", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((error: unknown) => {
  console.error("Failed to initialize database", error);
  process.exitCode = 1;
});
