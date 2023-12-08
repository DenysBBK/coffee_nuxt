<template>
    <div class="cafe_page">
        <BaseRedirectButton class="cafe_page__return" text="<-- To all coffee-shops" url="/order"></BaseRedirectButton>
        <div class="cafe_block">
            <div class="cafe_info">
                <img :src="userAvatar(cafeData.avatar)" class="cafe_info__avatar">
                <div class="cafe_info__credentials">
                    <span class="credentials__name">{{ cafeData.name }}</span>
                    <span class="credentials__city">{{ cafeData.city }}</span>
                    <span class="credentials__city">{{ cafeData.address }}</span>
                </div>
                <v-rating readonly :length="5" :model-value="4" :size="32" active-color="yellow"/>
                <!-- <span class="credentials__rate">*****</span> -->
            </div>
            <div class="cafe_data">
                <div class="cafe_data__reviews">
                    <h3 class="review__title">Reviews</h3>
                    <ul class="review__block">
                        <li v-for="(item, index) in reviews" :key="index" class="review__item">
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
                <div class="cafe_data__order"></div>
            </div>
            Hello
        </div>
    </div>
</template>
<script setup lang="ts">
const cafeData = computed(() => useProfileStore().cafeInfo);
const router = useRouter()
function returnToAllShops(){
    router.push('/order')
    
    
};
function userAvatar(item:number):string{
    return `/images/${item}.png`
}
interface userReview  {
    userAvatar:number,
    review:string,
    rate:number
}
const reviews:Ref<userReview[]> = ref([
    {
        userAvatar:2,
        review:'Very good cafe',
        rate:3
    },
    {
        userAvatar:3,
        review:'Super tasty coffee, I like it',
        rate:4
    },
    {
        userAvatar:1,
        review:'Неодмінно буду пити каву лише в цій кавярні!',
        rate:5
    }
])
onBeforeMount(async () => {
    try{
        const route = useRoute()
        await useProfileStore().getCafeData(route.params.coffeshop);
        console.log(cafeData.value)
        

    }catch(error){
        console.log(error)
        
    }
   
    
})
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.cafe{
    &_page{
        padding-left: 10px;
        padding-right: 10px;
        padding-top:30px;
        @media  screen and (min-width: 768px){
            padding-top: 0px;
        }
        &__return{
            
            padding-left: 30px;
            
        }
    }
    &_block{
        display: flex;
        max-width: 1440px;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid white;
        flex-direction: column;
        margin-top: 10px;
        padding-top: 20px;
    }
    &_info{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px white solid;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            flex-direction: row;
        }
        &__avatar{
            max-width: 100px;
            max-height: 100px;
            background-color: white;
            @media  screen and (min-width: 768px){
                max-width: 200px;
                max-height: 200px;
            }
        }
        &__credentials{
            display: flex;
            flex-direction: column;
        }

    }
    &_data{
        display: flex;

        &__reviews{
            max-width: 30%;
            border-right: 1px solid white;
        
        

        }
        &__order{


        }
    }
}
.credentials{
    &__name{
        color: white;
        font-family: KARLA;
        font-size: 50px;
        font-weight: 700;
    }
    &__city{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }
    }
    &__rate{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-decoration: none;
        @media  screen and (min-width: 768px){
            size: 10px;
        }

    }
}
.review{
    &__block{
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
    
    }
    &__item{
        display: flex;
        gap: 30px;
        border-bottom: 1px solid white;
        align-items: center;
        padding-bottom: 20px;
        

    }
    &__avatar{
        max-width: 70px;
        max-height: 70px;
        // padding-left: 10px;
        margin-left: 15px;
    }
    &__text{
        font-size: 20px;
        font-weight: 400;
        font-family: KARLA;
        color: white;
    }
    &__title{
        font-size:40px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-align: center;
        border-bottom: 1px solid white;
        padding-bottom: 30px;
    }
}
</style>