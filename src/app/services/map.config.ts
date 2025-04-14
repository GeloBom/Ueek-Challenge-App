import { fromLonLat } from 'ol/proj';


export const MAP_DEFAULT_CONFIG = { // Default map configuration
    center : fromLonLat([-50.3259, -27.8158]),
    zoomLevel: 12,
};