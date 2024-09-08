import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartComponent } from '../../components/chart/chart.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, ChartComponent],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent {
  @Input()
  asset!: string

  constructor(public commonService: CommonService) { }
}