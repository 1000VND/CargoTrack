import { Component, OnInit } from '@angular/core';
import { AppBaseModule } from '../../app-base.module';
import { WidgetComponent } from "../common/widget/widget.component";
import { MultiSelectComponent } from '../common/multi-select/multi-select.component';
import { DataDashboard, DataWidgetBar, DataWidgetCard, DataWidgetDoughnut } from '../../models/data-dashboard';
import { DataDashboards, Factories, Ports } from '../../data/seed-data';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AppBaseModule, MultiSelectComponent, WidgetComponent],
  standalone: true
})
export class DashboardComponent implements OnInit {

  vehicles: { label: string; value: string | undefined | null }[] = [];
  selectedItems: string[] = [];
  dataCard: DataWidgetCard[] = [];
  dataDoughnutBorder: DataWidgetDoughnut[] = [];
  dataDoughnutRoad: DataWidgetDoughnut[] = [];

  dataBar: DataWidgetBar = {
    data: [],
    color: '#d32f2f'
  }

  dataBarScroll: DataWidgetBar = {
    data: [],
    color: '#20c997'
  }

  constructor() {
    DataDashboards.forEach(e => {
      this.vehicles.push({
        value: e.vehicle,
        label: e.vehicle
      })
    });

    this.totalDataDashboard();
  }

  ngOnInit() {
  }

  /**
   * Tính tổng dữ liệu của dashboard theo lựa chọn (MultiSelect)
   */
  calculateDashboardTotalsBySelection() {
    if (this.selectedItems.length === 0 || this.selectedItems[0].includes('Tất')) {
      this.totalDataDashboard();
    } else {
      this.countDataCard(this.selectedItems);
      this.countDataDoughnutBorder(this.selectedItems);
      this.countDataDoughnutRoad(this.selectedItems);
      this.dataBar.data = this.countDataBarFactory(this.selectedItems);
      this.dataBarScroll.data = this.countDataBarPort(this.selectedItems);
    }
  }

  /**
   * Tính tổng tất cả dữ liệu của dashboard
   */
  totalDataDashboard() {
    this.refreshData();

    this.countDataCard();
    this.countDataDoughnutBorder();
    this.countDataDoughnutRoad();
    this.dataBar.data = this.countDataBarFactory();
    this.dataBarScroll.data = this.countDataBarPort();
  }

  /**
   * Làm mới MultiSelect
   */
  refreshMultiSelect() {
    this.selectedItems = []
  }

  /**
   * Làm mới lại dữ liệu của từng widget
   * @param widget 
   */
  reloadOnClick(widget: string) {

    const dataReload = this.selectedItems.length === 0 || this.selectedItems[0].includes('Tất') ? [] : this.selectedItems;

    if (widget === 'widget1') {
      this.countDataCard(dataReload);
    } else if (widget === 'widget2') {
      this.countDataDoughnutBorder(dataReload);
    } else if (widget === 'widget3') {
      this.countDataDoughnutRoad(dataReload);
    } else if (widget === 'widget4') {
      this.dataBar.data = this.countDataBarFactory(dataReload);
    } else if (widget === 'widget5') {
      this.dataBarScroll.data = this.countDataBarPort(dataReload);
    }
  }

  /**
   * Làm mới lại toàn bộ dữ liệu
   */
  private refreshData() {
    this.dataCard = []
    this.dataDoughnutBorder = [];
    this.dataDoughnutRoad = [];
    this.dataBar.data = [];
    this.dataBarScroll.data = [];
  }

  /**
   * Tính giá trị của widget 1
   */
  private countDataCard(licensePlate: string[] = []) {
    this.dataCard = [];

    this.dataCard = [
      {
        title: 'Phương tiện có hàng',
        value: this.calculateVehicleAreStockOrEmpty(true, licensePlate),
        color: '#509447'
      },
      {
        title: 'Phương tiện không hàng',
        value: this.calculateVehicleAreStockOrEmpty(false, licensePlate),
        color: '#e2803c'
      }
    ];
  }

  /**
   * Tính giá trị widget 2
   * @param [licensePlate] 
   */
  private countDataDoughnutBorder(licensePlate: string[] = []) {
    this.dataDoughnutBorder = [];

    this.dataDoughnutBorder = [
      {
        value: this.calculateVehicleAreStockBorder(true, true, licensePlate),
        label: 'Phương tiện có hàng',
        color: '#509447'
      },
      {
        value: this.calculateVehicleAreStockBorder(true, false, licensePlate),
        label: 'Phương tiện không hàng',
        color: '#e2803c'
      }
    ]
  }

  /**
   * Tính giá trị widget 3
   * @param [licensePlate] 
   */
  private countDataDoughnutRoad(licensePlate: string[] = []) {
    this.dataDoughnutRoad = [];

    this.dataDoughnutRoad = [
      {
        value: this.calculateVehicleAreStockBorder(false, true, licensePlate),
        label: 'Phương tiện có hàng',
        color: '#509447'
      },
      {
        value: this.calculateVehicleAreStockBorder(false, false, licensePlate),
        label: 'Phương tiện không hàng',
        color: '#e2803c'
      }
    ]
  }

  /**
   * Tính giá trị widget 4
   * @param [licensePlate] 
   * @returns data bar factory 
   */
  private countDataBarFactory(licensePlate: string[] = []): { value: number, label: string }[] {
    this.dataBar.data = [];

    // Lọc các phương tiện đang ở nhà máy
    const vehicle = DataDashboards.filter(e => (licensePlate.length === 0 || licensePlate.includes(e.vehicle)) && e.vehicleAtFactory)
      .map(item => item.vehicleAtFactory);

    return Factories.map((factory) => {
      // Tìm xem có bao nhiêu phương tiện ở nhà máy này
      const count = vehicle.filter(e => e === factory.id).length;
      return {
        value: count,
        label: factory.name
      };
    });
    // .filter(e => e.value > 0);
  }

  /**
   * Tính giá trị widget 5
   * @param [licensePlate] 
   * @returns data bar port 
   */
  private countDataBarPort(licensePlate: string[] = []): { value: number, label: string }[] {
    this.dataBarScroll.data = [];

    // Lọc các phương tiện đang ở cảng
    const vehicle = DataDashboards.filter(e => (licensePlate.length === 0 || licensePlate.includes(e.vehicle)) && e.vehicleAtPort)
      .map(item => item.vehicleAtPort);

    return Ports.map((port) => {
      // Tìm xem có bao nhiêu phương tiện ở nhà máy này
      const count = vehicle.filter(e => e === port.id).length;
      return {
        value: count,
        label: port.name
      };
    }).sort((a, b) => b.value - a.value);
    // .filter(e => e.value > 0);
  }

  /**
   * Tính tổng phương tiện có hàng, không có hàng
   * @returns vehicle are stock 
   */
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

  /**
   * Tính tổng phương tiện ở cửa khẩu (Có hàng hoặc không có hàng)
   * @returns vehicle are stock border 
   */
  private calculateVehicleAreStockBorder(isBorderOrRoad: boolean, isStockEmpty: boolean, licensePlate: string[] = []): number {
    return DataDashboards.reduce((sum: number, vehicle: DataDashboard) => {
      const isMatchParam = vehicle.isVehicleBorderOrRoad == isBorderOrRoad && vehicle.isVehicleAreStockOrEmpty == isStockEmpty;

      const isInLicensePlate = licensePlate.length === 0 || licensePlate.includes(vehicle.vehicle);

      if (isMatchParam && isInLicensePlate) {
        sum++;
      }
      return sum;
    }, 0);
  }
}
