import { Component, OnInit } from '@angular/core';
import { MAP_DEFAULT_CONFIG } from './map.config';

import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';

const lagesCoordinates = MAP_DEFAULT_CONFIG.center; // Coordinates for Lages, SC, Brazil
const zoomLevel = MAP_DEFAULT_CONFIG.zoomLevel; // Default zoom level

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

  adjustZoom(delta: number) {
    if (!this.map) {
      console.error('Map is not initialized');
      return;
    }
    const view = this.map.getView();
    const zoom = view.getZoom() || 0;
    view.animate({
      zoom: zoom + delta,
      duration: 200,
    });
  }

  zoomIn() {
    this.adjustZoom(1); // Increase zoom level by 1
  }

  zoomOut() {
    this.adjustZoom(-1); // Decrease zoom level by 1
  }

  initializeMap() { // Initialize the map with default settings
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
    } catch (error) { // Handle any errors that occur during map initialization
      console.error('Failed to initialize the map:'); 
    }
  }
}
