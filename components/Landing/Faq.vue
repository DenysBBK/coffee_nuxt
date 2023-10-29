<template>
    <section class="faq">    
        <div class="faq_content">
            <h1 class="faq_title">FAQ</h1>
            <v-expansion-panels>
                <v-expansion-panel
                title="First question?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
                <v-expansion-panel
                title="Second question?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
                <v-expansion-panel
                title="Third question?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
                <v-expansion-panel
                title="Fourth question?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
                <v-expansion-panel
                title="Fifth question?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
            </v-expansion-panels>
        </div>
    </section>
</template>
<style lang="scss">
.faq{

    width: 100%;
    &_content{
        display: flex;
        flex-direction: column;
        max-width: 1600px;
        margin: 0 auto;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 70px;
       
        
    }
    &_title{
        font-size: 50px;
    color: white;
    
    font-family: KARLA;
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
}
.v-expansion-panel{
    background-color: yellow;
    opacity: 1;
    font-size: 20px;
    color: black;
    font-weight: 500;
    font-family: KARLA;
}
.v-expansion-panel-text__wrapper{
    background-color: white;
}
.v-expansion-panel-title{
    font-size: 25px;
    color: black;
    font-weight: 600;
    font-family: KARLA;
}

</style>