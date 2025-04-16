import { Feature } from "ol";
import { Polygon } from "ol/geom";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export class PolygonSerializer {
  static serialize(features: Feature<Polygon>[]): string {
    return JSON.stringify(features.map(feature => {
      const style = feature.getStyle();
      let fillColor: string | undefined;
      let strokeColor: string | undefined;
      let strokeWidth: number | undefined;

      if (style instanceof Style) {
        fillColor = style.getFill()?.getColor() as string;
        strokeColor = style.getStroke()?.getColor() as string;
        strokeWidth = style.getStroke()?.getWidth();
      } else if (Array.isArray(style)) {
        fillColor = style[0]?.getFill()?.getColor() as string;
        strokeColor = style[0]?.getStroke()?.getColor() as string;
        strokeWidth = style[0]?.getStroke()?.getWidth();
      } else if (typeof style === 'function') {
        const resolvedStyle = style(feature, 1); 
        if (Array.isArray(resolvedStyle)) {
          fillColor = resolvedStyle[0]?.getFill()?.getColor() as string;
          strokeColor = resolvedStyle[0]?.getStroke()?.getColor() as string;
          strokeWidth = resolvedStyle[0]?.getStroke()?.getWidth();
        } else {
          fillColor = resolvedStyle?.getFill()?.getColor() as string;
          strokeColor = resolvedStyle?.getStroke()?.getColor() as string;
          strokeWidth = resolvedStyle?.getStroke()?.getWidth();
        }
      }

      return {
        geometry: feature.getGeometry()?.getCoordinates(),
        fillColor,
        strokeColor,
        strokeWidth,
      };
    }));
  }

  static deserialize(data: string): Feature<Polygon>[] {
    const parsed = JSON.parse(data);
    return parsed.map((item: any) => {
      const feature = new Feature({
        geometry: new Polygon(item.geometry),
      });
      feature.setStyle(
        new Style({
          fill: new Fill({ color: item.fillColor }),
          stroke: new Stroke({
            color: item.strokeColor || '#000', 
            width: item.strokeWidth || 1, 
          }),
        })
      );
      return feature;
    });
  }
}