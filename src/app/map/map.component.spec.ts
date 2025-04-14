import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call view.animate when zoomIn is called with map initialized', () => {
    const viewSpy = jasmine.createSpyObj('View', ['getZoom', 'animate']);
    spyOn(component.map, 'getView').and.returnValue(viewSpy);
    viewSpy.getZoom.and.returnValue(5);

    component.zoomIn();

    expect(viewSpy.animate).toHaveBeenCalledWith({ zoom: 6, duration: 200 });
  });

  it('should call view.animate when zoomOut is called with map initialized', () => {
    const viewSpy = jasmine.createSpyObj('View', ['getZoom', 'animate']);
    spyOn(component.map, 'getView').and.returnValue(viewSpy);
    viewSpy.getZoom.and.returnValue(5);

    component.zoomOut();

    expect(viewSpy.animate).toHaveBeenCalledWith({ zoom: 4, duration: 200 });
  });
});
