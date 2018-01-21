import * as React from 'react';
import { Feature } from '../domain';

function join(delimiter: string) {
    return (list: number[]) => list.join(delimiter);
}

interface Props {
    feature: Feature;
    onClick: (event: React.MouseEvent<SVGElement>) => void;
}

function SvgPolyline({ feature, onClick }: Props) {
    const points: string = feature.geometry.coordinates[0].map(join(',')).join(' ');
    const color = feature.isSelected ? feature.color.alpha(0.85).toString() : feature.color.toString();
    return (
        <polyline fill={color} points={points} onClick={onClick}/>
    );
}

export function toSvgPolyline(toggleFeatureSelection: (featureId: string) => void) {
    return (feature: Feature) => {
        const onClick = (event: React.MouseEvent<SVGElement>) => toggleFeatureSelection(feature.id);
        return <SvgPolyline key={feature.id} feature={feature} onClick={onClick}/>;
    };
}

export default SvgPolyline;