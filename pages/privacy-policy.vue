<template>
    <div>
        <v-container class="order_container">
            <div>
                <div class="title">{{ langs.pageTitles.privacyPolicy }}</div>
                    <v-expansion-panels>
                    <v-expansion-panel
                        title="First rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Second rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Third rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Fourth rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Fifth rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Sixth rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Seventh rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Eighth rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Ninth rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    <v-expansion-panel
                        title="Tenth rule"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                    
                    </v-expansion-panels>
            </div>
        </v-container>

    </div>
</template>
<script setup lang="ts">
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
useHead({
    title:langs.value.pageTitles.privacyPolicy
})
</script>
<style scoped lang="scss">
.order{
    &_container{
    background-color: #cff7fc;
    border-radius: 5%;
    width: 100%;
    @media screen and (min-width: 860px) {
    width: 50%;
    }
}
}
.title{
    text-align: center;
    padding-bottom: 30px;
    font-size: 40px;
    font-weight: 600;
}
</style>