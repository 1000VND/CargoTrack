import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataDashboard, DataWidgetCard } from '../../../models/data-dashboard';
import { DataDashboards } from '../../../data/seed-data';

@Component({
  selector: 'overview-company-widget',
  templateUrl: './overview-company.component.html',
  styleUrls: ['./overview-company.component.scss']
})
export class OverviewCompanyComponent implements OnInit {


  /**
   * Khi dữ liệu 
   */
  @Input() set vehicleSelected(vehicle: string[]) {
    this.vehicleSelectSaved = vehicle;
    this.
  }

  /**
   * Thay đổi chiều rộng của widget
   */
  @HostBinding('class') get hostClasses() {
    return this.widthWidget + ' p-0 d-flex';
  }

  vehicleSelectSaved: string[] = [];
  widthWidget: string = 'width-card-fit-content';
  dataSource: DataWidgetCard[] = [
    {
      title: 'Tổng số phương tiện của công ty',
      value: this.vehicleSelectSaved.length,
      showPercent: false
    },
    {
      title: 'Phương tiện có hàng',
      value: 85,
      valuePercent: 10
    },
    {
      title: 'Phương tiện không hàng',
      value: 85,
      valuePercent: 10
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  changeWidth(width: string) {
    this.widthWidget = width;
  }

  private calculateVehicleAreStockOrEmpty(param: boolean, licensePlate: string[] = []): number {
    return DataDashboards.reduce((sum: number, vehicle: DataDashboard) => {
      const isMatchParam = vehicle.isVehicleAreStockOrEmpty == param;

      const isInLicensePlate = licensePlate.length === 0 || licensePlate.includes(vehicle.vehicle);

      if (isMatchParam && isInLicensePlate) {
        sum++;
      }
      return sum;
    }, 0);
  }

}
