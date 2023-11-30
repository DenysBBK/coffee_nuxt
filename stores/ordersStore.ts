import { defineStore } from "pinia";
import { ordersState, orderPayload,ordersArr, userOrderItem, cafeOrderItem, userOrderData,updatedOrder, lastOrder} from 'types/orderTypes';

export const useOrderStore = defineStore('orders', {
    state:():ordersState => ({
        orders:[],
        lastUserOrder:{
            cafeAvatar:0,
            cafeId:0,
            fromCafe:'Mike',
            positionId:0,
            positions:[{
                name:'Mike',
                price:12
            }],
            status:0,
            userAvatar:0
        }
    }),
    actions:{
        async getOrders(payload:orderPayload):Promise<void>{
            const type:string = payload == 'user' ? 'users':'shops'
            const id:string|null = localStorage.getItem('uid')
            const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${type}/${id}/orders.json`);
            const data = await responce.json();
    
            if(!data)console.log('No orders')
                
            const orders:ordersArr[] = []
            if(payload == 'user'){
                for(let one in data){
                    let item:userOrderItem = {
                        fromCafe:data[one].fromCafe,
                        positionId:data[one].positionId,
                        status:data[one].status,
                        positions:data[one].orderPositions,
                        cafeId:data[one].cafeId,
                        userAvatar:data[one].userAvatar,
                        cafeAvatar:data[one].cafeAvatar
    
                    }
                    orders.push(item)
                    
                }
                 
            }else{
                for(let one in data){
                    let item:cafeOrderItem = {
                        status:data[one].status,
                        positions:data[one].orderPositions,
                        userId:data[one].userId,
                        userName:data[one].userName,
                        positionId:data[one].positionId,
                        userAvatar:data[one].userAvatar,
                        cafeAvatar:data[one].cafeAvatar
                    }
                    orders.push(item)
                }
                
            }
           
            
           this.$state.orders = orders;


            
            
        },
        async postOrder(payload:userOrderData):Promise<void>{
            let posId:number = new Date().getTime()
            const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops/${payload.id}/orders/.json`,{
                method:'POST',
                body:JSON.stringify({
                   userId:payload.uid,
                   userName:payload.name,
                   positionId: posId,
                   status:0,
                   orderPositions:payload.positions ,
                   cafeAvatar:payload.cafeAvatar,
                   userAvatar:payload.userAvatar
                })
            });
            const data = await responce.json()
            if(!data){
                const error = new Error('Cant make order');
                throw error
            }
            const id = localStorage.getItem('uid')
            const resp = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/orders/.json`,{
               method:'POST',
               body:JSON.stringify({
                fromCafe:payload.shopName,
                positionId: posId,
                status:0,
                orderPositions:payload.positions ,
                cafeId:payload.id,
                cafeAvatar:payload.cafeAvatar,
                userAvatar:payload.userAvatar
               }) 
            });
            const data2 = await resp.json();
            if(!data2.ok){
                throw new Error('Cant male order');
            }        
        },
        async updateOrder(payload:updatedOrder):Promise<void>{
            const id = localStorage.getItem('uid')
            const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${payload.type}/${id}/orders/.json`);
            const data = await responce.json();
            for(let one in data){
                
                
                if(data[one].positionId == payload.position){
                    const updatedData = {
                        ...data[one],
                        status:payload.status
                    }
                    
                    const resp = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${payload.type}/${id}/orders/${one}.json`, {
                        method:'PUT',
                        body:JSON.stringify(updatedData)
                    });
                    const newData = await resp.json();
                    if(!newData){
                        throw new Error('Cant finish order')
                    }  
                }
            }
            let back:string = payload.type == 'users' ? 'shops':'users'
            const responce2 = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${back}/${payload.placeId}/orders/.json`)
            const data2 = await responce2.json();
            for(let one in data2){
                if(data2[one].positionId == payload.position){
                    const updatedData2 = {
                        ...data2[one],
                        status:payload.status
                    }
                    const resp2 = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${back}/${payload.placeId}/orders/${one}.json`,{
                        method:'PUT',
                        body:JSON.stringify(updatedData2)
                    });
                    const newData2 = await resp2.json();
                    if(!newData2){
                        throw new Error('Cant finish order from shop!')
                    }
                }
            }
        }

    },
    getters:{
        getAllOrders:(state:ordersState) => state.orders,
    }
})