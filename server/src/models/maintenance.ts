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
  completed?: boolean; // optional field to indicate if maintenance is completed
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
  public completed?: boolean; // optional field to indicate if maintenance is completed
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      time_spent: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // optional field
        defaultValue: false, // default to false if not provided
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
