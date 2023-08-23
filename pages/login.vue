<template>
    <div>
        <v-container class="login_container">
            <h1 class="text-center pb-3" >Login</h1>
            <h4>Don`t have account? <NuxtLink to="/registration" class="signup">Registration</NuxtLink> </h4>
            <v-form @submit.prevent="submitForm">
                <v-text-field
                    v-model="email"
                    label="Email"
                    class="login_input"
                    :rules="emailValidator"
                    >
                </v-text-field>
                <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    class="login_input"
                    :rules="passwordValidator">
                </v-text-field>
                <div class="login_data">
                <v-radio-group v-model="toAccount.value">
                <v-radio label="To cafe account" value="shops"></v-radio>
                <v-radio label="To user account" value="users"></v-radio>
                <p class="text-center text-red" v-if="!toAccount.isValid">Need to choose one option</p>
                </v-radio-group>
                <v-btn class="login_btn" type="submit" :loading="load">Login</v-btn>
            </div>
            </v-form>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import {loginTypes, dataType } from '../types/loginTypes'

const email:Ref<string> = ref('')
const emailValidator = [(value: string | null) => value?.length! > 0 || 'Email must be not empty']

const password:Ref<string> = ref('')
const passwordValidator = [((value: string | null) => value?.length! > 0 || 'Password must be not empty')]

const toAccount: dataType = reactive({
    value:'',
    isValid:true
})
watch(toAccount, ():void => {
    if(toAccount.value == ''){
        toAccount.isValid = false 
    }else{
        toAccount.isValid = true
    }
})

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
       
    }catch(error){
        console.log(error)
    }
    
    load.value = false
    email.value = '';
    password.value = '';
    toAccount.value = ''
    
    
}

useHead({
    title:'Login'
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