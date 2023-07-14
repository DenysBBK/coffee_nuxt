<template>
    <div>
        <user-profile v-if="!updatedProfile"
        :name="name"
        :phone="phone"
        :card="card"
        :cardNumber="cardNumber"
        @edit="editProfile"></user-profile>
        <user-edit-profile v-if="updatedProfile"></user-edit-profile>
    </div>
</template>
<script setup lang="ts">
const updatedProfile:Ref<boolean> = ref(false);

const name:Ref<string> = ref('Denys');
const phone:Ref<string> = ref('0985542949');
const card:Ref<string> = ref('Monobank');
const cardNumber:Ref<string> = ref('1111222233334444')

function editProfile(){
    updatedProfile.value = true
}

</script>