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
    <div>
        <v-stepper
            v-model="activeWeather"
            non-linear
        >
            <v-stepper-header>
                <v-stepper-step
                    v-for="weatherType in weatherTypes"
                    :key="weatherType"
                    :step="weatherType"
                    :class="{'is-selected': weatherType === activeWeather}"
                    @click="handleWeatherChange(weatherType)"
                >
                    <div>
                        <img
                            :src="iconBaseURL.replace('{WEATHERTYPE}', weatherType)"
                            :class="{'selected-icon': weatherType === activeWeather}"
                            class="weather-icon"
                            :alt="weatherType"
                            :aria-label="weatherType"
                        >
                    </div>
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-content
                v-for="weatherType in weatherTypes"
                :key="weatherType"
                :step="weatherType"
            >
                <div v-if="activeWeather === 'sunny'">
                    <p>{{ i18n.weather.cloudCover }}</p>
                    <v-slider
                        v-model="sunnyCloudCover"
                        :max="1"
                        :min="0"
                        :step="0.1"
                    >
                        <template #prepend>
                            {{ i18n.weather.cloudCoverDecrease }}
                        </template>
                        <template #append>
                            {{ i18n.weather.cloudCoverIncrease }}
                        </template>
                    </v-slider>
                </div>
                <div v-if="activeWeather === 'cloudy'">
                    <p>{{ i18n.weather.cloudCover }}</p>
                    <v-slider
                        v-model="cloudyCloudCover"
                        :max="1"
                        :min="0"
                        :step="0.1"
                    >
                        <template #prepend>
                            {{ i18n.weather.cloudCoverDecrease }}
                        </template>
                        <template #append>
                            {{ i18n.weather.cloudCoverIncrease }}
                        </template>
                    </v-slider>
                </div>

                <div v-if="activeWeather === 'rainy'">
                    <p>{{ i18n.weather.cloudCover }}</p>
                    <v-slider
                        v-model="rainyCloudCover"
                        :max="1"
                        :min="0"
                        :step="0.1"
                    >
                        <template #prepend>
                            {{ i18n.weather.cloudCoverDecrease }}
                        </template>
                        <template #append>
                            {{ i18n.weather.cloudCoverIncrease }}
                        </template>
                    </v-slider>
                    <p>{{ i18n.weather.precipitation }}</p>
                    <v-slider
                        v-model="rainyPrecipitation"
                        :max="1"
                        :min="0"
                        :step="0.1"
                    >
                        <template #prepend>
                            {{ i18n.weather.precipitationDecrease }}
                        </template>
                        <template #append>
                            {{ i18n.weather.precipitationIncrease }}
                        </template>
                    </v-slider>
                </div>
                <div v-if="activeWeather === 'snowy'">
                    <p>{{ i18n.weather.cloudCover }}</p>
                    <v-slider
                        v-model="snowyCloudCover"
                        :max="1"
                        :min="0"
                        :step="0.1"
                    >
                        <template #prepend>
                            {{ i18n.weather.cloudCoverDecrease }}
                        </template>
                        <template #append>
                            {{ i18n.weather.cloudCoverIncrease }}
                        </template>
                    </v-slider>
                    <p>{{ i18n.weather.precipitation }}</p>
                    <v-slider
                        v-model="snowyPrecipitation"
                        :max="1"
                        :min="0"
                        :step="0.1"
                    >
                        <template #prepend>
                            {{ i18n.weather.precipitationDecrease }}
                        </template>
                        <template #append>
                            {{ i18n.weather.precipitationIncrease }}
                        </template>
                    </v-slider>
                    <v-checkbox
                        v-model="snowCover"
                        :label="i18n.weather.snowCover"
                        color="primary"
                        class="custom-checkbox"
                    />
                </div>
                <div v-if="activeWeather === 'foggy'">
                    <p>{{ i18n.weather.fogStrength }}</p>
                    <v-slider
                        v-model="fogStrength"
                        :max="1"
                        :min="0"
                        :step="0.1"
                        @input="foggySettings.fogStrength = fogStrength"
                    >
                        <template #prepend>
                            {{ i18n.weather.fogStrengthDecrease }}
                        </template>
                        <template #append>
                            {{ i18n.weather.fogStrengthIncrease }}
                        </template>
                    </v-slider>
                </div>
            </v-stepper-content>
        </v-stepper>
    </div>
</template>

<script lang="ts">
    import Bindable from "apprt-vue/mixins/Bindable";
    import i18n from "dn_weathervisualization/nls/bundle";
    export default {
        mixins: [Bindable],
        props: {
            i18n: {
                type: Object,
                default: (): Object => {
                    return {};
                }
            },
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
                default: (): any => {}
            },
            foggySettings: {
                type: Object,
                default: (): any => {}
            },
            rainySettings: {
                type: Object,
                default: (): any => {}
            },
            snowySettings: {
                type: Object,
                default: (): any => {}
            },
            sunnySettings: {
                type: Object,
                default: (): any => {}
            },
            iconBaseURL: {
                type: String,
                default: ""
            }
        },

        data: (): any => {
            return {
                sunnyCloudCover: undefined as number | undefined,
                cloudyCloudCover: undefined as number | undefined,
                rainyCloudCover: undefined as number | undefined,
                rainyPrecipitation: undefined as number | undefined,
                fogStrength: undefined as number | undefined,
                snowyCloudCover: undefined as number | undefined,
                snowyPrecipitation: undefined as number | undefined,
                snowCover: undefined as boolean | undefined
            };
        },
        methods: {
            handleWeatherChange(weatherType: string): void {
                this.activeWeather = weatherType;
                this.$emit('weather-change', this.activeWeather);
            }
        }
    };
</script>
