<template>
    <div class="reg_page">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <div class="reg_block">
            <v-form @submit.prevent="submitRegForm" class="reg_form">
                <div class="form_content">
                    <h1 class="reg_title">{{ langs.registration.main }}</h1>
                    <h4 class="reg_link">{{ langs.registration.haveAccount }}  <BaseRedirectButton
                        :text="langs.registration.toLogin"
                        url="/login"
                       class="login_btn"></BaseRedirectButton> </h4>
                    <div class="reg_choose_btns">
                        <h5 class="reg_choose_btns_title">Create account as:</h5>
                        <v-btn class="reg_choose_btn" v-on:click="toUserAccout" type="button" variant="text" :class="{'reg_choose_btn_active':toAccount == 'users'}">{{ langs.registration.toUser }}</v-btn>
                        <v-btn class="reg_choose_btn" v-on:click="toShopAccout" type="button" variant="text" :class="{'reg_choose_btn_active':toAccount == 'shops'}">{{ langs.registration.toCaffe }}</v-btn>
                    </div>
                    <v-text-field
                        v-model="name"
                        :label="toAccount == 'users' ? langs.registration.name:langs.registration.cafeName"
                        class="reg_input"
                        :rules="nameValidator">
                    </v-text-field>
                    <v-text-field
                        v-model="email"
                        :label="langs.registration.email"
                        class="reg_input"
                        :rules="emailValidator">
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        type="password"
                        :label="langs.registration.password"
                        class="reg_input"
                        :rules="passwordValidator">
                    </v-text-field>
                    <v-text-field
                        v-model="passwordConfirmation"
                        type="password"
                        :label="langs.registration.confirmPassword"
                        class="reg_input"
                        :rules="confirmationRules">
                    </v-text-field>
                    <v-combobox
                        v-if="!toUserAccount"
                        class="reg_input"
                        :items="['Kiev', 'Kharkiv', 'Odessa', 'Dnipro', 'Lviv', 'Donetsk', 'Zaporizhia', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Zhytomyr', 'Sumy', 'Rivne', 'Ternopil', 'Kirovohrad', 'Ivano-Frankivsk', 'Lutsk', 'Lysychansk', 'Uzhhorod', 'Enerhodar']"
                        :label="langs.registration.city"
                        v-model="city"
                        :rules="cityValidator">
                    </v-combobox>
                    <v-checkbox v-model="checkbox"
                        :rules="checkBoxValidator">
                            <template v-slot:label>
                                <div>
                                    {{ langs.registration.agree }}
                                        <v-tooltip location="bottom">
                                            <template v-slot:activator="{ props }">
                                            <NuxtLink to="/terms" class="reg_terms">{{ langs.registration.terms }}</NuxtLink>
                                            </template>
                                            Opens in new window
                                        </v-tooltip>
                                    {{ langs.registration.and }}
                                    <ClientOnly>
                                        <v-tooltip location="bottom">
                                                <template v-slot:activator="{ props }">
                                                <NuxtLink to="/privacy-policy" class="reg_terms">{{ langs.registration.policy }}</NuxtLink>
                                                </template>
                                                Opens in new window
                                        </v-tooltip>
                                    </ClientOnly>
                                </div>
                            </template>
                    </v-checkbox>
                    <base-button :text="langs.registration.register" type="submit"></base-button>
                </div>
            </v-form>
            <div class="reg_img">
                <img src="../public/images/registration.jpg" class="reg_form_img">
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import {signUpData} from '../types/regTypes'
import{languageState} from '../types/languageTypes'

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const email:Ref<string | null> = ref(null);


const emailValidator = [
    (value:string) => {
        if(!value){
            return langs.value.regValidators.emailNotEmpty
        }
        return true
    },
    (value:string) => {
        if(value.length <= 3){
            return langs.value.regValidators.emailMoreLetters
        }
        return true
    },
    (value:string) => {
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
      return langs.value.regValidators.invalidEmail;
    } 
    return true
    },
    

]
const password:Ref<string | null> = ref(null)
const passwordValidator = [((value: string ) => value?.length! >= 6 || langs.value.regValidators.passwordMoreLetters)]

const passwordConfirmation:Ref<string | null> = ref(null);
const confirmationRules = [((value: string ) => value == password.value || langs.value.regValidators.confirmPassword)]

const name:Ref<string | null> = ref(null);
const nameValidator = [((value:StringConstructor) => value?.length! >= 3 || langs.value.regValidators.nameValidator)]

const city:Ref<string | null> = ref(null);
const cityValidator = [
    (value:string)=>{
        if(value === null){
            return langs.value.regValidators.cityValidator
        }
        return true
    }
]
const toAccount:Ref<string> = ref('users');

const checkbox:Ref<boolean> = ref(false);
const checkBoxValidator = [
    (value:boolean) => {
        if(value == false){
            return langs.value.regValidators.termsValidator
        }
        return true
    }
];


function toShopAccout():void {
    toAccount.value = 'shops'; 
}
function toUserAccout():void { 
    toAccount.value = 'users'; 
}

const toUserAccount:ComputedRef<boolean> = computed(():boolean => {
    if(toAccount.value == 'users'){
        return true
    }else{
        return false
    }
})

async function submitRegForm():Promise<void>{
    if(email.value == '' || password.value == '' || passwordConfirmation.value == '' || toAccount.value == '' || checkbox.value == false) return
    let actionPayload:signUpData;
    if(toAccount.value == 'users'){
        actionPayload = {
        email:email.value,
        password:password.value,
        name:name.value,
        type:toAccount.value}
    }else{
        actionPayload = {
        email:email.value,
        password:password.value,
        name:name.value,
        type:toAccount.value,
        city:city.value 
        }
    }
    try{
        await useAuthStore().signUp(actionPayload)
        show('success', langs.value.alerts.successReg)
        setTimeout(() => {
            useRouter().push('/login')
        }, 3000);
    }catch(Er:any){
        show("error", Er.message )
    }
    email.value = null;
    password.value = null;
    passwordConfirmation.value = null;
    name.value = null;
    checkbox.value = false
    
}

useHead({
    title:langs.value.pageTitles.registration
});

</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.reg{
    &_page{
        // height: 80vh;
        display: flex;
        align-items: center;
        @media  screen and (min-width: 1024px){
            height: 80vh;
        }
    }
    &_block{
        width: 100%;
       
       margin: 0 auto;
        padding-top: 50px;
       padding-left: 20px;
       padding-right: 20px;
       @media  screen and (min-width: 1024px) {
        display: flex;
       justify-content: space-between; 
       align-items: center;
       max-width: 1600px;
        
    }
    }
    &_title{
        font-size: 40px;
    color: white;
    font-family: KARLA;
    }
    &_link{
        color: yellow;
        font-size: 20px;
        font-family: KARLA;
        padding-bottom: 20px;
    }
    &_signin{

    }
    &_form{
        width: 100%;
    }
    &_img{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%; 
    }
    &_form_img{
        max-width: 100%;
        max-height: 100%;
        display: none;
        @media  screen and (min-width: 1024px) {
            max-width: 70%;
            max-height: 70%;
            display: inline;
        
        }
    }
    &_choose_btns{
        padding-bottom: 30px;
        display: flex;
        gap: 10px;
        align-items: center;
        &_title{
            color: white;
            font-size: 20px;
            font-weight: 400;
            font-family: KARLA;
        }
    }
    &_choose_btn{
        color: white;
        font-family: KARLA;
        font-size: 16px;
    }
    &_choose_btn_active{
        color: black;
        background-color: yellow;
    }
    &_input{
        background-color: black;
        border: 1px solid white;
        color: yellow;
        border-radius: 10px 10px;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    &_terms{
        text-decoration: none;
        color: yellow;
    }

}
.mdi-checkbox-blank-outline::before{
    font-size: 30px;
}
.mdi-checkbox-marked::before{
    font-size: 30px;
    color: yellow;
}
</style>