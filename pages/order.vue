<template>
    <div>
        <v-container class="order_container">
            <h1 class="text-center pb-10" >Make an order</h1>
            <v-autocomplete
            label="Choose your city"
            variant="outlined"
            :items="shopsCity"
            v-model="choosenCity"
            v-on:update:model-value="changeCity"
            >
        </v-autocomplete>
        
            <v-autocomplete v-if="choosenCity !== null"
            label="Choose the address"
            variant="outlined"
            :items="shopsAddresses"
            v-model="choosenAdress"
            v-on:update:model-value="changeAddress">
            </v-autocomplete>
            <div class="order_cards">
                <base-card
                v-for="item in allShops"
                :key="item.id"
                :name="item.name"
                :positions="item.positions"
                :fullData="item"></base-card>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import { shopsArr } from 'types/profileTypes';

const shopsCity:Ref<string[]> = ref([])
const choosenCity:Ref<string | null> = ref(null)
const shops:ComputedRef<shopsArr[]> = computed(() => {
    return useProfileStore().shopsInfo
})

const shopsAddresses:Ref<string[]> = ref([])
const filteredShops:Ref<shopsArr[]> = ref([])
function changeCity():void{
    choosenAdress.value = null
    shopsAddresses.value.splice(0, shopsAddresses.value.length);
    filteredShops.value.splice(0, filteredShops.value.length)
    shops.value.forEach(item => {
        if(item.city == choosenCity.value){
            shopsAddresses.value.push(item.address);
            filteredShops.value.push(item)
        }
    })
}

const choosenAdress:Ref<string | null> = ref(null)
const filteredShopsByAddress:Ref<shopsArr[]> = ref([])
function changeAddress():void{
    filteredShopsByAddress.value.splice(0, filteredShopsByAddress.value.length)
    shops.value.forEach(item => {
        if(item.address == choosenAdress.value){
            filteredShopsByAddress.value.push(item)
        }
    })
}

const allShops:ComputedRef<shopsArr[] | undefined> = computed(() =>{
    if(choosenCity.value == null){
        return shops.value
    }else if(choosenCity.value !== null && choosenAdress.value == null){
        return filteredShops.value
    }else{
        return filteredShopsByAddress.value
    }
})


onBeforeMount(async() => {
    try{
        await useProfileStore().getCoffeeShops()
        
        shops.value.forEach(item => {
    shopsCity.value.push(item.city)
    })
        console.log(shopsCity)
        
    }catch(error){
        console.log(error)
        
    }
})
definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:'Order'
})
</script>
<style scoped lang="scss">
.order{
    &_container{
    background-color: #cff7fc;
    border-radius: 5%;
    @media screen and (min-width: 750px) {
    width: 50%;
    }
}
    &_cards{
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        padding-top: 30px;
    }
}
</style>