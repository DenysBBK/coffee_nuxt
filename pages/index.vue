<template>
    <div>
        <v-container>
            <h1 class="text-center">What is Take&Go about</h1>
        <v-timeline>
    <v-timeline-item
      dot-color="purple-lighten-2"
      fill-dot
    >
      <v-card>
        
        <v-card-text class="main_text">
          Do you like to drink coffee very much, but are you already tired of constant queues?
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
          Would you like your coffee to be prepared as you walk to the coffee shop so that when you arrive, you can pick up your coffee and continue on your way?
        </v-card-text>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      dot-color="cyan-lighten-1"
      fill-dot
    >
      <v-card>
        
        <v-card-text class="main_text">
          All you need to do is 4 simple things:
          <br>1. <NuxtLink to="/registration">Register</NuxtLink>
          <br>2. Find a coffee shop along the way
                    <br>3. Order coffee
                    <br>4. Pick up a drink on the way when it is ready
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
          Enjoy your favorite coffee that you now have without queuing!
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</v-container>
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
useHead({
    title:langs.value.pageTitles.mainPage
})
</script>
<style scoped lang="scss">
.main{
  &_text{
    font-size: 20px;
    padding-top: 10px;
    line-height: 25px;
  }
}
</style>