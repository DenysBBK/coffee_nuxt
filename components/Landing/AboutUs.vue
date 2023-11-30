<template>
    <section class="about">
        <div class="about_block">
            <div class="about_content">
                <h1 class="about_title">ABOUT US</h1>
                <p class="about_info">Welcome to Take and Go, where cafes and coffee enthusiasts come together for a seamless experience. Cafe owners expand their reach, attract new customers, and streamline operations. Customers discover local cafes, pre-order their favorite coffee, earn rewards, and support their community. With a diverse cafe network, user-friendly interface, and a focus on quality, we're your go-to platform for exceptional coffee experiences. Join us to enjoy convenience, community, and great coffee!</p>
            </div>
            <div class="img_block">
                <img src="../../public/images/about.jpg" class="about_img">
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
.about{
    
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
        @media  screen and (min-width: 768px) {
            flex-direction: row;
            height: 100vh;    
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
            max-width: 60%;
        }
    }
    &_title{
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
    &_info{
        color: yellow;
        max-width: 100%;
        font-family: KARLA;
        font-size: 20px;
        text-align: center;
        border-radius: 10px 10px;
        border: 1px solid white;
        padding: 15px;
        @media  screen and (min-width: 768px) {
            font-size: 20px;
            text-align: start;
            max-width: 75%;
        
        }
        @media  screen and (min-width: 1024px) {
            font-size: 25px;
        
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

</style>