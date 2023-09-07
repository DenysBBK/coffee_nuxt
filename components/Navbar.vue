<template>
   <div class="main_navigation">
    <div class="base_nav">
        <BaseNav/>
    </div>
    <div class="mobile_nav">
        <BaseMobileNav/>
    </div>
    </div>
</template>
<style scoped lang="scss">
.mobile_nav{
    @media screen and (min-width: 815px) {
        display: none;
    }
}
.base_nav{
    @media  screen and (max-width: 814px) {
        display: none;
    }
}

</style>