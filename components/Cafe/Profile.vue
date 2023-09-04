<template>
    <div>
        <v-container class="profile_container">
            <h1 class="text-center pb-10" >{{ langs.cafeProfile.title }}</h1>
            <div class="profile_block">
                <div class="profile_info">
                    <p class="profile_item"><b>{{ langs.cafeProfile.name }}:</b> {{ props.name }}</p>
                    <p class="profile_item"><b>{{ langs.cafeProfile.city }}:</b> {{ props.city }}</p>
                    <p class="profile_item"><b>{{ langs.cafeProfile.address }}:</b> {{ props.address }}</p>
                    <p class="profile_item"><b>{{ langs.cafeProfile.phone }}:</b> {{ props.phone }}</p>
                    <p class="profile_item"><b>{{ langs.cafeProfile.positions }}:</b></p>
                    <table>
                        <thead>
                            <tr>
                                <th>{{ langs.cafeProfile.item }}</th>
                                <th>{{ langs.cafeProfile.price }}</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in props.positions" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <img :src=userAvatar(props.avatar)>
            </div>
            <div class="profile_update">
                <v-btn variant="outlined" v-on:click="editProfile">{{ langs.cafeProfile.update }} </v-btn>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">

import {Positions} from '../../types/profileTypes'
import{languageState} from '../../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const props = defineProps<{
  name: string;
  address?: string; 
  city?: string;
  phone?:string;  
  positions: Positions[];
  avatar:number
}>();


function userAvatar(item:number):string{
    return `/images/${item}.png`
}

const emits = defineEmits(['edit'])

function editProfile(){
    emits('edit')
}
</script>
<style scoped lang="scss">
.profile{
    &_container{
    width: 100%;
    background-color: #cff7fc;
    border-radius: 5%;
    @media screen and (min-width: 750px) {
    width: 50%;
    }
}
    &_block{
    display: flex;
    justify-content: space-around;
    flex-direction: column-reverse;
    gap: 20px;
    @media screen and (min-width: 450px) {
        flex-direction: row;
    }
}
    &_block img{
    max-height: 200px;
 }
    &_info{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
    &_info table{
        padding-top: 20px;
    }
    &_item{
    font-size: 20px

}
    &_update{
    padding-top: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
}

}
</style>