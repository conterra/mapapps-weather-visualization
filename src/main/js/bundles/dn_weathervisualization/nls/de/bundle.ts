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

import { type Messages } from "../bundle";

const i18n = {
    bundleName: "Wettervisualisierung",
    bundleDescription: "Dieses Bundle ermöglicht es verschiedene Wetterbedingungen zu simulieren.",
    tool:{
        title: "Wettervisualisierung",
        tooltip: "Wettervisualisierung"
    },
    ui:{
        windowTitle: "Wettervisualisierung",
        weather:{
            sunny: "Sonnig",
            cloudy: "Bewölkt",
            rainy: "Regnerisch",
            snowy: "Schneefall",
            foggy: "Nebelig",
            precipitation: "Niederschlag",
            precipitationIncrease: "Niederschlag erhöhen",
            precipitationDecrease: "Niederschlag verringern",
            cloudCover: "Bewölkung",
            cloudCoverIncrease: "Bewölkung erhöhen",
            cloudCoverDecrease: "Bewölkung verringern",
            fogStrength: "Nebelstärke",
            fogStrengthIncrease: "Nebelstärke erhöhen",
            fogStrengthDecrease: "Nebelstärke verringern",
            snowCover: "Schneedecke"
        }
    }
} satisfies Messages;

export default i18n;
