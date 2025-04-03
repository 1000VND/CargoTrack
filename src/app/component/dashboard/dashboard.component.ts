import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DataDashboards } from '../../data/seed-data';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  vehicles: { label: string; value: string | undefined | null }[] = [];
  selectedItems: string[] = [];

  constructor() {
    DataDashboards.forEach(e => {
      this.vehicles.push({
        value: e.vehicle,
        label: e.vehicle
      })
    });
  }

  ngOnInit() {
  }

  /**
   * Tính tổng tất cả dữ liệu của dashboard
   */
  totalDataDashboard() {
    this.selectedItems = Object.assign([], this.selectedItems);
  }

  modelChange(){
    
  }

}
