<template>
    <div class="active">
        <base-alert
            v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <h1 class="no-orders" v-if="!shopOrders.length">{{ langs.orders.noOrders }}</h1>
        <div class="active__list">
            <div class="active__list_item" v-for="(item, index) in showedItems" :key="index">
                <div class="item__name">
                    <img :src=userAvatar(item.userAvatar) class="item__name-img">
                    <p class="item__name-text">{{ item.userName }}</p>
                </div>
                <div class="item__positions">
                    <ul class="item__positions-list" v-for="(pos, i) in item.positions" :key="i">
                        <li class="item__positions-title">{{ pos.name }} {{ pos.price }}, <span class="item__positions-currency">UAH</span></li>
                    </ul>
                </div>
                <div>
                    <p class="item__btn-status">{{ status(item.status) }}</p>
                    <base-dialog @action="changeOrder(index, 1)" v-if="item.status === 0">
                        <template #openButton>
                            {{ langs.orders.takeInWork }}
                        </template>
                        <template #text>
                            <p class="dialog_w">Confirm that you are taking order in work</p>
                            <p class="dialog_y">{{ `Order number: ${item.positionId}` }}</p>
                        </template>
                        <template #buttonAction>
                            Confirm
                        </template>
                    </base-dialog>
                    <base-dialog @action="changeOrder(index, 2)" v-if="item.status === 1">
                        <template #openButton>
                            {{ langs.orders.finish }}
                        </template>
                        <template #text>
                            <p class="dialog_w">Finish the order number:
                                <p class="dialog_y">{{ item.positionId }}</p>
                            </p>
                        </template>
                        <template #buttonAction>
                            Finish
                        </template>
                    </base-dialog>
                </div>
            </div>
            <div class="history_btn" v-if="showPaginationButton && shopOrders.length > 5">
                <base-button text="More" @click="loadMoreItems"></base-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import{languageState} from 'types/languageTypes'
import { ordersArr } from 'types/orderTypes';

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang);
const { showAlert, typeOfAlert, alertText, show, close } = useAlert();   

const shopOrders:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status !== 3).reverse()
})

const pagination:Ref<number> = ref(5);
const showedItems:ComputedRef<ordersArr[]> = computed(() => {
    return shopOrders.value.slice(0, pagination.value)
});
const showPaginationButton:Ref<boolean> = ref(true)

function loadMoreItems(){

    pagination.value = pagination.value + 5;
    console.log('More items')
    
}
watch(pagination, (newV, oldV) => {
    if(pagination.value >= shopOrders.value.length){
        showPaginationButton.value = false
    }
})


function userAvatar(item:number):string{
    return `/images/${item}.png`
};
function status(item:number):string{
            if(item === 0)return langs.value.orders.pending
            if(item === 1){
                return langs.value.orders.preparing
            }else{
                return langs.value.orders.ready
            }
};

async function changeOrder(index:number, forType:number):Promise<void>{
    shopOrders.value[index].status == forType 
        let findOrder = {
                position:shopOrders.value[index].positionId,
                placeId:shopOrders.value[index].userId,
                status:forType,
                type:'shops'
            } 
    try{
        await useOrderStore().updateOrder(findOrder);
        await useOrderStore().getOrders('shop')
        if(forType == 1){show('success', langs.value.alerts.orderInWork)}
        if(forType == 2){show('success', langs.value.alerts.orderIsDone)}
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
    title:langs.value.pageTitles.ordersPage
})
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.active{

    &__list{
        padding: 20px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        &_item{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            border: 1px solid white;
            border-radius: 15px;
            padding: 10px;
            @media  screen and (min-width: 480px) {
                flex-direction: row;
            }
        }
    }

}
.item{

    &__name{
        display: flex;
        flex-direction: column;
        align-items: center;

        &-img{
            max-width: 75px;
            max-height: 75px;
           

        }
        &-text{
            color: white;
            font-family: KARLA;
            font-size: 30px;
            font-weight: 700;

        }
    }
    &__status{
            display: flex;
            flex-direction: column;
            align-self: center;
    }


    &__positions{

        &-list{
            list-style-type: none;

        }
        &-title{
            color: yellow;
            font-family: KARLA;
            font-size: 20px;
            font-weight: 700;
        }
        &-currency{
            color: white;
        }
    }

    &__btn{
        display: flex;
        flex-direction: column;
        align-items: center;
        &-status{
            color: white;
            font-family: KARLA;
            font-size: 20px;
            font-weight: 700;
            text-align: center;

        }

    }
}


.no-orders{
    text-align: center;
    font-size: 30px;
    font-family: KARLA;
    color: yellow;
}
.history_btn{
    display: flex;
        align-items: center;
        
        justify-content: center;
}
</style>