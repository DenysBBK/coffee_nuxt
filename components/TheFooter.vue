<template>
    <footer>
        <div class="footer_content">
        <!-- <v-divider></v-divider> -->
        <!-- <div class="footer_btn">
            <NuxtLink to="/terms">
                <base-button :text="langs.footer.terms"></base-button>
            </NuxtLink>
            <NuxtLink to="/privacy-policy">
                <base-button :text="langs.footer.privacy"></base-button>
            </NuxtLink>
        </div>
                <p class="footer_text">2023 Take and go. All rights reserved</p> -->
        <div class="content">
            <div class="content_btns">
                <NuxtLink to="/terms">
                    <button class="c_btn">{{ langs.footer.terms }}</button>
                </NuxtLink>
                <NuxtLink to="/privacy">
                    <button class="c_btn">
                        {{ langs.footer.privacy }}
                    </button>
                </NuxtLink>  
            </div>
            <div class="content_icons">
                <img src="../public/images/tik-tok.png" height="30" width="30" class="content_icon">
                <img src="../public/images/youtube.png" height="30" width="30" class="content_icon">
                <img src="../public/images/instagram.png" height="30" width="30" class="content_icon">
                <img src="../public/images/facebook.png" height="30" width="30" class="content_icon">
            </div>
        </div>
        <p>2023 Take and go. All rights reserved</p>
    </div>
    </footer>
</template>
<script setup lang="ts">
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.footer_content{
    border-top: 1px solid white;
    margin-top: 80px;
    padding-top: 20px;

}
.footer_text{
    padding-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    color: black;
}
.footer_btn{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-top: 10px;
    ;
}
footer{
    padding-top: 2.5rem;
}
.content_icon{
    background-color: white;
    border-radius: 10px 10px;
    padding: 5px;
}
.c_btn{
    position: relative;
    color: white;
    font-family: KARLA;
    font-size: 22px;
    font-weight: 300;
    overflow: hidden; 
    &::before{
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0; 
    height: 1px;
    background-color: white;
    transition: width 0.5s ease;  
    }
    &:hover::before{
        width: 100%;
    }  
}

.content{
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px){
        flex-direction: column;
        gap: 30px;
        align-items: center;
    }
    &_btns{
        display: flex;
        gap: 30px;
    }
    &_icons{
        display: flex;
        gap: 10px;
    }
    &_icon{
        transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.3); // Увеличиваем масштаб при наведении
    }
    }
}
p{
    color: white;
    text-align: center;
    padding-top: 40px;
    font-family: KARLA;
    font-size: 20px;
    padding-bottom: 20px;
}
</style>