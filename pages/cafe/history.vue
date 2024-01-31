<template>
    <div>
        <FullHistory></FullHistory>
    </div>
</template>
<script setup lang="ts">
import{languageState} from 'types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:langs.value.pageTitles.history
})



</script>