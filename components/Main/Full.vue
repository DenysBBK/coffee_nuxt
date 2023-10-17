<template>
    <div>
        <v-container>
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
</v-container>
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
</script>
<style scoped lang="scss">
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

</style>
