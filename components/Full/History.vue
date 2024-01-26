<template>
    <div class="history">
       
        <h1 class="history__no-items" v-if="!ordersItems.length" >{{ langs.history.noItems }}</h1>
        <ul class="history_list"> 
            <li class="history_list__item" v-for="(item, index) in showedItems" :key="index">
                <div class="item__avatar">
                    <img :src=userAvatar(item) class="item__avatar_img">
                    <p class="item__avatar_name">{{ historyType(item) }}</p>
                </div>
                <div class="item__list">
                    <ul class="item__list_full" v-for="(pos, i) in item.positions.slice(0,10)" :key="i">
                        <li class="item__list_one">{{ pos.name }}, {{ pos.price }}/UAH</li>
                    </ul>
                </div>
                <p class="item__date">{{ date(item.positionId)}}</p>
            </li>
        </ul>
        <div class="history_btn" v-if="showPaginationButton && ordersItems.length > 5">
            <base-button text="More" @click="loadMoreItems"></base-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ordersArr} from 'types/orderTypes';
import{languageState} from 'types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const ordersItems:ComputedRef<ordersArr[]> = computed(() => {
    return useOrderStore().getAllOrders.filter(one => one.status === 3).reverse()
});


const pagination:Ref<number> = ref(5);
const showedItems:ComputedRef<ordersArr[]> = computed(() => {
    return ordersItems.value.slice(0, pagination.value)
});
const showPaginationButton:Ref<boolean> = ref(true)

function loadMoreItems(){

    pagination.value = pagination.value + 5;
    console.log('More items')
    
}
watch(pagination, (newV, oldV) => {
    if(pagination.value >= ordersItems.value.length){
        showPaginationButton.value = false
    }
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

</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.history{


    &_list{
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 20px 20px 20px;
        &__item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid white;
            border-radius: 15px;
            padding: 10px;
            gap: 20px;
            
            flex-direction: column;
            @media  screen and (min-width: 480px) {
                flex-direction: row;
                
            }
        }
    }
    &_btn{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        justify-content: center;
    }
    &__no-items{
        text-align: center;
    font-size: 30px;
    font-family: KARLA;
    color: yellow;
    padding-top: 30px;
    }
}
.item{
    &__avatar{
        display: flex;
        flex-direction: column;
        align-items: center;
        &_img{
            max-width: 75px;
            max-height: 75px;
         
        }
        &_name{
            color: white;
            font-family: KARLA;
            font-size: 30px;
            font-weight: 700;
            text-align: center;
        }
    }

    &__list{

        &_full{
          list-style-type: none;
        }
        &_one{
            color: yellow;
            font-family: KARLA;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
        }
    }

    &__date{
        color: white;
            font-family: KARLA;
            font-size: 30px;
            font-weight: 700;
    }

}
</style>