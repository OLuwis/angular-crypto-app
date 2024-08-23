import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCardModule } from "@angular/material/card"
import { MatGridListModule } from "@angular/material/grid-list"
import { MatIconModule, MatIconRegistry } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { DomSanitizer } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatGridListModule, MatInputModule, MatFormFieldModule, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  columns: number = 0;

  breakpointsMap = new Map([
    [Breakpoints.XSmall, 1],
    [Breakpoints.Small, 2],
    [Breakpoints.Medium, 3],
    [Breakpoints.Large, 4],
    [Breakpoints.XLarge, 4]
  ])

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, breakpointObserver: BreakpointObserver) {
    iconRegistry.addSvgIcon("logo", sanitizer.bypassSecurityTrustResourceUrl("logo.svg"))

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.columns = this.breakpointsMap.get(query) ?? 0;
        }
      }
    })
  }
}