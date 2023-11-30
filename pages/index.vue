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
