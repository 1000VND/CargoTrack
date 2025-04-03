import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataWidgetCard } from '../../../../models/data-dashboard';

@Component({
  selector: 'ba-card-chart',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() set widthChange(width: string) {
    this.widthWidgetCardItem = width.includes('col-cus-4') ? 'col-12' : 'col-12 col-sm-3';
  }

  @Input() dataSource: DataWidgetCard[] = [];

  // Nếu không có màu truyền vào thì sẽ lấy màu mặc định
  colors = [
    "#006adc",
    "#509447",
    "#e2803c",
    "#d43f6a",
    "#8e4b9e",
    "#c9a039",
    "#3b8c7d",
    "#b85c38",
    "#6b9c2e",
    "#e05b8f"
  ];

  widthWidgetCardItem = 'col-12 col-sm-3';

  constructor() { }

  ngOnInit() {
  }

}
