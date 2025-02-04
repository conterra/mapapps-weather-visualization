///
/// Copyright (C) 2023 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import WeatherVisualizationWidget from "./templates/WeatherVisualizationWidget.ts.vue";
import WeatherViewModel from "esri/widgets/Weather/WeatherViewModel";
import Binding from "apprt-binding/Binding";
import Weather from "esri/widgets/Weather";

export class WeatherVisualizationWidgetFactory {
    private binding = undefined;
    private vm = undefined;
    private weatherViewModel = undefined;
    private weather: Weather|undefined= undefined;

    _initComponent() {
        const properties = this._properties;

        this.getView().then((view: __esri.MapView | __esri.SceneView) => {
            this.weatherViewModel = new WeatherViewModel({
                view: view
            });

            const weatherWidget = new Weather({
                view: view,
                viewModel: this.weatherViewModel
            });
            view.environment.weather = {
                type: "sunny",
                cloudCover: 0.7,
                precipitation: 0.5
            };
            //this.weatherViewModel.setWeatherByType("rainy");
            //weatherWidget.renderNow();
        });
        const vm = this.vm = new Vue(WeatherVisualizationWidget);

        vm.$on("weather-change", (evt:any) => {
            this.handleWeatherChange(evt);
        });



    }
    createInstance(): any {
        const vm = this.vm ;
        return VueDijit(this.vm, { class: "weather-visualization-widget" });
    }

    activate() {
        this._initComponent();
    }
    deactivate(){

    }
    private getView(): Promise< __esri.MapView | __esri.SceneView> {
        const mapWidgetModel = this._mapWidgetModel;
        return new Promise((resolve) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                const watcher = mapWidgetModel.watch("view", ({ value: view }) => {
                    watcher.remove();
                    resolve(view);
                });
            }
        });
    }
    handleWeatherChange(weatherType: string) {
        if (this.weatherViewModel) {
            this.weatherViewModel.setWeatherByType(weatherType);
        }
    }
}

