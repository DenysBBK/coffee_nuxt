<template>
    <div class="user_history">
        <div class="user_history__list">
            <FullHistory :type="userType"></FullHistory>
        </div>
    </div>
</template>
<script setup lang="ts">

const userType:Ref<string> = ref(useAuthStore().useType == 'users'? 'user' : 'shop');
console.log(userType.value)



</script>
<style scoped lang="scss">
</style>