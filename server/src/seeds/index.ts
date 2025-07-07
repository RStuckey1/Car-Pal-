import { seedUser } from './user-seeds.js';
import { seedVehicle } from './vehicle-seeds.js';
import sequelize from '../config/connection.js';
import { seedGas } from './gas-seeds.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUser();
    console.log('\n----- USER SEEDED -----\n');

    await seedVehicle();
    console.log('\n----- VEHICLE SEEDED -----\n');

    await seedGas();
    console.log('\n----- GAS SEEDED -----\n');
    console.log('\n----- ALL SEEDED -----\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
