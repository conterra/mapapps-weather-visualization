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
                class="weather-stepper"
            >
                <v-stepper-header
                    class="weather-stepper-header"
                >
                    <v-stepper-item
                        v-for="weatherType in weatherTypes"
                        :key="weatherType"
                        :name="weatherType"
                        :class="{'weather-type': true, 'is-selected': weatherType === activeWeather}"
                        class="weather-type"
                        @click="handleWeatherChange(weatherType)"
                    >
                        <div>
                            <img
                                :src="iconBaseURL.replace('{WEATHERTYPE}', weatherType)"
                                :class="{'selected-icon': weatherType === activeWeather,
                                         'unselected-icon': weatherType !== activeWeather}"
                                class="weather-icon"
                                alt=""
                            >
                            <div>
                                {{ weatherType }}
                            </div>
                        </div>
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
                            class="custom-slider"
                            @input="sunnySettings.cloudCover = sunnyCloudCover"
                        />
                    </div>
                    <div v-if="activeWeather === 'cloudy'">
                        <v-slider
                            v-model="cloudyCloudCover"
                            label="cloud cover"
                            :max="1"
                            :min="0"
                            :step="0.1"
                            class="custom-slider"
                            @input="cloudySettings.cloudCover = cloudyCloudCover"
                        />
                    </div>

                    <div v-if="activeWeather === 'rainy'">
                        <v-slider
                            v-model="rainyCloudCover"
                            label="cloud cover"
                            :max="1"
                            :min="0"
                            :step="0.1"
                            class="custom-slider"
                            @input="rainySettings.cloudCover = rainyCloudCover"
                        />
                        <v-slider
                            v-model="rainyPrecipitation"
                            label="precipitation"
                            :max="1"
                            :min="0"
                            :step="0.1"
                            class="custom-slider"
                            @input="rainySettings.precipitation = rainyPrecipitation"
                        />
                    </div>
                    <div v-if="activeWeather === 'snowy'">
                        <v-slider
                            v-model="snowyCloudCover"
                            label="cloud cover"
                            :max="1"
                            :min="0"
                            :step="0.1"
                            class="custom-slider"
                            @input="snowySettings.cloudCover = snowyCloudCover"
                        />
                        <v-slider
                            v-model="snowyPrecipitation"
                            label="precipitation"
                            :max="1"
                            :min="0"
                            :step="0.1"
                            class="custom-slider"
                            @input="snowySettings.precipitation = snowyPrecipitation"
                        />
                        <v-checkbox
                            v-model="snowCover"
                            label="snow cover"
                            @change="snowySettings.snowCover = snowCover ? 'enabled' : 'disabled'"
                        />
                    </div>
                    <div v-if="activeWeather === 'foggy'">
                        <v-slider
                            v-model="fogStrength"
                            label="fog strength"
                            :max="1"
                            :min="0"
                            :step="0.1"
                            class="custom-slider"
                            @input="foggySettings.fogStrength = fogStrength"
                        />
                    </div>
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
                default: "sunny"
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
            },
            iconBaseURL: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                sunnyCloudCover: 0,
                cloudyCloudCover: 0,
                rainyCloudCover: 0,
                snowyCloudCover: 0,
                rainyPrecipitation: 0,
                snowyPrecipitation: 0,
                fogStrength: 0,
                snowCover: false
            };
        },
        mounted() {
            this.sunnyCloudCover = this.sunnySettings.cloudCover;
            this.cloudyCloudCover = this.cloudySettings.cloudCover;
            this.rainyCloudCover = this.rainySettings.cloudCover;
            this.rainyPrecipitation = this.rainySettings.precipitation;
            this.snowyCloudCover = this.snowySettings.cloudCover;
            this.snowyPrecipitation = this.snowySettings.precipitation;
            this.fogStrength = this.foggySettings.fogStrength;
            this.snowCover = this.snowySettings.snowCover === 'enabled';
        },
        methods: {
            handleWeatherChange(weatherType: string) {
                this.activeWeather = weatherType;
                this.$emit('weather-change', this.activeWeather);
            }
        }
    };
</script>
