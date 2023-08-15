<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <img class="card-img"
      src="../../public/images/card-img.png"
      height="200"  
      >
      <v-card-title>
        {{ props.name }}
      </v-card-title>
        <base-order-modal 
          :data="props.fullData"
          @order="orderRequest"
          >
        </base-order-modal>
    <v-card-actions>
      <v-btn
        color="orange-lighten-1"
        variant="text"
      >
        Positions
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <ul class="card-positions">
            <li v-for="(item, index) in props.positions" :key="index">
              {{ item.name }} - 
              {{ item.price }} UAH
            </li>
          </ul>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { Positions } from 'types/profileTypes';
import { shopsArr } from 'types/profileTypes';
import { userOrderData } from 'types/orderTypes';
const show:Ref<boolean> = ref(false);

async function orderRequest(data:Positions[]):Promise<void>{
  
  
  try{
    const orderData: userOrderData = {
      uid:localStorage.getItem('uid'),
      name:useProfileStore().user.name,
      positions:data,
      id:props.fullData.id,
      shopName:props.fullData.name                  
    }
    console.log(orderData)
    
    await useOrderStore().postOrder(orderData)
    

  }catch(error){
    console.log(error)
    
  }
  
}




const props = defineProps<{
  name?:string,
  positions?:Positions[],
  fullData: shopsArr

}>()
</script>
<style scoped lang="scss">
.card-img{
    background-size: cover;
    width: 100%;
}
.card-btn{
    background-color: blue;
    color: white;
    margin-left: 10px;
}
.card-positions{
  list-style-type: none;
}
</style>