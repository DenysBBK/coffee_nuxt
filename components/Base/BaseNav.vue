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
                <NuxtLink to="/login">
                    <base-button text="login"></base-button>
                </NuxtLink>
                <NuxtLink to="/registration">
                    <base-button text="Registration"></base-button>
                </NuxtLink>
            </div>
        </nav>
    </v-container>
</template>
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