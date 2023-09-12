<template>
    <h1 class="text-center">{{ langs.mainPage.title }}</h1>
    <v-timeline side="end"  class="timeline_main">
      <v-timeline-item
        dot-color="purple-lighten-2"
        size="small"
      >
        <div class="timeline_card">
            <img src="../../public/images/queue.jpg" class="timeline_img">
          <div class="timeline_text">
            <p>{{ langs.mainPage.card1 }}</p>
          </div>
        </div>
      </v-timeline-item>
  
      <v-timeline-item
        dot-color="amber-lighten-1"
        size="small"
      >
        <div class="timeline_card">
            <img src="../../public/images/making.jpg" class="timeline_img">
          <div class="timeline_text">
            <p>{{ langs.mainPage.card2 }}</p>
          </div>
        </div>
      </v-timeline-item>
  
      <v-timeline-item
        dot-color="cyan-lighten-1"
        size="small"
      >
        <div class="timeline_card">
            <img src="../../public/images/order.jpg" class="timeline_img">
          <div class="timeline_text">
            {{ langs.mainPage.card3 }}
          <br>1. <NuxtLink to="/registration">{{ langs.mainPage.card3First }}</NuxtLink>
          <br>2. {{ langs.mainPage.card3Second }}
                    <br>3. {{ langs.mainPage.card3Third }}
                    <br>4. {{ langs.mainPage.card3Four }}
          </div>
        </div>
      </v-timeline-item>
  
      <v-timeline-item
        dot-color="red-lighten-1"
        size="small"
      >
        <div class="timeline_card">
            <img src="../../public/images/drink.jpg" class="timeline_img">
          <div class="timeline_text">
            <p>{{ langs.mainPage.card4 }}</p>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </template>

<script setup lang="ts">
import{languageState} from '../../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

</script>
<style scoped lang="scss">
.timeline_main{
    justify-content:flex-start
}
.timeline_text{
    background-color: white;
    padding: 10px;
    
}
.timeline_img{
    max-width: 100%;
    max-height: 100%;
   
    @media screen and (min-width: 450px) {
        max-width: 50%;
        max-height: 50%;
    }
}
.timeline_card{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
}
</style>