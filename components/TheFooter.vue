<template>
    <footer>
        <v-divider></v-divider>
        <div class="footer_btn">
            <NuxtLink to="/terms">
                <base-button text="Terms"></base-button>
            </NuxtLink>
            <NuxtLink to="/privacy-policy">
                <base-button text="Privacy"></base-button>
            </NuxtLink>
        </div>
                <p class="footer_text">2023 Take and go. All rights reserved</p>
    </footer>
</template>
<style scoped lang="scss">

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
</style>