import * as React from 'react';
import { LatLngExpression } from 'leaflet';
import { Map, Polygon, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinate, FeatureCollection, SvgViewbox } from '../domain';
import { findViewbox, paddViewbox } from './svgutils';
import { numberOfSelectedPolygons } from '../utils/domainutils';
import SvgButton from './svg-button';

type LeafletViewerProps = {
    featureCollection: FeatureCollection | null;
    toggleFeatureSelection: (featureId: string) => void;
    actions: {
        union: () => void;
        intersect: () => void;
    }
};

class LeafletViewer extends React.Component<LeafletViewerProps, {}> {
    viewbox: SvgViewbox | null = null;

    componentWillUpdate(nextProps: LeafletViewerProps) {
        const { featureCollection } = nextProps;
        if (featureCollection !== null && this.viewbox === null) {
            const coordinates: Coordinate[] = featureCollection.features
                .map((feature) => feature.geometry.coordinates[0])
                .reduce((list, element) => [...list, ...element], []);

            const viewbox: SvgViewbox = findViewbox(coordinates);
            this.viewbox = paddViewbox(viewbox, 0.2);
        }
    }

    render() {
        const { featureCollection, toggleFeatureSelection, actions } = this.props;
        if (featureCollection === null || this.viewbox === null) {
            return (
                <svg viewBox="0 0 100 100">
                    <text x="50" y="40" textAnchor="middle" fontSize={12}>No polygons found</text>
                </svg>
            );
        }

        // const selectedCount = numberOfSelectedPolygons(featureCollection);
        const random: string = ('' + Math.random());
        const polylines = featureCollection.features.map((feature) => {
            const positions = feature.geometry.coordinates[0]
                .map((coordinate) => [coordinate[1], coordinate[0]]) as LatLngExpression[];

            const color = feature.color.alpha(1).toString();
            const key = `${random}-${feature.id}`;
            const onclick = () => toggleFeatureSelection(feature.id);
            if (feature.isSelected) {
                return (<Polygon key={key} fillColor={color} color="black" positions={positions} onclick={onclick}/>);
            } else {
                return (<Polygon key={key} color={color} positions={positions} onclick={onclick}/>);
            }

        });

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
                    {polylines}
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