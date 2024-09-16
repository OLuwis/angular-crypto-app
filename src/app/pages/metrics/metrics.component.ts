import { Component, Input, afterRender } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartComponent } from '../../components/chart/chart.component';
import { CommonService } from '../../services/common.service';
import { CryptoService } from '../../services/crypto.service';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MetricService } from '../../services/metric.service';
import { ChartData } from '../../types/chartData';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [UpperCasePipe, TitleCasePipe, MatCardModule, MatGridListModule, ChartComponent],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent {
  @Input("asset_id")
  asset_id?: string;
  asset_name?: string;
  img_src?: string;
  hourlyData?: ChartData;
  daylyData?: ChartData;
  weeklyData?: ChartData;
  monthlyData?: ChartData;

  constructor(public commonService: CommonService, public cryptoService: CryptoService, public metricService: MetricService, public titleService: Title) {
    metricService.getHourlyDataObservable().subscribe(data => this.hourlyData = data[0])
    metricService.getDaylyDataObservable().subscribe(data => this.daylyData = data[0])
    metricService.getWeeklyDataObservable().subscribe(data => this.weeklyData = data[0])
    metricService.getMonthlyDataObservable().subscribe(data => this.monthlyData = data[0])

    afterRender(() => {
      cryptoService.setIcons(64)
      cryptoService.setAssets()

      if (this.asset_id) {
        this.titleService.setTitle(`CryptoApp - ${this.asset_id.toUpperCase()}`)

        metricService.setHourlyData(this.asset_id, "10MIN", "7")
        metricService.setDaylyData(this.asset_id, "4HRS", "7")
        metricService.setWeeklyData(this.asset_id, "1DAY", "7")
        metricService.setMonthlyData(this.asset_id, "7DAY", "4")

        this.asset_name = cryptoService.getAssets().find(a => a.asset_id.toUpperCase() === this.asset_id!.toUpperCase())?.name

        this.img_src = cryptoService.getIcons().find(i => i.asset_id.toUpperCase() === this.asset_id?.toUpperCase())?.url
      }
    })
  }
}