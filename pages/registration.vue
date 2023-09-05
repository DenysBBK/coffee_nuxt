<template>
    <div>
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-container class="login_container">
            <h1 class="text-center pb-3" >{{ langs.registration.main }}</h1>
            <h4 class="text-center">{{ langs.registration.haveAccount }} <NuxtLink to="/login" class="signin"> {{ langs.registration.toLogin }}</NuxtLink> </h4>
            <v-form @submit.prevent="submitForm">
                <div class="choose_btns">
                    <v-btn v-on:click="toUserAccout" type="button" variant="text" :class="{'bg-blue':toAccount == 'users'}">{{ langs.registration.toUser }}</v-btn>
                    <v-btn v-on:click="toShopAccout" type="button" variant="text" :class="{'bg-blue':toAccount == 'shops'}">{{ langs.registration.toCaffe }}</v-btn>
                </div>
                <v-text-field
                v-model="name"
                :label="toAccount == 'users' ? langs.registration.name:langs.registration.cafeName"
                class="login_input"
                :rules="nameValidator">
                </v-text-field>
                <v-text-field
                    v-model="email"
                    :label="langs.registration.email"
                    class="login_input"
                    :rules="emailValidator">
                </v-text-field>
                <v-text-field
                    v-model="password"
                    type="password"
                    :label="langs.registration.password"
                    class="login_input"
                    :rules="passwordValidator">
                </v-text-field>
                <v-text-field
                    v-model="passwordConfirmation"
                    type="password"
                    :label="langs.registration.confirmPassword"
                    class="login_input"
                    :rules="confirmationRules">
                </v-text-field>
                <v-checkbox v-model="checkbox">
                    <template v-slot:label>
                        <div>
                        {{ langs.registration.agree }}
                            <v-tooltip location="bottom">
                                <template v-slot:activator="{ props }">
                                <NuxtLink to="/terms" class="terms">{{ langs.registration.terms }}</NuxtLink>
                                </template>
                                Opens in new window
                            </v-tooltip>
                        {{ langs.registration.and }}
                        <v-tooltip location="bottom">
                                <template v-slot:activator="{ props }">
                                <NuxtLink to="/privacy-policy" class="terms">{{ langs.registration.policy }}</NuxtLink>
                                </template>
                                Opens in new window
                        </v-tooltip>
                        </div>
                    </template>
                </v-checkbox>
                <div class="signup_btn">
                    <v-btn class="login_btn" type="submit">{{ langs.registration.register }}</v-btn>
                </div>
            </v-form>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import {signUpData} from '../types/regTypes'
import{languageState} from '../types/languageTypes'

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)

const email:Ref<string | null> = ref(null);
const emailValidator = [(value: string ) => value?.length! >= 3 || 'Email must include at least 3 characters.']

const password:Ref<string | null> = ref(null)
const passwordValidator = [((value: string ) => value?.length! >= 6 || 'Passwrod must include at least 6 characters.')]

const passwordConfirmation:Ref<string | null> = ref(null);
const confirmationRules = [((value: string ) => value == password.value|| 'Field should match Password')]

const name:Ref<string | null> = ref(null);
const nameValidator = [((value:StringConstructor) => value?.length! >= 3 || 'At least 3 characters')]

const toAccount:Ref<string> = ref('users');

const checkbox:Ref<boolean> = ref(false)

function toShopAccout():void {toAccount.value = 'shops'; }
function toUserAccout():void {toAccount.value = 'users'; }


async function submitForm(){
    if(email.value == '' || password.value == '' || passwordConfirmation.value == '' || toAccount.value == '' || checkbox.value == false) return
    const actionPayload:signUpData = {
        email:email.value,
        password:password.value,
        name:name.value,
        type:toAccount.value
    }
    try{
        await useAuthStore().signUp(actionPayload)
        useRouter().push('/login')
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
    title:'Registration'
})

</script>
<style scoped lang="scss">
.signin{
    text-decoration: none;
    color: #08377d;
}
.login_container{
    width: 100%;
    background-color: #fcdfdc;
    border-radius: 5%;
    

@media screen and (min-width: 750px) {
    width: 50%;
    
}
}
.login_input{
   background-color: #cff7fc;
   color: #1d0502;
   padding-bottom: 10px;
   
}
.choose_btns{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.terms{
    color: blue;
    text-decoration: none;
}
.login_btn{
    color: white;
    background-color: #08377d;
}
.signup_btn{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>