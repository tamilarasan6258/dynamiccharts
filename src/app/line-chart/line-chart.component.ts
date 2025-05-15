import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { ExpenseService, ExpenseData } from '../expense.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance: echarts.ECharts | null = null;
  chartType: string = 'bar';
  expenses: ExpenseData[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngAfterViewInit(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);

    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.renderChart();
        setTimeout(() => this.chartInstance?.resize(), 100);
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
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

    const option: echarts.EChartsOption = {
      title: { text: 'Monthly Expense Trends', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { top: 30 },
      xAxis: {
        type: 'category',
        data: months
      },
      yAxis: {
        type: 'value',
        name: 'Amount (₹)'
      },
      series: [
        { name: 'Shopping', type: 'line', data: shopping, smooth: true },
        { name: 'Food', type: 'line', data: food, smooth: true },
        { name: 'Travel', type: 'line', data: travel, smooth: true },
        { name: 'Others', type: 'line', data: others, smooth: true }
      ]
    };

    this.chartInstance.setOption(option, true);
  }
}
