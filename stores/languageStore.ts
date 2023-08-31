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
        },
        registration:{
            main:'Registration',
            haveAccount:'Already have account?',
            toLogin:'Login',
            toUser:'User',
            toCaffe:'Cafe',
            name:'Name',
            cafeName:'Coffee-shop name',
            email:'Email',
            password:'Password',
            confirmPassword:'Confirm password',
            agree:'I agree with',
            terms:'Terms of Service',
            and:'and',
            register:'Registration',
            policy:'Privacy Policy',
        }
    }),
    actions:{
       async getLanguage(type:string):Promise<void>{
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/languages/${type}.json`);
        const data = await responce.json();
        console.log(data)
        //LOGIN
        this.$state.language = data.language;
        this.$state.login.btn = data.login.btn;
        this.$state.login.email = data.login.email;
        this.$state.login.main = data.login.main;
        this.$state.login.haveAccount = data.login.haveAccount;
        this.$state.login.toRegistration = data.login.toRegistration;
        this.$state.login.password = data.login.password;
        this.$state.login.toUserAccount = data.login.toUserAccount;
        this.$state.login.toCafeAccount = data.login.toCafeAccount;

        //HEADER
        this.$state.header.login = data.header.login;
        this.$state.header.registration = data.header.registration;
        
        //REGISTRATION
        this.$state.registration.main = data.registration.main;
        this.$state.registration.haveAccount = data.registration.haveAccount;
        this.$state.registration.toLogin = data.registration.toLogin;
        this.$state.registration.toUser = data.registration.toUser;
        this.$state.registration.toCaffe = data.registration.toCaffe;
        this.$state.registration.name = data.registration.name;
        this.$state.registration.cafeName = data.registration.cafeName
        this.$state.registration.email = data.registration.email;
        this.$state.registration.password = data.registration.password;
        this.$state.registration.confirmPassword = data.registration.confirmPassword;
        this.$state.registration.agree = data.registration.agree;
        this.$state.registration.terms = data.registration.terms;
        this.$state.registration.and = data.registration.and;
        this.$state.registration.policy = data.registration.policy;
        this.$state.registration.register = data.registration.register
        
        
        }
    },
    getters:{
        lang:(state:languageState) => state
    }
})