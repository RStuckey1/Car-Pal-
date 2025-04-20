import { Vehicle } from "../models/index.js";

export const seedVehicle = async () => {
    await Vehicle.bulkCreate(
        [
            {
                vin: '1ZWFT61L8Y5645645',
                make: 'Mercury',
                model: 'Cougar',
                year: 2000,
                mileage: 202542,
                color: 'Red',
                price: 1200,
            },
            {
                vin: 'KNADE123186312222',
                make: 'Kia',
                model: 'Rio',
                year: 2008,
                mileage: 189566,
                color: 'Grey',
                price: 2400,
            },
            {
                vin: '1FMCU03G49KB78940',
                make: 'Ford',
                model: 'Escape',
                year: 2009,
                mileage: 99788,
                color: 'Red',
                price: 3250,
            },
        ],
        { individualHooks: true },
    );
}