import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { VehicleFactory } from './vehicle.js';

const User = UserFactory(sequelize);
const Vehicle = VehicleFactory(sequelize);

export { User, Vehicle };
