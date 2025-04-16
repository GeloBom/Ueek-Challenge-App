import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolygonComponent } from './polygon.component';
import { PolygonService } from '../../services/polygon/polygon.service';
import { MapService } from '../../services/map/map.service';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import { MapBrowserEvent } from 'ol';
import { Pixel } from 'ol/pixel';

describe('PolygonComponent', () => {
  let component: PolygonComponent;
  let fixture: ComponentFixture<PolygonComponent>;
  let polygonService: PolygonService;
  let mapService: MapService;

  beforeEach(async () => {
    const mockMapService = jasmine.createSpyObj('MapService', [
      'getMap',
      'initializeMap',
      'zoomIn',
      'zoomOut',
    ]);
    mockMapService.getMap.and.returnValue({
      getView: () => ({
        fit: jasmine.createSpy('fit'),
      }),
      addLayer: jasmine.createSpy('addLayer'), // Mock do método addLayer
    });

    await TestBed.configureTestingModule({
      imports: [PolygonComponent], // Adicione o PolygonComponent aqui
      providers: [
        PolygonService,
        { provide: MapService, useValue: mockMapService }, // Mock do MapService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PolygonComponent);
    component = fixture.componentInstance;
    polygonService = TestBed.inject(PolygonService);
    mapService = TestBed.inject(MapService);
    fixture.detectChanges();
  });

  it('should add a single polygon and zoom to it', () => {
    const center: [number, number] = [-50.3265, -27.8159];
    const maxArea = 1000000;

    spyOn(component, 'zoomToPolygon').and.callThrough();

    component.addSinglePolygonWithZoom();

    expect(mapService.getMap).toHaveBeenCalled();
    expect(component.zoomToPolygon).toHaveBeenCalled();
    expect(polygonService.polygons().length).toBe(1);
  });

  it('should generate and add 1 to 4 random polygons', () => {
    const initialPolygons = polygonService.polygons();
    const center: [number, number] = [-50.3265, -27.8159];
    const maxArea = 1000000;

    polygonService.addRandomPolygons(center, maxArea);

    const updatedPolygons = polygonService.polygons();
    const addedPolygons = updatedPolygons.length - initialPolygons.length;

    expect(addedPolygons).toBeGreaterThanOrEqual(1);
    expect(addedPolygons).toBeLessThanOrEqual(4);
    updatedPolygons.forEach((polygon: { getGeometry: () => any }) => {
      expect(polygon).toBeInstanceOf(Feature);
      expect(polygon.getGeometry()).toBeInstanceOf(Polygon);
    });
  });

  it('should clear all polygons', () => {
    const center: [number, number] = [-50.3265, -27.8159];
    const maxArea = 1000000;

    polygonService.addRandomPolygons(center, maxArea);
    expect(polygonService.polygons().length).toBeGreaterThan(0);

    polygonService.clearPolygons();
    expect(polygonService.polygons().length).toBe(0);
  });

  it('should recolor all polygons', () => {
    const center: [number, number] = [-50.3265, -27.8159];
    const maxArea = 1000000;

    polygonService.addRandomPolygons(center, maxArea);
    const initialStyles = polygonService
      .polygons()
      .map((polygon) => polygon.getStyle());

    polygonService.recolorAllPolygons();
    const updatedStyles = polygonService
      .polygons()
      .map((polygon) => polygon.getStyle());

    initialStyles.forEach((style, index) => {
      expect(style).not.toEqual(updatedStyles[index]);
    });
  });

  it('should remove a polygon from the list', () => {
    const polygon1 = new Feature(
      new Polygon([
        [
          [0, 0],
          [1, 1],
          [1, 0],
          [0, 0],
        ],
      ])
    );
    const polygon2 = new Feature(
      new Polygon([
        [
          [1, 1],
          [2, 2],
          [2, 1],
          [1, 1],
        ],
      ])
    );

    polygonService.polygons.update(() => [polygon1, polygon2]);

    expect(polygonService.polygons().length).toBe(2);

    polygonService.removePolygon(polygon1);

    expect(polygonService.polygons().length).toBe(1);
    expect(polygonService.polygons()).not.toContain(polygon1);
    expect(polygonService.polygons()).toContain(polygon2);
  });
});
