import { Component, OnInit, ViewChild } from '@angular/core';
import { AppBaseModule } from '../../app-base.module';
import { Vehicles } from '../../data/seed-data';
import { CollapseComponent } from "../common/collapse/collapse.component";
import { MultiSelectComponent } from '../common/multiselect/multiselect.component';
import { PercentPipe } from '@angular/common';
import { DxChartComponent, DxPieChartComponent } from 'devextreme-angular';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AppBaseModule, MultiSelectComponent, CollapseComponent],
  standalone: true,
})
export class HomeComponent implements OnInit {
  [key: string]: any;

  vehicles: { label: string; value: string }[] = [];
  selected = [];
  dynamicFontSize: number | undefined;
  categories: string[] = [];
  isCollapsedCompanyOverview: boolean = false;
  isCollapsedVehiclesAtBorder: boolean = false;
  isCollapsedVehiclesOnTheRoad: boolean = false;
  isCollapsedVehiclesAtFactory: boolean = false;
  isCollapsedVehiclesAtPort: boolean = false;
  widthCollapseCompanyOverview: string = 'auto'
  widthCollapseVehiclesAtBorder: string = 'col-md-4 p-md-0 pe-md-2 auto-'
  widthCollapseVehiclesOnTheRoad: string = 'col-md-4 p-md-0 pe-md-2 auto-'
  widthCollapseVehiclesAtFactory: string = 'col-md-4 auto-'
  widthCollapseVehiclesAtPort: string = ''

  pipe = new PercentPipe('en-US');
  customPalette = ['#509447', '#e2803c'];

  vehiclesAtBorder: any[] = [{
    region: 'Phương tiện có hàng',
    valueField: 5,
  }, {
    region: 'Phương tiện không hàng',
    valueField: 81,
  }];

  vehiclesOnTheRoad: any[] = [{
    region: 'Phương tiện có hàng',
    valueField: 5,
  }, {
    region: 'Phương tiện không hàng',
    valueField: 40,
  }];

  vehiclesAtFactory: any[] = [{
    name: 'Cty Sedovina (trang thiết bị trường học)',
    value: 2,
  }, {
    name: 'Keyhinge Hòa Cầm',
    value: 1,
  }, {
    name: 'Sợi Phú Nam',
    value: 1,
  }];

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
    {
      name: '1',
      value: 36,
    },
    {
      name: '2',
      value: 38,
    },
    {
      name: '3',
      value: 40,
    },
    {
      name: '5',
      value: 6,
    },
    {
      name: '6',
      value: 8,
    },
    {
      name: '7',
      value: 10
    },
    {
      name: '8',
      value: 12,
    },
    {
      name: '9',
      value: 14,
    },
    {
      name: '10',
      value: 16,
    },
    {
      name: '11',
      value: 18,
    },
    {
      name: '12',
      value: 20,
    },
    {
      name: '13',
      value: 22,
    },
    {
      name: '14',
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
    {
      name: '1',
      value: 36,
    },
    {
      name: '2',
      value: 38,
    },
    {
      name: '3',
      value: 40,
    }
  ];

  customizeTooltip = ({ valueText, percent }: { valueText: string, percent: number }) => ({
    text: `${valueText} - ${this.pipe.transform(percent, '1.2-2')}`,
  });

  customizeLabel(e: any) {
    const percentage = e.percent * 100;
    return `${e.value} Phương tiện (${percentage.toFixed(0)}%)`;
  }

  customizeBarLabel(e: any) {
    return e.valueText;
  }

  constructor() {
    this.setDynamicFontSize();

    Vehicles.forEach(e => {
      this.vehicles.push({
        value: e.type,
        label: e.type
      })
    });
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
    const checkAutoVehiclesOnTheRoad = this.widthCollapseVehiclesOnTheRoad.includes('auto-') || this.widthCollapseVehiclesOnTheRoad.includes('col-md-4');
    const checkAutoVehiclesAtFactory = this.widthCollapseVehiclesAtFactory.includes('auto-');

    switch (width) {
      case 1:
        this.widthCollapseVehiclesAtBorder = 'col-md-4 pb-md-0 pe-md-2';
        this.widthCollapseVehiclesOnTheRoad = (checkAutoVehiclesOnTheRoad ? 'col-md-4 p-md-0 pe-md-2' : this.widthCollapseVehiclesOnTheRoad) + ' auto-';
        this.widthCollapseVehiclesAtFactory = (checkAutoVehiclesAtFactory ? 'col-md-4 p-md-0' : this.widthCollapseVehiclesAtFactory) + ' auto-';
        break;

      case 2:
        this.widthCollapseVehiclesAtBorder = 'col-md-8 pe-md-2';
        this.widthCollapseVehiclesOnTheRoad = (checkAutoVehiclesOnTheRoad ? 'col-md-4 p-md-0' : this.widthCollapseVehiclesOnTheRoad) + ' auto-';
        this.widthCollapseVehiclesAtFactory = (checkAutoVehiclesAtFactory ? 'col-md-12' : this.widthCollapseVehiclesAtFactory) + ' auto-';
        break;

      case 3:
        this.widthCollapseVehiclesAtBorder = 'col-md-12 pe-md-0';
        this.widthCollapseVehiclesOnTheRoad = (checkAutoVehiclesOnTheRoad ? 'col-md-6 p-md-0 pe-md-2' : this.widthCollapseVehiclesOnTheRoad) + ' auto-';
        this.widthCollapseVehiclesAtFactory = (checkAutoVehiclesAtFactory ? 'col-md-6 p-md-0' : this.widthCollapseVehiclesAtFactory) + ' auto-';
        break;

      default:
        this.widthCollapseVehiclesAtBorder = this.widthCollapseVehiclesAtBorder + ' auto-';
        break;
    }
  }

  onChangeWidthVehiclesOnTheRoad(width: number) {
    const checkAutoVehiclesAtBorder = this.widthCollapseVehiclesAtBorder.includes('auto-');
    const checkMd8VehiclesAtBorder = this.checkMdVehiclesAtBorder();
    const checkAutoVehiclesAtFactory = this.widthCollapseVehiclesAtFactory.includes('auto-');

    switch (width) {
      case 1:
        this.widthCollapseVehiclesOnTheRoad = 'col-md-4 pb-md-0' + (checkMd8VehiclesAtBorder == 8 ? ' pe-md-0' : ' pe-md-2');
        this.widthCollapseVehiclesAtFactory = (checkAutoVehiclesAtFactory
          ? (checkMd8VehiclesAtBorder == 4 ? 'col-md-4 pe-md-0' : (checkMd8VehiclesAtBorder == 8 ? 'col-md-12 pe-md-0' : 'col-md-8 pe-md-0'))
          : this.widthCollapseVehiclesAtFactory) + ' auto-';
        break;

      // case 2:
      //   this.widthCollapseVehiclesAtBorder = 'col-md-8 pe-md-2';
      //   this.widthCollapseVehiclesOnTheRoad = (checkAutoVehiclesOnTheRoad ? 'col-md-3 flex-grow-1 p-md-0' : this.widthCollapseVehiclesOnTheRoad) + ' auto-';
      //   this.widthCollapseVehiclesAtFactory = (checkAutoVehiclesAtFactory ? 'col-md-12' : this.widthCollapseVehiclesAtFactory) + ' auto-';
      //   break;

      // case 3:
      //   this.widthCollapseVehiclesAtBorder = 'col-md-12 pe-md-0';
      //   this.widthCollapseVehiclesOnTheRoad = (checkAutoVehiclesOnTheRoad ? 'col-md-6 p-md-0 pe-md-2' : this.widthCollapseVehiclesOnTheRoad) + ' auto-';
      //   this.widthCollapseVehiclesAtFactory = (checkAutoVehiclesAtFactory ? 'col-md-6 p-md-0' : this.widthCollapseVehiclesAtFactory) + ' auto-';
      //   break;

      default:
        this.widthCollapseVehiclesAtBorder = this.widthCollapseVehiclesAtBorder + ' auto-';
        break;
    }
  }

  onChangeWidthVehiclesAtFactory(width: number) {

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

  setDynamicFontSize() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
      this.dynamicFontSize = 10;  // Kích thước chữ nhỏ cho màn hình nhỏ
    } else if (screenWidth < 1000) {
      this.dynamicFontSize = 12;  // Kích thước chữ trung bình
    } else {
      this.dynamicFontSize = 14;  // Kích thước chữ lớn cho màn hình rộng
    }
  }

  private checkMdVehiclesAtBorder() {
    if (this.widthCollapseVehiclesAtBorder.includes('col-md-4')) {
      return 4;
    } else if (this.widthCollapseVehiclesAtBorder.includes('col-md-8')) {
      return 8;
    } else {
      return 12;
    }
  }
}