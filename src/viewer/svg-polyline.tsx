import * as React from 'react';
import * as Color from 'color';
import { Feature } from '../domain';

function join(delimiter: string) {
    return (list: number[]) => list.join(delimiter);
}

interface Props {
    feature: Feature;
    onClick: (event: React.MouseEvent<SVGElement>) => void;
}

function getColor(feature: Feature): string {
    const originalColor = feature.properties && feature.properties.color ? feature.properties.color : Color.rgb(0);
    if (feature.properties && feature.properties.isSelected) {
        return originalColor.alpha(0.85).toString();
    } else {
        return originalColor.toString();
    }
}

function SvgPolyline({ feature, onClick }: Props) {
    const points: string = feature.geometry ? feature.geometry.coordinates[0].map(join(',')).join(' ') : '';
    const color = getColor(feature);
    return (
        <polyline fill={color} points={points} onClick={onClick}/>
    );
}

export function toSvgPolyline(toggleFeatureSelection: (featureId: string) => void) {
    return (feature: Feature) => {
        let featureId = '' + (feature.id || '');
        const onClick = (event: React.MouseEvent<SVGElement>) => {
            console.log('clicked', featureId); // tslint:disable-line
            toggleFeatureSelection(featureId);
        };
        return <SvgPolyline key={feature.id} feature={feature} onClick={onClick}/>;
    };
}

export default SvgPolyline;