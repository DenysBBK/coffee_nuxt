<template>
    <div>
        <v-container class="login_container">
            <h1 class="text-center pb-3" >Login</h1>
            <h4>Don`t have account? <NuxtLink to="/registration" class="signup">Registration</NuxtLink> </h4>
            <v-form @submit.prevent="submitForm">
                <v-text-field
                    v-model="email.value"
                    label="Email"
                    class="login_input"
                    :rules="emailValidator"
                    >
                </v-text-field>
                <v-text-field
                    v-model="password.value"
                    label="Password"
                    class="login_input"
                    :rules="passwordValidator">
                </v-text-field>
                <div class="login_data">
                <v-radio-group v-model="toAccount">
                <v-radio label="To cafe account" value="shops"></v-radio>
                <v-radio label="To user account" value="users"></v-radio>
                </v-radio-group>
                <v-btn class="login_btn" type="submit">Login</v-btn>
            </div>
            </v-form>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import { dataType, loginTypes } from '../types/loginTypes'


const email:dataType = reactive({
    value:'',
    isValid:true
})
const emailValidator = [(value: string | null) => value?.length! > 3 || 'First name must be at least 3 characters.']

const password:dataType = reactive({
    value:'',
    isValid:true
})
const passwordValidator = [((value: string | null) => value?.length! >= 6 || 'First name must be at least 6 characters.')]

const toAccount:Ref<string> = ref('')

function submitForm():void{
    const actionPayload:loginTypes = {
        email:email.value,
        password:password.value,
        type:toAccount.value
    };
    try{
        useAuthStore().signIn(actionPayload)
        
    }catch(error){
        console.log(error)
    }
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