
interface MilesData {
    id: number;
    date: Date;
    Miles: number;
    VehicleId: number; // foreign key to Vehicle
    
    
}
  
export type { MilesData };

