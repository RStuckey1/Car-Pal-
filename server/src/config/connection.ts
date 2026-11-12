import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DB_URL;
let sequelize: Sequelize;

if (databaseUrl) {
  const urlPassword = new URL(databaseUrl).password;
  const password = process.env.DB_PASSWORD || urlPassword;

  if (!password) {
    throw new Error(
      'Database configuration is missing a password. Add it to DB_URL or set DB_PASSWORD in server/.env.',
    );
  }

  sequelize = new Sequelize(databaseUrl, { password });
} else {
  const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  if (!DB_PASSWORD) {
    throw new Error(
      'Database configuration is missing DB_PASSWORD. Set DB_NAME, DB_USER, and DB_PASSWORD in server/.env.',
    );
  }

  sequelize = new Sequelize(DB_NAME || '', DB_USER || '', DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
  });
}

export default sequelize;
