import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AppBaseModule } from '../../../app-base.module';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ba-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  imports: [AppBaseModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CollapseComponent),
      multi: true
    }],
  standalone: true
})
export class CollapseComponent implements OnInit {
  @Input() headerText: string = 'Tiêu đề'; // Tiêu đề
  @Input() isCollapsed: boolean = false; // Trạng thái thu gọn
  @Input() dropdownSubSide: string = 'left' // Vị trí dropdown
  @Input() isDisabledSubmenu: number | undefined | null = undefined; // Tắt chọn của item con
  @Output() toggleCollapse = new EventEmitter<void>(); // Sự kiện thu gọn/mở rộng
  @Output() reload = new EventEmitter<void>(); // Sự kiện làm mới
  @Output() changeWidth = new EventEmitter<number>(); // Sự kiện thay đổi độ rộng

  widthOptions = [
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
  selectedWidth = 0; // Giá trị mặc định

  constructor() { }

  ngOnInit() {
  }

  onToggleCollapse() {
    this.toggleCollapse.emit();
  }

  onReload() {
    this.reload.emit();
  }

  onChangeWidth(width: number) {
    this.selectedWidth = width;
    this.changeWidth.emit(width);
  }

}
