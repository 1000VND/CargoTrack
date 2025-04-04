import { Component, HostBinding, OnInit } from '@angular/core';
import { DataWidgetCard } from '../../../models/data-dashboard';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  /**
   * Thay đổi chiều rộng của widget
   */
  @HostBinding('class') get hostClasses() {
    return this.widthWidget;
  }

  widthWidget: string = 'width-card-fit-content';
  dataSource: DataWidgetCard[] = [
    {
      title: 'Tổng số phương tiện của công ty',
      value: 200,
      showPercent: false
    },
    {
      title: 'Phương tiện có hàng',
      value: 50,
      valuePercent: 25
    },
    {
      title: 'Phương tiện có hàng',
      value: 50,
      valuePercent: 25
    },
    {
      title: 'Phương tiện có hàng',
      value: 50,
      valuePercent: 25
    },
    {
      title: 'Phương tiện có hàng',
      value: 50,
      valuePercent: 25
    }
  ];

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
}
