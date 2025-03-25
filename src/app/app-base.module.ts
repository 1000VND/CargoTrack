import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { DxChartModule, DxPieChartModule } from "devextreme-angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        DxPieChartModule,
        DxChartModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        DxPieChartModule,
        DxChartModule
    ],
    providers: []
})
export class AppBaseModule { }