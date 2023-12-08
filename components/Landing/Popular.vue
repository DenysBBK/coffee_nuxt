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
        v-for="n in 16"
        :key="n"
        v-slot="{ selectedClass }"
      >
        <v-card
          color="black"
          :class="['ma-10', selectedClass]"
        >
          
            <div class="shop">
          <h4 class="shop_title">Kyiv</h4>
          <p class="shop_name">Aroma Cava</p>
          <img src="../../public/images/8.png" class="shop_img">
          <p class="shop_rate">Rate: *****</p>
          <nuxt-link to="/login">
            <button class="shop_btn">Login</button>
          </nuxt-link>
        </div>
          
        </v-card>
      </v-slide-group-item>
      
    </v-slide-group>
  </v-sheet>
        </div> 
      </div>
</template>
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