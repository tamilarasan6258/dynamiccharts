import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ExpenseService, ExpenseData } from '../expense.service';

import * as echarts from 'echarts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
  standalone: true,
  imports: [] // add HttpClientModule in app.config.ts or main.ts
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance: echarts.ECharts | null = null;
  expenses: ExpenseData[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngAfterViewInit(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);

    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
      this.renderChart();
    });

    window.addEventListener('resize', () => {
      this.chartInstance?.resize();
    });
  }

  renderChart(): void {
    if (!this.chartInstance || this.expenses.length === 0) return;

    const months = this.expenses.map(e => e.month);
    const shopping = this.expenses.map(e => e.shopping);
    const food = this.expenses.map(e => e.food);
    const travel = this.expenses.map(e => e.travel);
    const others = this.expenses.map(e => e.others);

    const option: echarts.EChartsOption = {
      title: { text: 'Monthly Expenses by Category', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { top: 30 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value', name: 'Amount (₹)' },
      series: [
        { name: 'Shopping', type: 'bar', data: shopping },
        { name: 'Food', type: 'bar', data: food },
        { name: 'Travel', type: 'bar', data: travel },
        { name: 'Others', type: 'bar', data: others }
      ]
    };

    this.chartInstance.setOption(option, true);
  }
}
