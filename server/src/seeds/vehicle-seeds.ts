import { Vehicle } from "../models/index.js";

export const seedVehicle = async () => {
    await Vehicle.bulkCreate(
        [
            {
                id: 1,
                vin: '1ZWFT61L8Y5645645',
                make: 'Mercury',
                model: 'Cougar',
                year: 2000,
                miles: 202542,
                color: 'Red',
                price: 1200,
                UserId: 1
            },
            {
                id: 2,
                vin: 'KNADE123186312222',
                make: 'Kia',
                model: 'Rio',
                year: 2008,
                miles: 189566,
                color: 'Grey',
                price: 2400,
                UserId: 2
            },
            {
                id: 3,
                vin: '1FMCU03G49KB78940',
                make: 'Ford',
                model: 'Escape',
                year: 2009,
                miles: 99788,
                color: 'Red',
                price: 3250,
                UserId: 3
            },
        ],
        { individualHooks: true },
    );
}