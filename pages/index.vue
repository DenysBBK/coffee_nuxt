<template>
<div>
    <LandingMain/>
    <LandingForPeople/>
    <LandingSteps/>
    <LandingBusiness/>
    <LandingPopular/>
    <LandingAboutUs/>
    <LandingFaq/>
</div>
</template>
<script setup lang="ts">
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
useHead({
    title:langs.value.pageTitles.mainPage
})
</script>
<style scoped lang="scss">
.mobile_main{
    @media screen and (min-width: 815px) {
        display: none;
    }
}
.full_main{
    @media  screen and (max-width: 814px) {
        display: none;
    }
}
</style>