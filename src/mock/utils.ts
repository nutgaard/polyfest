import * as qs from 'query-string';

type Data = (url: string, config: Config, extra: Extra) => object | object;
interface Config {
    body?: string;
}
interface Extra {
    queryParams: object;
    bodyParams: object;
    extra: object;
}

export function delayed(time: number, response: Data) {
    return () => new Promise((resolve) => setTimeout(() => resolve(response), time));
}

export function respondWith(handler: Data) {
    return (url: string, config: Config, extra: Extra) => {
        const queryParams = qs.parse(qs.extract(url));
        const bodyParams = config && config.body && JSON.parse(config.body);

        let response;

        if (typeof handler === 'function') {
            response = handler(url, config, { queryParams, bodyParams, extra });
        } else {
            console.log('handler', handler); // tslint:disable-line
            response = handler; // Trust me, its data
        }

        /* tslint:disable */
        console.groupCollapsed(url);
        console.groupCollapsed('config');
        console.log('url', url);
        console.log('config', config);
        console.log('queryParams', queryParams);
        console.log('bodyParams', bodyParams);
        console.log('extra', extra);
        console.groupEnd();

        console.log('response', response);
        console.groupEnd();
        /* tslint:enable */

        return response;
    };
}