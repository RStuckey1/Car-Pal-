import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";
import {}

interface Vehicle {
    vin: number || string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    color: string;
    price: number;
    isAvailable: boolean;
}
 
interface VehicleCreationAttributes extends Optional<Vehicle, "id"> {}
export class Vehicle extends Model<Vehicle, VehicleCreationAttributes> implements Vehicle {
public id!: number;
public make!: string;
public model!: string;
public year!: number;
public mileage!: number;
public color!: string;
public price!: number;
public isAvailable!: boolean;
}