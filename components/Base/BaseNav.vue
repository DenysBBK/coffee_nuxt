<template>
    <v-container class="nav_container">
        <nav class="navigation">
                <NuxtLink to="/" class="navigation_routes">
                <img src="../../public/images/coffee-cup.png"
                height="50"
                width="50">
                    <v-btn variant="text" class="main_btn">Take & Go</v-btn>
                </NuxtLink>
            <div class="navigation_routes">
                <NuxtLink to="/login" v-if="!auth.isAuthenticated">
                    <base-button :text="langs.header.login"></base-button>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <base-button :text="langs.header.registration" v-if="!auth.isAuthenticated"></base-button>
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
.btn{
    color: red;
}
.navigation{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2.5rem;
    width: 100%;
    flex-direction: column;
    @media screen and (min-width: 750px) {
    display: flex;
    flex-direction: row;
    
}
}
.navigation_routes{
    display: flex;
    justify-content: space-between;
    gap: 10px;
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



</style>