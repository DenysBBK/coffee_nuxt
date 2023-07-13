<template>
    <v-container class="nav_container">
    <v-card class="navigator">
      <v-layout>
        <v-app-bar class="mobile_bar">
          <v-toolbar-title>
            <div class="nav_icon">
                <img src="../../public/images/coffee-cup.png"
              height="50"
              width="50">
              <NuxtLink to="/">
                    <v-btn variant="text" class="main_btn">Take & Go</v-btn>
                </NuxtLink>
            </div>
            
          </v-toolbar-title>
          <v-app-bar-nav-icon
          variant="plain"
          @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="right" temporary class="nav_btns">
            <div class="mobile_btn">
                <NuxtLink to="/login">
                    <base-button text="login"></base-button>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <base-button text="Registration"></base-button>
                </NuxtLink>
            </div>
        </v-navigation-drawer>
        <v-card-text>
        </v-card-text>
      </v-layout>
    </v-card>
</v-container>
</template>
<script setup lang="ts">
const drawer:Ref<boolean> = ref(false)
</script>
<style scoped lang="scss">
.mobile_bar{
  background-color: #FEF2F1;
  
}
.nav_container{
    padding-bottom: 5rem;   
}
.navigator{
    z-index: 1;
}
.mobile_btn{
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    
}
.nav_btns{
    background-color: #fcdfdc;
   
}
.main_btn{
    color: #1d0502;
    
    font-size: large;
}
.nav_icon{
    display: flex;
    align-items: center;
}

</style>