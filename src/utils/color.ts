import * as Color from 'color';

export default function createColorScheme(numberOfColors: number): Color[] {
    const hueStep: number = 360 / numberOfColors;
    return new Array(numberOfColors)
        .fill(0)
        .map((_, index) => hueStep * index)
        .map((hue) => Color.hsl(hue, 50, 50, 0.35));
}