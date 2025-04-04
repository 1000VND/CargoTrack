export interface DataDashboard {
    vehicle: string; // Biển số xe
    isVehicleBorderOrRoad: boolean; // Xe đang ở Cửa khẩu hoặc trên đường (true: Cửa khẩu, false: Đường)
    isVehicleAreStockOrEmpty: boolean; // Xe có hàng hoặc không có hàng (true: Có hàng, false: Không có hàng)
    vehicleAtFactory?: number; // Xe đang tại nhà máy nào
    vehicleAtPort?: number; // Xe đang tại cảng nào
}

export interface DataWidgetCard {
    title: string,
    color?: string,
    value: number,
    showPercent?: boolean,
    valuePercent?: number,
}

export interface DataChart {
    value: number;
    argument: string;
}