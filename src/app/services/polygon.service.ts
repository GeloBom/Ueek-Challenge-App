import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

@Injectable({ providedIn: 'root' })
export class PolygonService {
  generateRandomPolygon(center: [number, number], maxArea: number): Feature<Polygon> {
    // Generate a random polygon
    const sides = Math.floor(Math.random() * 4) + 3; // 3 to 6 sides
    const radius = Math.random() * 0.01 + 0.005; // radius between 0.005 and 0.015
    const coordinates = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      coordinates.push([x, y]);
    }
    coordinates.push(coordinates[0]); // Close the polygon

    const polygon = new Polygon([coordinates]);
    if (polygon.getArea() > maxArea) {
      return this.generateRandomPolygon(center, maxArea); // Retry if the area is too large
    }

    const feature = new Feature({ geometry: polygon });
    feature.setStyle(this.getRandomStyle());
    return feature;
  }

  private getRandomStyle(): Style {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    return new Style({
      fill: new Fill({ color: `${color}80` }), // 80 = 50% opacity
      stroke: new Stroke({ color: '#000', width: 1 }),
    });
  }
}