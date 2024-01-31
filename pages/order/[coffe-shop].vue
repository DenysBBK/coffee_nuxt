<template>
    <div class="cafe_page">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <BaseRedirectButton class="cafe_page__return" text="<-- To all coffee-shops" url="/order"></BaseRedirectButton>
        <div class="cafe_block">
            <div class="cafe_info">
                <img :src="userAvatar(cafeData.avatar)" class="cafe_info__avatar">
                <div class="cafe_info__credentials">
                    <span class="credentials__name">{{ cafeData.name }}</span>
                    <span class="credentials__city">{{ cafeData.city }}</span>
                    <span class="credentials__city">{{ cafeData.address }}</span>
                </div>
                <div>
                    <p class="order_data__title">{{ rating ? rating:0}}/5</p>
                    <v-rating readonly :length="5" :model-value="rating" color="white" :size="32" active-color="yellow"/>
                </div>
            </div>
            <div class="cafe_data">
                <div class="cafe_data__reviews">
                    <h3 class="review__title">Reviews</h3>
                    <h3 v-if="!cafeData.reviews.length" class="review__noreviews">Cafe have no reviews</h3>
                    <ul class="review__block" v-if="cafeData.reviews.length">
                        <li v-for="(item, index) in cafeData.reviews" :key="index" class="review__item">
                            <div>
                                <img :src="userAvatar(item.userAvatar)" class="review__avatar">
                            </div>
                            <div>
                                <p class="review__text">{{ item.review }}</p>
                                <v-rating readonly :length="5" :model-value="item.rate" size="x-small" active-color="yellow"></v-rating>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="cafe_data__order">
                    <div class="order_data">
                       <h3 class="order_data__title">Order you coffe</h3> 
                       <div class="order_data__items">
                            <table class="order_data__table">
                                <thead>
                                    <tr>
                                        <th class="position__name">Position</th>
                                        <th class="position__name price">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in allPositions" :key="index" class="order_data__item" >
                                        <td class="position__title">{{ `${index+1}. ${item.name}` }}</td>
                                        <td class="position__price">{{ item.price }}
                                            <div>
                                                <button class="position__action" @click="decrement(item)">-</button>
                                                <span class="position__amount" :class="{'positive': item.amount >= 1 }">{{ item.amount }}</span>
                                                <button class="position__action" @click="increment(item)">+</button>
                                            </div>
                                        </td>
                                        <!-- <td class="position__btns">
                                            <button class="position__action" @click="decrement(item)">-</button>
                                            <span class="position__amount" :class="{'positive': item.amount >= 1 }">{{ item.amount }}</span>
                                            <button class="position__action" @click="increment(item)">+</button>
                                        </td> -->
                                    </tr>
                                </tbody>
                            </table>
                       </div>
                       <div class="order_data__total">
                        <span class="order_data__total__text">Total Price:</span>
                        <span class="order_data__total__price">{{ totalOrderPrice }} UAH</span>
                       </div>
                       <div>
                           <base-dialog @action="confirmOrder" v-if="totalAddedPositions.length">
                                <template #openButton>
                                        Order
                                </template>
                                <template #text>
                                    <h3 class="dialog_title">Confirm order</h3>
                                    <p class="dialog_w">Positions:</p>
                                    <ul>
                                        <li v-for="(item, index) in totalAddedPositions" :key="index">
                                        <span class="dialog_y">- {{ item.name }}</span>
                                        <span> ''</span>
                                        <span  class="dialog_w">{{ item.price }} UAH</span>
                                        </li>
                                    </ul>
                                    <div class="dialog_total_price">
                                        <p class="dialog_w">Total price: <span class="dialog_y">{{ totalOrderPrice }}</span> UAH</p>
                                    </div>
                                </template>
                                <template #buttonAction >
                                    Confirm
                                </template>
                           </base-dialog>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {addPosition, addedPosition, userReview, userOrderData} from '../../types/orderTypes';

const cafeData = computed(() => useProfileStore().cafeInfo);
const totalOrderPrice:Ref<number> = ref(0)
const { showAlert, typeOfAlert, alertText, show, close } = useAlert();


const allPositions:Ref<addPosition[]> = ref([]);

function userAvatar(item:number):string{
    return `/images/${item}.png`
};
const rating:Ref<number> = ref(0);

const totalAddedPositions:Ref = ref([]);

async function confirmOrder(){
    const orderData: userOrderData = {
        uid:localStorage.getItem('uid'),
        name:useProfileStore().user.name,
        positions:totalAddedPositions.value,
        id:cafeData.value.id,
        shopName:cafeData.value.name,
        cafeAvatar:cafeData.value.avatar,
        userAvatar:useProfileStore().user.avatar
    }
    try{
        await useOrderStore().postOrder(orderData)
    }catch(error){
        console.log(error)
    }    
    totalOrderPrice.value = 0
    totalAddedPositions.value.length = 0;
    allPositions.value.forEach(item => item.amount = 0)
    console.log('I confirm odrer');
    show('success', 'Succes order');
    
}

function increment(item:addPosition):void{
    totalAddedPositions.value.push(item)
    item.amount = item.amount + 1;
    totalOrderPrice.value = totalOrderPrice.value + item.price
    
}

function decrement(item:addPosition):void{
    if(item.amount == 0){
        return
    }
    const itemToRemove = totalAddedPositions.value.indexOf(item)
    totalAddedPositions.value.splice(itemToRemove, 1)
    item.amount = item.amount - 1;
    totalOrderPrice.value = totalOrderPrice.value - item.price;
};

function ratingCalculate(){
    if(cafeData.value.reviews){
        cafeData.value.reviews.forEach(one => {
        rating.value = rating.value + one.rate
        
    })
    rating.value = rating.value / cafeData.value.reviews.length
    }else{
        rating.value = 0
    }    
}

onBeforeMount(async () => {
    try{
        const route = useRoute()
        await useProfileStore().getOneCafeData(route.params.coffeshop);
        cafeData.value.positions.forEach(item => {
            let pos = {
                name:item.name,
                price:Number(item.price),
                amount:0
            }
            allPositions.value.push(pos)
            
        })
        ratingCalculate()
        
        
        

    }catch(error){
        console.log(error)
        
    }
   
    
})
definePageMeta({
    middleware:'authenticated'
})
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.cafe{
    &_page{
        padding-left: 10px;
        padding-right: 10px;
        padding-top:30px;
        @media  screen and (min-width: 768px){
            padding-top: 0px;
        }
        &__return{
            
            padding-left: 30px;
            
        }
    }
    &_block{
        display: flex;
        max-width: 1440px;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid white;
        flex-direction: column;
        margin-top: 10px;
        padding-top: 20px;
    }
    &_info{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px white solid;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            flex-direction: row;
        }
        &__avatar{
            max-width: 100px;
            max-height: 100px;
           
            @media  screen and (min-width: 768px){
                max-width: 200px;
                max-height: 200px;
            }
        }
        &__credentials{
            display: flex;
            flex-direction: column;
        }

    }
    &_data{
        display: flex;
        flex-direction: column;
       
    
        @media  screen and (min-width: 768px){
            flex-direction: row;
        }

        &__reviews{
            max-width: 100%;
            border-right: 1px solid white;
           
            @media  screen and (min-width: 768px){
            width: 40%;
            }
            @media  screen and (min-width: 1024px) {
                width: 30%;
            }
        
        

        }
        &__order{
            padding-bottom: 30px;

        }
    }
}
.credentials{
    &__name{
        color: white;
        font-family: KARLA;
        font-size: 50px;
        font-weight: 700;
    }
    &__city{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }
    }
    &__rate{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-decoration: none;
        @media  screen and (min-width: 768px){
            size: 10px;
        }

    }
}
.review{
    &__block{
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
    
    }
    &__item{
        display: flex;
        gap: 30px;
        border-bottom: 1px solid white;
        align-items: center;
        padding-bottom: 20px;
        

    }
    &__avatar{
        max-width: 70px;
        max-height: 70px;
        // padding-left: 10px;
        margin-left: 15px;
    }
    &__text{
        font-size: 15px;
        font-weight: 400;
        font-family: KARLA;
        color: white;
        @media  screen and (min-width: 480px) {
            font-size: 20px;
        }
    }
    &__title{
        font-size:40px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-align: center;
        border-bottom: 1px solid white;
        padding-bottom: 10px;
    }
    &__noreviews{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid white;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
            padding-bottom: 0px;
            border: none;
        }

    }
}
.order_data{
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    padding-right: 30px;
    align-items: center;
    @media  screen and (min-width: 768px){
        align-items: flex-start;
    }


    &__title{
        font-size:40px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-align: center;
    }
    &__item{
       padding-top: 20px;

    }
    &__table{
        padding-top: 30px;
    }
    &__btn{
        padding-left: 20px;
    }
    &__total{
        padding-top: 20px;
        display: flex;
        gap: 20px;
        &__text{
            font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        text-align: start;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }

        }
        &__price{
            font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        text-align: start;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }  
        }
    }

}
.position{
    &__name{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        text-align: start;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }
    }
    &__price{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: yellow;
        padding-left: 20px;
        text-align: start;
        display: flex;
        gap: 20px;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
            gap: 40px;
        }
        @media  screen and (min-width: 480px) {
            padding-left: 50px;
        }

    }
    &__title{
        font-size: 15px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        text-align: start;
        width: 50%;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
            width: 50%;
        }
    }
    &__action{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        }

    }
    &__amount{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        padding: 0 5px 0 5px;
        @media  screen and (min-width: 768px){
            font-size: 30px;
            padding: 0 15px 0 15px; 
        }

    }
    &__btns{
        padding-left: 10px;
        @media  screen and (min-width: 480px) {
            // padding-left: 50px;
        }
    }
}
.positive{
    color: rgb(60, 198, 60);

}
.price{
    padding-left: 20px;
    @media  screen and (min-width: 480px) {
            padding-left: 50px;
        }
    
}
</style>