<template>
    <div class="order_page">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <div class="order_block">
            <div class="order_filters">
                <h3 class="order_filters__title">Filters:</h3>
                <div class="order_filters__drop">
                <v-autocomplete
                    class="tolik"
                    :label="langs.order.chooseCity"
                    variant="outlined"
                    :items="['Kiev', 'Kharkiv', 'Odessa', 'Dnipro', 'Lviv', 'Donetsk', 'Zaporizhia', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Zhytomyr', 'Sumy', 'Rivne', 'Ternopil', 'Kirovohrad', 'Ivano-Frankivsk', 'Lutsk', 'Lysychansk', 'Uzhhorod', 'Enerhodar']"
                    v-model="choosenCity"
                    v-on:update:model-value="changeCity"
                    >
                </v-autocomplete>
                </div>
                <!-- v-if="choosenCity !== null && shopsAddresses.length !== 0" -->
                <div class="order_filters__drop" v-show="choosenCity !== null && shopsAddresses.length !== 0">
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
                <div class="card" v-for="item in allShops" :key="item.id">
                    <img :src="userAvatar(item.avatar)" class="card_avatar">
                    <h3 class="card_name">{{ item.name }}</h3>
                    <p class="card_norating" v-if="item.totalRating <= 0">No rating</p>
                    <v-rating v-if="item.totalRating > 0"
                        readonly
                        :length="5"
                        size="32"
                        :model-value="item.totalRating"
                        active-color="yellow"
                        half-increments
                        color="white">
                    </v-rating>
                    <base-button text="Order" @click="go(item.id)"></base-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { shopsArr, getCafeData } from 'types/profileTypes';
import { languageState } from 'types/languageTypes';

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const { showAlert, typeOfAlert, alertText, show, close } = useAlert();
const router = useRouter()
function go(id:number){
    router.push(`order/${id}`)
    
}

const shopsCity:Ref<string[]> = ref([])
const choosenCity:Ref<string | null> = ref(null)
const shops:ComputedRef<shopsArr[]> = computed(() => {
    return useProfileStore().shopsInfo
})

function triggerAlert(data:string):void{
    show('success', data);
};
function userAvatar(item:number):string{
    return `/images/${item}.png`
}

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

const allShops:ComputedRef<shopsArr[]> = computed(() =>{
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
        shopsCity.value.push(item.city);
        
        
    });
    // console.log(allShops.value)
        
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
@import "../../assets/editProfile.scss";
@import "../../assets/editInput.scss";
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

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
        display: flex;
        flex-wrap: wrap;
       align-items: center;
      justify-content: center;
       gap: 20px;
       
        

    }
}
.card{
    // flex: 0 1 33.333%;
    align-self: flex-start;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    flex-direction: column;
    border: 1px solid white;
    border-radius: 15px;
    &_avatar{
        background-color: white;
        max-width: 200px;
        max-height: 200px;
        align-items: center;
    }
    &_name{
        font-family: KARLA;
      color: yellow;
      font-size: 30px;
      font-weight: 700;
    }
    &_rate{
        font-family: KARLA;
      color: white;
      font-size: 30px;
      font-weight: 700;
    }
    &_norating{
        color: white;
        font-family: KARLA;
        font-size: 20px;
        font-weight: 700;  
    }
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