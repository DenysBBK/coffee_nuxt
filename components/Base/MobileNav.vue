<template>
    <v-container class="nav_container">
    <v-card class="navigator">
      <v-layout>
        <v-app-bar class="mobile_bar">
          <v-toolbar-title>
                <NuxtLink to="/" class="nav_icon">
                <img src="../../public/images/coffee-cup.png"
              height="50"
              width="50">
                    <v-btn variant="text" class="main_btn">Take & Go</v-btn>
                </NuxtLink>
          </v-toolbar-title>
          <BaseLanguage></BaseLanguage>
          <v-app-bar-nav-icon
          variant="plain"
          @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="right" temporary class="nav_btns">
            <div class="mobile_btn">
                <NuxtLink to="/login" v-if="!auth.isAuthenticated">
                    <base-button :text="langs.header.login"></base-button>
                </NuxtLink>
                <NuxtLink to="/registration" v-if="!auth.isAuthenticated">
                    <base-button :text="langs.header.registration"></base-button>
                </NuxtLink>
                <NuxtLink to="/order" v-if="type === 'users' && auth.isAuthenticated">
                    <base-button :text="langs.header.order"></base-button>
                </NuxtLink>
                <NuxtLink to="/cafe-profile" v-if="type === 'shops' && auth.isAuthenticated">
                    <base-button :text="langs.header.profile"></base-button>
                </NuxtLink>
                <NuxtLink to="/orders" v-if="type === 'shops' && auth.isAuthenticated">
                    <base-button :text="langs.header.orders"></base-button>
                </NuxtLink>
                <NuxtLink to="/active-orders" v-if="type === 'users' && auth.isAuthenticated">
                    <base-button :text="langs.header.activeOrders"></base-button>
                </NuxtLink>
                <NuxtLink to="/profile" v-if="type === 'users' && auth.isAuthenticated">
                    <base-button :text="langs.header.profile"></base-button>
                </NuxtLink>
                <NuxtLink to="/history" v-if="auth.isAuthenticated">
                    <base-button :text="langs.header.history"></base-button>
                </NuxtLink>
                    <base-button :text="langs.header.logout" 
                    v-on:click="auth.logout()" 
                    v-if="auth.isAuthenticated"
                    class="logout_btn"></base-button>
               
            </div>
        </v-navigation-drawer>
        <v-card-text>
        </v-card-text>
      </v-layout>
    </v-card>
</v-container>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'
const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const drawer:Ref<boolean> = ref(false);

const auth = useAuthStore();
const type:ComputedRef<string> = computed(():string => {
    return useAuthStore().useType
})

</script>
<style scoped lang="scss">
.mobile_bar{
  background-color: #FEF2F1;
  
}
.nav_container{
    padding-bottom: 5rem;   
}
.navigator{
    z-index: 10;
    
}
.mobile_btn{
   
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    
}
.nav_btns{
    background-color: #fcdfdc;
    min-width: 60%;
}
.main_btn{
    color: #1d0502;
    
    font-size: large;
}
.nav_icon{
    display: flex;
    align-items: center;
    text-decoration: none;
}
.logout_btn{
    max-width: 100px;
}

</style>