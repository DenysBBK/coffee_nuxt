<template>
    <div class="profile_content">
       
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
                    <span class="info_data">{{ cafeData.address || 'No address'}}</span>
                </div>
                <div class="profile_info__item">
                    <span class="info_title">{{ langs.cafeProfile.phone }}:</span>
                    <span class="info_data">{{ cafeData.phone || 'No phone'}}</span>
                </div>
            </div>
        </div>
        <div class="profile_data__rate">
            <p class="profile_data__rate-text">Rate: {{ rating }}/5</p>
            <v-rating
                readonly
                :length="5"
                size="32"
                :model-value="rating"
                active-color="yellow"
                half-increments
                color="white">
            </v-rating>
        </div>
        <div class="profile_main">
            <div class="profile_main__positions">
                <h3 class="positions__title" v-if="cafeData.positions">Awailable positions</h3>
                <h3 class="positions__title" v-if="!cafeData.positions">You have no available positions</h3>
                <ul class="positions__list">
                    <li class="positions__item" v-for="(item, index) in cafeData.positions" :key="index">
                        <span class="positions__item-name">{{ item.name }}</span>
                        <span class="positions__item-price">{{ item.price }}/UAH</span>
                    </li>
                </ul>
            </div>
            <div class="profile_main__reviews">
                <h3 class="review__title">Reviews:</h3>
                <h3 class="review__title" v-if="!cafeData.reviews">You have no reviews</h3>
                    <ul class="review__list" v-if="cafeData.reviews">
                        <li v-for="(item, index) in cafeData.reviews" :key="index" class="review__item">
                            <div>
                                <img :src="userAvatar(item.userAvatar)" class="review__avatar">
                            </div>
                            <div>
                                <p class="review__text">{{ item.review }}</p>
                                <v-rating readonly :length="5" :model-value="item.rate" size="x-small" active-color="yellow"></v-rating>
                            </div>
                        </li>
                    </ul>
            </div>

        </div>
        



    </div>
</template>
<script setup lang="ts">
import { languageState } from 'types/languageTypes';
import { userReview } from 'types/orderTypes';

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang);


const cafeData = useProfileStore().cafeInfo;

const rating:Ref<number> = ref(0);

function ratingCalculate(){
    if(cafeData.reviews){
        cafeData.reviews.forEach(one => {
        rating.value = rating.value + one.rate
        
    })
    rating.value = rating.value / cafeData.reviews.length
    }else{
        rating.value = 0
    }    
}
   


function userAvatar(item:number):string{
    return `/images/${item}.png`
}

onBeforeMount(async() => {
    try{
        await useProfileStore().getCafeData();
        ratingCalculate()
        
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
    padding: 10px;
    justify-content: space-around;
    @media  screen and (min-width: 768px){
        justify-content: flex-start;
        padding: 30px;
        
    }
    &__img{
        max-width: 120px;
        max-height: 120px;
        
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
        text-align: center;

    }
    &__rate{
        display: flex;
        align-items: center;
        gap: 20px;
        flex-direction: column;
        padding-left: 30px;
        border-bottom: 1px solid white;
        padding-bottom: 20px;
        @media  screen and (min-width: 480px) {
       flex-direction: row;
    }
    }
    &__rate-text{
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
.profile_main{
    display: flex;
    flex-direction: column;
    @media  screen and (min-width: 911px){
            flex-direction: row;
        }
    

    &__positions{
        border-bottom: 1px solid white;
        padding: 20px 20px 20px 20px;
        
        @media  screen and (min-width: 911px){
            border-right: 1px solid white;
            max-width: 50%;
        }

    }
    &__reviews{
    flex-grow: 1;
       
    }
}
.positions{
    &__list{
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;

    }
    &__title{
        font-size: 25px;
        font-weight: 700;
        font-family: KARLA;
        color: white; 
    }
    &__item{
        display: flex;
        justify-content: space-between;
        gap: 15px;

        &-name{
            font-size: 20px;
            font-weight: 700;
            font-family: KARLA;
            color: white;
        }
        &-price{
            font-size: 20px;
            font-weight: 700;
            font-family: KARLA;
            color: yellow;

        }
    }
}
.review{
    &__item{
        display: flex;
        gap: 30px;
        align-items: center;
        padding: 10px 0px 0px 20px;
        border-top: 1px solid white;
    }
    &__avatar{
        max-width: 50px;
        max-height: 50px;
    }
    &__text{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;

    }
    &__title{
        font-size: 25px;
        font-weight: 700;
        font-family: KARLA;
        color: white; 
        padding: 20px 20px 20px 20px;
    }
}
</style>