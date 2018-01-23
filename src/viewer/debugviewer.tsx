import * as React from 'react';
import * as geojsonValidator from 'geojson-validation';
import { FormEvent } from 'react';
import { FeatureCollection } from '../domain';
import './debugviewer.css';

type Props = {
    featureCollection: FeatureCollection | null;
    actions: {
        update: (geojson: FeatureCollection) => void;
    }
};
type State = {
    text: string;
    isValid: boolean;
};

class DebugViewer extends React.Component<Props, State> {
    state: State = { text: '', isValid: false };
    onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text: string = event.currentTarget.value;
        let isValid: boolean = false;
        try {
            const json: object = JSON.parse(text);
            isValid = geojsonValidator.valid(json);
        } catch (e) {
            isValid = false;
        }

        this.setState({ text, isValid });
    }

    onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.state.isValid) {
            const geojson: FeatureCollection = JSON.parse(this.state.text);
            this.props.actions.update(geojson);
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.featureCollection !== null) {
            const isValid: boolean = geojsonValidator.valid(props.featureCollection);
            const text: string = JSON.stringify(props.featureCollection, null, 2);
            this.setState({ text, isValid });
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="debugviewer">
                <textarea onChange={this.onChange} value={this.state.text} className="debugviewer__textarea"/>
                <button type="submit" disabled={!this.state.isValid} className="btn">
                    Oppdater
                </button>
            </form>
        );
    }
}

export default DebugViewer;