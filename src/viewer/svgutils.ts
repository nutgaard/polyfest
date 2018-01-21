import { Coordinate, SvgViewbox } from '../domain';

export function findViewbox(coordinates: Coordinate[]): SvgViewbox {
    type MinMax = {
        minx: number;
        miny: number;
        maxx: number;
        maxy: number;
    };

    const minmax: MinMax = coordinates
        .reduce(
            (acc, coordinate) => {
                return {
                    minx: Math.min(coordinate[0], acc.minx),
                    miny: Math.min(coordinate[1], acc.miny),
                    maxx: Math.max(coordinate[0], acc.maxx),
                    maxy: Math.max(coordinate[1], acc.maxy)
                };
            },
            {
                minx: Number.POSITIVE_INFINITY,
                miny: Number.POSITIVE_INFINITY,
                maxx: Number.NEGATIVE_INFINITY,
                maxy: Number.NEGATIVE_INFINITY
            });

    const viewbox: SvgViewbox = {
        minx: minmax.minx,
        miny: minmax.miny,
        width: minmax.maxx - minmax.minx,
        height: minmax.maxy - minmax.miny
    };
    viewbox.svgString = `${viewbox.minx} ${viewbox.miny} ${viewbox.width} ${viewbox.height}`;

    return viewbox;
}

export function paddViewbox(viewBox: SvgViewbox, scale: number): SvgViewbox {
    const base = Math.max(viewBox.height, viewBox.width);
    const padding = base * scale;

    const paddedViewbox: SvgViewbox = {
        minx: viewBox.minx - padding,
        miny: viewBox.miny - padding,
        width: viewBox.width + 2 * padding,
        height: viewBox.height + 2 * padding,
    };

    // tslint:disable-next-line
    paddedViewbox.svgString = `${paddedViewbox.minx} ${paddedViewbox.miny} ${paddedViewbox.width} ${paddedViewbox.height}`;

    return paddedViewbox;
}