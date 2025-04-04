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

const i18n = {
    root: ({
        bundleName: "weather visualization",
        bundleDescription: "This bundle adds the functionality to simulate different weather conditions.",
        tool: {
            title: "Weather visualization",
            tooltip: "weather visualization"
        },
        ui: {
            windowTitle: "Weather visualization",
            weather:{
                sunny: "Sunny",
                cloudy: "Cloudy",
                rainy: "Rainy",
                snowy: "Snowy",
                foggy: "Foggy",
                precipitation: "Precipitation",
                precipitationIncrease: "Precipitation increase",
                precipitationDecrease: "Precipitation decrease",
                cloudCover: "Cloud cover",
                cloudCoverIncrease: "Cloud cover increase",
                cloudCoverDecrease: "Cloud cover decrease",
                fogStrength: "Fog strength",
                fogStrengthIncrease: "Fog strength increase",
                fogStrengthDecrease: "Fog strength decrease",
                snowCover: "Snow cover"
            }
        }
    }),
    "de": true
};

export type Messages = (typeof i18n)["root"];
export default i18n;
