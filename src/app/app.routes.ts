import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MetricsComponent } from './pages/metrics/metrics.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "/metrics/*", component: MetricsComponent }
];