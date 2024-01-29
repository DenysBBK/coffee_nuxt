<template>
    <div class="base_shops">
        <h1 class="popular_title">Top rated coffee-shops</h1>
        <div class="shops_block">
          <v-sheet
    class="sheet"
    elevation="8"
    max-width="1600"
  >
    <v-slide-group
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="(item, index) in topTenShops" 
        :key="index"
        v-slot="{ selectedClass }"
      >
        <v-card
          color="black"
          :class="['ma-10', selectedClass]"
        >
          
            <div class="shop">
          <h4 class="shop_title">{{ item.city }}</h4>
          <p class="shop_name">{{ item.name }}</p>
          <img :src="userAvatar(item.avatar)" class="shop_img">
          <p class="shop_rate" v-if="item.totalRating <= 0">No rate</p>
          <div>

            <v-rating v-if="item.totalRating > 0"
              readonly
              :length="5"
              size="32"
              :model-value="item.totalRating"
              active-color="yellow"
              half-increments
              color="white">
            </v-rating>
          </div>
          <nuxt-link to="/login" v-if="!btnText && !isCafeAccount" >
            <button class="shop_btn">Login</button>
          </nuxt-link>
          <nuxt-link :to="createLink(item.id)" v-if="btnText">
            <button class="shop_btn">Order</button>
          </nuxt-link>
        </div>
          
        </v-card>
      </v-slide-group-item>
      
    </v-slide-group>
  </v-sheet>
        </div> 
      </div>
</template>
<script setup lang="ts">
import { shopsArr} from 'types/profileTypes';

const shops:ComputedRef<shopsArr[]> = computed(() => {
    return useProfileStore().shopsInfo
})
const topTenShops:Ref<shopsArr[]> = ref([]);

function filterShops(){
  let allShops = shops.value.sort((one, next) => next.totalRating - one.totalRating);
  topTenShops.value = allShops

}

function userAvatar(item:number):string{
    return `/images/${item}.png`
};

const btnText:ComputedRef<boolean> = computed(() => {
  if(localStorage.getItem('type') == 'users'){
    return true
  }else{
    return false
  }
})
const isCafeAccount:ComputedRef<boolean> = computed(() => {
  if(localStorage.getItem('type') == 'shops'){
    return true
  }else{
    return false
  }
})
function createLink(id:number){
  return `/order/${id}`
}





onBeforeMount(async() => {
  try{
    await useProfileStore().getCoffeeShops()
    filterShops()    
  }catch(error){

  }
})
</script>
<style lang="scss">
.sheet{
  margin: 0 auto;
  background-color: black;
  border: 1px solid white;
  border-radius: 20px 20px; 
  
}
.popular_title{
  font-size: 50px;
        color: white;
        text-align: center;
        font-family: KARLA;
        padding-bottom: 20px;
        @media  screen and (min-width: 480px) {
        font-size: 60px;   
        }
        @media  screen and (min-width: 768px) {
            font-size: 70px;   
        }
        @media  screen and (min-width: 1024px) {
            font-size: 80px;   
        }
        @media  screen and (min-width: 1200px) {  
            font-size: 90px;
        }
}
.group{
  padding: 20px;
  gap: 60px;

}
.base_shops{
  padding-top: 70px;
  @media  screen and (min-width: 768px){
    height: 80vh;
  }
  // height: 80vh;
}
.shops_block{
  padding-top: 50px;
  padding-left: 15px;
  padding-right: 15px;
}
.shop{
  text-align: center;
  &_title{
    color: yellow;
    font-family: KARLA;
    font-size: 40px;
  }
  &_name{
    color: white;
    font-family: KARLA;
    font-size: 30px;

  }
  &_img{
    max-height: 200px;
    padding-top: 10px;
  }
  &_rate{
    color: white;
    font-family: KARLA;
    font-size: 30px;
  }
  &_btn{
    color: black;
    font-weight: 600;
    font-family: KARLA;
    font-size: 20px;
    background-color: yellow;
    padding: 5px 15px 5px 15px;
    border-radius: 20px 20px;
    margin-top: 10px;
  }
}
.mdi-chevron-left{
  color: white;
}
.mdi-chevron-right{
  color: white;
}
// .v-icon--size-default{
//   font-size: 50px;
// }
</style>