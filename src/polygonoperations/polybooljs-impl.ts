import * as polybooljs from 'polybooljs';
import { PolygonOperations } from './polygonoperation';
import { Feature, Geometry } from '../domain';

class PolyboolImpl implements PolygonOperations {
    union(subject: Feature, clip: Feature): Feature[] {
        const geometry: Geometry = polybooljs.polygonToGeoJSON(polybooljs.union(
            polybooljs.polygonFromGeoJSON(subject.geometry),
            polybooljs.polygonFromGeoJSON(clip.geometry)
        ));
        return [{ ...subject, geometry: geometry }];
    }

    intersect(subject: Feature, clip: Feature): Feature[] {
        const geometry: Geometry = polybooljs.polygonToGeoJSON(polybooljs.intersect(
            polybooljs.polygonFromGeoJSON(subject.geometry),
            polybooljs.polygonFromGeoJSON(clip.geometry)
        ));
        return [{ ...subject, geometry: geometry }];
    }

}

export default PolyboolImpl;