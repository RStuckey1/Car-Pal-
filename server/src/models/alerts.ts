import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface AlertAttributes {
    id: number;
    type: string;
    message: string;
    severity: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AlertCreationAttributes extends Optional<AlertAttributes, 'id'> { }

class Alert extends Model<AlertAttributes, AlertCreationAttributes> implements AlertAttributes {
    public id!: number;
    public type!: string;
    public message!: string;
    public severity!: string;

    public readonly assignedUser?: User;
}
export function VehicleFactory(sequelize: Sequelize): typeof Alert {
    Alert.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        severity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "alerts",
        sequelize,

    }
);
    return Alert;
}