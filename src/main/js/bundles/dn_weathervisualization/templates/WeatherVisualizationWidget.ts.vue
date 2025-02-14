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
            {{ sunny }}
            <v-slider
                v-if="['sunny', 'cloudy', 'rainy', 'snowy'].includes(activeWeather)"
                v-model="cloudCover"
                label="cloud cover"
                :max="1"
                :min="0"
                :step="0.1"
                @end="handleCloudCoverChange"
            />
            <v-slider
                v-if="['rainy', 'snowy'].includes(activeWeather)"
                v-model="precipitation"
                label="precipitation"
                :max="1"
                :min="0"
                :step="0.1"
                @end="handlePrecipitiationChange"
            />
            <v-slider
                v-if="['foggy'].includes(activeWeather)"
                v-model="fogStrength"
                label="fog strength"
                :max="1"
                :min="0"
                :step="0.1"
                @end="handlefogStengthChange"
            />
            <v-checkbox
                v-if="['snowy'].includes(activeWeather)"
                v-model="snowCover"
                label="snow cover"
            />
        </v-container>
        <v-container>
            <v-stepper
                v-model="activeWeather"
                non-linear
            >
                <v-stepper-header>
                    <v-stepper-item
                        v-for="weatherType in weatherTypes"
                        :key="weatherType"
                        @click="handleWeatherChange(weatherType)"
                    >
                        {{ weatherType }}
                    </v-stepper-item>
                </v-stepper-header>

                <v-stepper-content
                    v-for="weatherType in weatherTypes"
                    :key="weatherType"
                    :step="weatherType"
                >
                    <v-slider
                        v-if="['sunny', 'cloudy', 'rainy', 'snowy'].includes(activeWeather)"
                        v-model="cloudCover"
                        label="cloud cover"
                        :max="1"
                        :min="0"
                        :step="0.1"
                        @end="handleCloudCoverChange"
                    />
                    <v-slider
                        v-if="['rainy', 'snowy'].includes(activeWeather)"
                        v-model="precipitation"
                        label="precipitation"
                        :max="1"
                        :min="0"
                        :step="0.1"
                        @end="handlePrecipitiationChange"
                    />
                    <v-slider
                        v-if="['foggy'].includes(activeWeather)"
                        v-model="fogStrength"
                        label="fog strength"
                        :max="1"
                        :min="0"
                        :step="0.1"
                        @end="handlefogStengthChange"
                    />
                    <v-checkbox
                        v-if="['snowy'].includes(activeWeather)"
                        v-model="snowCover"
                        label="snow cover"
                    />
                </v-stepper-content>
            </v-stepper>
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
            sunny:{
                type: Object,
                default: () => {}
            },
            cloudyCloudCover:{
                type: Object,
                default: () => {}
            },
            rainyCloudCover:{
                type: Object,
                default: () => {}
            },
            weatherTypes: {
                type: Array as () => string[],
                default: (): string[] => ["sunny", "cloudy", "rainy", "snowy", "foggy"]
            },
            cloudCover: {
                type: Number,
                default: 0.5
            },
            precipitation: {
                type: Number,
                default: 0.5
            },
            fogStrength: {
                type: Number,
                default: 0.1
            },
            snowCover: {
                type: Boolean,
                default: false
            },
            activeWeather:{
                type: String,
                default: "sunny"}
        },
        methods: {
            handleWeatherChange(weatherType: string) {
                this.activeWeather = weatherType;
                this.$emit('weather-change', this.activeWeather);
            },
            handleCloudCoverChange() {
                const changedWeather = {
                    activeWeather: this.activeWeather,
                    cloudCover: this.cloudCover
                };
                this.$emit('slider-change', changedWeather);
            },
            handlePrecipitiationChange() {
                const changedWeather = {
                    activeWeather: this.activeWeather,
                    precipitation: this.precipitation
                };
                this.$emit('slider-change', changedWeather);
            },
            handlefogStengthChange() {
                const changedWeather = {
                    activeWeather: this.activeWeather,
                    fogStrength: this.fogStrength
                };
                this.$emit('slider-change', changedWeather);
            }
        }
    };
</script>
