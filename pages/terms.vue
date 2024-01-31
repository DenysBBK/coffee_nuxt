<template>
    <div class="terms_block">
        <v-container class="order_container">
            <div>
                <div class="title">{{ langs.pageTitles.terms }}</div>
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
    title:langs.value.pageTitles.terms
})

</script>
<style scoped lang="scss">
.order{
    &_container{
    background-color: #000000;
    border-radius: 5%;
    width: 100%;
    border: 1px solid white;
    border-radius: 15px;
    padding: 20px;
    @media screen and (min-width: 860px) {
    width: 70%;
    }
}
}
.title{
    text-align: center;
    padding-bottom: 30px;
    font-size: 40px;
    font-weight: 600;
    color: white;
}
.terms_block{
    padding-top: 50px;
}
</style>