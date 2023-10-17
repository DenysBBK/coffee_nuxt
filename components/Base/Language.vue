<template>
  
<div >
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
        >
          <div class="lang_item">
            <img :src=langIcon(choosenLanguage.img) class="lang_icon">
            <span class="lang_name">{{ choosenLanguage.name }}</span>
          </div>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in languages"
          :key="index"
        >
          <v-list-item-title>
            
                <v-btn v-on:click="chooseLanguage(item)" variant="text">
                    <div class="lang_item">
                        <img :src=langIcon(item.img) class="lang_icon">
                        <span >{{ item.name }}</span>
                    </div>
                </v-btn>
            
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

</template>
<script setup lang="ts">
import {langItem} from '../../types/languageTypes'
const languages:Ref<langItem[]> = ref([
    {
        name:'Українська',
        img:1,
        type:'ukr'
    },
    {
        name:'English',
        img:2,
        type:'eng'
    }
]);

const choosenLanguage:Ref<langItem> = ref({
    name:'English',
    img:2,
    type:'eng'
})

async function chooseLanguage(item:langItem):Promise<void>{
    choosenLanguage.value.img = item.img;
    choosenLanguage.value.name = item.name;
    choosenLanguage.value.type = item.type;
    localStorage.setItem('lang', item.type);
    try{
        await useLanguageStore().getLanguage(item.type)
    }catch(error){
        console.log(error)
        
    }
}

function langIcon(item:number):string{
    return `/images/lang-${item}.png`
}
onBeforeMount(() => {
  let lang = localStorage.getItem('lang');
  if(lang == 'ukr'){
    choosenLanguage.value.name = 'Українська';
    choosenLanguage.value.img = 1;
    choosenLanguage.value.type = 'ukr'
  }else{
    choosenLanguage.value.name = 'English';
    choosenLanguage.value.img = 2;
    choosenLanguage.value.type = 'eng'
  }
})
</script>
<style scoped lang="scss">
.lang{
    &_icon{
        max-width: 30px;
        max-height: 30px;
        align-items: center;
    }
    &_item{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
    }
    &_name{
      @media  screen and (max-width: 814px) {
        display: none;
    }
    }
}
</style>
