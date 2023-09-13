<template>
    <div >
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-container class="login_container">
            
            <h1 class="text-center pb-3" >{{ langs.login.main }}</h1>
            <h4>{{ langs.login.haveAccount }} <NuxtLink to="/registration" class="signup">{{ langs.login.toRegistration }}</NuxtLink> </h4>
            <v-form @submit.prevent="submitForm">
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
                <div class="login_data">
                <v-radio-group v-model="toAccount.value"
                :rules="toAccountValidator">
                <v-radio :label="langs.login.toCafeAccount" value="shops"></v-radio>
                <v-radio :label="langs.login.toUserAccount" value="users"></v-radio>
                </v-radio-group>
                <v-btn class="login_btn" type="submit" :loading="load">{{ langs.login.btn }}</v-btn>
                
            </div>
            </v-form>
        </v-container>
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
       toAccount.value == 'users' ? useRouter().push('/profile') : useRouter().push('/cafe-profile')
       
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
<style scoped lang="scss">
.login_btn{
    color: white;
    background-color: #08377d;
    margin-top: 20px;
}
.login_input{
   background-color: #cff7fc;
   color: #1d0502;
   padding-bottom: 10px;
   
}
.login_radio{
    text-decoration-color: #1d0502;
}
.login_container{
    width: 100%;
    background-color: #fcdfdc;
    border-radius: 5%;
    

@media screen and (min-width: 750px) {
    width: 50%;
    
}
}
.login_data{
    display: flex;
    flex-direction: column;
    align-items: center;

}
.signup{
    text-decoration: none;
    color: #08377d;
}
h4{
    padding-bottom: 10px;
    text-align: center;
}
</style>