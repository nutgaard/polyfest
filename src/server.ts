import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import Backend from './backend/backend';
import { createServerBackend } from './backend/backend-factory';

type BodyParam = {
    subjectId: string;
    clipId: string;
};

const PORT = '8000';
const app: express.Application = express();
const backend: Backend = createServerBackend();

console.log('backend', backend); // tslint:disable-line
console.log('backend', backend.getAll()); // tslint:disable-line

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/polyfest/api/polygon', (req, resp) => resp.send(backend.getAll()));

app.post('/polyfest/api/polygon/union', (req, resp) => {
    console.log('req', req.body); // tslint:disable-line
    const bodyParams = req.body as BodyParam;
    resp.send(backend.union(bodyParams.subjectId, bodyParams.clipId));
});

app.post('/polyfest/api/polygon/intersect', (req, resp) => {
    console.log('req', req.body); // tslint:disable-line
    const bodyParams = req.body as BodyParam;
    resp.send(backend.intersect(bodyParams.subjectId, bodyParams.clipId));
});

app.listen(PORT, () => {
    console.log('App startet on ', PORT); // tslint:disable-line
});