<template>
    <div>
        <v-container class="history_container">
            <h1 class="text-center pb-10" v-if="ordersItems.length" >Orders History</h1>
            <h1 class="text-center pb-10" v-if="!ordersItems.length" >You dont have items in history</h1>
            <div class="history_main">
                <div class="history_table" v-if="ordersItems.length">
                    <span >{{ type == 'user'?'Coffe Shop Name':'User Name' }}</span>
                    <span>Positions</span>
                    <span>Date</span>
                </div>
                <div class="history_item" v-for="(item, index) in ordersItems" :key="index">
                    <div class="history_avatar">
                        <img :src=userAvatar(item) class="history_img">
                        <p class="item_name">{{ historyType(item) }}</p>
                    </div>
                    <div>
                    <ul class="item_list" v-for="(pos, i) in item.positions" :key="i">
                        <li>{{ pos.name }}, {{ pos.price }}/UAH</li>
                    </ul>
                    </div>
                    <p class="item_date">{{ date(item.positionId)}}</p>
                </div>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import { ordersArr} from 'types/orderTypes';
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const ordersItems:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status === 3)
})

function date(date:number):string{
    let theDate = new Date(date)
    return `${theDate.getDate()}.${theDate.getMonth()+1}.${theDate.getFullYear()}`
}

const type:ComputedRef<string | undefined> = computed(():string => {
    return useAuthStore().useType === 'users'? 'user' : 'shop'
})
function historyType(item: ordersArr):any{
    if(type.value === 'user'){
        return item.fromCafe  
    }else{
        return item.userName
    }
} 

function userAvatar(item: ordersArr):string{
    if(type.value === 'user'){
        return `/images/${item.cafeAvatar}.png`
    }else{
        return `/images/${item.userAvatar}.png`
    }
}

onBeforeMount(async() => {
    try{
        const userType:string = useAuthStore().useType == 'users'? 'user' : 'shop'
        await useOrderStore().getOrders(userType)
    }catch(error){
        console.log(error)
        
    }
})
definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:langs.value.pageTitles.history
})
</script>
<style scoped lang="scss">
.history{
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
    &_table{
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        visibility: hidden;
        @media screen and (min-width: 400px){
            visibility: visible;
        }
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
.item{
    &_name{
        text-align: center;
        font-weight: 600;
        font-size: 15px;
    }
    &_list{
        list-style-type: none;
        display: flex;
        flex-direction: column;
    }
    &_date{
        text-align: center;
        font-weight: 600;
        font-size: 15px;
    }
}
</style>