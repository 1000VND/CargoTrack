import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataDashboards, Ports } from '../../../data/seed-data';

@Component({
  selector: 'vehicle-at-port',
  templateUrl: './vehicle-at-port.component.html',
  styleUrls: ['./vehicle-at-port.component.scss']
})
export class VehicleAtPortComponent implements OnInit {

  /**
   * Lấy dữ liệu cho biểu đồ cột
   */
  @Input() set vehicleSelected(vehicle: string[]) {
    this.dataSource = this.countDataBarPort(vehicle);
    this.vehicleSelectSaved = vehicle;
  }

  /**
   * Thay đổi chiều rông của widget
   */
  @HostBinding('class') get hostClasses() {
    return this.widthWidget + ' p-0 d-flex';
  }

  widthWidget: string = 'width-fit-content';
  dataSource: { argument: string, value: number }[] = [];
  vehicleSelectSaved: string[] = [];

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
    this.dataSource = this.countDataBarPort(this.vehicleSelectSaved);
  }

  /**
   * Lấy dữ liệu cho biểu đồ cột dựa vào lựa chọn (MultiSelect)
   * @param [licensePlate] 
   * @returns data bar port 
   */
  private countDataBarPort(licensePlate: string[] = []): { argument: string, value: number }[] {
    this.dataSource = [];

    // Lọc các phương tiện đang ở cảng
    const vehicle = DataDashboards.filter(e => (licensePlate.length === 0 || licensePlate.includes(e.vehicle)) && e.vehicleAtPort)
      .map(item => item.vehicleAtPort);

    return Ports.map((port) => {
      // Tìm xem có bao nhiêu phương tiện ở nhà máy này
      const count = vehicle.filter(e => e === port.id).length;
      return {
        argument: port.name,
        value: count
      };
    }).sort((a, b) => b.value - a.value);
  }

}
