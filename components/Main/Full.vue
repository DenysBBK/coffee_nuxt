<template>
  <div class="base">
      <div class="base_back">
        <div class="base_info">
          <h1>Your coffee, your way, your choice. Order online and pick up a taste on the way!</h1>
        </div>
      </div>
      <div class="base_cards">
        <h2>{{ langs.mainPage.title }}</h2>
        <div class="card">
          <img src="../../public/images/queue.jpg" class="card_img">
          <p class="card_text">{{ langs.mainPage.card1 }}</p>
        </div>
        <div class="card">
          <img src="../../public/images/making.jpg" class="card_img">
          <p class="card_text">{{ langs.mainPage.card2 }}</p>
        </div>
        <div class="card">
          <img src="../../public/images/order.jpg" class="card_img">
          <p class="card_text">{{ langs.mainPage.card3 }}
          <br>1. <NuxtLink to="/registration">{{ langs.mainPage.card3First }}</NuxtLink>
          <br>2. {{ langs.mainPage.card3Second }}
          <br>3. {{ langs.mainPage.card3Third }}
          <br>4. {{ langs.mainPage.card3Four }}
        </p>
        </div>
        <div class="card">
          <img src="../../public/images/drink.jpg" class="card_img">
          <p class="card_text">{{ langs.mainPage.card4 }}</p>
        </div>
      </div>
      <div class="base_shops">
        <h2>Top rated coffee-shops</h2>
        <div class="shops_block">
          <v-sheet
    class="sheet"
    elevation="8"
    max-width="1200"
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
        <!-- <v-container>
            <h1 class="text-center">{{ langs.mainPage.title }}</h1>
        <v-timeline>
    <v-timeline-item
      dot-color="purple-lighten-2"
      fill-dot
    >
      <v-card>
        
        <v-card-text class="main_text">
          <img src="../../public/images/queue.jpg" class="timeline_img">
          <p>{{ langs.mainPage.card1 }}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      dot-color="amber-lighten-1"
      fill-dot
      size="x-small"
    >
      <v-card>
        
        <v-card-text class="main_text">
          <img src="../../public/images/making.jpg" class="timeline_img">
          <p>{{ langs.mainPage.card2 }}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      dot-color="cyan-lighten-1"
      fill-dot
    >
      <v-card>
        
        <v-card-text class="main_text">
          <img src="../../public/images/order.jpg" class="timeline_img">
          <div>
            {{ langs.mainPage.card3 }}
          <br>1. <NuxtLink to="/registration">{{ langs.mainPage.card3First }}</NuxtLink>
          <br>2. {{ langs.mainPage.card3Second }}
                    <br>3. {{ langs.mainPage.card3Third }}
                    <br>4. {{ langs.mainPage.card3Four }}
          </div>
        </v-card-text>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      dot-color="red-lighten-1"
      fill-dot
      size="x-small"
    >
      <v-card>
        
        <v-card-text class="main_text">
          <img src="../../public/images/drink.jpg" class="timeline_img">
          <p>{{ langs.mainPage.card4 }}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</v-container> -->
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.main{
  &_text{
    font-size: 20px;
    padding-top: 10px;
    line-height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
}
.timeline_img{
  max-width: 50%;
  max-height: 50%;
}
.base{
  background-color: black;
  
  &_back{
    background-image: url('../../public/images/land.jpg');
    background-size: cover;
    background-position: center;
    min-height: 90vh;
    width: 100%;
  
 
    
  }
  &_info{
    display: flex;
    align-items: flex-start;
    padding-left: 20px;
    margin: 0 auto;
    max-width: 1600px;
    height: 100%;
    width: 100%;
    padding-top: 150px;
    padding-bottom: 170px;
    
   
    
  }
  &_info h1{
    color: yellow;
    max-width: 50%;
    font-family: KARLA;
    font-size: 90px;
    font-weight: 900;
    line-height: 100px;
    
  }
}

.base_cards{
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap:50px;
  
}
h2{
  color: yellow;
  font-family: KARLA;
  font-size: 60px;
  font-weight: 400;
  text-align: center;
}
.card{
  display: flex;
  align-items: center;
  gap: 30px;
  max-width: 1200px;
  border:1px solid white;
  border-radius: 20px 20px;
  padding: 30px;
  transition: transform 0.3s ease;
  &:hover {
      transform: scale(1.1); // Увеличиваем масштаб при наведении
    }
  &_img{
    max-height: 350px;
    
    border-radius: 15px;
  }
  &_text{
    color: white;
    font-family: KARLA;
    font-size: 30px;
    font-weight: 400;
  }
}
.sheet{
  margin: 0 auto;
  background-color: black;
  border: 1px solid white;
  border-radius: 20px 20px; 
  
}
.group{
  padding: 20px;
  gap: 60px;

}

.base_shops{
  padding-top: 70px;
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
.v-icon--size-default{
  font-size: 50px;
}


</style>
