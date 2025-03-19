import { Component, OnInit } from '@angular/core';
import { AppBaseModule } from '../../app-base.module';
import { Vehicles } from '../../data/seed-data';
import { CollapseComponent } from "../common/collapse/collapse.component";
import { MultiSelectComponent } from '../common/multiselect/multiselect.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AppBaseModule, MultiSelectComponent, CollapseComponent],
  standalone: true,
})
export class HomeComponent implements OnInit {

  vehicles: { label: string; value: string }[] = [];
  selected = [];
  isCollapsedCompanyOverview: boolean = false;
  isCollapsedVehiclesAtBorder: boolean = false;
  widthCollapseCompanyOverview: string = 'auto'
  widthCollapseVehiclesAtBorder: string = 'auto'

  constructor() {
    Vehicles.forEach(e => {
      this.vehicles.push({
        value: e.type,
        label: e.type
      })
    });
  }

  ngOnInit() {
  }

  onReload() {
  }

  onChangeWidth(width: number) {
    switch (width) {
      case 1:
        this.widthCollapseCompanyOverview = '33-custom';
        break;

      case 2:
        this.widthCollapseCompanyOverview = '66-custom';
        break;

      case 3:
        this.widthCollapseCompanyOverview = '100';
        break;

      default:
        this.widthCollapseCompanyOverview = 'auto';
        break;
    }
  }

}