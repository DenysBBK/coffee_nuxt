<template>
    <div>
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-container class="order_container">
            <h1 class="text-center pb-10" >{{ langs.order.title }}</h1>
            <v-autocomplete
            :label="langs.order.chooseSity"
            variant="outlined"
            :items="['Kiev', 'Kharkiv', 'Odessa', 'Dnipro', 'Lviv', 'Donetsk', 'Zaporizhia', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Zhytomyr', 'Sumy', 'Rivne', 'Ternopil', 'Kirovohrad', 'Ivano-Frankivsk', 'Lutsk', 'Lysychansk', 'Uzhhorod', 'Enerhodar']"
            v-model="choosenCity"
            v-on:update:model-value="changeCity"
            >
        </v-autocomplete>
        
            <v-autocomplete v-if="choosenCity !== null && shopsAddresses.length !== 0"
            :label="langs.order.chooseAddress"
            variant="outlined"
            :items="shopsAddresses"
            v-model="choosenAdress"
            v-on:update:model-value="changeAddress">
            </v-autocomplete>
            <p class="order_text" v-if="choosenCity !== null &&  shopsAddresses.length === 0">
                {{ langs.order.noShops }}
            </p>
            <div class="order_cards">
                <base-card
                v-for="item in allShops"
                :key="item.id"
                :name="item.name"
                :positions="item.positions"
                :avatar="item.avatar"
                :fullData="item"
                @makeOrder="triggerAlert"
               ></base-card>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import { shopsArr } from 'types/profileTypes';
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const { showAlert, typeOfAlert, alertText, show, close } = useAlert();



const shopsCity:Ref<string[]> = ref([])
const choosenCity:Ref<string | null> = ref(null)
const shops:ComputedRef<shopsArr[]> = computed(() => {
    return useProfileStore().shopsInfo
})

function triggerAlert(data:string):void{
    show('success', data);
};


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
    });
        
    }catch(error){
        console.log(error)
        
    }
})
definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:langs.value.pageTitles.orderPage
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
    &_text{
        text-align: center;
        padding-top: 10px;
        font-size: 20px;
        
    }
}
</style>