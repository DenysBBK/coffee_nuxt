<template>
    <div class="loader" v-if="show">
        <img src="../public/images/coffee-cup.png" >
    </div>
</template>
<script setup lang="ts">

const show:Ref<boolean> = ref(false);
    const nuxtApp = useNuxtApp();
    addRouteMiddleware('global-loader', () => {
        show.value = true
    }, {
        global: true
    })

    nuxtApp.hook('page:finish', () => { show.value = false; })
</script>
<style scoped lang="scss">
.loader{
    display: flex;
    justify-content: center;
    align-items: center;
    
}
</style>