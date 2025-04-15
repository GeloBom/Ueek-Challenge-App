import { Injectable, signal } from '@angular/core';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { fromLonLat } from 'ol/proj';

@Injectable({ providedIn: 'root' })
export class PolygonService {
  // Signal para armazenar os polígonos criados
  polygons = signal<Feature<Polygon>[]>([]);

  generateRandomPolygon(
    center: [number, number],
    maxArea: number
  ): Feature<Polygon> {
    const sides = Math.floor(Math.random() * 4) + 3; // 3 a 6 lados
    const radius = Math.random() * 0.01 + 0.005; // Raio entre 0.005 e 0.015
    const coordinates = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      const x = fromLonLat([
        center[0] + radius * Math.cos(angle),
        center[1] + radius * Math.sin(angle),
      ])[0];
      const y = fromLonLat([
        center[0] + radius * Math.cos(angle),
        center[1] + radius * Math.sin(angle),
      ])[1];
      coordinates.push([x, y]);
    }
    coordinates.push(coordinates[0]); // Fecha o polígono

    const polygon = new Polygon([coordinates]);
    console.log('Generated polygon:', polygon); // Log para verificar o polígono gerado

    if (polygon.getArea() > maxArea) {
      console.warn('Polygon area too large, regenerating...');
      return this.generateRandomPolygon(center, maxArea); // Tenta novamente se a área for muito grande
    }

    const feature = new Feature({ geometry: polygon });
    feature.setStyle(this.getRandomStyle());
    return feature;
  }

  addFixedPolygon(): void {
    // Coordenadas fixas para um polígono de teste
    const coordinates = [
      [-50.345, -27.85], // Extremo sudoeste
      [-50.345, -27.78], // Extremo noroeste
      [-50.29, -27.78], // Extremo nordeste
      [-50.29, -27.85], // Extremo sudeste
      [-50.345, -27.85], // Fecha o polígono
    ];

    // Cria um polígono com as coordenadas fixas
    const polygon = new Polygon([coordinates]);
    const feature = new Feature({ geometry: polygon });

    // Atualiza o signal com o novo polígono
    this.polygons.update((currentPolygons) => [...currentPolygons, feature]);

    console.log('Fixed polygon added to signal:', feature); // Log para verificar o polígono
  }

  addPolygon(center: [number, number], maxArea: number): void {
    const polygon = this.generateRandomPolygon(center, maxArea);
    console.log('Polygon added to signal:', polygon); // Log para verificar o polígono
    this.polygons.update((currentPolygons) => [...currentPolygons, polygon]); // Atualiza o signal
  }

  clearPolygons(): void {
    this.polygons.set([]); // Limpa todos os polígonos
  }

  private getRandomStyle(): Style {
    const color = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
    return new Style({
      fill: new Fill({ color: `${color}80` }), // 80 = 50% de opacidade
      stroke: new Stroke({ color: '#000', width: 1 }),
    });
  }
}
