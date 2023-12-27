<template>
    <div class="active">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <h1 class="no-orders" v-if="!userOrders.length">{{ langs.activeOrders.noOrders }}</h1>
        <div class="active__list">
            <div class="active__list_item" v-for="(item, index) in userOrders" :key="index">
                <div class="item__name">
                    <img :src=userAvatar(item.cafeAvatar) class="item__name-img">
                    <p class="item__name-text">{{ item.fromCafe }}</p>
                </div>
                <div class="item__positions">
                    <ul class="item__positions-list" v-for="(pos, i) in item.positions" :key="i">
                        <li class="item__positions-title">{{ pos.name }} {{ pos.price }}, <span class="item__positions-currency">UAH</span></li>
                    </ul>
                </div>
                <div class="item__btn">
                    <p class="item__btn-status">{{ status(item.status) }}</p>
                    <!-- <v-btn @click="finishOrder(index)" class="item__btn-action" v-if="item.status === 2" >{{  }}</v-btn> -->
                    <!-- <base-button @click="finishOrder(index)" :text="langs.activeOrders.finish" ></base-button> -->
                    <base-dialog @action="finishOrder(index)">
                        <template #openButton>
                            {{ langs.activeOrders.finish }}
                        </template>
                    </base-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ordersArr } from 'types/orderTypes';

import{languageState} from 'types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();

const userOrders:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status !== 3).reverse()
});


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

async function finishOrder(index:number):Promise<void>{
    userOrders.value[index].status == 3;
            let findOrder = {
                position:userOrders.value[index].positionId,
                placeId:userOrders.value[index].cafeId,
                status:3,
                type:'users'
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

}
.item{

    &__name{
        display: flex;
        flex-direction: column;
        align-items: center;

        &-img{
            max-width: 75px;
            max-height: 75px;
            background-color: white;

        }
        &-text{
            color: white;
            font-family: KARLA;
            font-size: 30px;
            font-weight: 700;

        }
    }


    &__positions{

        &-list{

        }
        &-title{
            color: yellow;
            font-family: KARLA;
            font-size: 20px;
            font-weight: 700;
        }
        &-currency{
            color: white;
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
}

</style>