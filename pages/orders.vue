<template>
    <div>
        <v-container class="orders_container">
            <h1 class="text-center pb-10" v-if="shopOrders.length" >Orders</h1>
            <h1 class="text-center pb-10" v-if="!shopOrders.length">There is no orders</h1>
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
                        <v-btn v-if="item.status === 0" class="order_btn" v-on:click="changeOrder(index, 1)">Take in work</v-btn>
                        <v-btn v-if="item.status === 1" class="order_btn" v-on:click="changeOrder(index, 2)">Finish</v-btn>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import { ordersArr } from 'types/orderTypes';

const shopOrders:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status !== 3)
})

function status(item:number):string{
            if(item === 0)return 'Pending';
            if(item === 1){
                return 'Preparing'
            }else{
                return 'Ready'
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
        console.log(findOrder)
        
        await useOrderStore().updateOrder(findOrder);
        await useOrderStore().getOrders('shop')
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
    title:'Orders'
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