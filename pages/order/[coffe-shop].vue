<template>
    <div>
        Hello
    </div>
</template>
<script setup lang="ts">


onBeforeMount(() => {
    console.log(useRoute().params.coffeshop)
    
})
</script>
<style scoped lang="scss">
div{
    color: wheat;
}

</style>