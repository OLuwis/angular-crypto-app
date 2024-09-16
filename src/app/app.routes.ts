import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MetricsComponent } from './pages/metrics/metrics.component';

export const routes: Routes = [
  { path: ":asset_id", component: MetricsComponent },
  { path: "", component: HomeComponent, title: "CryptoApp - Home" }
];