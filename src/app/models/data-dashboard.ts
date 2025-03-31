export interface DataDashboard {
    vehicle: string; // Biển số xe
    isVehicleBorderOrRoad: boolean; // Xe đang ở Cửa khẩu hoặc trên đường (true: Cửa khẩu, false: Đường)
    isVehicleAreStockOrEmpty: boolean; // Xe có hàng hoặc không có hàng (true: Có hàng, false: Không có hàng)
}

export interface DataWidgetCard {
    title: string;
    value: number;
    color: string;
}

export interface DataWidgetDoughnut {
    value: number;
    label: string;
    color: string;
}

export interface DataWidgetBar {
    data: { value: number, label: string }[];
    color: string;
}