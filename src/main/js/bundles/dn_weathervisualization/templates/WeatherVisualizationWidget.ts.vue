<!--

    Copyright (C) 2023 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <div class="weather-visualization-widget">
        <v-container>
            <v-layout row>
                <weather-type
                    v-for="weatherType in weatherTypes"
                    :key="weatherType"
                    :weather-type="weatherType"
                    :is-selected="weatherType === activeWeather"
                    @weather-change="handleWeatherChange"
                />
            </v-layout>
            <v-slider
                v-model="precipitation"
                :max="1"
                :min="0"
                :step="0.1"
                thumb-label
            />
        </v-container>
    </div>
</template>

<script lang="ts">
    import WeatherType from './WeatherType.ts.vue';

    export default {
        name: 'weather-visualization-widget',
        components: {
            weatherType: WeatherType
        },
        props: {
            weatherTypes: {
                type: Array as () => string[],
                default: (): string[] => ["sunny", "cloudy", "rainy", "snowy", "foggy"]
            },
            precipitation: {
                type: Number,
                default: 0.5
            },
            activeWeather:{
                type: String,
                default: "rainy"}
        },
        methods: {
            handleWeatherChange(weatherType: string) {
                this.activeWeather = weatherType;
                this.$emit('weather-change', this.activeWeather);
                console.log("Weather changed to: " + this.activeWeather);
            }
        }
    };
</script>
