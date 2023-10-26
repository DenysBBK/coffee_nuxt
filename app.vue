<template>
  
  <Link to="/">
  <img src="/public/images/coffee-cup.png"> 
  </Link>
  <div class="main_content">
    <div class="header">
      <Navbar/>
    </div>
    <div>
      <NuxtPage/>

    </div>
  </div>
  <TheFooter/>
</template>
<script setup lang="ts">

onBeforeMount(() => {
  let lang:string|null = localStorage.getItem('lang');
  useLanguageStore().getLanguage(lang)
})

</script>
<style>
html,
body{
  height: 100%;
  background-position: center;
  background-color:black ;
  z-index: 0;
}
#__nuxt{
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.main_content{
  flex: 1 1 auto;
  
  
}


*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header{
  padding-bottom: 2.5rem;
 
}
.page-enter-from{
  opacity: 0;
  transform: translateX(-30px);
}
.page-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
.page-enter-active{
  transition: all 0.3s ease-out;
}
.page-leave-active{
  transition: all 0.3s ease-in;
}
.page-enter-to,
.page-leave-from{
  opacity: 1;
  transform: translateX(0);
}
::-webkit-scrollbar {
  width: 8px; 
  background: white; 
}


::-webkit-scrollbar-thumb {
  background: yellow;
}


::-webkit-scrollbar-thumb {
  border-radius: 20px 20px; 
}


::-webkit-scrollbar-horizontal {
  display: none;
}

</style>