<template>
    <v-row class="pl-2">
      <v-col cols="auto">
        <v-dialog
          transition="dialog-bottom-transition"
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="modal_btn"
              v-bind="props"
            >ORDER</v-btn>
          </template>
          <template v-slot:default=" {isActive} ">
            <v-card>
              <v-toolbar
                color="primary"
                title="Order you coffee"
              ></v-toolbar>
              <v-card-text class="pa-12">
               
                    <h1 class="modal_title">
                        {{ props.data.name }}
                    </h1>
                    <h3>
                        Choose you drink
                    </h3>
                    <div class="order_drop"
                    >
                    <v-combobox 
                      
                    class="pt-8"
                    label="Choose drink"
                    variant="outlined"
                    :items="thePositions.map(item => item.text)"
                    v-model="choosenPosition"
                    >
                  </v-combobox>
                        <v-btn
                        @click="addToOrderList"
                        >Add
                            <v-icon
                            end
                            icon="mdi-checkbox-marked-circle"
                            >
                            </v-icon>
                        </v-btn>
                    </div>
                <p class="modal_subtitle">Your order list:</p>
                <p v-if="isOrderListEmpty">-</p>
                <ul v-if="!isOrderListEmpty" class="modal_list">
                  <li v-for="(item, index) in orderList" :key="index">
                  {{ `${item.name}, ${item.price} UAH` }}
                  <v-btn icon="mdi-cancel" size="20px" class="modal_disaprove" @click="removeFromOrderList(index)"></v-btn>
                </li>
                </ul>
                <p class="pt-6" v-if="!isOrderListEmpty">Total price: {{ totalPrice }} UAH</p>
                <span v-if="orderListValidator" class="order_validator">Order list is empty</span>
              </v-card-text>
              <div class="modal_confirm">
                <base-button text="Confirm order" @click="() => {
                  if(orderList.length == 0){
                  orderListValidator = true;
                  return
                    } 
                  confirmOrder()
                  isActive.value = false
                }" :loading="isLoading"></base-button>
              </div>
              <v-card-actions class="justify-end">
                <v-btn
                  variant="text"
                  @click="isActive.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </template>
<script setup lang="ts">

import { shopsArr, Positions} from 'types/profileTypes';



const props = defineProps<{
  data:shopsArr
}>()
            
 
const thePositions= computed(() => {
 return props.data.positions.map(item => ({
    itemData:{
      name:item.name,
      price:item.price
    },
    text:`${item.name}, ${item.price} UAH`
  }))
})



const choosenPosition:Ref<string> = ref('')
const isOrderListEmpty:Ref<boolean> = ref(true);
const orderList:Ref<Positions[]> = ref([]);
const orderListValidator:Ref<boolean> = ref(false);

const totalPrice:Ref<number> = ref(0)
const isLoading:Ref<boolean> = ref(false)

function addToOrderList():void{
  const findItem = thePositions.value.find(item => item.text == choosenPosition.value)
  if(findItem){
    isOrderListEmpty.value = false
    orderListValidator.value = false
    orderList.value.push(findItem.itemData)
    totalPrice.value = totalPrice.value + Number(findItem.itemData.price)
  }
  
}
function removeFromOrderList(index:number):void{
 
  const [item] = orderList.value.splice(index, 1);
  totalPrice.value = totalPrice.value - Number(item.price)
}


const emit = defineEmits(['order'])
function confirmOrder():void{
 console.log('tolik') 
 
emit('order', orderList.value)
orderList.value = [];
totalPrice.value = 0;
isOrderListEmpty.value = true;
choosenPosition.value = ''
}


</script>
<style scoped lang="scss">
.modal{
    &_btn{
    background-color: blue;
    color: white;
}
    &_title{
        padding-top: 10px;
        
    }
    &_list{
        
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      
        
        
    
        
    }
    &_positions{
        display: flex;
        justify-content: space-between;
        gap: 50px;
        
    }
    &_confirm{
      display: flex;
      justify-content: center;
    }
    &_subtitle{
      text-decoration: underline;
      font-weight: 300;
      font-size: 20px;
    }
    &_disaprove{
      color: red;
    }
    
}
.list_item{
    vertical-align: middle;
}
.order_drop{
  display: flex;
  align-items: center;
  gap: 10px;
}
.order_validator{
  color: red;
}
</style>