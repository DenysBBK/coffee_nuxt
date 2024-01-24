<template>
    <v-container class="error_container">
        <h1 class="error_title">404</h1>
        <h3 class="error_subtitle">Page not found</h3>
        <img src="./public/images/closed.jpg" class="error_img">
       
        <BaseRedirectButton
        text="To main page"
        url="/"></BaseRedirectButton>
        
    </v-container>
</template>
<style scoped lang="scss">
.error{
    &_container{
    width: 100%;
    background-color: black;
    border-radius: 15px;
    border: 1px solid white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 20px;
    padding-left: 20px;

// @media screen and (min-width: 750px) {
//     width: 50%;
    
// }
    }
    &_title{
        font-size: 130px;
        color: yellow;

    }
    &_img{
        max-width: 70%;
        max-height: 70%;
        
        @media screen and (min-width: 750px) {
        max-width: 50%;
        max-height: 50%;
    }
        
    }
    &_subtitle{
        color: yellow;
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