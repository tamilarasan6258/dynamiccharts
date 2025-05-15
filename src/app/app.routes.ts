import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExchartComponent } from './exchart/exchart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';


export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'exchart', component:ExchartComponent},
    {path:'piechart', component:PieChartComponent},
    {path:'barchart', component:BarChartComponent},
    {path:'linechart', component:LineChartComponent},
   



    


];
