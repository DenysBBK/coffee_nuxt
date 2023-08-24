<template>
    <v-container class="nav_container">
        <nav class="navigation">
            <div class="navigation_routes">
                <img src="../../public/images/coffee-cup.png"
                height="50"
                width="50">
                <NuxtLink to="/">
                    <v-btn variant="text" class="main_btn">Take & Go</v-btn>
                </NuxtLink>
            </div>
            <div class="navigation_routes">
                <NuxtLink to="/login" v-if="!auth.isAuthenticated">
                    <base-button text="login"></base-button>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <base-button text="Registration" v-if="!auth.isAuthenticated"></base-button>
                </NuxtLink>
                <NuxtLink to="/order" v-if="type === 'users' && auth.isAuthenticated">
                    <base-button text="Order"></base-button>
                </NuxtLink>
                <NuxtLink to="/cafe-profile" v-if="type === 'shops' && auth.isAuthenticated">
                    <base-button text="Profile"></base-button>
                </NuxtLink>
                <NuxtLink to="/orders" v-if="type === 'shops' && auth.isAuthenticated">
                    <base-button text="Orders"></base-button>
                </NuxtLink>
                <NuxtLink to="/active-orders" v-if="type === 'users' && auth.isAuthenticated">
                    <base-button text="Active orders"></base-button>
                </NuxtLink>
                <NuxtLink to="/profile" v-if="type === 'users' && auth.isAuthenticated">
                    <base-button text="Profile"></base-button>
                </NuxtLink>
                <NuxtLink to="/history" v-if=" auth.isAuthenticated">
                    <base-button text="History"></base-button>
                </NuxtLink>
                <base-button text="Logout" v-on:click="auth.logout()" v-if="auth.isAuthenticated"></base-button>
            </div>
        </nav>
    </v-container>
</template>
<script setup lang="ts">
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
}
.main_btn{
    color: #1d0502;
    text-align: center;
    margin: auto;
    font-size: large;
}


</style>