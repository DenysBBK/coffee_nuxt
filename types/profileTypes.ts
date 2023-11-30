export interface Positions{
    name:string,
    price:string
}


export interface profileState{
    user:{
        bank:string,
        card:string,
        email:string,
        id:number|null,
        name:string,
        phone:string
        avatar:number,
        orders:any
    },
    cafe:{
        address:string,
        name:string,
        phone:string,
        id:number|null,
        email:string,
        positions:Positions[],
        city:string,
        avatar:number
    },
    shops:shopsArr[]
}
export interface getUserData{
    bank:string,
    card:string,
    email:string,
    id:number,
    name:string,
    phone:string,
    avatar:number,
    orders:any
}
export interface getCafeData{
    address:string,
    name:string,
    phone:string,
    id:number,
    email:string,
    positions:Positions[],
    city:string,
    avatar:number
}
export interface postUserData{
    phone:string | undefined,
    bank:string | undefined,
    card:string | undefined,
    name:string,
    avatar:number
}
export interface postCafeData{
    city:string | undefined,
    address:string | undefined,
    phone:string | undefined,
    positions:Positions[],
   name:string,
   avatar:number
}
export interface shopsArr{
    address:string,
    city:string,
    email:string,
    id:number,
    name:string,
    phone:string,
    positions:Positions[],
    avatar:number
    
}