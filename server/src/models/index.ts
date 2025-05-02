import sequelize from '../config/connection.js';
import { UserFactory, User } from './user.js';
import { VehicleFactory, Vehicle } from './vehicle.js';
import { CommentsFactory } from './comments.js';

const UserModel = UserFactory(sequelize);
const VehicleModel = VehicleFactory(sequelize);


const Comments = CommentsFactory(sequelize);

Comments.belongsTo(UserModel);
UserModel.hasMany(Comments);

VehicleModel.belongsTo(UserModel, { foreignKey: "UserId" });
UserModel.hasMany(VehicleModel, { foreignKey: "UserId" });
export { User, Vehicle, Comments };
