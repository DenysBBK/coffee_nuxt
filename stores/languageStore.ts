import { defineStore } from "pinia";
import { languageState } from "types/languageTypes";


export const useLanguageStore = defineStore('language', {
    state:():languageState=> ({
        language:'eng',
        login:{
        main:'Login',
        haveAccount:'Don`t have account?',
        toRegistration:'Registration',
        email:'Email',
        password:'Password',
        toCafeAccount:'To cafe account',
        toUserAccount:'To user account',
        btn:'Login'
        },
        header:{
            login:'Login',
            registration:'Registration'
        }
    }),
    actions:{
       async getLanguage(type:string):Promise<void>{
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/languages/${type}.json`);
        const data = await responce.json();
        console.log(data)
        this.$state.language = data.language;
        this.$state.login.btn = data.login.btn;
        this.$state.login.email = data.login.email;
        this.$state.login.main = data.login.main;
        this.$state.login.haveAccount = data.login.haveAccount;
        this.$state.login.toRegistration = data.login.toRegistration;
        this.$state.login.password = data.login.password;
        this.$state.login.toUserAccount = data.login.toUserAccount;
        this.$state.login.toCafeAccount = data.login.toCafeAccount;
        this.$state.header.login = data.header.login;
        this.$state.header.registration = data.header.registration;
        

        }
    },
    getters:{
        lang:(state:languageState) => state
    }
})