<template>
<div class="text-center">
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
        >
          <div class="lang_item">
            <img :src=langIcon(choosenLanguage.img) class="lang_icon">
            <span>{{ choosenLanguage.name }}</span>
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
                        <span>{{ item.name }}</span>
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
    console.log(`I choose ${item.name} language`);
    choosenLanguage.value.img = item.img;
    choosenLanguage.value.name = item.name;
    choosenLanguage.value.type = item.type
    try{
        await useLanguageStore().getLanguage(item.type)
    }catch(error){
        console.log(error)
        
    }
}

function langIcon(item:number):string{
    return `/images/lang-${item}.png`
}

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
}
</style>
