import { Component, Input, OnInit } from '@angular/core';
import { DataWidgetCard } from '../../../../models/data-dashboard';
import { Colors } from '../../../../data/seed-data';

@Component({
  selector: 'ba-card-chart',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() set widthChange(width: string) {
    this.widthWidgetCardItem = width.includes('col-cus-4') ? 'col-12' : 'col';
  }

  @Input() dataSource: DataWidgetCard[] = [];

  widthWidgetCardItem = 'col';

  constructor() { }

  ngOnInit() {
  }

  /**
   * Lấy màu sắc theo thứ tự trong danh sách màu có sẵn
   * @param index 
   * @returns color 
   */
  getColor(index: number): string {
    if (index >= Colors.length) {
      return Colors[index % Colors.length];
    } else {
      return Colors[index];
    }
  }

}
