import { defineStore } from "pinia";
import { loginTypes, loginItem, authState } from "types/loginTypes";

export const useAuthStore = defineStore('auth', {
    state:():authState =>({
        userId: null,
        token: null,
        uid:'',
        type:''
    }),
    actions:{
        async signIn(payload:loginTypes):Promise<void>{
        const type:string = payload.type
        const resp = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${type}.json`)
        const theData:loginItem[] = await resp.json();
        const dataResult:loginItem[] = []
        for(const key in theData){
            const oneItem:loginItem = {
                email:theData[key].email,
                id:theData[key].id
            }
            dataResult.push(oneItem)
        };
        const theType:string = payload.type === 'users'? 'User':'Cafe'
        const isAnyFound:boolean = dataResult.some(one => one.email === payload.email);
        if(!isAnyFound){
            throw new Error(`${theType} is not found`)
        };
        let id:string|undefined;
        dataResult.map(one => {
            if(one.email === payload.email){
                id = one.id
                localStorage.setItem('uid', id)
            }
        });
        const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCn1i-L0RTLONbk82ySwxsEkqvxfJkokqI',{
            method:'POST',
            body:JSON.stringify( {
                email:payload.email,
                password:payload.password,
                type:payload.type,
                returnSecureToken:true
            })
        });
        const data = await responce.json();
        if(!responce.ok){
            const error = new Error(data.error.message);
            throw error
        }
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('localId', data.localId);
        localStorage.setItem('type', payload.type)
        this.$state.token = data.idToken;
        this.$state.userId = data.localId;
        this.$state.uid = id;
        this.$state.type = payload.type
        }
    }
})