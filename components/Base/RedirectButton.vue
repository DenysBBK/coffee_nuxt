<template>
    <NuxtLink :to="props.url">
        <button class="button_redirect">{{ props.text}}</button> 
    </NuxtLink>
 </template>
 <script setup lang="ts">
 const props = defineProps({
     text:{
         type:String,
         required:true
     },
     url:{
        type:String,
        required:true
     }
 })
 </script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");
 
 .button_redirect{
    position: relative;
    color: white;
    font-family: KARLA;
    font-size: 22px;
    font-weight: 300;
    overflow: hidden; 

    &::before{
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0; 
    height: 1px;
    background-color: white;
    transition: width 0.5s ease;  
    }

    &:hover::before{
        width: 100%;
    }  
 }
 </style>