import sequelize from '../config/connection.js';
import { UserFactory, User } from './user.js';
import { VehicleFactory, Vehicle } from './vehicle.js';
import { CommentsFactory } from './comments.js';

const UserModel = UserFactory(sequelize);
const VehicleModel = VehicleFactory(sequelize);

UserModel.hasMany(VehicleModel, {
  foreignKey: 'userId',
  as: 'vehicles',
});



const Comments = CommentsFactory(sequelize);

Comments.belongsTo(User);
User.belongsTo(Comments);

Vehicle.belongsTo(User);
User.belongsTo(Vehicle);
export { User, Vehicle, Comments };
