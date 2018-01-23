import * as React from 'react';
import * as Leaflet from 'leaflet';
import { Layer, StyleFunction } from 'leaflet';
import { GeoJSON, GeoJSONProps, Map, MapProps, TileLayer } from 'react-leaflet';
import SvgButton from './svg-button';
import { Feature, FeatureCollection } from '../domain';
import { numberOfSelectedPolygons } from '../utils/domainutils';
import 'leaflet/dist/leaflet.css';
import './leafletviewer.css';

type LeafletViewerProps = {
    featureCollection: FeatureCollection | null;
    toggleFeatureSelection: (featureId: string) => void;
    actions: {
        union: () => void;
        intersect: () => void;
    }
};

function getFeatureColor(feature: Feature): string {
    return feature.properties && feature.properties.color ? feature.properties.color.alpha(1).toString() : 'black';
}

class LeafletViewer extends React.Component<LeafletViewerProps, {}> {
    map: Map<MapProps, Leaflet.Map> | null = null;

    mapRef = (ref: Map<MapProps, Leaflet.Map> | null) => this.map = ref;
    geoRef = (ref: GeoJSON<GeoJSONProps, Leaflet.GeoJSON> | null) => {
        if (ref !== null && this.map !== null) {
            this.map.leafletElement.fitBounds(ref.leafletElement.getBounds());
        }
    }

    eachFeature = (feature: Feature, layer: Layer) => {
        layer.on('click', () => {
            if (feature.id) {
                this.props.toggleFeatureSelection(feature.id as string);
            }
        });
    }

    style: StyleFunction<object> = (feature: Feature) => {
        const color: string = getFeatureColor(feature);
        if (feature.properties && feature.properties.isSelected) {
            return { fillColor: color, color: 'black' };
        } else {
            return { color };
        }
    }

    render() {
        const { featureCollection, actions } = this.props;
        if (featureCollection === null) {
            return (
                <svg viewBox="0 0 100 100">
                    <text x="50" y="40" textAnchor="middle" fontSize={12}>No polygons found</text>
                </svg>
            );
        }

        const random: string = ('' + Math.random());

        const selectedCount = numberOfSelectedPolygons(featureCollection);

        return (
            <div className="leafletviewer">
                <Map ref={this.mapRef}>
                    <TileLayer
                        attribution="OSM"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        key={random}
                        data={featureCollection}
                        onEachFeature={this.eachFeature}
                        style={this.style}
                        ref={this.geoRef}
                    />
                </Map>
                <div className="svgviewer__btn-group">
                    <SvgButton disabled={selectedCount < 2} onClick={actions.union}>Union</SvgButton>
                    <SvgButton disabled={selectedCount < 2} onClick={actions.intersect}>Intersect</SvgButton>
                </div>
            </div>
        );
    }
}

export default LeafletViewer;