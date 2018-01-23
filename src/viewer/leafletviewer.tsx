import * as React from 'react';
import { Layer, StyleFunction } from 'leaflet';
import { GeoJSON, Map, TileLayer } from 'react-leaflet';
import SvgButton from './svg-button';
import { Coordinate, Feature, FeatureCollection, SvgViewbox } from '../domain';
import { findViewbox, paddViewbox } from './svgutils';
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
    viewbox: SvgViewbox | null = null;

    componentWillUpdate(nextProps: LeafletViewerProps) {
        const { featureCollection } = nextProps;
        if (featureCollection !== null && this.viewbox === null) {
            const coordinates: Coordinate[] = featureCollection.features
                .map((feature) => feature.geometry ? feature.geometry.coordinates[0] : [])
                .reduce((list, element) => [...list, ...element], []);

            const viewbox: SvgViewbox = findViewbox(coordinates);
            this.viewbox = paddViewbox(viewbox, 0.2);
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
        if (featureCollection === null || this.viewbox === null) {
            return (
                <svg viewBox="0 0 100 100">
                    <text x="50" y="40" textAnchor="middle" fontSize={12}>No polygons found</text>
                </svg>
            );
        }

        const random: string = ('' + Math.random());

        const position: [number, number] = [
            this.viewbox.miny + this.viewbox.height / 2,
            this.viewbox.minx + this.viewbox.width / 2
        ];
        const selectedCount = numberOfSelectedPolygons(featureCollection);

        return (
            <div className="leafletviewer">
                <Map center={position} zoom={14}>
                    <TileLayer
                        attribution="OSM"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        key={random}
                        data={featureCollection}
                        onEachFeature={this.eachFeature}
                        style={this.style}
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