import { Component, OnInit } from '@angular/core';
import { MAP_CONFIG } from './map.config';

import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

const lagesCoordinates = MAP_CONFIG.center;
const zoomLevel = MAP_CONFIG.zoomLevel;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  map!: Map;
  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  zoomIn() {
    const view = this.map.getView();
    const zoom = view.getZoom() || 0;
    view.animate({
      zoom: zoom + 1,
      duration: 200,
    });
  }

  zoomOut() {
    const view = this.map.getView();
    const zoom = view.getZoom() || 0;
    view.animate({
      zoom: zoom - 1,
      duration: 200,
    });
  }

  initializeMap() {
    try {
      this.map = new Map({
        target: 'map',
        controls: [], // Disable default controls
        layers: [
          new TileLayer({
            source: new OSM({
              attributions: [], // Delete atributions label
            }),
          }),
        ],
        view: new View({
          center: lagesCoordinates,
          zoom: zoomLevel,
        }),
      });
    } catch (error) {
      console.error('Failed to initialize the map:', error);
    }
  }
}
