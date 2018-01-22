import * as React from 'react';
import * as Color from 'color';
import Header from './components/header';
import Main from './main';
import Aside from './components/aside';
import Footer from './components/footer';
import Fragment from './components/fragment';
import { fetchPolygons, intersectionOfPolygons, unionOfPolygons } from './api';
import { Feature, FeatureCollection, JsonFeature, JsonFeatureCollection } from './domain';
import SvgViewer from './viewer/svgviewer';
import createColorScheme from './utils/color';
import { numberOfSelectedPolygons, selectedPolygonIds } from './utils/domainutils';
import LeafletViewer from './viewer/leafletviewer';

interface State {
    featureCollection: FeatureCollection | null;
}

function generateId(index: number): string {
    return `${index}`;
}

class App extends React.Component<{}, State> {
    state = { featureCollection: null };

    toggleFeatureSelection = (featureId: string) => {
        const { featureCollection } = this.state;
        if (featureCollection === null) {
            return;
        }

        const safeFeatureCollection: FeatureCollection = featureCollection;
        const selectedCount = numberOfSelectedPolygons(featureCollection);

        const features: Feature[] = safeFeatureCollection.features
            .map((feature) => {
                if (feature.id !== featureId) {
                    return feature;
                }
                if (!feature.isSelected && selectedCount === 2) {
                    return feature;
                }
                return { ...feature, isSelected: !feature.isSelected };
            });

        const newFeatureCollection: FeatureCollection = { ...safeFeatureCollection, features };
        this.setState({ featureCollection: newFeatureCollection });
    }

    union = () => {
        const featureIds: string[] = selectedPolygonIds(this.state.featureCollection);
        unionOfPolygons(featureIds[0], featureIds[1]).then(this.processState);
    }
    intersect = () => {
        const featureIds: string[] = selectedPolygonIds(this.state.featureCollection);
        intersectionOfPolygons(featureIds[0], featureIds[1]).then(this.processState);
    }

    processState = (jsonFeatureCollection: JsonFeatureCollection) => {
        const jsonFeatures: JsonFeature[] = jsonFeatureCollection.features;

        const colors: Color[] = createColorScheme(jsonFeatures.length);

        const features: Feature[] = jsonFeatures
            .map((feature, index) => ({
                ...feature,
                id: generateId(index),
                isSelected: false,
                color: colors[index]
            }));
        const featureCollection: FeatureCollection = { ...jsonFeatureCollection, features };

        this.setState({ featureCollection });
    }

    componentDidMount() {
        fetchPolygons().then(this.processState);
    }

    render() {
        const actions = {
            union: this.union,
            intersect: this.intersect
        };
        return (
            <Fragment>
                <Header/>
                <Main>
                    <LeafletViewer
                        featureCollection={this.state.featureCollection}
                        toggleFeatureSelection={this.toggleFeatureSelection}
                        actions={actions}
                    />
                </Main>
                <Aside>
                    <SvgViewer
                        featureCollection={this.state.featureCollection}
                        toggleFeatureSelection={this.toggleFeatureSelection}
                        actions={actions}
                    />
                </Aside>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
