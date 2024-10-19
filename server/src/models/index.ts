import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { VehicleFactory } from './vehicle.js';
import { CommentsFactory } from './comments.js';

const User = UserFactory(sequelize);
const Vehicle = VehicleFactory(sequelize);
const Comments = CommentsFactory(sequelize);

export { User, Vehicle, Comments };
