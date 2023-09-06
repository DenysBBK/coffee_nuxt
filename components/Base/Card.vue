<template>
 
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <img class="card-img"
    :src=userAvatar(props.avatar)
      height="200"  
      >
      <v-card-title>
        {{ props.name }}
      </v-card-title>
        <base-order-modal 
          :data="props.fullData"
          @order="orderRequest"
          @makeAlert="successAlert"
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
        :icon="showP ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showP = !showP"
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showP">
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
const showP:Ref<boolean> = ref(false);

 

  const emit = defineEmits(['makeOrder'])
function successAlert(data:string):void{
  emit('makeOrder', data)
}

async function orderRequest(data:Positions[]):Promise<void>{
  
  const orderData: userOrderData = {
      uid:localStorage.getItem('uid'),
      name:useProfileStore().user.name,
      positions:data,
      id:props.fullData.id,
      shopName:props.fullData.name,
      cafeAvatar:props.avatar,
      userAvatar:useProfileStore().userInfo.avatar              
    }
  try{
    await useProfileStore().getUserData()
    console.log(orderData)
    await useOrderStore().postOrder(orderData);
    
    
  }catch(error){
    console.log(error)
    
  }
  
  
}

const props = defineProps<{
  name?:string,
  positions?:Positions[],
  fullData: shopsArr
  avatar:number
}>()

function userAvatar(item:number):string{
    return `/images/${item}.png`
}
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