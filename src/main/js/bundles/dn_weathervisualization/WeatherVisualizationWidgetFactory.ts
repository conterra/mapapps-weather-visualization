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
import Weather from "esri/widgets/Weather";
import Expand from "esri/widgets/Expand";
import Daylight from "esri/widgets/Daylight";

export class WeatherVisualizationWidgetFactory {
    private binding = undefined;
    private vm = undefined;
    _initComponent() {

        this.getView().then((view: __esri.MapView | __esri.SceneView) => {
            view.view
            const weatherExpand = new Expand({
                view: view,
                content: new Weather({
                    view: view
                }),

            });
            const daylightExpand = new Expand({
                view: view,
                content: new Daylight({
                    view: view
                })
            });
            view.ui.add([weatherExpand, daylightExpand], "bottom-left");
        });

        this.vm = new Vue(WeatherVisualizationWidget);
    }
    createInstance(): any {
        const vm = this.vm ;
        return VueDijit(this.vm, { class: "weather-visualization-widget" });
    }

    activate() {
        this._initComponent();
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

}
