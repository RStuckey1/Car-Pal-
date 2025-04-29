import { Vehicle } from "../models/index.js";

export const seedVehicle = async () => {
    await Vehicle.bulkCreate(
        [
            {
                vin: '1ZWFT61L8Y5645645',
                make: 'Mercury',
                model: 'Cougar',
                year: 2000,
                miles: 202542,
                color: 'Red',
                price: 1200,
                userId: 1
            },
            {
                vin: 'KNADE123186312222',
                make: 'Kia',
                model: 'Rio',
                year: 2008,
                miles: 189566,
                color: 'Grey',
                price: 2400,
                userId: 2
            },
            {
                vin: '1FMCU03G49KB78940',
                make: 'Ford',
                model: 'Escape',
                year: 2009,
                miles: 99788,
                color: 'Red',
                price: 3250,
                userId: 3
            },
        ],
        { individualHooks: true },
    );
}