import { Component, OnInit, effect, inject } from '@angular/core';
import { PolygonService } from '../services/polygon/polygon.service';
import { MapService } from '../services/map/map.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'app-polygon',
  standalone: true,
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.scss'],
})
export class PolygonComponent implements OnInit {
  private vectorSource = new VectorSource();
  private vectorLayer = new VectorLayer({ source: this.vectorSource });

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

  addFixedPolygon(): void {
    this.polygonService.addFixedPolygon(); // Chama o serviço para adicionar o polígono fixo
  }

  addRandomPolygon(): void {
    const center: [number, number] = [-50.3265, -27.8159]; // Centro de Lages
    const maxArea = 5000000; // Área máxima em m²
    this.polygonService.addPolygon(center, maxArea);
  }

  clearPolygons(): void {
    this.polygonService.clearPolygons();
  }
}
