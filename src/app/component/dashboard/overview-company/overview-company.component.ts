import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataDashboard, DataWidgetCard } from '../../../models/data-dashboard';
import { DataDashboards } from '../../../data/seed-data';

@Component({
  selector: 'overview-company-widget',
  templateUrl: './overview-company.component.html',
  styleUrls: ['./overview-company.component.scss']
})
export class OverviewCompanyComponent implements OnInit {

  @Input() set vehicleSelected(vehicle: string[]) {
    this.vehicleSelectSaved = vehicle;
    this.callBackData();
  }

  /**
   * Thay đổi chiều rộng của widget
   */
  @HostBinding('class') get hostClasses() {
    return this.widthWidget + ' p-0 d-flex';
  }

  vehicleSelectSaved: string[] = [];
  widthWidget: string = 'width-card-fit-content';
  dataSource: DataWidgetCard[] = [];

  constructor() { }

  ngOnInit() {
  }

  /**
   * Thay đổi độ rộng của widget
   * @param width 
   */
  changeWidth(width: string) {
    this.widthWidget = width;
  }

  /**
   * Lấy lại dữ liệu
   */
  callBackData() {
    const vehiclesWithStock = this.calculateVehicleCount(true, this.vehicleSelectSaved);
    const vehiclesWithoutStock = this.calculateVehicleCount(false, this.vehicleSelectSaved);
    const totalVehicles = vehiclesWithStock + vehiclesWithoutStock;

    this.dataSource = [
      {
        title: 'Tổng số phương tiện của công ty',
        value: totalVehicles,
        showPercent: false
      },
      {
        title: 'Phương tiện có hàng',
        value: vehiclesWithStock,
        valuePercent: Number((vehiclesWithStock / totalVehicles * 100).toFixed(0))
      },
      {
        title: 'Phương tiện không hàng',
        value: vehiclesWithoutStock,
        valuePercent: Number((vehiclesWithoutStock / totalVehicles * 100).toFixed(0))
      }
    ];
  }

  /**
   * Lấy dữ liệu cho biểu đồ cột dựa vào lựa chọn (MultiSelect)
   * @param param 
   * @param [licensePlate] 
   * @returns vehicle count 
   */
  calculateVehicleCount(param: boolean, licensePlate: string[] = []): number {

    const isAllData = licensePlate.length === 0 || licensePlate[0].includes('Tất cả');

    return DataDashboards.reduce((sum: number, vehicle: DataDashboard) => {
      const isMatchParam = vehicle.isVehicleAreStockOrEmpty == param;

      const isInLicensePlate = isAllData || licensePlate.includes(vehicle.vehicle);

      if (isMatchParam && isInLicensePlate) {
        sum++;
      }
      return sum;
    }, 0);
  }

}
