
import { defineStore } from "pinia";
import { loginTypes, loginItem, authState } from "types/loginTypes";
import { signUpData } from "types/regTypes";
import axios from "axios";

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
        const theType:string = payload.type === 'users'? useLanguageStore().alerts.user :useLanguageStore().alerts.cafe
        const isAnyFound:boolean = dataResult.some(one => one.email === payload.email);
        if(!isAnyFound){
            throw new Error(`${theType} ${useLanguageStore().alerts.notFound}`)
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
        localStorage.setItem('type', payload.type);
        this.$state.token = data.idToken;
        this.$state.userId = data.localId;
        this.$state.uid = id;
        this.$state.type = payload.type
        this.$state.isAuthenticated = true;
        
        const api = await axios.get('https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops.json');
        console.log(api.data);
        console.log(api.status);
        if(api.status == 200)console.log('It is success!')
        
        
        
   
       

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
                    if(payload.type === 'users') userOrCafe = useLanguageStore().alerts.user;
                    if(payload.type === 'shops') userOrCafe = useLanguageStore().alerts.cafe;
                
                let errorKey;
                    if(dataTable.error.message === 'INVALID_EMAIL') errorKey = 'Invalid email'
                const error = new Error(dataTable.error.message === "EMAIL_EXISTS" ? `${userOrCafe} ${useLanguageStore().alerts.alreadyExist}` : errorKey)
            throw error
            }else{
                let avatarType:number = payload.type === 'users'? 0:7
                const mode:string = payload.type;
                let regData;
                if(payload.type === 'users'){
                    regData = {
                    email:payload.email,
                    name:payload.name,
                    id:theId,
                    avatar:avatarType
                    }
                }else{
                    regData = {
                    email:payload.email,
                    name:payload.name,
                    id:theId,
                    avatar:avatarType,
                    city:payload.city,
                    reviews:[]
                    }
                }
                console.log(regData)
                
                const responce:any = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${mode}/${theId}.json`,{
                method: "PUT",
                body:JSON.stringify(regData)
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
                
            },
           loginFromStorage(token:string, type:string, uid:string, isAuth:boolean):void{
                this.type = type;
                this.token = token;
                this.uid = uid;
                this.isAuthenticated = isAuth
              

           },
           
    
    },
    getters:{
        useType:(state:authState) => state.type
    }
})