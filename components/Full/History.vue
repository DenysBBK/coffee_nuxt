<template>
    <div class="history">
        <div class="history_list">

        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    type:{
        type:String,
        required:true,
    }
})
console.log(props.type)



</script>
<style scoped lang="scss">
</style>