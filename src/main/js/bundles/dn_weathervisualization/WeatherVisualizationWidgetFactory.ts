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
import { debounceOrCancel, ifDefined } from "apprt-binding/Transformers";

export class WeatherVisualizationWidgetFactory {
    private binding = undefined;
    private vm = undefined;
    private weatherViewModel = undefined;

    _initComponent() {
        const properties = this._properties;
        const vm = this.vm = new Vue(WeatherVisualizationWidget);
        this.getView().then((view: __esri.MapView | __esri.SceneView) => {
            this.weatherViewModel = new WeatherViewModel({
                view: view
            });

            view.environment.weather = {
                type: "sunny",
                cloudCover: 0.1
            };

            this.binding = this.createBinding(vm);
        });

        vm.$on("weather-change", (evt: any) => {
            this.handleWeatherChange(evt);
        });
        vm.$on("slider-change", (evt:any) => {
            if(evt.cloudCover >= 0){
                this.handleCloudCoverChange(evt.cloudCover);
            }
            else if(evt.precipitation >= 0){
                this.handlePrecipitationChange(evt.precipitation);
            }
            else if(evt.fogStrength >= 0){
                this.handlefogStrengthChange(evt.fogStrength);
            }
        });
        vm.$on("snow-cover-change", (evt:any) => {
            this.handleSnowCoverChange(evt.snowCover);
        });
    }

    createBinding(vm: any) {
        const model = this.weatherViewModel;

        return Binding.for(model.weatherByType, vm)
            .sync("cloudy", "cloudySettings")
            .sync("foggy", "foggySettings")
            .sync("rainy", "rainySettings")
            .sync("snowy", "snowySettings")
            .sync("sunny", "sunnySettings")
            .enable()
            .syncToRightNow();
    }

    createInstance(): any {
        const vm = this.vm;
        return VueDijit(this.vm, { class: "weather-visualization-widget" });
    }

    activate() {
        this._initComponent();
    }
    deactivate() {

    }
    private getView(): Promise<__esri.MapView | __esri.SceneView> {
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
    handleWeatherChange(weatherType: string): void {
        if (this.weatherViewModel) {
            this.weatherViewModel.setWeatherByType(weatherType);
        }
    }
    handleCloudCoverChange(cloudCover: number):void {
        if(this.weatherViewModel){
            const weatherType = this.weatherViewModel.current;
            if (weatherType) {
                weatherType.cloudCover = cloudCover;
            }
        }
    }
    handlePrecipitationChange(precipitation: number):void {
        if(this.weatherViewModel){
            const weatherType = this.weatherViewModel.current;
            if (weatherType) {
                weatherType.precipitation = precipitation;
            }
        }
    }
    handlefogStrengthChange(fogStrength: number):void {
        if(this.weatherViewModel){
            const weatherType = this.weatherViewModel.current;
            weatherType.fogStrength= fogStrength;
        }
    }
    handleSnowCoverChange(snowCover: boolean):void {
        if(this.weatherViewModel){
            const weatherType = this.weatherViewModel.current;
            if(snowCover){
                weatherType.snowCover = "enabled";
            }else{
                weatherType.snowCover = "disabled";
            }

        }
    }
}

