<template>
    <div class="cafe_page">
        <BaseRedirectButton class="cafe_page__return" text="<-- To all coffee_shops" url="/order"></BaseRedirectButton>
        <div class="cafe_block">
            <div class="cafe_info"></div>
            <div class="cafe_data">
                <div class="cafe_data__reviews"></div>
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

<style scoped lang="scss">
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

    }
    &_data{


        &__reviews{

        }
        &__order{


        }
    }
}
</style>