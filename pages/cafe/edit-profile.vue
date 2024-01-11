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
                        <img :src="mainAvatar(cafeAvatar)" class="profile_img">
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
                        :label="langs.cafeProfile.name"
                        class="edit_input"
                        v-model="cafeName"
                        :rules="nameValidator"
                    ></v-text-field>
                    <v-text-field
                        class="edit_input"
                        :label="langs.cafeProfile.city"
                        type="text"
                        v-model="cafeCity"
                        :rules="cityValidator"
                    ></v-text-field>
                    <v-text-field
                        class="edit_input"
                        :label="langs.cafeProfile.address"
                        type="text"
                        v-model="cafeAddress"
                    ></v-text-field>
                    <v-text-field
                        class="edit_input"
                        :label="langs.cafeProfile.phone"
                        type="text"
                        v-model="cafePhone"
                    ></v-text-field>
                </div>
                <div class="positions">
                    <h3 class="positions__title">{{ langs.cafeProfile.updatePositions }}</h3>

                </div>
            </div>
        </v-form>
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'
import { Positions } from 'types/profileTypes'

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();
const photoarr:number[] = [8,9,10,11,12,13];
const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)


const cafeData = useProfileStore().cafeInfo;
const cafeName:Ref<string> = ref(' ');
const cafeCity:Ref<string> = ref(' ');
const cafeAddress:Ref<string> = ref(' ');
const cafePhone:Ref<string> = ref(' ');
const cafeAvatar:Ref<number> = ref(7); 
let cafePositions:Positions[] = reactive([{
    name:'',
    price:''
}]);

//Validations
const isValidData:Ref<boolean> = ref(true);

const nameValidator = [
    (value:string) => {
        if(value.length < 3){
            isValidData.value = false
            return langs.value.regValidators.nameValidator
        }
        isValidData.value = true
        return true
    }
];
const cityValidator = [
    (value:string) => {
        if(value.length < 3){
            isValidData.value = false
            return langs.value.regValidators.cityValidator
        }
        isValidData.value = true
        return true
    }
]


function mainAvatar(item:number):string{
    return `/images/${item}.png`
}
function makeDefault():void{
    cafeAvatar.value = 7
}
function changeAvatar(item:number):void{
    cafeAvatar.value = item
}
function allImages(item:number):string{
    return `/images/${item}.png`
}

onBeforeMount(async() => {
    try{
        await useProfileStore().getCafeData();
        cafeName.value = cafeData.name;
        cafeAddress.value = cafeData.address;
        cafeCity.value = cafeData.city;
        cafePositions = cafeData.positions
        cafePhone.value = cafeData.phone
        cafeAvatar.value = cafeData.avatar    
    }catch(error){
        console.log(error)
        
    }
    
});

definePageMeta({
    middleware:'authenticated'
})
useHead({
    title: langs.value.pageTitles.cafeProfile
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
        color: white;
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
    background-color: white;
}
.v-input__control{
    background-color: black;
    border: 0.1px white solid;
   
    margin-top: 10px;
    opacity: 1;
}
.v-field-label{
    opacity: 1;
    color: yellow;
}
.v-field__input{
    color: yellow;
}
.v-field__append-inner{
    color: yellow;
    opacity: 1;
}
.mdi-menu-down{
    opacity: 1;
}

</style>