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
    color: black;
    font-weight: 600;
    font-family: KARLA;
    font-size: 20px;
    background-color: yellow;
    padding: 5px 15px 5px 15px;
    border-radius: 20px 20px;
    margin-top: 10px;
}
</style>