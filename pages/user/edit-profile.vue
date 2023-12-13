<template>
    <div class="edit_content">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-form>
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
            <div class="edit_inputs">
            <v-text-field
                class="edit_input"
                :label="langs.userProfile.name"
                type="text"
                v-model="name"
                :rules="nameValidator"
            ></v-text-field>
            <v-text-field
                class="edit_input"
                :label="langs.userProfile.phone"
                type="text"
                v-model="phone"
            ></v-text-field>
            <v-combobox
                class="edit_input"
                :label="langs.userProfile.chooseBank"
                :items="['Monobank', 'PrivatBank', 'Oshad Bank', 'Pumb']"
                v-model="bank"
            ></v-combobox>
            <v-text-field
                class="edit_input"
                :label="langs.userProfile.cardNumber"
                type="text"
                v-model="cardNumber"
                :rules="cardValidator"
            ></v-text-field>
            </div>
        </div>
        <div class="edit_btn">
            <base-button :text="langs.userProfile.save" @click="editUserProfile"></base-button>
        </div>
    </v-form>
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const name:Ref<string> = ref('Name');
const phone:Ref<string> = ref('0999999999');
const bank:Ref<string> = ref('Monobank');
const cardNumber:Ref<string> = ref('1234548383838383');
const avatar:Ref<number> = ref(2);
const load:Ref<boolean> = ref(false)
const data = useProfileStore().userInfo;

const photoarr:number[] = [1,2,3,4,5,6]
const isValidData:Ref<boolean> = ref(true)

    const nameValidator = [
    (value:string) => {
        if(value.length < 3){
            isValidData.value = false
            return langs.value.regValidators.nameValidator
        }
        isValidData.value = true
        return true
    }
]
const cardValidator = [((value: string | null) => value?.length! == 16 || 'Card need to have 16 numbers ')]


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
async function editUserProfile(){
    if(!isValidData.value){
        return     
    }
    load.value = true
    const userUpdatedData = {
        name:name.value,
        phone:phone.value,
        card:cardNumber.value,
        bank:bank.value,
        avatar:avatar.value
    }
    try{  
        await useProfileStore().postUser(userUpdatedData);
        show('success', 'Changes saved');
       
    }catch(error){
        console.log(error)
        
    }
    load.value = false  
    
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
.edit{
    &_content{

    }
    &_main{
        
        padding: 0 5px 0 5px;
        @media  screen and (min-width: 768px){
          padding-left: 20px; 
        } 
    }
}






.avatar{
    &_title{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        } 
    }  
    &_block{
        display: flex;
        gap: 50px;

    }
    &_edit__old{
        display: flex;
        flex-direction: column;
        gap: 10px;
        
    }
    &_edit__new{
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
}
.edit{
    &_old__btn{
        background-color: white;
        border-radius: 50px;
        padding: 5px;
        &:hover{
            outline:2px black solid;
        }
    }
    &_old__text{

    }
    &_inputs{
        display: flex;
        flex-direction: column;
        padding-top: 20px;
    }
    &_input{
        max-width: 100%;
        @media  screen and (min-width: 480px) {
            max-width: 80%;
        }
        @media  screen and (min-width: 768px) {
            max-width: 60%;
        }
        @media  screen and (min-width: 1024px) {
            max-width: 50%;   
        }
        @media  screen and (min-width: 1200px) {
            max-width: 40%;
        }
    }
    &_btn{
        padding-left: 20px;
        padding-bottom: 40px;
    }
}
.profile_img{
    max-width: 70px;
        max-height: 70px;
        align-items: center;
}
</style>