import { Feature } from "ol";
import { Polygon } from "ol/geom";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";

export class PolygonSerializer {
    static serialize(features: Feature<Polygon>[]): string {
      return JSON.stringify(features.map(feature => {
        const style = feature.getStyle();
        let fillColor: string | undefined;
  
        if (style instanceof Style) {
          fillColor = style.getFill()?.getColor() as string;
        } else if (Array.isArray(style)) {
          fillColor = style[0]?.getFill()?.getColor() as string;
        } else if (typeof style === 'function') {
          const resolvedStyle = style(feature, 1); 
          if (Array.isArray(resolvedStyle)) {
            fillColor = resolvedStyle[0]?.getFill()?.getColor() as string;
          } else {
            fillColor = resolvedStyle?.getFill()?.getColor() as string;
          }
        }
  
        return {
          geometry: feature.getGeometry()?.getCoordinates(),
          style: fillColor
        };
      }));
    }
  
    static deserialize(data: string): Feature<Polygon>[] {
      const parsed = JSON.parse(data);
      return parsed.map((item: any) => {
        const feature = new Feature({
          geometry: new Polygon(item.geometry)
        });
        feature.setStyle(new Style({
          fill: new Fill({ color: item.style })
        }));
        return feature;
      });
    }
  }