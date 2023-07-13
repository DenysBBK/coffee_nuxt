<template>
   
    <div class="base_nav">
        <BaseNav/>
    </div>
    <div class="mobile_nav">
        <BaseMobileNav/>
    </div>

</template>
<style scoped lang="scss">
.mobile_nav{
    @media screen and (min-width: 750px) {
        display: none;
    }
}
.base_nav{
    @media  screen and (max-width: 750px) {
        display: none;
    }
}
</style>