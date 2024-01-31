<template>
    <div class="profile_page">
        <div class="profile_block">
            <div class="profile_links">
                <nuxt-link to="/cafe/profile" class="profile_link" :class="{'profile_link_active':route == '/cafe/profile'}">Profile</nuxt-link>
                <nuxt-link to="/cafe/edit-profile" class="profile_link" :class="{'profile_link_active':route == '/cafe/edit-profile'}">Edit Profile</nuxt-link>
                <nuxt-link to="/cafe/orders" class="profile_link" :class="{'profile_link_active':route == '/cafe/orders'}">Orders</nuxt-link>
                <nuxt-link to="/cafe/history" class="profile_link" :class="{'profile_link_active':route == '/cafe/history'}">History</nuxt-link>
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


</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.profile{
    &_links{
        display: flex;
        flex-direction: row;
        align-items: start;
        width: 100%;
        flex-wrap: wrap;
        border-bottom: 1px solid white;
        @media  screen and (min-width: 768px) {
        flex-direction: column;
        border-right: 1px solid white;
        width: 30%;
        }
    }
    &_link{
        text-decoration: none;
        font-size: 20px;
        color: yellow;
        font-weight: 700;
        text-align: center;
        width: 50%;
        padding: 15px;
        font-family: KARLA;
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        &:hover{
            color: black;
            background-color: white;
        };
        @media  screen and (min-width: 768px){
            font-size:30px;
            width: 100%;

        }
        
    }
    &_link_active{
        color: black;
        background-color: white;
    }
    &_page{
        padding-left: 10px;
        padding-right: 10px;
        padding-top:30px;
        @media  screen and (min-width: 768px){
            padding-top: 0px;
        }
    }
    &_block{
        display: flex;
        max-width: 1440px;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid white;
        flex-direction: column;
        @media  screen and (min-width: 768px) {
        flex-direction: row;
        }
    }
    &_content{
        width: 100%;
        @media  screen and (min-width: 768px){
            width: 70%;
        }
    }
}

</style>