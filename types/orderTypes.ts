import { Positions } from "./profileTypes"

export interface ordersState{
    orders:ordersArr[]
}
export type orderPayload = string

export interface ordersArr{
    positionId:number,
    status:number,
    fromCafe?:string,
    cafeId?:number,
    positions:[{
        name:string,
        price:string
    }],
    userId?:string,
    userName?:string
}
interface orderItem{
    positionId:number,
    status:number,
    positions:[{
        name:string,
        price:string
    }]
}
export interface userOrderItem extends orderItem{
    fromCafe:string,
    cafeId:number,
    
}
export interface cafeOrderItem extends orderItem{
    userId:string,
    userName:string
}

export interface userOrderData {
    name:string,
    id:number,
    shopName:string,
    uid:string | null,
    positions:Positions[]
}
export interface updatedOrder{
    placeId:string | number | undefined,
    position:number,
    status:number,
    type:string
}