import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { ExpenseService, ExpenseData } from '../expense.service'; // adjust path if needed

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance: echarts.ECharts | null = null;
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

    const total = { shopping: 0, food: 0, travel: 0, others: 0 };
    this.expenses.forEach(e => {
      total.shopping += e.shopping;
      total.food += e.food;
      total.travel += e.travel;
      total.others += e.others;
    });

    const pieData = [
      { name: 'Shopping', value: total.shopping },
      { name: 'Food', value: total.food },
      { name: 'Travel', value: total.travel },
      { name: 'Others', value: total.others }
    ];

    const option: echarts.EChartsOption = {
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
    };

    this.chartInstance.setOption(option, true);
  }
}
