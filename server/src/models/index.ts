import sequelize from '../config/connection.js';
import { UserFactory, User } from './user.js';
import { VehicleFactory, Vehicle } from './vehicle.js';
import { CommentsFactory } from './comments.js';
import { GasMilesFactory } from './gas.js';
import { MaintenanceFactory, Maintenance } from './maintenance.js';


const UserModel = UserFactory(sequelize);
const VehicleModel = VehicleFactory(sequelize);
const Comments = CommentsFactory(sequelize);
const GasMiles = GasMilesFactory(sequelize);
const MaintenanceModel = MaintenanceFactory(sequelize);


Comments.belongsTo(UserModel);
UserModel.hasMany(Comments);
GasMiles.belongsTo(VehicleModel, { foreignKey: 'VehicleId'});
VehicleModel.hasMany(GasMiles);
MaintenanceModel.belongsTo(VehicleModel, { foreignKey: 'VehicleId' });
VehicleModel.hasMany(MaintenanceModel, { foreignKey: 'VehicleId' });

VehicleModel.belongsTo(UserModel, { foreignKey: 'UserId' });
UserModel.hasMany(VehicleModel, { foreignKey: 'UserId' });
export { User, Vehicle, Comments, GasMiles, Maintenance };
