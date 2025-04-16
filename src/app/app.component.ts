import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MapComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Ueek-Challenge-App';
}
