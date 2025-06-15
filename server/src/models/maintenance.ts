import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Vehicle } from './vehicle.js';

interface MaintenanceAttributes {
  id: number;
  mileage_due: number;
  maintenance_title: string;
  maintenance_description: string;
  parts_needed: string;
  cost: number;
  time_spent: number;
  VehicleId: number; // foreign key to Vehicle
  
  createdAt?: Date;
  updatedAt?: Date;

 
}

interface MaintenanceCreationAttributes extends Optional<MaintenanceAttributes, 'id'> { }

export class Maintenance extends Model<MaintenanceAttributes, MaintenanceCreationAttributes> implements MaintenanceAttributes {
  public id!: number;
  public mileage_due!: number;
  public maintenance_title!: string;
  public maintenance_description!: string;
  public parts_needed!: string;
  public cost!: number;
  public time_spent!: number;
  public VehicleId!: number; // foreign key to Vehicle
  public createdAt!: Date;
  public updatedAt!: Date;
}

export function MaintenanceFactory(sequelize: Sequelize): typeof Maintenance {
  Maintenance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mileage_due: {
        type: DataTypes.FLOAT(6),
        allowNull: false,
      },
      maintenance_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maintenance_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parts_needed: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cost: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
      },
      time_spent: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      VehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Vehicle, key: 'id'},
  
    },
  },
    {
      tableName: 'maintenances',
      sequelize,
      timestamps: true,
    }
  );

  return Maintenance;
}
