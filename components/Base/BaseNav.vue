<template>
    <v-container class="nav_container">
        <nav class="navigation">
                <NuxtLink to="/" class="navigation_routes">
                <!-- <img src="../../public/images/coffee-cup.png"
                height="50"
                width="50"> -->
                    <!-- <v-btn variant="text" class="main_btn">Take & Go</v-btn> -->
                    <button class="header_title">Take & Go</button>
                </NuxtLink>
            <div class="navigation_routes">
                <NuxtLink to="/login" v-if="!auth.isAuthenticated">
                    <!-- <base-button :text="langs.header.login"></base-button> -->
                    <button class="header_btn">LOGIN</button>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <!-- <base-button :text="langs.header.registration" v-if="!auth.isAuthenticated"></base-button> -->
                    <button class="header_btn">REGISTRATION</button>
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
                <NuxtLink to="/profile" v-if="type === 'users' && auth.isAuthenticated">
                    <base-button :text="langs.header.profile"></base-button>
                </NuxtLink>
                <NuxtLink to="/history" v-if=" auth.isAuthenticated">
                    <base-button :text="langs.header.history"></base-button>
                </NuxtLink>
                <base-button :text="langs.header.logout" 
                v-on:click="auth.logout()" 
                v-if="auth.isAuthenticated"
                class="logout_btn">
            </base-button>
            <ClientOnly>
                <BaseLanguage ></BaseLanguage>
            </ClientOnly>
            </div>
        </nav>
    </v-container>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'
const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const auth = useAuthStore()
const type:ComputedRef<string> = computed(():string => {
    return useAuthStore().useType
})

</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");


.navigation{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;
    flex-direction: column;
    border-bottom: 0.1px solid white;
    @media screen and (min-width: 750px) {
    display: flex;
    flex-direction: row;
    
    
}
}
.navigation_routes{
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    text-decoration: none;
}
.main_btn{
    color: #7d4e08;
    text-align: center;
    margin: auto;
    font-size: large;
}
.list_btn{
    color:#FEF2F1;
    background-color: #7d4e08;
}
.header_btn{
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
.header_title{
    color: white;
    font-family: KARLA;
    font-weight: 400;
    font-size: 40px;
}


</style>