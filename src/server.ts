import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as geojsonValidator from 'geojson-validation';
import Backend from './backend/backend';
import { createServerBackend } from './backend/backend-factory';
import { FeatureCollection } from './domain';

type BodyParam = {
    subjectId: string;
    clipId: string;
};
type PutBodyParam = FeatureCollection;

const PORT = '8000';
const app: express.Application = express();
const backend: Backend = createServerBackend();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/polyfest/api/polygon', (req, resp) => resp.send(backend.get()));
app.put('/polyfest/api/polygon', (req, resp) => {
    const body = req.body as PutBodyParam;

    if (geojsonValidator.valid(body)) {
        resp.send(backend.update(body));
    } else {
        resp.status(400).send('Not valid');
    }
});

app.post('/polyfest/api/polygon/union', (req, resp) => {
    try {
        const bodyParams = req.body as BodyParam;
        resp.send(backend.union(bodyParams.subjectId, bodyParams.clipId));
    } catch (e) {
        resp.status(400).send(e);
    }
});

app.post('/polyfest/api/polygon/intersect', (req, resp) => {
    try {
        const bodyParams = req.body as BodyParam;
        resp.send(backend.intersect(bodyParams.subjectId, bodyParams.clipId));
    } catch (e) {
        resp.status(400).send(e);
    }
});

app.listen(PORT, () => {
    console.log('App startet on ', PORT); // tslint:disable-line
});