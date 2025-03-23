import { Component, OnInit, ViewChild } from '@angular/core';
import { AppBaseModule } from '../../app-base.module';
import { DataDashboards } from '../../data/seed-data';
import { CollapseComponent } from "../common/collapse/collapse.component";
import { MultiSelectComponent } from '../common/multiselect/multiselect.component';
import { PercentPipe } from '@angular/common';
import { DxChartComponent, DxPieChartComponent } from 'devextreme-angular';
import { WidthCard } from '../../models/width-card';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AppBaseModule, MultiSelectComponent, CollapseComponent],
  standalone: true,
})
export class HomeComponent implements OnInit {
  [key: string]: any;

  vehicles: { label: string; value: string | undefined | null }[] = [];
  selected: string[] = [];
  dynamicFontSize: number | undefined;
  categories: string[] = [];
  isCollapsedCompanyOverview: boolean = false;
  isCollapsedVehiclesAtBorder: boolean = false;
  isCollapsedVehiclesOnTheRoad: boolean = false;
  isCollapsedVehiclesAtFactory: boolean = false;
  isCollapsedVehiclesAtPort: boolean = false;
  widthCollapseCompanyOverview: string = 'auto';
  widthCollapseVehiclesAtBorder: WidthCard = { width: 'width-33-custom flex-grow-1', status: 'auto' };
  widthCollapseVehiclesOnTheRoad: WidthCard = { width: 'width-33-custom flex-grow-1', status: 'auto' };
  widthCollapseVehiclesAtFactory: WidthCard = { width: 'width-33-custom flex-grow-1', status: 'auto' };
  widthCollapseVehiclesAtPort: string = '';
  countCompanyVehicles: number = 0;
  countVehiclesAreInStock: number = 0;
  countVehicleIsEmpty: number = 0;

  pipe = new PercentPipe('en-US');
  customPalette = ['#509447', '#e2803c'];

  vehiclesAtBorder: { argumentField: string; valueField: number }[] = [
    { argumentField: 'Phương tiện có hàng', valueField: 0 },
    { argumentField: 'Phương tiện không hàng', valueField: 0 }
  ];
  vehiclesOnTheRoad: { argumentField: string; valueField: number }[] = [
    { argumentField: 'Phương tiện có hàng', valueField: 0 },
    { argumentField: 'Phương tiện không hàng', valueField: 0 }
  ];

  vehiclesAtFactory: any[] = [
    {
      name: 'Cty Sedovina (trang thiết bị trường học)',
      value: 2,
    },
    {
      name: 'Keyhinge Hòa Cầm',
      value: 1,
    },
    {
      name: 'Sợi Phú Nam',
      value: 1,
    }
  ];

  vehiclesAtPort: any[] = [
    {
      name: '504',
      value: 6,
    },
    {
      name: 'A Minh',
      value: 8,
    },
    {
      name: 'A. Bữu (Đại đồng, Đại lộc)',
      value: 10
    },
    {
      name: 'An Lợi Tinh',
      value: 12,
    },
    {
      name: 'An Phú Tài',
      value: 14,
    },
    {
      name: 'Anh Bửu (Giác trầm làm hương)',
      value: 16,
    },
    {
      name: 'Bãi 1/4 VCS Quy nhơn',
      value: 18,
    },
    {
      name: 'Bãi Container Chân Thật',
      value: 20,
    },
    {
      name: 'Bãi Container Cty Hoàng Bảo Anh',
      value: 22,
    },
    {
      name: 'Bãi Container Hoàng Bảo Anh',
      value: 24,
    },
    {
      name: 'Bãi Container Hoàng Bảo Anh (KCN PBAI)',
      value: 26,
    },
    {
      name: 'Bãi Dăm Bạch đàn',
      value: 28,
    },
    {
      name: 'Bãi Tân Thanh (container Hòa Cầm)',
      value: 30,
    },
    {
      name: 'Bãi X50',
      value: 32,
    },
    {
      name: 'Bãi xe 223 Trường Chinh',
      value: 34,
    },
  ];

  customizeTooltip = ({ valueText, percent }: { valueText: string, percent: number }) => ({
    text: `${valueText} - ${this.pipe.transform(percent, '1.2-2')}`,
  });

  customizeLabel(e: any) {
    const percentage = e.percent * 100;
    return `${e.value} Phương tiện (${percentage.toFixed(2)}%)`;
  }

  customizeBarLabel(e: any) {
    return e.valueText;
  }

  constructor() {
    DataDashboards.forEach(e => {
      this.vehicles.push({
        value: e.vehicle,
        label: e.vehicle
      })
    });

    this.totalDataDashboard();

    setInterval(() => {
      this.totalDataDashboard();
    }, 5 * 60 * 1000);
  }

  ngOnInit() {
  }

  onReload() {
  }

  onChangeWidth(width: number, param: string) {
    switch (width) {
      case 1:
        this[param] = '33-custom';
        break;

      case 2:
        this[param] = '66-custom';
        break;

      case 3:
        this[param] = '100';
        break;

      default:
        this[param] = '';
        break;
    }
  }

  onChangeWidthVehiclesAtBorder(width: number) {
    switch (width) {
      case 1:
        this.widthCollapseVehiclesAtBorder.width = 'width-33-custom';
        this.widthCollapseVehiclesAtBorder.status = 'small';
        break;
      case 2:
        this.widthCollapseVehiclesAtBorder.width = 'width-66-custom';
        this.widthCollapseVehiclesAtBorder.status = 'medium';
        break;
      case 3:
        this.widthCollapseVehiclesAtBorder.width = 'width-100-custom';
        this.widthCollapseVehiclesAtBorder.status = 'large';
        break;
      default:
        this.widthCollapseVehiclesAtBorder.width = 'width-33-custom flex-grow-1';
        this.widthCollapseVehiclesAtBorder.status = 'auto';
        break;
    }
  }

  onChangeWidthVehiclesOnTheRoad(width: number) {
    switch (width) {
      case 1:
        this.widthCollapseVehiclesOnTheRoad.width = 'width-33-custom';
        this.widthCollapseVehiclesOnTheRoad.status = 'small';
        break;
      case 2:
        this.widthCollapseVehiclesOnTheRoad.width = 'width-66-custom';
        this.widthCollapseVehiclesOnTheRoad.status = 'medium';
        break;
      case 3:
        this.widthCollapseVehiclesOnTheRoad.width = 'width-100-custom';
        this.widthCollapseVehiclesOnTheRoad.status = 'large';
        break;
      default:
        this.widthCollapseVehiclesOnTheRoad.width = 'width-33-custom flex-grow-1';
        this.widthCollapseVehiclesOnTheRoad.status = 'auto';
        break;
    }
  }

  onChangeWidthVehiclesAtFactory(width: number) {
    switch (width) {
      case 1:
        this.widthCollapseVehiclesAtFactory.width = 'width-33-custom';
        this.widthCollapseVehiclesAtFactory.status = 'small';
        break;
      case 2:
        this.widthCollapseVehiclesAtFactory.width = 'width-66-custom';
        this.widthCollapseVehiclesAtFactory.status = 'medium';
        break;
      case 3:
        this.widthCollapseVehiclesAtFactory.width = 'width-100-custom';
        this.widthCollapseVehiclesAtFactory.status = 'large';
        break;
      default:
        this.widthCollapseVehiclesAtFactory.width = 'width-33-custom flex-grow-1';
        this.widthCollapseVehiclesAtFactory.status = 'auto';
        break;
    }
  }

  calculateTotal(pieChart: any) {
    let total = 0;
    pieChart.getDataSource()._items.forEach((item: any) => {
      total += item.valueField;
    });
    return total;
  }

  getMarkerColor(item: any) {
    return item.visible ? item.marker.fill : '#eee';
  }

  calculateDashboardTotalsBySelection() {
    if (this.selected.length === 0 || this.selected[0].includes('Tất')) {
      this.totalDataDashboard();
    } else {
      this.refreshData();
      DataDashboards.filter(e => this.selected.includes(e.vehicle)).forEach(e => {
        this.countCompanyVehicles += e.totalCompanyVehicles;
        this.countVehiclesAreInStock += e.vehiclesAreInStock;
        this.countVehicleIsEmpty += e.vehicleIsEmpty;

        this.vehiclesAtBorder[0].valueField += e.vehiclesAtBorder.vehiclesAreInStock;
        this.vehiclesAtBorder[1].valueField += e.vehiclesAtBorder.vehicleIsEmpty;

        this.vehiclesOnTheRoad[0].valueField += e.vehiclesOnTheRoad.vehiclesAreInStock;
        this.vehiclesOnTheRoad[1].valueField += e.vehiclesOnTheRoad.vehicleIsEmpty;
      });
    }
  }

  totalDataDashboard() {
    this.refreshData();

    DataDashboards.forEach(e => {
      this.countCompanyVehicles += e.totalCompanyVehicles;
      this.countVehiclesAreInStock += e.vehiclesAreInStock;
      this.countVehicleIsEmpty += e.vehicleIsEmpty;

      this.vehiclesAtBorder[0].valueField += e.vehiclesAtBorder.vehiclesAreInStock;
      this.vehiclesAtBorder[1].valueField += e.vehiclesAtBorder.vehicleIsEmpty;

      this.vehiclesOnTheRoad[0].valueField += e.vehiclesOnTheRoad.vehiclesAreInStock;
      this.vehiclesOnTheRoad[1].valueField += e.vehiclesOnTheRoad.vehicleIsEmpty;
    });
  }

  private refreshData() {
    this.countCompanyVehicles = 0;
    this.countVehiclesAreInStock = 0;
    this.countVehicleIsEmpty = 0;

    this.vehiclesAtBorder = [
      { argumentField: 'Phương tiện có hàng', valueField: 0 },
      { argumentField: 'Phương tiện không hàng', valueField: 0 }
    ];

    this.vehiclesOnTheRoad = [
      { argumentField: 'Phương tiện có hàng', valueField: 0 },
      { argumentField: 'Phương tiện không hàng', valueField: 0 }
    ];
  }

}