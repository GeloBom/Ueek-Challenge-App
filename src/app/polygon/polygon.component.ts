import { Component, OnInit, effect, inject } from '@angular/core';
import { PolygonService } from '../services/polygon/polygon.service';
import { MapService } from '../services/map/map.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-polygon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.scss'],
})
export class PolygonComponent implements OnInit {
  private vectorSource = new VectorSource();
  private vectorLayer = new VectorLayer({ source: this.vectorSource });
  opacityControl = 100; // Opacity control value (0-100)

  constructor(
    private polygonService: PolygonService,
    private mapService: MapService
  ) {
    effect(() => {
      console.log('Polygons in signal:', this.polygonService.polygons());
      this.vectorSource.clear();
      this.vectorSource.addFeatures(this.polygonService.polygons());
      console.log(
        'Features in vector source:',
        this.vectorSource.getFeatures()
      );
    });
  }

  ngOnInit(): void {
    const map = this.mapService.getMap();
    map.addLayer(this.vectorLayer);
  }

  addRandomPolygons(): void {
    const center: [number, number] = [-50.3265, -27.8159];
    const maxArea = 100000000;
    this.polygonService.addRandomPolygons(center, maxArea);
  }

  clearPolygons(): void {
    this.polygonService.clearPolygons();
  }

  onOpacityChange(value: number): void {
    this.polygonService.updatePolygonsOpacity(value);
  }

  recolorPolygons(): void {
    this.polygonService.recolorAllPolygons();
  }
}
