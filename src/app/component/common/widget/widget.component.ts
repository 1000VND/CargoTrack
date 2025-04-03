import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ba-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() title: string = 'Widget'; // Tiêu đề
  @Input() type: string = ''; // Hiển thị kiểu thẻ
  @Output() reload = new EventEmitter<void>(); // Sự kiện làm mới
  @Output() widthChange = new EventEmitter<string>(); // Sự kiện thay đổi độ rộng

  selectedItemWidth = 0; // Độ rộng mặc định
  isShowCollapse: boolean = false;
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
    this.onChangeWidth(this.selectedItemWidth);
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

    let widthWidget = 'width-fit-content'; // Giá trị mặc định

    switch (value) {
      case 1:
        widthWidget = 'col-cus-4';
        break;
      case 2:
        widthWidget = 'col-cus-8';
        break;
      case 3:
        widthWidget = 'col-cus-12';
        break;
      case 0:
        widthWidget = this.type === 'card' ? 'width-card-fit-content' : 'width-fit-content';
        break;
    }

    this.widthChange.emit(widthWidget);
  }
}
