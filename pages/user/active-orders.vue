<template>
    <div class="active">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <h1 class="no-orders" v-if="!userOrders.length">{{ langs.activeOrders.noOrders }}</h1>
        <div class="active__list">
            <div class="active__list_item" v-for="(item, index) in showedItems" :key="index">
                <div class="item__name">
                    <img :src=userAvatar(item.cafeAvatar) class="item__name-img">
                    <p class="item__name-text">{{ item.fromCafe }}</p>
                </div>
                <div class="item__positions">
                    <ul class="item__positions-list" v-for="(pos, i) in item.positions" :key="i">
                        <li class="item__positions-title">{{ pos.name }}, <span class="item__positions-currency">{{ pos.price }} UAH</span></li>
                    </ul>
                </div>
                <div class="item__btn">
                    <p class="item__btn-status">{{ status(item.status) }}</p>
                    <base-dialog @action="finishOrder(index)" v-if="item.status === 2"
                    @close-dialog="cleanInputs">
                        <template #openButton>
                            {{ langs.activeOrders.finish }}
                        </template>
                        <template #text>
                            <h3 class="dialog_title">Finish the order</h3>
                            <p class="dialog_shop_name">{{ item.fromCafe}}</p>
                            <img class="item__name-img" :src="userAvatar(Number(item.cafeAvatar))">
                            <p class="dialog_w">Positions:</p>
                            <ul>
                                <li v-for="(it, ind) in item.positions" :key="ind">
                                <span class="dialog_y">- {{ it.name }}</span>
                                <span> ''</span>
                                <span  class="dialog_w">{{ it.price }} UAH</span>
                                </li> 
                            </ul>
                            <div class="dialog_review">
                                <p class="dialog_w">Leave review</p>
                                <textarea class="dialog_textarea" v-model="userReview.review"></textarea>
                                <v-rating
                                v-model="userReview.rate"
                                color="white"
                                active-color="yellow"
                                hover></v-rating>
                            </div>

                        </template>
                        <template #buttonAction >
                            finish
                        </template>
                    </base-dialog>
                    
                </div>
                
            </div>
                <div class="active_btn" v-if="showPaginationButton && userOrders.length > 5">
                    <base-button text="More" @click="loadMoreItems"></base-button>
                </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ordersArr } from 'types/orderTypes';
import { reviewsArr } from 'types/profileTypes';

import{languageState} from 'types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();

const userOrders:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status !== 3).reverse()
});

const userReview:Ref<reviewsArr> = ref({
    userAvatar:useProfileStore().user.avatar,
    rate:0,
    review:''
})

function cleanInputs(){
    userReview.value.rate = 0;
    userReview.value.review = ''
}
function status(item:number):string{
            if(item === 0)return langs.value.activeOrders.pending;
            if(item === 1)return langs.value.activeOrders.preparing;
            if(item === 2){
                return langs.value.activeOrders.ready
            }else{
                return langs.value.activeOrders.finished
            };
            
}
function userAvatar(item:number):string{
    return `/images/${item}.png`
}

const pagination:Ref<number> = ref(5);
const showedItems:ComputedRef<ordersArr[]> = computed(() => {
    return userOrders.value.slice(0, pagination.value)
});
const showPaginationButton:Ref<boolean> = ref(true)

    function loadMoreItems(){

pagination.value = pagination.value + 5;
console.log('More items')

}
watch(pagination, (newV, oldV) => {
if(pagination.value >= userOrders.value.length){
    showPaginationButton.value = false
}
})



async function finishOrder(index:number):Promise<void>{
   console.log(userReview.value)
   
    
    
    userOrders.value[index].status == 3;
            let findOrder = {
                position:userOrders.value[index].positionId,
                placeId:userOrders.value[index].cafeId,
                status:3,
                type:'users',
                orderReview:userReview.value
            }
    try{
        await useOrderStore().updateOrder(findOrder);
        await useOrderStore().getOrders('user')
        show('success', langs.value.alerts.orderIsFinished)
    }catch(error){
        console.log(error)
        
    }
}



onBeforeMount(async() => {
    try{
    await useOrderStore().getOrders('user');
    console.log(langs.value.activeOrders)
    
    }catch(error){
        console.log(error)   
    }
})
definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:langs.value.pageTitles.acitveOrders
})
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.active{

    &__list{
        padding: 20px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        &_item{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            border: 1px solid white;
            border-radius: 15px;
            padding: 10px;
            @media  screen and (min-width: 480px) {
                flex-direction: row;
            }
        }
    }
    &_btn{
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        justify-content: center;
    }

}
.item{

    &__name{
        display: flex;
        flex-direction: column;
        align-items: center;

        &-img{
            max-width: 75px;
            max-height: 75px;
           

        }
        &-text{
            color: white;
            font-family: KARLA;
            font-size: 30px;
            font-weight: 700;

        }
    }


    &__positions{

        &-title{
            color: yellow;
            font-family: KARLA;
            font-size: 20px;
            font-weight: 700;
        }
        &-currency{
            color: white;
        }
        &-list{
            list-style-type: none;
        }
    }

    &__btn{
        display: flex;
        flex-direction: column;
        align-items: center;
        &-status{
            color: white;
            font-family: KARLA;
            font-size: 20px;
            font-weight: 700;

        }
        &-action{
            background-color: yellow;
            color: white;

        }
    }
}


.no-orders{
    text-align: center;
    font-size: 30px;
    font-family: KARLA;
    color: yellow;
    padding-top: 30px;
}

</style>