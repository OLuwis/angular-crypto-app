import { Component, ElementRef, Input, ViewChild, afterRender } from '@angular/core';
import { Chart } from "chart.js/auto"
import "chartjs-adapter-date-fns"

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
  @Input() timeUnit: false | "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" = false;
  @Input() tooltipFormat: string = ""
  chart!: Chart;

  constructor() {
    afterRender(() => {
      this.chart = new Chart(this.element.nativeElement, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.data,
              fill: "start",
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              text: this.title,
              display: true
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
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: this.timeUnit,
                tooltipFormat: this.tooltipFormat,
                displayFormats: {
                  minute: "HH:mm",
                  hour: "HH:mm",
                  day: "dd/MM"
                }
              },
              ticks: {
                source: "labels"
              }
            },
            y: {
              ticks: {
                maxTicksLimit: 4
              }
            }
          }
        },
      })
    })
  }
}
