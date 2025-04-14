import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { PolygonComponent } from "../polygon/polygon.component.spec";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  imports: [PolygonComponent],
})
export class MapComponent implements OnInit {
  constructor(public mapService: MapService) {}

  ngOnInit() {
    this.mapService.initializeMap('map');
  }

  zoomIn() {
    this.mapService.zoomIn();
  }

  zoomOut() {
    this.mapService.zoomOut();
  }
}