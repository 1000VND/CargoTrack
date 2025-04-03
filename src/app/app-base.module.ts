import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSelectModule } from '@ng-select/ng-select';
import { DxChartModule, DxPieChartModule } from "devextreme-angular";
import { BarComponent } from "./component/common/chart/bar/bar.component";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { MultiSelectComponent } from "./component/common/multi-select/multi-select.component";
import { CardComponent } from "./component/common/chart/card/card.component";
import { DoughnutComponent } from "./component/common/chart/doughnut/doughnut.component";
import { VehicleAtFactoryComponent } from "./component/dashboard/vehicle-at-factory/vehicle-at-factory.component";
import { VehicleAtPortComponent } from "./component/dashboard/vehicle-at-port/vehicle-at-port.component";
import { OverviewCompanyComponent } from "./component/dashboard/overview-company/overview-company.component";
import { SummaryComponent } from "./component/dashboard/summary/summary.component";
import { VehicleAtBorderComponent } from "./component/dashboard/vehicle-at-border/vehicle-at-border.component";
import { VehicleAtRoadComponent } from "./component/dashboard/vehicle-at-road/vehicle-at-road.component";
import { WidgetComponent } from "./component/common/widget/widget.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        MultiSelectComponent,
        WidgetComponent,
        BarComponent,
        CardComponent,
        DoughnutComponent,
        VehicleAtFactoryComponent,
        VehicleAtPortComponent,
        OverviewCompanyComponent,
        SummaryComponent,
        VehicleAtBorderComponent,
        VehicleAtRoadComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        DxPieChartModule,
        DxChartModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        DxPieChartModule,
        DxChartModule,
    ],
    providers: [

    ]
})
export class AppBaseModule { }