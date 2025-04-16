import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { MapService } from '../../services/map/map.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MapService', ['initializeMap', 'zoomIn', 'zoomOut', 'getMap']);
    
    // Mock do retorno de getMap
    spy.getMap.and.returnValue({
      getView: () => ({
        fit: jasmine.createSpy('fit'),
      }),
      addLayer: jasmine.createSpy('addLayer'), // Mock do método addLayer
    });
  
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [{ provide: MapService, useValue: spy }],
    }).compileComponents();
  
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    mapServiceSpy = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MapService.zoomIn when zoomIn is called', () => {
    component.zoomIn();
    expect(mapServiceSpy.zoomIn).toHaveBeenCalled();
  });

  it('should call MapService.zoomOut when zoomOut is called', () => {
    component.zoomOut();
    expect(mapServiceSpy.zoomOut).toHaveBeenCalled();
  });
});