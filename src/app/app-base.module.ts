import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { DxChartModule, DxPieChartModule } from "devextreme-angular";
import { BarComponent } from "./component/common/chart/bar/bar.component";
import { BrowserModule } from "@angular/platform-browser";
import { WidgetComponent } from "./component/common/widget/widget.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { MultiSelectComponent } from "./component/common/multi-select/multi-select.component";
import { WidgetRemakeComponent } from "./component/common/widget-remake/widget-remake.component";
import { CardComponent } from "./component/common/chart/card/card.component";
import { DoughnutComponent } from "./component/common/chart/doughnut/doughnut.component";
import { VehicleAtFactoryComponent } from "./component/dashboard/vehicle-at-factory/vehicle-at-factory.component";
import { VehicleAtPortComponent } from "./component/dashboard/vehicle-at-port/vehicle-at-port.component";
import { OverviewCompanyComponent } from "./component/dashboard/overview-company/overview-company.component";

@NgModule({
    declarations: [
        WidgetComponent,
        DashboardComponent,
        BarComponent,
        MultiSelectComponent,
        WidgetRemakeComponent,
        CardComponent,
        DoughnutComponent,
        VehicleAtFactoryComponent,
        VehicleAtPortComponent,
        OverviewCompanyComponent
    ],
    imports: [
        BrowserModule,
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