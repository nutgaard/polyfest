import * as React from 'react';
import { Coordinate, FeatureCollection, SvgViewbox } from '../domain';
import { findViewbox, paddViewbox } from './svgutils';
import './svgviewer.css';
import { toSvgPolyline } from './svg-polyline';
import SvgButton from './svg-button';
import { numberOfSelectedPolygons } from '../utils/domainutils';

type SvgViewerProps = {
    featureCollection: FeatureCollection | null;
    toggleFeatureSelection: (featureId: string) => void;
    actions: {
        union: () => void;
        intersect: () => void;
    }
};

class SvgViewer extends React.Component<SvgViewerProps, {}> {
    viewbox: SvgViewbox | null = null;

    componentWillUpdate(nextProps: SvgViewerProps) {
        const { featureCollection } = nextProps;
        if (featureCollection !== null && this.viewbox === null) {
            const coordinates: Coordinate[] = featureCollection.features
                .map((feature) => feature.geometry ? feature.geometry.coordinates[0] : [])
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

        const selectedCount = numberOfSelectedPolygons(featureCollection);
        const polylines = featureCollection.features.map(toSvgPolyline(toggleFeatureSelection));

        return (
            <div className="svgviewer">
                <svg viewBox={this.viewbox.svgString}>
                    {polylines}
                </svg>
                <div className="svgviewer__btn-group">
                    <SvgButton disabled={selectedCount < 2} onClick={actions.union}>Union</SvgButton>
                    <SvgButton disabled={selectedCount < 2} onClick={actions.intersect}>Intersect</SvgButton>
                </div>
            </div>
        );
    }
}

export default SvgViewer;