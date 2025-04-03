import { Component, Input, OnInit } from '@angular/core';
import { Colors } from '../../../../data/seed-data';

@Component({
  selector: 'ba-doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {

  @Input() dataSource: { argument: string, value: number }[] = [];
  @Input() totalCenterValue: number = 0;

  legend: { color: string, label: string }[] = [];
  colorPalette: string[] = [];

  constructor() { }

  ngOnInit() {
    this.colorPalette = this.getColorPalette();
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

  getColorPalette(): string[] {
    const colorData: string[] = [];

    for (let i = 0; i < this.dataSource.length; i++) {
      if (i >= Colors.length) {
        let color: string;

        do {
          // Tạo một màu ngẫu nhiên ở dạng HEX
          color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        } while (Colors.includes(color) && colorData.includes(color)); // Kiểm tra xem màu đã tồn tại trong danh sách hay chưa
        colorData.push(color);
      } else {
        colorData.push(Colors[i + 1]);
      }

      this.legend.push({ color: colorData[i], label: this.dataSource[i].argument });
    }

    return colorData;
  }

}
