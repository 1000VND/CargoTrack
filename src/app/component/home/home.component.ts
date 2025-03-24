import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppBaseModule } from '../../app-base.module';
import { DataDashboards, VehiclesAtPort } from '../../data/seed-data';
import { CollapseComponent } from "../common/collapse/collapse.component";
import { MultiSelectComponent } from '../common/multiselect/multiselect.component';
import { PercentPipe } from '@angular/common';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AppBaseModule, MultiSelectComponent, CollapseComponent],
  standalone: true,
})
export class HomeComponent implements OnInit {
  @ViewChild('barChartVehiclesAtFactory') barChartVehiclesAtFactory!: ElementRef;
  @ViewChild('barChartVehiclesAtPort') barChartVehiclesAtPort!: ElementRef;

  chartVehiclesAtFactory!: Chart;
  chartVehiclesAtPort!: Chart;
  [key: string]: any;

  vehicles: { label: string; value: string | undefined | null }[] = [];
  selected: string[] = [];
  dynamicFontSize: number | undefined;
  categories: string[] = [];
  ddSideCompanyOverview: string = 'left';
  ddSideVehiclesAtPort: string = 'left';
  isCollapsedCompanyOverview: boolean = false;
  isCollapsedVehiclesAtBorder: boolean = false;
  isCollapsedVehiclesOnTheRoad: boolean = false;
  isCollapsedVehiclesAtFactory: boolean = false;
  isCollapsedVehiclesAtPort: boolean = false;
  widthCollapseCompanyOverview: string = 'auto';
  widthCollapseVehiclesAtBorder: string = 'width-33-custom flex-grow-1';
  widthCollapseVehiclesOnTheRoad: string = 'width-33-custom flex-grow-1';
  widthCollapseVehiclesAtFactory: string = 'width-33-custom flex-grow-1';
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
  vehiclesAtPort: any[] = [];

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
    DataDashboards.forEach(e => {
      this.vehicles.push({
        value: e.vehicle,
        label: e.vehicle
      })
    });

    this.totalDataDashboard();

    setInterval(() => {
      this.totalDataDashboard();
      console.log('refresh data sau 5p')
    }, 5 * 60 * 1000);
  }

  ngOnInit() {
    this.vehiclesAtPort = [...VehiclesAtPort];
  }

  ngAfterViewInit(): void {
    this.renderBarChartVehiclesAtFactory();
    this.renderBarChartVehiclesAtPort();
  }

  renderBarChartVehiclesAtFactory() {
    const canvas = this.barChartVehiclesAtFactory.nativeElement; // Truy cập phần tử <canvas> từ ViewChild
  
    // Tạo mảng label cho trục X, mỗi label được chia thành các dòng (3 từ mỗi dòng)
    // const wordsPerLine = window.innerWidth < 768 ? 2 : 3;
    const labels = this.vehiclesAtFactory.map(item =>
      this.splitLabelByWords(item.name, 2)
    );
  
    // Lấy mảng dữ liệu tương ứng số phương tiện
    const data = this.vehiclesAtFactory.map(item => item.value);
  
    // Khởi tạo biểu đồ
    this.chartVehiclesAtFactory = new Chart(canvas, {
      type: 'bar', // Biểu đồ dạng cột dọc
      data: {
        labels: labels, // Label trục X (dạng mảng chuỗi xuống dòng)
        datasets: [{
          label: 'Số phương tiện', // Nhãn dataset
          data: data, // Dữ liệu cho từng cột
          backgroundColor: '#d32f2f', // Màu nền cột (đỏ)
          barThickness: 30 // Độ dày cột
        }]
      },
      options: {
        responsive: true, // Cho phép tự động thay đổi kích thước theo container
        maintainAspectRatio: false, // Không giữ nguyên tỉ lệ khung hình
        resizeDelay: 0, // Không delay khi resize
        onResize: this.resizeChartVehiclesAtFactory, // Hàm xử lý khi resize canvas
  
        // Cấu hình plugin
        plugins: {
          legend: {
            display: false // Ẩn phần chú thích (legend)
          },
          tooltip: {
            callbacks: {
              title: context => {
                // Tuỳ chỉnh tiêu đề trong tooltip: bỏ dấu phẩy do label chia dòng bằng mảng
                return context[0].label.replaceAll(',', ' ')
              }
            }
          },
          datalabels: {
            anchor: 'end', // Gắn label vào đỉnh cột
            align: 'top', // Căn theo phía trên cột
            color: '#000', // Màu chữ: đen
            font: {
              weight: 'bold', // Chữ in đậm
              size: 12 // Cỡ chữ 12px
            },
            formatter: (value) => `${value}` // Hiển thị số lượng trên đầu cột
          }
        },
  
        // Cấu hình trục
        scales: {
          x: {
            ticks: {
              maxRotation: 0, // Không xoay label trục X
              minRotation: 0,
              autoSkip: false, // Luôn hiển thị đầy đủ nhãn
              font: {
                weight: 'bold', // In đậm chữ trục X
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true, // Trục Y bắt đầu từ 0
            title: {
              display: false,
              text: 'Số phương tiện', // Tiêu đề trục Y
              font: {
                size: 12
              },
            },
            ticks: {
              precision: 0 // Chỉ hiển thị số nguyên
            },
            min: 0,
            max: Math.max(...data) + 3 // Tăng giới hạn Y lên để không che số trên đầu cột
          }
        },
  
        layout: {
          padding: {
            top: 30 // Thêm khoảng trắng phía trên để vẽ thêm tiêu đề nếu cần
          }
        }
      },
    });
  }

  renderBarChartVehiclesAtPort() {
    this.vehiclesAtPort = [...VehiclesAtPort];

    const canvas = this.barChartVehiclesAtPort.nativeElement; // Truy cập phần tử <canvas> từ ViewChild

    // Tạo mảng label cho trục X, mỗi label được chia thành các dòng (3 từ mỗi dòng)
    const labels = this.vehiclesAtPort.map(item =>
      this.splitLabelByWords(item.name, 3)
    );

    // Lấy mảng dữ liệu tương ứng số phương tiện
    const data = this.vehiclesAtPort.map(item => item.value);

    // Khởi tạo Chart
    this.chartVehiclesAtPort = new Chart(canvas, {
      type: 'bar', // Biểu đồ dạng cột dọc 
      data: {
        labels: labels, // Label trục X
        datasets: [{
          label: 'Số phương tiện', // Nhãn (label) cho dataset
          data: data, // Dữ liệu từng cột
          backgroundColor: '#20c997', // Màu nền của các cột
          borderWidth: 1, // Độ dày viền mỗi cột (thường = 0 hoặc 1)
          barThickness: 30 // Độ rộng mỗi cột
        }]
      },
      // Cấu hình biểu đồ
      options: {
        responsive: false, // Không tự điều chỉnh kích thước theo container (ta đã đặt cố định canvas)
        maintainAspectRatio: false, // Không giữ nguyên tỷ lệ chiều rộng / cao mặc định
        resizeDelay: 0, // Độ trễ khi resize (0 = không delay)
        onResize: this.resizeChartVehiclesAtPort, // Gọi hàm khi resize xảy ra
        // Plugin cấu hình
        plugins: {
          legend: { display: false }, // Ẩn phần chú thích (legend)
          tooltip: {
            callbacks: {
              title: context => {
                return context[0].label.replaceAll(',', ' ')
              }
            }
          },
          datalabels: {
            anchor: 'end', // Điểm neo của số trên đầu cột (end = đỉnh cột)
            align: 'top', // Căn theo phía trên cột
            color: '#000', // Màu chữ: đen
            font: {
              weight: 'bold', // In đậm
              size: 12 // Cỡ chữ 12px
            },
            formatter: (value) => `${value}` // Hiển thị số trên cột
          }
        },
        scales: {
          // Thiết lập trục X
          x: {
            ticks: {
              maxRotation: 0, // Không xoay label trục X
              minRotation: 0, // Không cho xoay nhỏ hơn 0
              autoSkip: false, // Không bỏ qua nhãn nào, luôn hiển thị đầy đủ
              font: {
                weight: 'bold', // In đậm label trục X
                size: 12
              },
            }
          },
          // Thiết lập trục Y
          y: {
            beginAtZero: true, // Bắt đầu trục Y từ 0
            title: {
              display: false,
              text: 'Số phương tiện', // Tiêu đề trục Y
              font: {
                size: 12
              }
            },
            ticks: {
              precision: 0 // Chỉ hiển thị số nguyên, không thập phân
            },
            min: 0,
            max: Math.max(...data) + 6, // Cài max Y để cách đỉnh 1 đoạn (tránh label bị che)
          }
        },
      },
      plugins: [ChartDataLabels] // Kích hoạt plugin để hiển thị số trên đầu cột
    });
  }

  onReload(data: any) {
    if (data === 'companyOverview') {
      this.countCompanyVehicles = 0;
      this.countVehiclesAreInStock = 0;
      this.countVehicleIsEmpty = 0;

      DataDashboards.forEach(e => {
        this.countCompanyVehicles += e.totalCompanyVehicles;
        this.countVehiclesAreInStock += e.vehiclesAreInStock;
        this.countVehicleIsEmpty += e.vehicleIsEmpty;
      });
    } else if (data === 'vehiclesAtBorder') {
      this.vehiclesAtBorder = [
        { argumentField: 'Phương tiện có hàng', valueField: 0 },
        { argumentField: 'Phương tiện không hàng', valueField: 0 }
      ];

      DataDashboards.forEach(e => {
        this.vehiclesAtBorder[0].valueField += e.vehiclesAtBorder.vehiclesAreInStock;
        this.vehiclesAtBorder[1].valueField += e.vehiclesAtBorder.vehicleIsEmpty;
      });
    } else if (data === 'vehiclesOnTheRoad') {
      this.vehiclesOnTheRoad = [
        { argumentField: 'Phương tiện có hàng', valueField: 0 },
        { argumentField: 'Phương tiện không hàng', valueField: 0 }
      ];

      DataDashboards.forEach(e => {
        this.vehiclesOnTheRoad[0].valueField += e.vehiclesOnTheRoad.vehiclesAreInStock;
        this.vehiclesOnTheRoad[1].valueField += e.vehiclesOnTheRoad.vehicleIsEmpty;
      });
    }
    else if (data === 'vehiclesAtFactory') {
      this.vehiclesAtFactory = [...this.vehiclesAtFactory];
      if (this.chartVehiclesAtFactory) {
        this.chartVehiclesAtFactory.destroy();
      }
      this.renderBarChartVehiclesAtFactory();
    } else if (data === 'vehiclesAtPort') {
      this.vehiclesAtPort = [...VehiclesAtPort];
    }
  }

  onChangeWidth(width: number, param: string, side: string) {
    switch (width) {
      case 1:
        this[param] = 'w-33-custom';
        this[side] = 'right';
        break;

      case 2:
        this[param] = 'w-66-custom';
        this[side] = 'right';
        break;

      case 3:
        this[param] = 'w-100-custom';
        this[side] = 'left';
        break;

      default:
        this[param] = 'flex-grow-1';
        this[side] = 'left';
        break;
    }
  }

  onChangeWidthWidget3(width: number, param: string) {
    switch (width) {
      case 1:
        this[param] = 'width-33-custom';
        break;
      case 2:
        this[param] = 'width-66-custom';
        break;
      case 3:
        this[param] = 'width-100-custom';
        break;
      default:
        this[param] = 'width-33-custom flex-grow-1';
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

  refreshMultiSelect() {
    this.selected = []
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
  
  private splitLabelByWords(text: string, wordsPerLine = 3) {
    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }
    return lines;
  }

  private resizeChartVehiclesAtFactory() {
    if (this.chartVehiclesAtFactory) {
      this.chartVehiclesAtFactory.resize();
    }
  }

  private resizeChartVehiclesAtPort() {
    if (this.chartVehiclesAtPort) {
      this.chartVehiclesAtPort.resize();
    }
  }


}