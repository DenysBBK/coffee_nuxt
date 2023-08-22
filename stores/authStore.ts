import { stat } from "fs";
import { defineStore } from "pinia";
import { loginTypes, loginItem, authState } from "types/loginTypes";
import { signUpData } from "types/regTypes";

export const useAuthStore = defineStore('auth', {
    state:():authState =>({
        userId: null,
        token: null,
        uid:'',
        type:'',
        isAuthenticated:false
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
        this.$state.isAuthenticated = true
        },
        async signUp(payload:signUpData):Promise<void>{
            const theId: number = new Date().getTime()
            const respTable= await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCn1i-L0RTLONbk82ySwxsEkqvxfJkokqI`,{
                method:"POST",
                body:JSON.stringify({
                    email:payload.email,
                    password:payload.password,
                    id:theId,
                    returnSecureToken:true
                })
    
            })
            const dataTable = await respTable.json()
            if(!respTable.ok){
                let userOrCafe;
                    if(payload.type === 'users') userOrCafe = 'User';
                    if(payload.type === 'shops') userOrCafe = 'Cafe';
                let errorKey;
                    if(dataTable.error.message === 'INVALID_EMAIL') errorKey = 'Invalid email'
                const error = new Error(dataTable.error.message === "EMAIL_EXISTS" ? `${userOrCafe} is already exsist` : errorKey)
            throw error
            }else{
                const mode:string = payload.type;
                const responce:any = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${mode}/${theId}.json`,{
                method: "PUT",
                body:JSON.stringify({
                    email:payload.email,
                    name:payload.name,
                    id:theId,
                    avatar:0
                })
                })
                const data = await responce.json()
                if(!responce.ok){
                    const error:Error = new Error(data.error.message)
                throw error
                };
            }
            },
            logout():void{
                localStorage.removeItem('uid');
                localStorage.removeItem('token');
                localStorage.removeItem('localId');
                localStorage.removeItem('type');
                this.$state.token = null;
                this.$state.userId = null;
                this.$state.uid = '';
                this.$state.type = ''
                this.$state.isAuthenticated = false
                useRouter().push('/login')
                
            }
    
    },
    getters:{
        useType:(state:authState) => state.type
    }
})