import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataChart } from '../../../../models/data-dashboard';

@Component({
  selector: 'ba-bar-chart',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],

})
export class BarComponent implements OnInit {

  @Input() dataSource: DataChart[] = [];
  @Input() color: string = '#d32f2f';
  @Input() gapBar: number = 130;

  constructor() { }

  ngOnInit() {
  }

}
