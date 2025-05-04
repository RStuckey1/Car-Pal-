import sequelize from '../config/connection.js';
import { UserFactory, User } from './user.js';
import { VehicleFactory, Vehicle } from './vehicle.js';
import { CommentsFactory } from './comments.js';
import { MilesFactory } from './miles.js';

const UserModel = UserFactory(sequelize);
const VehicleModel = VehicleFactory(sequelize);
const Comments = CommentsFactory(sequelize);
const Miles = MilesFactory(sequelize);

Comments.belongsTo(UserModel);
UserModel.hasMany(Comments);
Miles.belongsTo(VehicleModel);
VehicleModel.hasMany(Miles);

VehicleModel.belongsTo(UserModel, { foreignKey: "UserId" });
UserModel.hasMany(VehicleModel, { foreignKey: "UserId" });
export { User, Vehicle, Comments, Miles };
