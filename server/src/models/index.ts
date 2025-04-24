import sequelize from '../config/connection.js';
import { UserFactory, User } from './user.js';
import { VehicleFactory, Vehicle } from './vehicle.js';
import { CommentsFactory } from './comments.js';

const UserModel = UserFactory(sequelize);
const VehicleModel = VehicleFactory(sequelize);

UserModel.hasMany(VehicleModel, {
  foreignKey: 'ownerId',
  as: 'vehicles',
});

VehicleModel.belongsTo(UserModel, {
  foreignKey: 'ownerId',
  as: 'owner',
});

const Comments = CommentsFactory(sequelize);

Comments.belongsTo(User);
User.belongsTo(Comments);

Vehicle.belongsTo(User);
User.hasMany(Vehicle);
export { User, Vehicle, Comments };
