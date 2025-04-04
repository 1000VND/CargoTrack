import { Component, OnInit } from '@angular/core';
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

    this.refreshData();
  }

  ngOnInit() { }

  /**
   * Làm mới dữ liệu cho các component con
   */
  refreshData() {
    this.selectedItems = []
  }

  onSelect(e: any){
    
  }
}
