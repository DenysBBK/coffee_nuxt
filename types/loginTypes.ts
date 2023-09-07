export interface authState{
    userId:string | null,
    token:string|null,
    uid:string | undefined,
    type:string,
    isAuthenticated:boolean
}
export interface dataType{
    value:string,
    isValid:boolean,
}
export interface loginTypes{
    email:string|null,
    password:string|null,
    type:string
}
export interface loginItem{
    email:string,
    id:string
}
