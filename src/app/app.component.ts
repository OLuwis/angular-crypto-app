import { Component, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule, MatIconRegistry } from "@angular/material/icon"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CommonService } from './services/common.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterOutlet, HomeComponent, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  breakpointsMap = new Map([
    [Breakpoints.XSmall, 1],
    [Breakpoints.Small, 2],
    [Breakpoints.Medium, 3],
    [Breakpoints.Large, 4],
    [Breakpoints.XLarge, 5]
  ])

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, breakpointObserver: BreakpointObserver, commonService: CommonService) {
    afterNextRender(() => commonService.loadLocalStorage())

    iconRegistry.addSvgIcon("logo", sanitizer.bypassSecurityTrustResourceUrl("logo.svg"))

    breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          commonService.setColumns(this.breakpointsMap.get(query) ?? 0);
        }
      }
    })
  }
}