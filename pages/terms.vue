<template>
    <div>
        <v-container class="order_container">
            <div>
                <div class="text-subtitle-2 mb-2">Block 1</div>
                    <v-expansion-panels>
                    <v-expansion-panel
                        v-for="i in 5"
                        :key="i"
                        title="5[i]"
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
    background-color: #cff7fc;
    border-radius: 5%;
    width: 100%;
    @media screen and (min-width: 860px) {
    width: 50%;
    }
}
}

</style>