<template>
<div class="profile_links">
    <nuxt-link to="/profile" class="profile_link">Profile</nuxt-link>
    <nuxt-link to="/edit-profile" class="profile_link">Edit Profile</nuxt-link>
    <nuxt-link to="/active-orders" class="profile_link">Active Orders</nuxt-link>
    <nuxt-link to="/history" class="profile_link">History</nuxt-link>
</div>
</template>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.profile{
    &_links{
        display: flex;
        flex-direction: column;
        align-items: start;

    }
    &_link{
        text-decoration: none;
        font-size: 40px;
        color: yellow;
        font-weight: 700;
        text-align: center;
        border-bottom: 1px solid white;
        

    }
}

</style>