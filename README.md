# Polyfest

Simple view/editor of GeoJSON based on create-react-app (CRA).
See [CRA-documentation](README-CRA.md)

### Start it

Clone the repo:
```
git clone https://github.com/nutgaard/polyfest.git
```

Install dependencies
```
yarn
```

The application can start in dev-mode, or standard-mode.
In dev-mode the api, and backend are inlined into the frontend allowing for fast iteration without restarting/redeploying servers.
In standard-mode the frontend is served by CRAs default server (localhost:3000), and making request to backend at localhost:8000.

Dev-mode
```
yarn dev
```

Standard-mode
```
yarn start
```

