import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppBaseModule } from '../../../app-base.module';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataWidgetBar, DataWidgetCard, DataWidgetDoughnut } from '../../../models/data-dashboard';

@Component({
  selector: 'ba-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  imports: [AppBaseModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WidgetComponent),
      multi: true
    }],
  standalone: true
})
export class WidgetComponent implements OnInit {
  @ViewChild('widgetCollapse') collapseElement!: ElementRef;

  @Input() title: string = 'Widget'; // Tiêu đề
  @Input() type: string = ''; // Hiển thị kiểu thẻ
  @Input() dataWidgetCard: DataWidgetCard[] = []; // Dữ liệu của kiểu thẻ
  @Input() dataWidgetDoughnut: DataWidgetDoughnut[] = []; // Dữ liệu của doughnut
  @Input() dataWidgetBar!: DataWidgetBar; // Dữ liệu của doughnut
  @Input() gapBar: number = 130; // Khoảng cách giữa các cột
  @Input() selectedItemWidth = 0; // Độ rộng mặc định
  @Input() isLastWidget: boolean = false; // Kiểm tra widget có phải là widget cuối cùng hay không
  @Output() reload = new EventEmitter<void>(); // Sự kiện làm mới

  @HostBinding('class') get hostClasses() {
    return this.defaulWidth; // Áp dụng defaulWidth trực tiếp lên <ba-widget>
  }

  [key: number]: number;
  widthWidgetCardItem: string = 'col-12 col-sm-3';
  isShowCollapse: boolean = false;
  customPalette: string[] = [];
  defaulWidth: string = 'col-sm-12 flex-sm-grow-1'; // Độ rộng mặc định

  widthOptions: { label: string, value: number }[] = [
    {
      label: 'Tự động',
      value: 0
    },
    {
      label: 'Nhỏ',
      value: 1
    },
    {
      label: 'Trung bình',
      value: 2
    },
    {
      label: 'Lớn',
      value: 3
    }
  ];

  constructor() { }

  ngOnInit() {
    this.customPalette = this.dataWidgetDoughnut.map(item => item.color);
    this.onChangeWidth(this.selectedItemWidth);
  }

  ngAfterViewInit(): void {
  }

  /**
   * Customizes label
   * @param e 
   * @returns  
   */
  customizeLabel(e: any) {
    const percentage = e.percent * 100;
    return `${e.value} Phương tiện (${percentage.toFixed(0)}%)`;
  }

  /**
   * Ẩn hiện widget
   */
  onToggleCollapse() {
    this.isShowCollapse = !this.isShowCollapse;
  }

  onReload() {
    this.reload.emit();
  }

  /**
   * Thay đổi độ rộng của widget
   * @param value 
   */
  onChangeWidth(value: number) {
    this.selectedItemWidth = value;

    // Cấu hình độ rộng cho widget
    const widthConfig: { [key: number]: { widthWidget: string; widthWidgetCardItem: string } } = {
      1: { widthWidget: 'col-sm-3 flex-sm-grow-1', widthWidgetCardItem: 'col-12' },
      2: { widthWidget: 'col-sm-8', widthWidgetCardItem: 'col-12 col-sm-3' },
      3: { widthWidget: 'col-sm-12 flex-sm-grow-1', widthWidgetCardItem: 'col-12 col-sm-3' },
      0: { widthWidget: 'col-sm-12 flex-sm-grow-1', widthWidgetCardItem: 'col-12 col-sm-3' }
    };

    // Cấu hình độ rộng cho widget cuối cùng
    const widthConfigLastChild: { [key: number]: { widthWidget: string; widthWidgetCardItem: string } } = {
      1: { widthWidget: 'col-sm-4 pe-1', widthWidgetCardItem: 'col-12' },
      2: { widthWidget: 'col-sm-8 pe-1', widthWidgetCardItem: 'col-12 col-sm-3' },
      3: { widthWidget: 'col-sm-12', widthWidgetCardItem: 'col-12 col-sm-3' },
      0: { widthWidget: 'col-sm-3 flex-sm-grow-1', widthWidgetCardItem: 'col-12 col-sm-3' }
    };

    const config = this.isLastWidget ? widthConfigLastChild[value] : widthConfig[value];
    this.defaulWidth = config.widthWidget;
    this.widthWidgetCardItem = config.widthWidgetCardItem;
  }

  /**
   * Tổng quá trị của các widget card hiển thị ở card đầu tiên
   * @returns  
   */
  totalDataWidgetCard() {
    return this.dataWidgetCard.reduce((total, currentValue) => total + currentValue.value, 0);
  }

  /**
   * Tổng giá trị hiển thị ở vị trí trung tâm của doughnut
   * @returns  
   */
  totalDataCenterChart() {
    return this.dataWidgetDoughnut.reduce((total, currentValue) => total + currentValue.value, 0);
  }
}
