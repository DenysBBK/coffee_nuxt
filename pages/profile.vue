<template>
    <div>
        <user-profile v-if="!updatedProfile"
        :name="userName"
        :phone="userPhone"
        :bank="userBank"
        :cardNumber="userCard"
        :avatar="userAvatar"
        @edit="editProfile"></user-profile>
        <user-edit-profile v-if="updatedProfile"
        :name="userName"
        :phone="userPhone"
        :bank="userBank"
        :cardNumber="userCard"
        :avatar="userAvatar"
        @edited="profileIsUpdated"></user-edit-profile>
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const updatedProfile:Ref<boolean> = ref(false);
    
const userData = useProfileStore().userInfo;

const userName:Ref<string> = ref('');
const userPhone:Ref<string> = ref('');
const userBank:Ref<string> = ref('');
const userCard:Ref<string> = ref('');
const userAvatar:Ref<number> = ref(3)


function editProfile(){
    updatedProfile.value = true
}
function profileIsUpdated(data:any){
    updatedProfile.value = false;
    userName.value = data.name;
    userPhone.value = data.phone;
    userBank.value = data.bank;
    userCard.value = data.card
    userAvatar.value = data.avatar
}
const router = useRouter();

onMounted(async () =>{
    try{
        await useProfileStore().getUserData();

    }catch(error){
        console.log(error)
        
    }
    userName.value = userData.name;
    userPhone.value = userData.phone;
    userBank.value = userData.bank;
    userCard.value = userData.card;
    userAvatar.value = userData.avatar
  
})
definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:langs.value.pageTitles.userProfile
})

</script>