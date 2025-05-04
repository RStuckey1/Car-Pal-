import{ DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Vehicle } from './vehicle.js';

interface IMiles {
  id: number;
  date: Date;
  miles: number;
  VehicleId: number; // foreign key to Vehicle
}

interface MilesCreationAttributes extends Optional<IMiles, 'id'> { }

export class Miles extends Model<IMiles, MilesCreationAttributes> implements IMiles {
  public id!: number;
  public date!: Date;
  public miles!: number;
  public VehicleId!: number; // foreign key to Vehicle

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function MilesFactory(sequelize: Sequelize): typeof Miles {
  Miles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      miles: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      VehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Vehicle, // 'Vehicles' would also work
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'miles',
        timestamps: true,
    }
  );

  return Miles;
}