<template>
    <div class="profile_content">
        <base-alert
            v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <div class="profile_data">
            <div>
                <img :src="userAvatar(cafeData.avatar)" class="profile_data__img">
                <p class="profile_data__name">{{ cafeData.name }}</p>
            </div>
            
            <div class="profile_info">
                <div class="profile_info__item">
                    <span class="info_title">{{ langs.cafeProfile.city }}:</span>
                    <span class="info_data">{{ cafeData.city}}</span>
                </div>
                <div class="profile_info__item">
                    <span class="info_title">{{ langs.cafeProfile.address }}:</span>
                    <span class="info_data">{{ cafeData.address}}</span>
                </div>
                <div class="profile_info__item">
                    <span class="info_title">{{ langs.cafeProfile.phone }}:</span>
                    <span class="info_data">{{ cafeData.phone}}</span>
                </div>
            </div>
        </div>
        <div>
               
                <p class="profile_data__rate">Rate: 4</p>
                <v-rating
                readonly
                :length="5"
                size="32"
                :model-value="4"
                active-color="yellow"
                color="white">
                </v-rating>
            </div>
        



    </div>
</template>
<script setup lang="ts">
import { languageState } from 'types/languageTypes';

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang);
const { showAlert, typeOfAlert, alertText, show, close } = useAlert();

const cafeData = useProfileStore().cafeInfo

function userAvatar(item:number):string{
    return `/images/${item}.png`
}




onBeforeMount(async() => {
    try{
        await useProfileStore().getCafeData();
        console.log(cafeData)
        
    }
    catch(error){
        console.log(error)
        
    }
})

definePageMeta({
    middleware:'authenticated'
});
useHead({
    title:langs.value.pageTitles.cafeProfile
})

</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");



.profile_data{
    display: flex;
    gap: 30px;
    align-items: center;
    padding: 30px;
    border-bottom: 1px solid white;
    justify-content: center;
    @media  screen and (min-width: 768px){
        justify-content: flex-start;
    }
    &__img{
        max-width: 100px;
        max-height: 100px;
        background-color: white;
        @media  screen and (min-width: 768px){
            max-width: 200px;
            max-height: 200px;
        }
       
        
    }
    &__name{
        color: white;
        font-family: KARLA;
        font-size: 50px;
        font-weight: 700;

    }
    &__rate{
        color: yellow;
        font-family: KARLA;
        font-size: 40px;
        font-weight: 700; 
    }
}
.profile_info{
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    &__item{
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        @media  screen and (min-width: 911px){
            flex-direction: row;
        }
    }
}
.info{
    &_title{
        font-size: 15px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-decoration: none;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }

    }
    &_data{
        font-size: 15px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }  
    }
}
</style>