import { Component, Input, OnInit } from '@angular/core';
import { Colors } from '../../../../data/seed-data';
import { DataChart } from '../../../../models/data-dashboard';

@Component({
  selector: 'ba-doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {

  @Input() dataSource: DataChart[] = [];
  @Input() totalCenterValue: number = 0;

  legend: { color: string, label: string }[] = [];
  colorPalette: string[] = [];

  constructor() { }

  ngOnInit() {
    this.colorPalette = ['#509447', '#e2803c'];

    this.getColorPalette();
  }

  /**
   * Chỉnh sửa nhãn cho biểu đồ
   * @param e dữ liệu nhãn 
   * @returns  
   */
  customizeLabel(e: { percent: number, value: number }) {
    const percentage = e.percent * 100;
    return `${e.value} Phương tiện (${percentage.toFixed(0)}%)`;
  }

  /**
   * Lấy dữ liệu màu sắc cho biểu đồ
   * Lấy thông tin về legend (màu sắc và nhãn) từ dataSource
   * @returns color palette 
   */
  getColorPalette() {
    for (let i = 0; i < this.dataSource.length; i++) {
      this.legend.push({ color: this.colorPalette[i], label: this.dataSource[i].argument });
    }
  }

}
