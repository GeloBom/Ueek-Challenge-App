import { Injectable, signal } from '@angular/core';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { fromLonLat } from 'ol/proj';

@Injectable({ providedIn: 'root' })
export class PolygonService {
  polygons = signal<Feature<Polygon>[]>([]); // Signal to hold the polygons
  opacity = signal<number>(0.5); // Signal to hold the opacity


  generateRandomPolygon(
    center: [number, number],
    maxArea: number
  ): Feature<Polygon> {
    const sides = Math.floor(Math.random() * 4) + 3; // 3 to 6 sides
    const radius = Math.random() * 0.01 + 0.005; // radius betwen 0.005 and 0.015
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
    coordinates.push(coordinates[0]); // close the polygon

    const polygon = new Polygon([coordinates]);
    console.log('Generated polygon:', polygon); // log to debug the generated polygon

    if (polygon.getArea() > maxArea) {
      console.warn('Polygon area too large, regenerating...');
      return this.generateRandomPolygon(center, maxArea); // regenerate if area is too large
    }

    const feature = new Feature({ geometry: polygon });
    feature.setStyle(this.getRandomStyle());
    return feature;
  }

  addRandomPolygons(center: [number, number], maxArea: number): void {
    const numberOfPolygons = Math.floor(Math.random() * 4) + 1; // 1 to 4 polygons
    const polygons: Feature<Polygon>[] = [];
  
    for (let i = 0; i < numberOfPolygons; i++) {
      // creates a random offset for the center
      const offsetX = (Math.random() - 0.5) * 0.05; // 0.05 degrees ~ 5 km
      const offsetY = (Math.random() - 0.5) * 0.05; // 0.05 degrees ~ 5 km
  
      const randomCenter: [number, number] = [
        center[0] + offsetX,
        center[1] + offsetY,
      ];
  
      // generates a random polygon with the new center
      const polygon = this.generateRandomPolygon(randomCenter, maxArea);
      polygons.push(polygon);
    }
  
    // Updates the signal with the new polygons
    this.polygons.update((currentPolygons) => [...currentPolygons, ...polygons]);
  
    console.log(`${numberOfPolygons} polygons added to signal:`, polygons); // Log para depuração
  }

  clearPolygons(): void {
    this.polygons.set([]); // Clear the polygons signal
  }

  private getRandomStyle(): Style {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    const currentOpacity = this.opacity();
    
    return new Style({
      fill: new Fill({ 
        color: `${color}${Math.round(currentOpacity * 255).toString(16).padStart(2, '0')}`
      }),
      stroke: new Stroke({ color: '#000', width: 1 })
    });
  }

  updatePolygonsOpacity(newOpacity: number): void {
    this.opacity.set(newOpacity);
    const currentFeatures = this.polygons();
    
    currentFeatures.forEach(feature => {
      const currentStyle = feature.getStyle() as Style;
      const fillColor = this.extractAndUpdateOpacity(
        (currentStyle.getFill() as Fill).getColor() as string,
        newOpacity
      );
      
      feature.setStyle(new Style({
        fill: new Fill({ color: fillColor }),
        stroke: currentStyle.getStroke() || undefined
      }));
    });
  }

  private extractAndUpdateOpacity(color: string, opacity: number): string {
    // converts the color to a hex format with the new opacity
    if (color.startsWith('#')) {
      return color.substring(0, 7) + Math.round(opacity * 255).toString(16).padStart(2, '0');
    } else if (color.startsWith('rgba')) {
      return color.replace(/[\d\.]+\)$/, opacity + ')');
    }
    return color;
  }
}