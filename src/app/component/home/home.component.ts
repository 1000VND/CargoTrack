import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppBaseModule } from '../../app-base.module';
import { DataDashboards, VehiclesAtFactory, VehiclesAtPort } from '../../data/seed-data';
import { CollapseComponent } from "../common/collapse/collapse.component";
import { MultiSelectComponent } from '../common/multi-select/multi-select.component';
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

  [key: string]: any;

  vehicles: { label: string; value: string | undefined | null }[] = [];
  selectedItems: string[] = [];

  // Widget 2
  ddSideCompanyOverview: string = 'left';
  isCollapsedCompanyOverview: boolean = false;
  widthCollapseCompanyOverview: string = 'auto';
  countCompanyVehicles: number = 0;
  countVehiclesAreInStock: number = 0;
  countVehicleIsEmpty: number = 0;

  // Doughnut 1 Widget 3
  isCollapsedVehiclesAtBorder: boolean = false;
  widthCollapseVehiclesAtBorder: string = 'w-33-widget3 flex-grow-1';
  vehiclesAtBorder: { argumentField: string; valueField: number }[] = [
    { argumentField: 'Phương tiện có hàng', valueField: 0 },
    { argumentField: 'Phương tiện không hàng', valueField: 0 }
  ];

  // Doughnut 2 Widget 3
  isCollapsedVehiclesOnTheRoad: boolean = false;
  widthCollapseVehiclesOnTheRoad: string = 'w-33-widget3 flex-grow-1';
  vehiclesOnTheRoad: { argumentField: string; valueField: number }[] = [
    { argumentField: 'Phương tiện có hàng', valueField: 0 },
    { argumentField: 'Phương tiện không hàng', valueField: 0 }
  ];

  // Bar Chart Widget 3
  chartVehiclesAtFactory!: Chart;
  isCollapsedVehiclesAtFactory: boolean = false;
  widthCollapseVehiclesAtFactory: string = 'w-33-widget3 flex-grow-1';
  vehiclesAtFactory: any[] = [];

  // Widget 4
  chartVehiclesAtPort!: Chart;
  ddSideVehiclesAtPort: string = 'left';
  isCollapsedVehiclesAtPort: boolean = false;
  widthCollapseVehiclesAtPort: string = '';
  vehiclesAtPort: any[] = [];

  // Custom màu cho Doughnut Chart
  customPalette = ['#509447', '#e2803c'];

  constructor() {
    // Lấy dữ liệu cho Multi-Select
    DataDashboards.forEach(e => {
      this.vehicles.push({
        value: e.vehicle,
        label: e.vehicle
      })
    });

    // Lấy dữ liệu cho dashboard lần đầu
    this.totalDataDashboard();

    // Lấy dữ liệu cho dashboard sau mỗi 5 phút
    setInterval(() => {
      this.totalDataDashboard();
      console.log('refresh data sau 5p')
    }, 5 * 60 * 1000);
  }

  ngOnInit() {
    this.vehiclesAtFactory = [...VehiclesAtFactory]; // Push dữ liệu cho Bar Chart Widget 3
    this.vehiclesAtPort = [...VehiclesAtPort]; // Push dữ liệu Widget 4
  }

  ngAfterViewInit(): void {
    this.renderBarChartVehiclesAtFactory();
    this.renderBarChartVehiclesAtPort();
  }

  /**
   * Custom Label cho Chart
   * @param e 
   * @returns  
   */
  customizeLabel(e: any) {
    const percentage = e.percent * 100;
    return `${e.value} Phương tiện (${percentage.toFixed(0)}%)`;
  }

  /**
   * Label cho Bar
   * @param e 
   * @returns  
   */
  customizeBarLabel(e: any) {
    return e.valueText;
  }

  /**
   * Lấy màu cho Marker của Chart
   * @param item 
   * @returns  
   */
  getMarkerColor(item: any) {
    return item.visible ? item.marker.fill : '#eee';
  }

  /**
   * Tính tổng giá trị của Pie Chart
   * @param pieChart 
   * @returns  
   */
  calculateTotal(pieChart: any) {
    let total = 0;
    pieChart.getDataSource()._items.forEach((item: any) => {
      total += item.valueField;
    });
    return total;
  }

  /**
   * Tạo ra Bar Chart của Widget 3
   */
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

  /**
   * Tạo ra Bar Chart của Widget 4
   */
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

  /**
   * Làm mới lại từng Widget
   * @param data 
   */
  reloadOnClick(data: any) {
    // Widget 2
    if (data === 'companyOverview') {
      this.countCompanyVehicles = 0;
      this.countVehiclesAreInStock = 0;
      this.countVehicleIsEmpty = 0;

      DataDashboards.forEach(e => {
        this.countCompanyVehicles += e.totalCompanyVehicles;
        this.countVehiclesAreInStock += e.vehiclesAreInStock;
        this.countVehicleIsEmpty += e.vehicleIsEmpty;
      });
    } else if (data === 'vehiclesAtBorder') { // Doughnut thứ 1 của Widget 3
      this.vehiclesAtBorder = [
        { argumentField: 'Phương tiện có hàng', valueField: 0 },
        { argumentField: 'Phương tiện không hàng', valueField: 0 }
      ];

      DataDashboards.forEach(e => {
        this.vehiclesAtBorder[0].valueField += e.vehiclesAtBorder.vehiclesAreInStock;
        this.vehiclesAtBorder[1].valueField += e.vehiclesAtBorder.vehicleIsEmpty;
      });
    } else if (data === 'vehiclesOnTheRoad') { // Doughnut thứ 2 của Widget 3
      this.vehiclesOnTheRoad = [
        { argumentField: 'Phương tiện có hàng', valueField: 0 },
        { argumentField: 'Phương tiện không hàng', valueField: 0 }
      ];

      DataDashboards.forEach(e => {
        this.vehiclesOnTheRoad[0].valueField += e.vehiclesOnTheRoad.vehiclesAreInStock;
        this.vehiclesOnTheRoad[1].valueField += e.vehiclesOnTheRoad.vehicleIsEmpty;
      });
    }
    else if (data === 'vehiclesAtFactory') { // Bar Chart của Widget 3
      this.vehiclesAtFactory = [...this.vehiclesAtFactory];
      if (this.chartVehiclesAtFactory) {
        this.chartVehiclesAtFactory.destroy();
      }
      this.renderBarChartVehiclesAtFactory();
    } else if (data === 'vehiclesAtPort') { // Bar Chart của Widget 4
      this.vehiclesAtPort = [...VehiclesAtPort];
    }
  }

  /**
   * Thay đổi chiều rộng của các Widget (Không có Widget 3)
   * @param width Chiều rộng mong muốn
   * @param param Giá trị chiều rộng
   * @param side Vị trí của DropDown
   */
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

  /**
   * Thay đổi chiều rộng của Widget thứ 3
   * @param width 
   * @param param 
   */
  onChangeWidthWidget3(width: number, param: string) {
    switch (width) {
      case 1:
        this[param] = 'w-33-widget3';
        break;
      case 2:
        this[param] = 'w-66-widget3';
        break;
      case 3:
        this[param] = 'w-100-widget3';
        break;
      default:
        this[param] = 'w-33-widget3 flex-grow-1';
        break;
    }
  }

  /**
   * Làm mới các giá trị trong Multi-Select
   */
  refreshMultiSelect() {
    this.selectedItems = []
  }

  /**
   * Lấy dữ liệu của tất cả các Widget khi Select các giá trị của Combobox
   */
  calculateDashboardTotalsBySelection() {
    if (this.selectedItems.length === 0 || this.selectedItems[0].includes('Tất')) {
      this.totalDataDashboard();
    } else {
      this.refreshData();
      DataDashboards.filter(e => this.selectedItems.includes(e.vehicle)).forEach(e => {
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

  /**
   * Lấy dữ liệu của tất cả Widget
   */
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

  /**
   * Làm mới lại toàn bộ dữ liệu
   */
  private refreshData() {
    // Làm mới lại dữ liệu của Widget thứ 1
    this.countCompanyVehicles = 0;
    this.countVehiclesAreInStock = 0;
    this.countVehicleIsEmpty = 0;

    // Làm mới lại dữ liệu của Widget thứ 2
    this.vehiclesAtBorder = [
      { argumentField: 'Phương tiện có hàng', valueField: 0 },
      { argumentField: 'Phương tiện không hàng', valueField: 0 }
    ];

    // Làm mới lại dữ liệu của Widget thứ 3
    this.vehiclesOnTheRoad = [
      { argumentField: 'Phương tiện có hàng', valueField: 0 },
      { argumentField: 'Phương tiện không hàng', valueField: 0 }
    ];
  }

  /**
   * Cắt chuỗi cho label trục x của Chart
   * @param text 
   * @param [wordsPerLine] Số ký tự cần cắt
   * @returns  
   */
  private splitLabelByWords(text: string, wordsPerLine = 3) {
    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }
    return lines;
  }

  /**
   * Resizes chart vehicles at factory
   * Tự động thay đổi kích thước của biểu đồ dựa trên kích thước của phần tử DOM chứa biểu đồ
   */
  private resizeChartVehiclesAtFactory() {
    if (this.chartVehiclesAtFactory) {
      this.chartVehiclesAtFactory.resize();
    }
  }

  /**
   * Resizes chart vehicles at port
   * Tự động thay đổi kích thước của biểu đồ dựa trên kích thước của phần tử DOM chứa biểu đồ
   */
  private resizeChartVehiclesAtPort() {
    if (this.chartVehiclesAtPort) {
      this.chartVehiclesAtPort.resize();
    }
  }

}