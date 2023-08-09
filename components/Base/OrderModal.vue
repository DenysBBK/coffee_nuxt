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
                <ul v-if="!isOrderListEmpty">
                  <li v-for="(item, index) in orderList" :key="index">
                  {{ `${item.name}, ${item.price} UAH` }}</li>
                </ul>
                <p class="pt-6" v-if="!isOrderListEmpty">Total price: {{ totalPrice }} UAH</p>
              </v-card-text>
              <div class="modal_confirm">
                <base-button text="Confirm order" @click="confirmOrder" :loading="isLoading"></base-button>
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

const totalPrice:Ref<number> = ref(0)
const isLoading:Ref<boolean> = ref(false)

function addToOrderList():void{
  const findItem = thePositions.value.find(item => item.text == choosenPosition.value)
  if(findItem){
    isOrderListEmpty.value = false
    orderList.value.push(findItem.itemData)
    totalPrice.value = totalPrice.value + Number(findItem.itemData.price)
  }
  
}
const needToClose:Ref<boolean> = ref(false)

const emit = defineEmits(['order'])
function confirmOrder():void{
 console.log('tolik')
  
  
  
 
  
  // emit('order', orderList.value)
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
        list-style-type: none;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        
    
        
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
    
}
.list_item{
    vertical-align: middle;
}
.order_drop{
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>