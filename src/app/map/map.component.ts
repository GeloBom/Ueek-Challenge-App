import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';

const lagesCoordinates = [-50.3259, -27.8158];
const zoomLevel = 4;

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  map: any;
  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: lagesCoordinates,
        zoom: zoomLevel,
      }),
    });
  }
}
