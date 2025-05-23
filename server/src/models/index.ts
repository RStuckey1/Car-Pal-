import sequelize from '../config/connection.js';
import { UserFactory, User } from './user.js';
import { VehicleFactory, Vehicle } from './vehicle.js';
import { CommentsFactory } from './comments.js';
import { GasMilesFactory } from './gas.js';

const UserModel = UserFactory(sequelize);
const VehicleModel = VehicleFactory(sequelize);
const Comments = CommentsFactory(sequelize);
const GasMiles = GasMilesFactory(sequelize);

Comments.belongsTo(UserModel);
UserModel.hasMany(Comments);
GasMiles.belongsTo(VehicleModel);
VehicleModel.hasMany(GasMiles, {foreignKey: "vehicleId"});

VehicleModel.belongsTo(UserModel, { foreignKey: "UserId" });
UserModel.hasMany(VehicleModel, { foreignKey: "UserId" });
export { User, Vehicle, Comments, GasMiles };
