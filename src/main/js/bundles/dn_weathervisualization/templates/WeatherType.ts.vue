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
    <v-container
        @click="$emit('weather-change', weatherType)"
    >
        <v-flex>
            {{ weatherType }}
        </v-flex>
    </v-container>
</template>

<script lang="ts">


    export default {
        props: {
            weatherType: {
                type: String,
                default: ""
            },
            isSelected: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
