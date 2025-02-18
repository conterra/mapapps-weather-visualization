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
            <v-stepper
                v-model="activeWeather"
                non-linear
            >
                <v-stepper-header>
                    <v-stepper-item
                        v-for="weatherType in weatherTypes"
                        :key="weatherType"
                        :name="weatherType"
                        :is-selected="weatherType === activeWeather"
                        class="weather-type"
                        @click="handleWeatherChange(weatherType)"
                    >
                        <div> {{ weatherType }}</div>
                        <!-- <span class="material-icons">
                            sunny
                        </span> -->
                    </v-stepper-item>
                </v-stepper-header>

                <v-stepper-content
                    v-for="weatherType in weatherTypes"
                    :key="weatherType"
                    :step="weatherType"
                >
                    <div v-if="activeWeather === 'sunny'">
                        <v-slider
                            v-model="sunnyCloudCover"
                            label="cloud cover"
                            :max="1"
                            :min="0"
                            :step="0.1"
                            @input="sunnySettings.cloudCover = sunnyCloudCover"
                        />
                    </div>
                    <div v-if="activeWeather === 'cloudy'">
                        {{ cloudySettings }}
                    </div>
                    <div v-if="activeWeather === 'rainy'">
                        {{ rainySettings }}
                    </div>
                    <div v-if="activeWeather === 'snowy'">
                        {{ snowySettings }}
                    </div>
                    <div v-if="activeWeather === 'foggy'">
                        {{ foggySettings }}
                    </div>
                    <!-- <v-slider
                        v-if="['sunny', 'cloudy', 'rainy', 'snowy'].includes(activeWeather)"
                        v-model="cloudCover"
                        label="cloud cover"
                        :max="1"
                        :min="0"
                        :step="0.1"
                        class="slider"
                        @end="handleCloudCoverChange"
                    />
                    <v-slider
                        v-if="['rainy', 'snowy'].includes(activeWeather)"
                        v-model="precipitation"
                        label="precipitation"
                        :max="1"
                        :min="0"
                        :step="0.1"
                        class="slider"
                        @end="handlePrecipitiationChange"
                    />
                    <v-slider
                        v-if="['foggy'].includes(activeWeather)"
                        v-model="fogStrength"
                        label="fog strength"
                        :max="1"
                        :min="0"
                        :step="0.1"
                        class="slider"
                        @end="handlefogStengthChange"
                    />
                    <v-checkbox
                        v-if="['snowy'].includes(activeWeather)"
                        v-model="snowCover"
                        label="snow cover"
                        class="snowCheckbox"
                        @change="handleSnowCoverChange"
                    /> -->
                </v-stepper-content>
            </v-stepper>
        </v-container>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'weather-visualization-widget',
        props: {
            activeWeather:{
                type: String,
                default: ""
            },
            weatherTypes: {
                type: Array as () => string[],
                default: (): string[] => ["sunny", "cloudy", "rainy", "snowy", "foggy"]
            },
            cloudySettings: {
                type: Object,
                default: () => {}
            },
            foggySettings: {
                type: Object,
                default: () => {}
            },
            rainySettings: {
                type: Object,
                default: () => {}
            },
            snowySettings: {
                type: Object,
                default: () => {}
            },
            sunnySettings: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                sunnyCloudCover: 0,
                cloudCover: 0,
                precipitation: 0,
                fogStrength: 0,
                snowCover: false
            };
        },
        // computed: {
        //     sunnyCloudCover: {
        //         get() {
        //             return this.sunnySettings.cloudCover;
        //         },
        //         set(value) {
        //             this.sunnySettings.cloudCover = value;
        //         }
        //     }
        //     //     },
        //     //     cloudyConfig() {
        //     //         return this.weatherByType.cloudy;
        //     //     },
        //     //     rainyConfig() {
        //     //         return this.weatherByType.rainy;
        //     //     },
        //     //     snowyConfig() {
        //     //         return this.weatherByType.snowy;
        //     //     },
        //     //     foggyConfig() {
        //     //         return this.weatherByType.foggy;
        //     //     }
        // },
        methods: {
            handleWeatherChange(weatherType: string) {
                this.activeWeather = weatherType;
                this.$emit('weather-change', this.activeWeather);
            },
            handleCloudCoverChange(weatherType: string) {
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
            },
            handleSnowCoverChange() {
                const changedWeather = {
                    activeWeather: this.activeWeather,
                    snowCover: this.snowCover
                };
                this.$emit('snow-cover-change', changedWeather);
            }
        }
    };
</script>
