[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-weather-visualization/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-weather-visualization/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.19.1-%20?labelColor=%233E464F&color=%232FC050)
# Weather Visualization
The Weather Visualization Bundle offers a possibility to visualize differenct weather conditions in your 3D applications such as rain, snow and fog.

## Sample app
https://demos.conterra.de/mapapps/resources/apps/downloads_weathervisualization/index.html

## Installation guide
1. Add the bundle `dn_weathervisualization` to your app.

## Development guide
Run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```
