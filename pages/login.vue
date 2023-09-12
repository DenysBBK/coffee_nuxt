<template>
    <div >
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-container class="login_container">
            
            <h1 class="text-center pb-3" >{{ lagns.login.main }}</h1>
            <h4>{{ lagns.login.haveAccount }} <NuxtLink to="/registration" class="signup">{{ lagns.login.toRegistration }}</NuxtLink> </h4>
            <v-form @submit.prevent="submitForm">
                <v-text-field
                    v-model="email"
                    :label="lagns.login.email"
                    class="login_input"
                    :rules="emailValidator"
                    >
                </v-text-field>
                <v-text-field
                    v-model="password"
                    type="password"
                    :label="lagns.login.password"
                    class="login_input"
                    :rules="passwordValidator">
                </v-text-field>
                <div class="login_data">
                <v-radio-group v-model="toAccount.value">
                <v-radio :label="lagns.login.toCafeAccount" value="shops"></v-radio>
                <v-radio :label="lagns.login.toUserAccount" value="users"></v-radio>
                <p class="text-center text-red" v-if="!toAccount.isValid">Need to choose one option</p>
                </v-radio-group>
                <v-btn class="login_btn" type="submit" :loading="load">{{ lagns.login.btn }}</v-btn>
                
            </div>
            </v-form>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import {loginTypes, dataType } from '../types/loginTypes';
import{languageState} from '../types/languageTypes'

const lagns:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();


const email:Ref<string|null> = ref(null)
const emailValidator = [(value: string ) => value?.length! > 0 || 'Email must be not empty']

const password:Ref<string|null> = ref(null)
const passwordValidator = [((value: string ) => value?.length! > 0 || 'Password must be not empty'),
((value: string) => value?.length! > 3 || 'Need more than 3 letters') ]

const toAccount: dataType = reactive({
    value:'',
    isValid:true,
})
// watch(toAccount, ():void => {
//     if(toAccount.value == ''){
//         toAccount.isValid = false 
//     }else{
//         toAccount.isValid = true
//     }
// })

const load:Ref<boolean> = ref(false)

async function submitForm():Promise<void>{
    if(email.value == '' || password.value == '')return
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
    //    useRouter().push('/profile')
       
    }catch(Er:any){
        load.value = false
        show("error", Er.message )
    }
        email.value = null;
        password.value = null;
        toAccount.value = '';
        toAccount.isValid = true
        
        
    
    
    
}

useHead({
    title:lagns.value.pageTitles.login
})

</script>
<style scoped lang="scss">
.login_btn{
    color: white;
    background-color: #08377d;
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