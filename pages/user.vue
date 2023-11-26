<template>
    <div class="profile_page">
        <div class="profile_block">
            <div class="profile_links">
                <nuxt-link to="/user/profile" class="profile_link" :class="{'profile_link_active':route == '/user/profile'}">Profile</nuxt-link>
                <nuxt-link to="/user/edit-profile" class="profile_link" :class="{'profile_link_active':route == '/user/edit-profile'}">Edit Profile</nuxt-link>
                <nuxt-link to="/user/active-orders" class="profile_link" :class="{'profile_link_active':route == '/user/active-orders'}">Active Orders</nuxt-link>
                <nuxt-link to="/user/history" class="profile_link" :class="{'profile_link_active':route == '/user/history'}">History</nuxt-link>
            </div>
            <div class="profile_content">
                <NuxtPage/>   
            </div> 
        </div>
    </div>
</template>
<script setup lang="ts">
const route = computed(() =>{
    return useRoute().fullPath
})
console.log(route.value)


</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.profile{
    &_links{
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 30%;
        border-right: 1px solid white;
    }
    &_link{
        text-decoration: none;
        font-size: 40px;
        color: yellow;
        font-weight: 700;
        text-align: center;
        border-bottom: 1px solid white; 
        width: 100%;
        padding: 15px;
        font-family: KARLA;
        
    }
    &_link_active{
        color: black;
        background-color: white;
    }
    &_page{
        padding-left: 10px;
        padding-right: 10px;

    }
    &_block{
        display: flex;
        max-width: 1600px;
        margin: 0 auto;
        
        border-radius: 10px;
        border: 1px solid white;
    }
    &_content{
        width: 100%;
    }
}
.test_title{
    color: white;
}
</style>