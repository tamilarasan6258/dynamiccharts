import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ExchartComponent } from './exchart/exchart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ExchartComponent,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chart-app';
}
