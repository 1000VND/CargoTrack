export interface DataDashboard {
    vehicle: string;
    totalCompanyVehicles: number;
    vehiclesAreInStock: number;
    vehicleIsEmpty: number;
    vehiclesAtBorder: { vehiclesAreInStock: number, vehicleIsEmpty: number };
    vehiclesOnTheRoad: { vehiclesAreInStock: number, vehicleIsEmpty: number };
}
