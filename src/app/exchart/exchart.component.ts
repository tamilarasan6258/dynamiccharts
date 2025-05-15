import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ExpenseService, ExpenseData } from '../expense.service';
import { FormsModule } from '@angular/forms';


import * as echarts from 'echarts';

@Component({
  selector: 'app-exchart',
  imports: [FormsModule],
  templateUrl: './exchart.component.html',
  styleUrls: ['./exchart.component.css']
})
export class ExchartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance: echarts.ECharts | null = null;
  chartType: string = 'bar';
  expenses: ExpenseData[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngAfterViewInit(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.fetchExpenses();
    setTimeout(() => this.chartInstance?.resize(), 100);
  }

  fetchExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.renderChart();
      },
      error: (err) => {
        console.error('Failed to fetch expense data', err);
      }
    });
  }

  renderChart(): void {
    if (!this.chartInstance || this.expenses.length === 0) return;

    const months = this.expenses.map(e => e.month);
    const shopping = this.expenses.map(e => e.shopping);
    const food = this.expenses.map(e => e.food);
    const travel = this.expenses.map(e => e.travel);
    const others = this.expenses.map(e => e.others);

    const commonOption = {
      title: { text: 'Monthly Expenses', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { top: 30 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value', name: 'Amount (₹)' }
    };

    let series;

    if (this.chartType === 'bar') {
      series = [
        { name: 'Shopping', type: 'bar', data: shopping },
        { name: 'Food', type: 'bar', data: food },
        { name: 'Travel', type: 'bar', data: travel },
        { name: 'Others', type: 'bar', data: others }
      ];
    } else if (this.chartType === 'line') {
      series = [
        { name: 'Shopping', type: 'line', data: shopping, smooth: true },
        { name: 'Food', type: 'line', data: food, smooth: true },
        { name: 'Travel', type: 'line', data: travel, smooth: true },
        { name: 'Others', type: 'line', data: others, smooth: true }
      ];
    } else if (this.chartType === 'area') {
      series = [
        { name: 'Shopping', type: 'line', data: shopping, areaStyle: {}, smooth: true },
        { name: 'Food', type: 'line', data: food, areaStyle: {}, smooth: true },
        { name: 'Travel', type: 'line', data: travel, areaStyle: {}, smooth: true },
        { name: 'Others', type: 'line', data: others, areaStyle: {}, smooth: true }
      ];
    } else if (this.chartType === 'pie') {
      const total = {
        shopping: shopping.reduce((a, b) => a + b, 0),
        food: food.reduce((a, b) => a + b, 0),
        travel: travel.reduce((a, b) => a + b, 0),
        others: others.reduce((a, b) => a + b, 0)
      };
      const pieData = [
        { name: 'Shopping', value: total.shopping },
        { name: 'Food', value: total.food },
        { name: 'Travel', value: total.travel },
        { name: 'Others', value: total.others }
      ];

      this.chartInstance.setOption({
        title: { text: 'Total Expenses by Category', left: 'center' },
        tooltip: { trigger: 'item', formatter: '{b}: ₹{c} ({d}%)' },
        legend: { bottom: 10, left: 'center' },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }, true);
      return;
    }

    // Set final option
    this.chartInstance.setOption({ ...commonOption, series }, true);
  }
}
