<template>
    <div>
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
       <v-container class="orders_container">
            <h1 class="text-center pb-10" v-if="userOrders.length" >Active orders</h1>
            <h1 class="text-center pb-10" v-if="!userOrders.length">There is no orders</h1>
            
            <div class="orders_main">
                <div class="orders_item" v-for="(item, index) in userOrders" :key="index">
                    
                    <div class="order_avatar">
                        <img :src=userAvatar(item.cafeAvatar) class="order_img">
                        <p class="order_name">{{ item.fromCafe }}</p>
                    </div>
                    
                    <div>
                        <ul class="order_list" v-for="(pos, i) in item.positions" :key="i">
                        <li>{{ pos.name }} {{ pos.price }}, UAH</li>
                    </ul>
                    </div>
                
                    <div>
                        <p class="order_status">{{ status(item.status) }}</p>
                        <v-btn @click="finishOrder(index)" class="order_btn" v-if="item.status === 2" >Finish</v-btn>
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

const userOrders:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status !== 3)
})
function status(item:number):string{
            if(item === 0)return 'Pending';
            if(item === 1)return 'Preparing';
            if(item === 2){
                return 'Ready'
            }else{
                return 'Finished'
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
        show('success', 'Order is finished')
    }catch(error){
        console.log(error)
        
    }
}

onBeforeMount(async() => {
    try{
    await useOrderStore().getOrders('user')
    console.log(userOrders.value)
    
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