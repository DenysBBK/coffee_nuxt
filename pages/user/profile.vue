<template>
   <div class="profile_content">
        <div class="profile_data">
            <img :src="userAvatar(avatar)" class="profile_data__img">
            <div>
                <p class="profile_data__name">{{ name }}</p>
                <nuxt-link to="/order" class="info_title">Make order -></nuxt-link>

            </div>
        </div>
        <div class="profile_info">
            <div class="profile_info__item">
                <span class="info_title">{{ langs.userProfile.name }}:</span>
                <span class="info_data">{{ name }}</span>
            </div>
            <div class="profile_info__item">
                <span class="info_title">{{ langs.userProfile.phone }}:</span>
                <span class="info_data">{{ phone }}</span>
            </div>
            <div class="profile_info__item">
                <span class="info_title">{{ langs.userProfile.bank }}:</span>
                <span class="info_data">{{ bank }}</span>
            </div>
            <div class="profile_info__item">
                <span class="info_title">{{ langs.userProfile.cardNumber }}:</span>
                <span class="info_data">{{ cardNumber }}</span>
            </div>
        </div>
        <div class="last_order" v-if="lastOrder">
            <h2 class="last_order__title">LAST ORDER</h2>
            <div class="last_order__content">
                <img :src="userAvatar(Number(lastOrder.cafeAvatar))" class="profile_data__img">
                <p class="content__title">{{ lastOrder.fromCafe }}</p>
                <div>
                    <table>
                        <tbody>
                            <tr v-for="(item, index) in lastOrder.positions" :key="index">
                                <td class="table__title">{{ item.name }}</td>
                                <!-- <td class="table__data">x{{ item.amount}}</td> -->
                                <td class="table__title">{{ item.price }} UAH</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="total">
                        <p class="total__title">Total price:</p>
                        <p class="total__price">{{ lastOrderTotalPrice }} UAH</p>
                    </div>
                </div>
                <base-dialog @action="testF">
                <template #openButton>
                    Repeat order
                </template>
                <template #text>
                    <h3 class="profile_data__name">Repeat the order</h3>
                    <p>Positions:</p>
                    <ul>
                        <li v-for="(item, index) in lastOrder.positions" :key="index">
                        <span class="total__title">- {{ item.name }}</span>
                        <span> ''</span>
                        <span  class="total__price">{{ item.price }} UAH</span>
                        </li>
                    </ul>
                    <p class="total__price">Total price: {{ lastOrderTotalPrice }} UAH</p>
                </template>
                <template #buttonAction >
                    repeat
                </template>
                </base-dialog>
               
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { languageState } from 'types/languageTypes';
import { ordersArr } from 'types/orderTypes';


const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang);


const name:Ref<string> = ref('Name');
const phone:Ref<string> = ref('0999999999');
const bank:Ref<string> = ref('Monobank');
const cardNumber:Ref<string> = ref('1234548383838383');
const avatar:Ref<number> = ref(2);
const lastOrderTotalPrice:Ref<number> = ref(0)


const data = useProfileStore().userInfo;

const lastOrder:ComputedRef<ordersArr | null> = computed(() =>{
    return useOrderStore().getAllOrders.length === 0? null : useOrderStore().getAllOrders.reduce((one, next) => one.positionId > next.positionId ? one:next)
});

function lastOrderCalculate(){
    let sum = 0
    lastOrder.value?.positions.forEach(one => sum = sum+ Number(one.price))
    lastOrderTotalPrice.value = sum
};

function userAvatar(item:number):string{
    return `/images/${item}.png`
}
function testF(){
    console.log('Hello, from order')
    
}
function repeatLastOrder(){
    console.log('Last order')
    
}

onBeforeMount(async() => {
    try{
        await useProfileStore().getUserData();
        await useOrderStore().getOrders('user');
        name.value = data.name;
        phone.value = data.phone;
        bank.value = data.bank;
        cardNumber.value = data.card;
        avatar.value = data.avatar;
        lastOrderCalculate()
    }catch(error){
        console.log(error)
        
    }
})

definePageMeta({
    middleware:'authenticated'
})

useHead({
    title:langs.value.pageTitles.userProfile
})
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");



.profile_data{
    display: flex;
    gap: 30px;
    align-items: center;
    padding: 30px;
    border-bottom: 1px solid white;
    justify-content: center;
    @media  screen and (min-width: 768px){
        justify-content: flex-start;
    }
    &__img{
        max-width: 100px;
        max-height: 100px;
        background-color: white;
        @media  screen and (min-width: 768px){
            max-width: 200px;
            max-height: 200px;
        }
       
        
    }
    &__name{
        color: white;
        font-family: KARLA;
        font-size: 50px;
        font-weight: 700;

    }
}
.profile_info{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px;
    &__item{
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        @media  screen and (min-width: 768px){
            flex-direction: row;
        }
    }
}
.info{
    &_title{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-decoration: none;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }

    }
    &_data{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }  
    }
}
.last_order{
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 30px;
    &__title{
        font-family: KARLA;
      color: yellow;
      font-size: 30px;
      font-weight: 700; 
      text-align: center;   

    }
    &__content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        flex-wrap: wrap;
        flex-direction: column;
        @media  screen and (min-width: 768px) {
        flex-direction: row;
        }
    }
}
.content{
    &__title{
    font-family: KARLA;
      color: white;
      font-size: 30px;
      font-weight: 700;
    }
}
.table{
    &__title{
        font-family: KARLA;
      color: white;
      font-size: 20px;
      font-weight: 700;
    }
    &__data{
        font-family: KARLA;
      color: yellow;
      font-size: 20px;
      font-weight: 700
    }
}
td{
    padding-left: 20px;
}
.total{
    display: flex;
    gap: 10px;
    padding-top: 20px;
    &__title{
        font-family: KARLA;
      color: yellow;
      font-size: 30px;
      font-weight: 700 
    }
    &__price{
        font-family: KARLA;
      color: white;
      font-size: 30px;
      font-weight: 700 
    }
}
</style>
