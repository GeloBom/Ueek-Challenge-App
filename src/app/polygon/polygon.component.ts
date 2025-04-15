import { Component, OnInit, effect, inject } from '@angular/core';
import { PolygonService } from '../services/polygon/polygon.service';
import { MapService } from '../services/map/map.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Feature, MapBrowserEvent } from 'ol';
import { Polygon } from 'ol/geom';
import Map from 'ol/Map';

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
  private map!: Map; // Adicionando a referência ao mapa
  opacityControl = 100;
  isRemovalMode = false;

  constructor(
    private polygonService: PolygonService,
    private mapService: MapService
  ) {
    effect(() => {
      this.vectorSource.clear();
      this.vectorSource.addFeatures(this.polygonService.polygons());
    });
  }

  ngOnInit(): void {
    this.map = this.mapService.getMap();
    this.map.addLayer(this.vectorLayer);
  }

  enableRemovalMode(): void {
    this.isRemovalMode = !this.isRemovalMode;

    if (this.isRemovalMode) {
      this.map.on('click', this.onMapClick.bind(this));
    } else {
      this.map.un('click', this.onMapClick.bind(this));
    }
  }

  private onMapClick(event: MapBrowserEvent<any>): void {
    if (!this.isRemovalMode) return;

    const clickedFeature = this.map.forEachFeatureAtPixel(
      event.pixel,
      (feature) => feature,
      {
        layerFilter: (layer) => layer === this.vectorLayer,
      }
    );

    if (clickedFeature) {
      this.polygonService.removePolygon(clickedFeature as Feature<Polygon>);
    }
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
