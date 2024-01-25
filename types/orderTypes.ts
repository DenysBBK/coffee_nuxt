import { Positions } from "./profileTypes"
import { reviewsArr } from "./profileTypes"

export interface ordersState{
    orders:ordersArr[],
    lastUserOrder:lastOrder
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
    userName?:string,
    cafeAvatar:number,
    userAvatar:number
}
export interface lastOrder{
    cafeAvatar:number,
    cafeId:number,
    fromCafe:string,
    positionId:number,
    positions:[{
        name:string,
        price:number
    }],
    status:number,
    userAvatar:number
}
interface orderItem{
    positionId:number,
    status:number,
    positions:[{
        name:string,
        price:string
    }],
    cafeAvatar:number,
    userAvatar:number
    
}
export interface userOrderItem extends orderItem{
    fromCafe:string,
    cafeId:number,
    
    
}
export interface cafeOrderItem extends orderItem{
    userId:string,
    userName:string,
    
}

export interface userOrderData {
    name:string,
    id:number | null,
    shopName:string,
    uid:string | null,
    positions:[{
        name:string,
        price:string
    }],
    userAvatar:number,
    cafeAvatar:number
}
export interface updatedOrder{
    placeId:string | number | undefined,
    position:number,
    status:number,
    type:string,
    orderReview?:reviewsArr
}
export interface addPosition{
    name:string,
    price:number,
    amount:number
}
export interface addedPosition{
    name:string,
    price:string
}
export interface userReview  {
    userAvatar:number,
    review:string,
    rate:number
}