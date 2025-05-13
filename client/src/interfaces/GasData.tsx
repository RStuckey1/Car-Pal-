
interface GasData {
    id: number;
    date: Date;
    starting_miles: number;
    current_miles: number;
    gallons_gas: number;
    mpg: number;
    gas_price: number;
    vehicleId: number | null; // foreign key to Vehicle
    
    
}
  
export type { GasData };

