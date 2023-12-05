<template>
    <div class="order_page">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <div class="order_block">
            <div class="order_filters">
                <h3 class="order_filters__title">Filters</h3>
                <div class="order_filters__drop">
                <v-autocomplete
                    :label="langs.order.chooseSity"
                    variant="outlined"
                    :items="['Kiev', 'Kharkiv', 'Odessa', 'Dnipro', 'Lviv', 'Donetsk', 'Zaporizhia', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Zhytomyr', 'Sumy', 'Rivne', 'Ternopil', 'Kirovohrad', 'Ivano-Frankivsk', 'Lutsk', 'Lysychansk', 'Uzhhorod', 'Enerhodar']"
                    v-model="choosenCity"
                    v-on:update:model-value="changeCity"
                    >
                </v-autocomplete>
                </div>
                <!-- v-if="choosenCity !== null && shopsAddresses.length !== 0" -->
                <div class="order_filters__drop">
                    <v-autocomplete
                    :label="langs.order.chooseAddress"
                    variant="outlined"
                    :items="shopsAddresses"
                    v-model="choosenAdress"
                    v-on:update:model-value="changeAddress">
                    </v-autocomplete>
                </div>
            </div>
            <div class="order_cards">

            </div>
        </div>
        <!-- <v-container class="order_container">
            <h1 class="text-center pb-10" >{{ langs.order.title }}</h1>
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
        </v-container> -->
    </div>
</template>
<script setup lang="ts">
import { shopsArr } from 'types/profileTypes';
import { languageState } from 'types/languageTypes';

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const { showAlert, typeOfAlert, alertText, show, close } = useAlert();
const router = useRouter()
function go(){
    router.push('order/12222245')
    
}

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
<style lang="scss">
.order{
    &_page{
        padding-left: 10px;
        padding-right: 10px;
        padding-top:30px;
        @media  screen and (min-width: 768px){
            padding-top: 0px;
        }
    }
    &_block{
        display: flex;
        max-width: 1440px;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid white;
        flex-direction: column;
        @media  screen and (min-width: 768px) {
        flex-direction: row;
        }
    }
    &_filters{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        align-items: center;
        width: 100%;
        flex-direction: column;
        @media  screen and (min-width: 768px) {
        flex-direction: row;
        }
        &__drop{
            width: 75%;
        @media  screen and (min-width: 768px) {
            width: 25%;
        }
        }
        &__title{
            color: yellow;
        font-family: KARLA;
        font-size: 50px;
        font-weight: 700;
        }
    }
    &_cards{

    }
}
.v-input__control{
    background-color: black;
    border: 0.1px white solid;
   
    margin-top: 10px;
    opacity: 1;
}
.v-field-label{
    opacity: 1;
    color: yellow;
}
.v-field__input{
    color: yellow;
}
.v-field__append-inner{
    color: yellow;
    opacity: 1;
}
.mdi-menu-down{
    opacity: 1;
}
</style>