<template>
    <div class="edit_content">
        <div class="edit_main">
            <p class="avatar_title">{{ langs.userProfile.chooseAvatar }}:</p>
            <div class="avatar_block">
                <div class="avatar_edit__old">
                    <img :src="mainAvatar(avatar)" class="profile_img">
                    <button class="edit_old__btn" @click.prevent="makeDefault" type="button">
                        <span class="edit_old__text">{{ langs.userProfile.makeDefault }}</span>
                    </button>
                </div>
                <div class="avatar_edit__new">
                    <div v-for="item in photoarr" :key="item">
                        <button @click.prevent="changeAvatar(item)">
                            <img :src=allImages(item) class="profile_img">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const name:Ref<string> = ref('Name');
const phone:Ref<string> = ref('0999999999');
const bank:Ref<string> = ref('Monobank');
const cardNumber:Ref<string> = ref('1234548383838383');
const avatar:Ref<number> = ref(2);

const data = useProfileStore().userInfo;

const photoarr:number[] = [1,2,3,4,5,6]




function allImages(item:number):string{
    return `/images/${item}.png`
}
function makeDefault():void{
    avatar.value = 0
}
function changeAvatar(item:number):void{
    avatar.value = item
}
function mainAvatar(item:number):string{
    return `/images/${item}.png`
}

onBeforeMount(async() => {
    try{
        await useProfileStore().getUserData();
        await useOrderStore().getOrders('user');
        name.value = data.name;
        phone.value = data.phone;
        bank.value = data.bank;
        cardNumber.value = data.card;
        avatar.value = data.avatar;
        
    }catch(error){
        console.log(error)
        
    }
})


</script>
<style lang="scss">







.avatar_title{
    font-size: 20px;
    font-weight: 700;
    font-family: KARLA;
    color: white;
    @media  screen and (min-width: 768px){
        font-size: 30px; 
    } 
}

</style>