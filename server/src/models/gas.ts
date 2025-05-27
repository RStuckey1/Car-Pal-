import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Vehicle } from './vehicle.js';

interface GasAttributes {
  id: number;
  date: Date;
  starting_miles: number;
  current_miles: number;
  gallons_gas: number;
  mpg: number;
  gas_price: number;
  VehicleId: number;

 
}

interface GasCreationAttributes extends Optional<GasAttributes, 'id'> { }

export class Gas extends Model<GasAttributes, GasCreationAttributes> implements GasAttributes {
  public id!: number;
  public date!: Date;
  public starting_miles!: number;
  public current_miles!: number;
  public gallons_gas!: number;
  public mpg!: number;
  public gas_price!: number;
  public VehicleId!: number; // foreign key to Vehicle

}

export function GasMilesFactory(sequelize: Sequelize): typeof Gas {
  Gas.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      starting_miles: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      current_miles: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gallons_gas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gas_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      VehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Vehicle, key: 'id'},
  
    },
  },
    {
      tableName: 'gas',
      sequelize,
      timestamps: false,
    }
  );

  return Gas;
}
