import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { MAP_DEFAULT_CONFIG } from './map.config';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;

  /**
   * Inicializa o mapa com as configurações padrão.
   * @param target - ID do elemento HTML onde o mapa será renderizado.
   */
  initializeMap(target: string): Map {
    try {
      this.map = new Map({
        target: target,
        controls: [], // Remove os controles padrão
        layers: [
          new TileLayer({
            source: new OSM({
              attributions: [], // Remove os créditos padrão
            }),
          }),
        ],
        view: new View({
          center: MAP_DEFAULT_CONFIG.center, // Centro do mapa
          zoom: MAP_DEFAULT_CONFIG.zoomLevel, // Nível de zoom inicial
        }),
      });
      return this.map;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to initialize the map:', errorMessage);
      throw error;
    }
  }

  /**
   * Retorna a instância do mapa.
   */
  getMap(): Map {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }
    return this.map;
  }

  /**
   * Ajusta o nível de zoom do mapa.
   * @param delta - Valor a ser adicionado ou subtraído do nível de zoom atual.
   */
  adjustZoom(delta: number): void {
    const map = this.getMap();
    const view = map.getView();
    const zoom = view.getZoom() || 0;
    view.animate({
      zoom: zoom + delta,
      duration: 200,
    });
  }

  /**
   * Aumenta o nível de zoom do mapa em 1.
   */
  zoomIn(): void {
    this.adjustZoom(1);
  }

  /**
   * Diminui o nível de zoom do mapa em 1.
   */
  zoomOut(): void {
    this.adjustZoom(-1);
  }
}