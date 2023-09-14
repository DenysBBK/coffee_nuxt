<template>
    <v-container class="error_container">
        <h1 class="error_title">404</h1>
        <h3 class="error_subtitle">Page not found</h3>
        <img src="./public/images/coffee-cup.png" class="error_img">
       
        <NuxtLink to="/" class="error_link">To main page</NuxtLink>
    </v-container>
</template>
<style scoped lang="scss">
.error{
    &_container{
        width: 100%;
    background-color: #fcdfdc;
    border-radius: 5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 20px;

// @media screen and (min-width: 750px) {
//     width: 50%;
    
// }
    }
    &_title{
        font-size: 130px;

    }
    &_img{
        max-width: 40%;
        max-height: 40%;
        
        @media screen and (min-width: 750px) {
        max-width: 20%;
        max-height: 20%;
    }
        
    }
    &_subtitle{
        font-size: 40px;
        text-align: center;
        align-self: center;
        @media screen and (min-width: 750px) {
        font-size: 50px;
    }

    }
    &_link{
        text-decoration: none;
        color: blue;
        font-weight: 700;
        font-size: 20px;

    }
}
</style>