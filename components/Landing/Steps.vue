<template>
    <section class="steps">
        <h1 class="steps_title">How to use website</h1>
        <h2 class="steps_subtitle">For ordering your coffee, all you need is 4 simple steps</h2>
        <div class="steps_block">
            <div class="step">
                <img src="../../public/images/step1.png" class="step_img">
                <p class="step_content"><span class="step_title">1.</span> You need to go to <NuxtLink to="/registration">Registration</NuxtLink> and register as User</p>
            </div>
            <div class="step">
                <img src="../../public/images/step2.png" class="step_img">
                <p class="step_content"><span class="step_title">2.</span> Find coffee-shop in your city along the way </p>
            </div>
            <div class="step">
                <img src="../../public/images/step3.png" class="step_img">
                <p class="step_content"><span class="step_title">3.</span> Open choosen coffee-shop profile and order a coffee</p>
            </div>
            <div class="step">
                <img src="../../public/images/step4.png" class="step_img">
                <p class="step_content"><span class="step_title">4.</span> Pick up a drink when it will be ready and leave a review if you want</p>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.steps{ 
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0px 20px 0px 20px;
  
    
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
        display: flex;
        gap: 30px;
        flex-wrap: wrap;
        padding-top: 30px;
        
    }
}

.step{
    border: 1px solid white;
    border-radius: 10px 10px;
    padding: 15px;
    text-align: center;
    flex: 1;
   

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
    &_img{
        max-width: 300px;
        max-height: 300px;
        @media  screen and (min-width: 480px) {
            max-width: 400px;
        max-height: 400px;  
        }
        @media  screen and (min-width: 768px) {
            max-width: 700px;
        max-height: 700px;  
        }
    }
}

</style>