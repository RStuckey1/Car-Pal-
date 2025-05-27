import { Gas } from "../models/gas.js";

export const seedGas = async () => {
    await Gas.bulkCreate(
        [
            {
                date: new Date('2023-01-01'),
                starting_miles: 10000,
                current_miles: 10500,
                gallons_gas: 10,
                mpg: 25,
                gas_price: 3,
                VehicleId: 1
            },
            {
                date: new Date('2023-02-01'),
                starting_miles: 10500,
                current_miles: 11000,
                gallons_gas: 12,
                mpg: 30,
                gas_price: 3,
                VehicleId: 2
            },
            {
                date: new Date('2023-03-01'),
                starting_miles: 11000,
                current_miles: 11500,
                gallons_gas: 15,
                mpg: 20,
                gas_price: 4,
                VehicleId: 3
            },
             {
                date: new Date('2023-04-01'),
                starting_miles: 11500,
                current_miles: 12000,
                gallons_gas: 15,
                mpg: 20,
                gas_price: 4,
                VehicleId: 3
            },
             {
                date: new Date('2023-05-01'),
                starting_miles: 12000,
                current_miles: 12500,
                gallons_gas: 15,
                mpg: 20,
                gas_price: 4,
                VehicleId: 3
            },
        ],
        { individualHooks: true },
    );
}