<template>
   <v-btn class="button">{{ props.text}}</v-btn> 
</template>
<script setup lang="ts">
const props = defineProps({
    text:{
        type:String,
        required:true
    }
})
</script>
<style scoped>
.button{
    color:#FEF2F1;
    background-color: #7d4e08;
}
</style>