<template>
    <v-container class="nav_container">
    <v-card class="navigator">
      <v-layout>
        <v-app-bar class="mobile_bar">
          <v-toolbar-title>
                <NuxtLink to="/" class="nav_icon">
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
                <BaseRedirectButton 
                v-if="!auth.isAuthenticated"
                :text="langs.header.login"
                url="/login"></BaseRedirectButton>
                <BaseRedirectButton 
                v-if="!auth.isAuthenticated"
                :text="langs.header.registration"
                url="/registration"></BaseRedirectButton>
                <BaseRedirectButton 
                v-if="type === 'users' && auth.isAuthenticated"
                :text="langs.header.order"
                url="/order"></BaseRedirectButton>
                <BaseRedirectButton 
                v-if="type === 'users' && auth.isAuthenticated"
                :text="langs.header.profile"
                url="/user/profile"></BaseRedirectButton>
                    <button
                    @click="auth.logout()" 
                    v-if="auth.isAuthenticated"
                    class="logout_btn">{{ langs.header.logout }}</button>
               
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
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.v-toolbar__content{
  background-color: black;
  
}
.nav_container{
    @media  screen and (max-width: 768px) {
     border-bottom: 1px solid white;    
        
    }
}
.navigator{
    z-index: 10;
    
}
.mobile_btn{
   align-items: flex-start;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    
}
.nav_btns{
    background-color: black;
    min-width: 60%;
}
.main_btn{
    color: white;
    font-family: KARLA;
    font-weight: 400;
    font-size: 20px;
}
.nav_icon{
    display: flex;
    align-items: center;
    text-decoration: none;
}
.logout_btn{
    position: relative;
    color: white;
    font-family: KARLA;
    font-size: 22px;
    font-weight: 300;
    overflow: hidden; 

    &::before{
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0; 
    height: 1px;
    background-color: white;
    transition: width 0.5s ease;  
    }

    &:hover::before{
        width: 100%;
    } 
}
.mdi-menu::before{
    color: white;
}

</style>