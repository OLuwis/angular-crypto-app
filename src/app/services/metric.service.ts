import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Metric } from "../types/metric";
import { BehaviorSubject, Observable } from "rxjs";
import { ChartData } from "../types/chartData";

@Injectable({
  providedIn: "root"
})
export class MetricService {
  private hourlyData = new BehaviorSubject<ChartData[]>([])
  private daylyData = new BehaviorSubject<ChartData[]>([])
  private weeklyData = new BehaviorSubject<ChartData[]>([])
  private monthlyData = new BehaviorSubject<ChartData[]>([])

  constructor(private http: HttpClient) { }

  getHourlyDataObservable(): Observable<ChartData[]> {
    return this.hourlyData.asObservable()
  }

  getDaylyDataObservable(): Observable<ChartData[]> {
    return this.daylyData.asObservable()
  }

  getWeeklyDataObservable(): Observable<ChartData[]> {
    return this.weeklyData.asObservable()
  }

  getMonthlyDataObservable(): Observable<ChartData[]> {
    return this.monthlyData.asObservable()
  }

  getHourlyData(): ChartData[] {
    return this.hourlyData.getValue()
  }

  getDaylyData(): ChartData[] {
    return this.daylyData.getValue()
  }

  getWeeklyData(): ChartData[] {
    return this.daylyData.getValue()
  }

  getMonthlyData(): ChartData[] {
    return this.monthlyData.getValue()
  }

  setHourlyData(asset_id: string, period_id: string, limit: string) {
    this.http
      .get<Metric[]>(`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${asset_id.toUpperCase()}_USD/history?period_id=${period_id}&limit=${limit}`)
      .subscribe(metrics => {
        const data: ChartData[] = [{ labels: [], values: [] }]
        metrics.forEach(metric => {
          data[0].labels.push(metric.time_period_start)
          data[0].values.push(metric.price_close)
        })
        this.hourlyData.next(data)
      })
  }

  setDaylyData(asset_id: string, period_id: string, limit: string) {
    this.http
      .get<Metric[]>(`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${asset_id.toUpperCase()}_USD/history?period_id=${period_id}&limit=${limit}`)
      .subscribe(metrics => {
        const data: ChartData[] = [{ labels: [], values: [] }]
        metrics.forEach(metric => {
          data[0].labels.push(metric.time_period_start)
          data[0].values.push(metric.price_close)
        })
        this.daylyData.next(data)
      })
  }

  setWeeklyData(asset_id: string, period_id: string, limit: string) {
    this.http
      .get<Metric[]>(`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${asset_id.toUpperCase()}_USD/history?period_id=${period_id}&limit=${limit}`)
      .subscribe(metrics => {
        const data: ChartData[] = [{ labels: [], values: [] }]
        metrics.forEach(metric => {
          data[0].labels.push(metric.time_period_start)
          data[0].values.push(metric.price_close)
        })
        this.weeklyData.next(data)
      })
  }

  setMonthlyData(asset_id: string, period_id: string, limit: string) {
    this.http
      .get<Metric[]>(`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${asset_id.toUpperCase()}_USD/history?period_id=${period_id}&limit=${limit}`)
      .subscribe(metrics => {
        const data: ChartData[] = [{ labels: [], values: [] }]
        metrics.forEach(metric => {
          data[0].labels.push(metric.time_period_start)
          data[0].values.push(metric.price_close)
        })
        this.monthlyData.next(data)
      })
  }
}