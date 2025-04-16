import { Injectable, signal } from '@angular/core';
import { MAP_DEFAULT_CONFIG } from './map.config';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;

  // Signal to store the current zoom level
  zoomLevel = signal<number>(MAP_DEFAULT_CONFIG.zoomLevel);

  initializeMap(target: string): Map {
    try {
      this.map = new Map({
        target: target,
        controls: [],
        layers: [
          new TileLayer({
            source: new OSM({
              attributions: [],
            }),
          }),
        ],
        view: new View({
          center: MAP_DEFAULT_CONFIG.center,
          zoom: MAP_DEFAULT_CONFIG.zoomLevel,
        }),
      });

      const view = this.map.getView();
      this.zoomLevel.set(view.getZoom() || MAP_DEFAULT_CONFIG.zoomLevel);

      return this.map;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to initialize the map:', errorMessage);
      throw error;
    }
  }

  getMap(): Map {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }
    return this.map;
  }

  /**
   * Adjusts the zoom level of the map.
   * @param delta - Value to add or subtract from the current zoom level.
   */
  adjustZoom(delta: number): void {
    const map = this.getMap();
    const view = map.getView();
    const zoom = view.getZoom() || 0;

    view.animate({
      zoom: zoom + delta,
      duration: 200,
    });

    this.zoomLevel.set(zoom + delta);
  }

  zoomIn(): void {
    this.adjustZoom(1);
  }


  zoomOut(): void {
    this.adjustZoom(-1);
  }
}