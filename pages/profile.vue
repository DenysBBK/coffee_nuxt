<template>
    <div>
        <user-profile v-if="!updatedProfile"
        :name="userName"
        :phone="userPhone"
        :bank="userBank"
        :cardNumber="userCard"
        @edit="editProfile"></user-profile>
        <user-edit-profile v-if="updatedProfile"
        @edited="profileIsUpdated"></user-edit-profile>
    </div>
</template>
<script setup lang="ts">
const updatedProfile:Ref<boolean> = ref(false);
const userData = useProfileStore().userInfo;
const userName:Ref<string> = ref('');
const userPhone:Ref<string> = ref('');
const userBank:Ref<string> = ref('');
const userCard:Ref<string> = ref('')


function editProfile(){
    updatedProfile.value = true
}
function profileIsUpdated(data:any){
    updatedProfile.value = false;
    userName.value = data.name;
    userPhone.value = data.phone;
    userBank.value = data.bank;
    userCard.value = data.card
    
}
// const userData = useProfileStore().user


onBeforeMount(() =>{
    useProfileStore().getUserData();
    console.log(userName)
    
    userName.value = userData.name;
    userPhone.value = userData.phone;
    userBank.value = userData.bank;
    userCard.value = userData.card
 
    
})

</script>