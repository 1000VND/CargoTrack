import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataDashboards } from '../../../data/seed-data';
import { DataChart, DataDashboard } from '../../../models/data-dashboard';

@Component({
  selector: 'vehicle-at-road',
  templateUrl: './vehicle-at-road.component.html',
  styleUrls: ['./vehicle-at-road.component.scss']
})
export class VehicleAtRoadComponent implements OnInit {

  @Input() set vehicleSelected(vehicle: string[]) {
    this.vehicleSelectSaved = vehicle;
    this.callBackData(vehicle);
  }

  @HostBinding('class') get hostClasses() {
    return this.widthWidget;
  }

  dataSource: DataChart[] = [];
  vehicleSelectSaved: string[] = [];
  totalCenterValue: number = 0;
  widthWidget: string = 'width-fit-content';

  constructor() { }

  ngOnInit() { }

  /**
   * Thay đổi độ rộng của widget
   * @param width 
   */
  changeWidth(width: string) {
    this.widthWidget = width;
  }

  /**
   * Lấy lại dữ liệu
   * @param [licensePlate] 
   */
  callBackData(licensePlate: string[] = []) {
    this.dataSource = [];

    const vehiclesWithStock = this.calculateVehicle(true, licensePlate);
    const vehiclesWithoutStock = this.calculateVehicle(false, licensePlate);

    this.dataSource = [
      {
        value: vehiclesWithStock,
        argument: 'Phương tiện có hàng',
      },
      {
        value: vehiclesWithoutStock,
        argument: 'Phương tiện không hàng',
      }
    ];

    this.totalDataCenterChart();
  }

  /**
   * Tính dữ liệu trung tâm chart
   */
  private totalDataCenterChart() {
    this.totalCenterValue = this.dataSource.reduce((total, currentValue) => total + currentValue.value, 0);
  }

  /**
   * Tính toán số lượng phương tiện dựa vào các tham số
   * @param isStockEmpty 
   * @param [licensePlate] 
   * @returns vehicle 
   */
  private calculateVehicle(isStockEmpty: boolean, licensePlate: string[] = []): number {
    return DataDashboards.reduce((sum: number, vehicle: DataDashboard) => {

      const isAllData = licensePlate.length === 0 || licensePlate[0].includes('Tất cả');

      const isMatchParam = vehicle.isVehicleBorderOrRoad == false && vehicle.isVehicleAreStockOrEmpty == isStockEmpty;

      const isInLicensePlate = isAllData || licensePlate.includes(vehicle.vehicle);

      if (isMatchParam && isInLicensePlate) {
        sum++;
      }
      return sum;
    }, 0);
  }
}
