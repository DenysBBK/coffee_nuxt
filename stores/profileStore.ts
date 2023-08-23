import { defineStore } from "pinia";
import { profileState, getUserData, getCafeData, postUserData, postCafeData,shopsArr  } from "types/profileTypes";


export const useProfileStore = defineStore('profile', {
    state:():profileState => ({
        user:{
            bank:'',
            card:'',
            email:'',
            id:null,
            name:'',
            phone:'',
            avatar:0
        },
        cafe:{
            address:'',
            name:'',
            phone:'',
            id:null,
            email:'',
            positions:[{
                name:'',
                price:''
            }],
            city:'',
            avatar:7
        },
        shops:[]
    }),
    actions:{
        async postUser(payload:postUserData):Promise<void>{
            let uid = localStorage.getItem('uid');
            const url = `https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
    
            const getResp = await fetch(url);
            const oldData = await getResp.json()
    
            const fullData = {
                ...oldData,
                name:payload.name,
                bank:payload.bank,
                card:payload.card,
                phone:payload.phone,
                avatar:payload.avatar
            }
            const responce = await fetch(url,{
                method:"PUT",
                body:JSON.stringify(fullData)
            });
            const data = await responce.json();
            if(!data){
                throw new Error()
            }
        },
        async getUserData():Promise<void>{
            let uid = localStorage.getItem('uid');
            const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`);
            const data:getUserData = await responce.json();
            
            this.$state.user.bank = data.bank;
            this.$state.user.card = data.card;
            this.$state.user.email = data.email;
            this.$state.user.id = data.id;
            this.$state.user.name = data.name;
            this.$state.user.phone = data.phone
            this.$state.user.avatar = data.avatar
            
        },
        async postCafe(payload:postCafeData):Promise<void>{
            let uid = localStorage.getItem('uid');
            const url = `https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops/${uid}.json`;
            const getResp = await fetch(url);
            const oldData = await getResp.json();
    
            const fullData = {
                ...oldData,
                address: payload.address,
                phone:payload.phone,
                positions:payload.positions,
                city:payload.city,
                name:payload.name,
                avatar:payload.avatar
            };
            const responce = await fetch(url,{
                method:"PUT",
                body:JSON.stringify(fullData)
            });
            const data = await responce.json();
            if(!data){
                throw new Error()
            }
            
        },
        async getCafeData():Promise<void>{
            let uid = localStorage.getItem('uid');
            const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops/${uid}.json`);
            const data:getCafeData = await responce.json();

            this.$state.cafe.address = data.address
            this.$state.cafe.email = data.email
            this.$state.cafe.id = data.id
            this.$state.cafe.name = data.name
            this.$state.cafe.phone = data.phone
            this.$state.cafe.positions = data.positions
            this.$state.cafe.city = data.city
            this.$state.cafe.avatar = data.avatar
        },
        async getCoffeeShops():Promise<void>{
            const responce = await fetch('https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops.json');
            const data = await responce.json();
    
            const shops:shopsArr[] = [];
            for(let one in data){
                const item:shopsArr ={
                    address:data[one].address,
                    city:data[one].city,
                    email:data[one].email,
                    id:data[one].id,
                    name:data[one].name,
                    phone:data[one].phone,
                    positions:data[one].positions,
                    avatar:data[one].avatar
                };
                shops.push(item)
            };
           
            
            if(!data){
                throw new Error('The is no caffe')
            }   
            this.$state.shops = shops    
        },
    },
    getters:{
        userInfo:(state:profileState) => state.user,

        cafeInfo(state:profileState){
            return state.cafe
        },
        shopsInfo(state:profileState){
            return state.shops
        }
    }
})