// polygon.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { PolygonService } from './polygon.service';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Fill from 'ol/style/Fill';

describe('PolygonService', () => {
  let service: PolygonService;
  const testCenter: [number, number] = [-50.3265, -27.8159];
  const testMaxArea = 1000000;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolygonService);
  });

  // Core functionality tests
  it('should generate valid Polygon features', () => {
    const polygon = service.generateRandomPolygon(testCenter, testMaxArea);
    expect(polygon.getGeometry()).toBeInstanceOf(Polygon);
  });

  // Signal state tests
  it('should update polygons signal when adding', () => {
    const initialCount = service.polygons().length;
    service.addRandomPolygons(testCenter, testMaxArea);
    expect(service.polygons().length).toBeGreaterThan(initialCount);
  });

  // Edge cases
  it('should respect maxArea parameter', () => {
    const smallPolygon = service.generateRandomPolygon(testCenter, 100);
    expect((smallPolygon.getGeometry() as Polygon).getArea()).toBeLessThanOrEqual(100);
  });

  // Cleanup tests
  it('should completely clear polygons', () => {
    service.addRandomPolygons(testCenter, testMaxArea);
    service.clearPolygons();
    expect(service.polygons().length).toBe(0);
  });
});