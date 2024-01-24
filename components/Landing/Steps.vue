<template>
    <section class="steps">
        <h1 class="steps_title">How to use website</h1>
        <h2 class="steps_subtitle">For ordering your coffee, all you need is 4 simple steps</h2>
        <div class="steps_block">
            <div class="step">
                <h2 class="step_title">1 Step</h2>
                <p class="step_content">You need to go to <NuxtLink to="/registration">Registration</NuxtLink> and register as User</p>
            </div>
            <div class="step">
                <h2 class="step_title">2 Step</h2>
                <p class="step_content">Find coffee-shop in your city along the way </p>
            </div>
            <div class="step">
                <h2 class="step_title">3 Step</h2>
                <p class="step_content">Open choosen coffee-shop profile and order a coffee</p>
            </div>
            <div class="step">
                <h2 class="step_title">4 Step</h2>
                <p class="step_content">Pick up a drink when it will be ready and leave a review if you want</p>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.steps{
   
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 50px;
    @media screen and (min-width: 768px) {
        height: 100vh;
    }
    
    &_title{
        font-size: 50px;
        color: white;
        text-align: center;
        font-family: KARLA;
        padding-bottom: 20px;
        @media  screen and (min-width: 480px) {
        font-size: 60px;   
        }
        @media  screen and (min-width: 768px) {
            font-size: 70px;   
        }
        @media  screen and (min-width: 1024px) {
            font-size: 80px;   
        }
        @media  screen and (min-width: 1200px) {  
            font-size: 90px;
        }
    }
    &_subtitle{
        font-size: 20px;
        color: yellow;
        text-align: center;
        font-family: KARLA;
        @media  screen and (min-width: 480px) {
        font-size: 30px;   
        }
        @media  screen and (min-width: 768px) {
            font-size: 40px;   
        }
        @media  screen and (min-width: 1024px) {
            font-size: 50px;   
        }
        @media  screen and (min-width: 1200px) {  
            font-size: 60px;
        }

    }
    &_block{
        align-items: center;
        justify-content: center;
        max-width: 1600px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding-top: 50px;
        padding-left: 20px;
    padding-right: 20px;
        @media  screen and (min-width: 768px) {
            flex-direction: row;
        }

    }
}

.step{
    border: 1px solid white;
    border-radius: 10px 10px;
    padding: 15px;
    text-align: center;
    width: 100%;
    height: 100%;
   

    &_title{
        color: white;
        font-family: KARLA;
        font-size: 30px;
        @media  screen and (min-width: 768px) {
            font-size: 35px;
        
        }
        @media  screen and (min-width: 1200px) {
            font-size: 50px;
        }


    }
    &_content{
        color: yellow;
        font-family: KARLA;
        font-size: 20px;
        @media  screen and (min-width: 768px) {
            font-size: 25px;
        
        }
        @media  screen and (min-width: 1200px) {
            font-size: 40px;
        }

    }
}

</style>