<template>
    <div class="user_history">
        <div class="user_history__list">
            <FullHistory></FullHistory>
        </div>
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
<style scoped lang="scss">
</style>