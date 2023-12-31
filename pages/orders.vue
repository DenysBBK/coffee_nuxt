<template>
    <div>
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-container class="orders_container">
            <h1 class="text-center pb-10" v-if="shopOrders.length" >{{ langs.orders.title }}</h1>
            <h1 class="text-center pb-10" v-if="!shopOrders.length">{{ langs.orders.noOrders }}</h1>
            <div class="orders_main">
                <div class="orders_item" v-for="(item, index) in shopOrders" :key="index">
                    <div class="order_avatar">
                        <img :src=userAvatar(item.userAvatar) class="order_img">
                        <p class="order_name">{{ item.userName}}</p>
                    </div>
                    <div>
                        <ul class="order_list" v-for="(pos, i) in item.positions" :key="i">
                            <li>{{ pos.name }} {{ pos.price }}, UAH</li>
                        </ul>
                    </div>
                    <div>
                        <p class="order_status">{{ status(item.status) }}</p>
                        <v-btn v-if="item.status === 0" class="order_btn" v-on:click="changeOrder(index, 1)">{{ langs.orders.takeInWork }}</v-btn>
                        <v-btn v-if="item.status === 1" class="order_btn" v-on:click="changeOrder(index, 2)">{{ langs.orders.finish }}</v-btn>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import { ordersArr } from 'types/orderTypes';
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();

const shopOrders:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status !== 3).reverse()
})

function status(item:number):string{
            if(item === 0)return langs.value.orders.pending
            if(item === 1){
                return langs.value.orders.preparing
            }else{
                return langs.value.orders.ready
            }
};
function userAvatar(item:number):string{
    return `/images/${item}.png`
}

async function changeOrder(index:number, forType:number):Promise<void>{
    shopOrders.value[index].status == forType 
        let findOrder = {
                position:shopOrders.value[index].positionId,
                placeId:shopOrders.value[index].userId,
                status:forType,
                type:'shops'
            } 
    try{
        await useOrderStore().updateOrder(findOrder);
        await useOrderStore().getOrders('shop')
        if(forType == 1){show('success', langs.value.alerts.orderInWork)}
        if(forType == 2){show('success', langs.value.alerts.orderIsDone)}
    }catch(error){
        console.log(error)
        
    }
}



onBeforeMount(async() => {
    try{
    await useOrderStore().getOrders('shop')
    }catch(error){
        console.log(error)
        
    }
})
definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:langs.value.pageTitles.ordersPage
})
</script>
<style scoped lang="scss">
.orders{
    &_container{
        width: 100%;
        background-color: #cff7fc;
        border-radius: 5%;
        @media screen and (min-width: 750px) {
    width: 75%;
    }
    }
    &_main{
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-height: 600px;
        overflow-y: auto;
    }
    &_item{
        display: flex;
        justify-content: space-between;
        border-color: white;
        border: 5px solid #ffffff;
        border-radius: 0.5rem;
        padding: 10px;
        flex-wrap: wrap;
        gap: 20px;
        flex-direction: column;
        align-items: center;
        @media screen and (min-width: 450px){
            flex-direction: row;
        }
        
    }
}
.order{
    &_btn{
        background-color: blue;
        color: white;
    }
    &_status{
        text-align: center;
        font-weight: 600;
        font-size: 15px;
    }
    &_list{
        list-style-type: none;

    }
    &_avatar{
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap:5px;
        align-items: center;
    }
    &_img{
        max-width: 75px;
        max-height: 75px;
        
    }
}
</style>