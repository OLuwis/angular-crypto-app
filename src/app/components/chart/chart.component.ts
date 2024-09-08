import { Component, ElementRef, Input, ViewChild, afterRender } from '@angular/core';
import { Chart } from "chart.js/auto"

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @ViewChild("chart") element!: ElementRef<HTMLCanvasElement>;
  @Input() title: string = "";
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  chart!: Chart;

  constructor() {
    afterRender(() => {
      this.chart = new Chart(this.element.nativeElement, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              data: [20, 40, 10, 50, 90, 80, 60, 0, 100, 70, 120, 90],
              fill: "start"
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            filler: {
              propagate: false,
            },
            title: {
              display: true,
              text: this.title
            },
            legend: {
              display: false
            }
          },
          interaction: {
            intersect: false,
          },
          elements: {
            line: {
              tension: 0.4
            }
          }
        },
      })
    })
  }
}
