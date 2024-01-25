<template>
    <section class="people">
        <div class="people_block">
            <div class="people_content">
                <h1 class="content_title">FOR CLIENTS</h1>
                <p class="content_info">At Take and Go, we've made it easier than ever for you to satisfy your coffee cravings. Whether you're in a hurry and need your daily caffeine fix on the go, or you simply want to skip the lines and pre-order your favorite coffee, our platform has got you covered</p>
                <BaseRedirectButton
                text="Try now ->"
                :url="nesUrl"></BaseRedirectButton>
            </div>
            <div class="img_block">
                <img src="../../public/images/people.jpg" class="people_img">
            </div>
        </div>
    </section>
</template>
<script setup>

let isToken = localStorage.getItem('token')
const nesUrl = isToken? '/order' : '/registration'
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.people{
    

    &_block{
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
        flex-direction: column;  
        max-width: 1600px;
        padding-left: 20px;
        padding-right: 20px;
        gap: 30px;
        padding-top: 50px;
        @media  screen and (min-width: 768px) {
            flex-direction: row;
            height: 90vh   
        }

    }
    &_content{
        display: flex;
        flex-direction: column;
        gap: 30px;
        height: 50%;
        justify-content: center;
        align-items: center;
        @media  screen and (min-width: 768px) {
            gap: 20px;
            align-items: start;
        }
    }
    &_img{
        max-width: 100%;
        max-height: 100%;
        @media  screen and (min-width: 480px) {
        max-width: 70%;
        max-height: 70%;
        border-radius: 10px 10px;
            
        }
        @media  screen and (min-width: 768px) {
            max-width: 100%;
            max-height: 100%;
        
        }
        @media  screen and (min-width: 1024px) {
            max-width: 90%;
            max-height: 90%;
        
        }

    }
}
.img_block{
    display: flex;
    align-items: center;
    justify-content: center;
}
.content_title{
    font-size: 50px;
    color: white;
    text-align: center;
    font-family: KARLA;
    @media  screen and (min-width: 480px) {
       font-size: 60px;
        
    }
    @media  screen and (min-width: 768px) {
        font-size: 70px;
        text-align: start;
        
    }
    @media  screen and (min-width: 1024px) {
        font-size: 80px;
        
    }
    @media  screen and (min-width: 1200px) {
       
        font-size: 90px;
    }

}
.content_info{
    color: yellow;
    max-width: 100%;
    font-family: KARLA;
    font-size: 20px;
    text-align: center;
    border-radius: 10px 10px;
    border: 1px solid white;
    padding: 15px;
    @media  screen and (min-width: 768px) {
        font-size: 25px;
        text-align: start;
        max-width: 75%;
        
    }

}


</style>