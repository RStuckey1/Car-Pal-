import { Vehicle } from "../models/index.js";

export const seedVehicle = async () => {
    await Vehicle.bulkCreate(
    [
        {
            vin: '1D8HN44EX9B517780',
            make: '',
            model: '',
            year: 2000,
            gallonsOfGas: 0,
            distance: 0,
            mileage: 0,
            color: '',
            price: 0,
        },
        {
            vin: '3B3ES47Y3XT526477', 
            make: '',
            model: '',
            year: 2000,
            gallonsOfGas: 0,
            distance: 0,
            mileage: 0,
            color: '',
            price: 0,
        },
        {
            vin: 'JH4DC548X2C028006',
            make: '',
            model: '',
            year: 2000,
            gallonsOfGas: 0,
            distance: 0,
            mileage: 0,
            color: '',
            price: 0,
        },
    ]
);
}