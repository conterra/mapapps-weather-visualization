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
import type {InjectedReference} from "apprt-core/InjectedReference";
import type {MapWidgetModel} from "map-widget/api";

export class WeatherVisualizationWidgetFactory {
    private binding?: Binding ;
    private vm?: any;
    private weatherViewModel?: __esri.WeatherViewModel;
    private _properties: InjectedReference<Record<string, any>>;
    private _mapWidgetModel: InjectedReference<MapWidgetModel>;
    private snowyBinding?: Binding;
    private sunnyBinding?: Binding;
    private cloudyBinding?: Binding;
    private foggyBinding?: Binding;
    private rainyBinding?: Binding;
    private currentWeatherBinding?: Binding;
    private readonly _i18n!: InjectedReference<any>;

    public activate(): void {
        this.initComponent();
    }
    public deactivate(): void {
        // remove the binding
        this.binding = undefined;
    }

    private initComponent(): void {
        const properties = this._properties!;
        const vm = this.vm = new Vue(WeatherVisualizationWidget);
        vm.i18n = this._i18n.get().ui;
        this.getView().then((view: __esri.MapView | __esri.SceneView) => {
            this.weatherViewModel = new WeatherViewModel({
                view: view
            });

            this.createBinding(vm);
        });

        vm.$on("weather-change", (evt: any) => {
            this.handleWeatherChange(evt);
        });
        vm.iconBaseURL = properties.iconBaseURL;
    }

    private createBinding(vm: any): void {
        const model = this.weatherViewModel!;
        this.snowyBinding = Binding.for(model.weatherByType.snowy, vm)
            .sync("cloudCover", "snowyCloudCover")
            .sync("precipitation", "snowyPrecipitation")
            .sync("snowCover", "snowCover", (snowCover) => {
                if(snowCover === "enabled") return true;
                else return false;},
            (snowCover) => {
                if(snowCover) return "enabled";
                else return "disabled";})
            .enable()
            .syncToRightNow();
        this.sunnyBinding = Binding.for(model.weatherByType.sunny, vm)
            .sync("cloudCover", "sunnyCloudCover")
            .enable()
            .syncToRightNow();
        this.cloudyBinding = Binding.for(model.weatherByType.cloudy, vm)
            .sync("cloudCover", "cloudyCloudCover")
            .enable()
            .syncToRightNow();
        this.foggyBinding = Binding.for(model.weatherByType.foggy, vm)
            .sync("fogStrength", "fogStrength")
            .enable()
            .syncToRightNow();
        this.rainyBinding = Binding.for(model.weatherByType.rainy, vm)
            .sync("cloudCover", "rainyCloudCover")
            .sync("precipitation", "rainyPrecipitation")
            .enable()
            .syncToRightNow();
        this.currentWeatherBinding = Binding.for(model.current, vm)
            .sync("type", "currentWeather")
            .enable()
            .syncToRightNow();
    }

    public createInstance(): typeof VueDijit {
        return VueDijit(this.vm, { class: "weather-visualization-widget" });
    }


    private getView(): Promise<__esri.MapView | __esri.SceneView> {
        const mapWidgetModel = this._mapWidgetModel!;
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
    private handleWeatherChange(weatherType: "sunny" | "cloudy" | "rainy" | "snowy" | "foggy"): void {
        if (this.weatherViewModel) {
            this.weatherViewModel.setWeatherByType(weatherType);
        }
    }
}

