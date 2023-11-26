<template>
   <div class="profile_content">
        <div class="profile_data">
            <img :src="userAvatar(avatar)" class="profile_data__img">
            <p class="profile_data__name">{{ name }}</p>
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
        <div class="last_order">
            <h2 class="last_order__title">LAST ORDER</h2>
            <div class="last_order__content">
                <img :src="userAvatar(cafeAvatar)" class="profile_data__img">
                <p class="content__title">Aroma Cava</p>
                <div>
                    <table>
                        <tbody>
                            <tr v-for="item in testData" :key="item.name">
                                <td class="table__title">{{ item.name }}</td>
                                <td class="table__data">x{{ item.amount}}</td>
                                <td class="table__title">{{ item.price }} UAH</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="total">
                        <p class="total__title">Total price:</p>
                        <p class="total__price">100 UAH</p>
                    </div>
                </div>
                <base-button text="Repeat order" @click="repeatLastOrder"></base-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { languageState } from 'types/languageTypes';
const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang);

const name:Ref<string> = ref('Name');
const phone:Ref<string> = ref('0999999999');
const bank:Ref<string> = ref('Monobank');
const cardNumber:Ref<string> = ref('1234548383838383');
const avatar:Ref<number> = ref(2);
const cafeAvatar:Ref<number> = ref(8)

function userAvatar(item:number):string{
    return `/images/${item}.png`
}

const testData = [
    {
    name:'Капучіно',
    price:40,
    amount:1
    },
    {
    name:'Американо',
    price:15,
    amount:2
    },
    {
    name:'Рістретто',
    price:30,
    amount:3
    },
]

function repeatLastOrder(){
    console.log('Last order')
    
}


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
    
    &__img{
        max-width: 200px;
        max-height: 200px;
       
        
    }
    &__name{
        color: white;
        font-family: KARLA;
        font-size: 60px;
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
    }
}
.info{
    &_title{
      font-family: KARLA;
      color: yellow;
      font-size: 40px;
      font-weight: 700;  

    }
    &_data{
        font-family: KARLA;
      color: white;
      font-size: 40px;
      font-weight: 700;  
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
      font-size: 40px;
      font-weight: 700; 
      text-align: center;   

    }
    &__content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
    }
}
.content{
    &__title{
    font-family: KARLA;
      color: white;
      font-size: 40px;
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
      font-size: 40px;
      font-weight: 700 
    }
    &__price{
        font-family: KARLA;
      color: white;
      font-size: 40px;
      font-weight: 700 
    }
}
</style>
