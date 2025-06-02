
interface MaintenanceData {
    id?: number;
    date_due: Date;
    maintenance_title: string;
    maintenance_description: string;
    parts_needed: string;
    cost: number;
    time_spent: number;
    VehicleId: number | null; // foreign key to Vehicle
    
    
}
  
export type { MaintenanceData };

