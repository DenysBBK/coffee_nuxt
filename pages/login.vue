<template>
    <div class="login_page">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <div class="login_block">
            <v-form @submit.prevent="submitForm" class="login_form">
                <div class="form_content">
                    <h1 class="login_title">{{ langs.login.main }}</h1>
                    <div class="login_redirect">
                        {{ langs.login.haveAccount }}
                        <BaseRedirectButton
                        :text="langs.login.toRegistration"
                        url="/registration"
                       class="login_btn"></BaseRedirectButton>
                    </div>
                    <div class="login_inputs">
                        <v-text-field
                        v-model="email"
                        :label="langs.login.email"
                        class="login_input"
                        :rules="emailValidator"
                        >
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        type="password"
                        :label="langs.login.password"
                        class="login_input"
                        :rules="passwordValidator">
                    </v-text-field>
                    <v-radio-group v-model="toAccount.value"
                        :rules="toAccountValidator" >
                        <v-radio :label="langs.login.toCafeAccount" value="shops" ></v-radio>
                        <v-radio :label="langs.login.toUserAccount" value="users" ></v-radio>
                    </v-radio-group>
                   
                    </div>
                    <base-button text="login" type="submit"></base-button>
                    </div>
               
            </v-form>
                <div class="img_block">
                    <img src="../public/images/login.jpg" class="form_img">
                </div>            
        </div>
    </div>
</template>
<script setup lang="ts">
import {loginTypes, dataType } from '../types/loginTypes';
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();


const email:Ref<string|null> = ref(null)
const emailValidator = [(value: string ) => value?.length! > 0 || langs.value.loginValidators.email]

const password:Ref<string|null> = ref(null)
const passwordValidator = [((value: string ) => value?.length! > 0 || langs.value.loginValidators.password)]

const toAccount: dataType = reactive({
    value:'',
    isValid:true,
})
const toAccountValidator = [
    (value:string)=>{
        if(value == ''){
            return langs.value.loginValidators.toAccount
        }
        return true
    }
]

const load:Ref<boolean> = ref(false)

async function submitForm():Promise<void>{
    console.log(toAccount.value)
    
    if(email.value == '' || password.value == '' || email.value == null || password.value == null)return
    if(toAccount.value == ''){
        toAccount.isValid = false
        return
    }
    load.value = true
    const actionPayload:loginTypes = {
        email:email.value,
        password:password.value,
        type:toAccount.value
    };
    try{
        
       await useAuthStore().signIn(actionPayload)
       load.value = false
       toAccount.value == 'users' ? useRouter().push('/user/profile') : useRouter().push('/cafe/profile')
       
    }catch(Er:any){
        load.value = false
        show("error", Er.message )
    }
        email.value = null;
        password.value = null;
        toAccount.value = '';
        toAccount.isValid = true

    
};

useHead({
    title:langs.value.pageTitles.login
})

</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.login{
    &_page{
        height: 100vh;
        display: flex;
        align-items: center;
        @media  screen and (min-width: 1024px){
            height: 80vh;
        }
    }
    &_block{
      width: 100%;
       
       margin: 0 auto;

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
    @media  screen and (min-width: 480px) {
       font-size: 50px;  
    }
    @media  screen and (min-width: 768px) {
        font-size: 60px;  
    }
    @media  screen and (min-width: 1024px) {
        font-size: 70px;   
    }
    @media  screen and (min-width: 1200px) {
        font-size: 80px;
    }
    }
    &_redirect{
        color: yellow;
        font-size: 20px;
        font-family: KARLA;
        padding-bottom: 20px;
    }
    &_form{
       width: 100%;
    }
}
.img_block{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.form_img{
        max-width: 100%;
        max-height: 100%;
        display: none;
        @media  screen and (min-width: 1024px) {
            max-width: 70%;
            max-height: 70%;
            display: inline;
        
        }
}
.form_content{
    border: 1px solid white;
    border-radius: 10px 10px;
    padding: 30px;
}

.login_input{
   background-color: black;
   border: 1px solid white;
   color: yellow;
   border-radius: 10px 10px;
   margin-bottom: 20px;
   padding-bottom: 10px;
   
   
}

.login_inputs{
    padding-bottom: 30px;
}
.login_radio{
    text-decoration-color: #1d0502;
}

.login_data{
    display: flex;
    flex-direction: column;
    align-items: center;

}

.v-selection-control {
    gap: 10px;    
    color: white;
    opacity: 1;
}
.v-label--clickable{
    font-size: 20px;

}
.v-radio-group{
    color: white;
    
}
.v-text-field .v-field--no-label input, .v-text-field .v-field--active input{
    color: white;
}
.mdi-radiobox-blank::before{
    font-size: 30px;
    opacity: 1;
}
.mdi-radiobox-marked::before{
    font-size: 30px;
    color: yellow;
}
.v-selection-control .v-label{
    opacity: 1;
}

</style>