export interface authState{
    userId:string | null,
    token:string|null,
    uid:string | undefined,
    type:string
}
export interface dataType{
    value:string,
    isValid:boolean
}
export interface loginTypes{
    email:string,
    password:string,
    type:string
}
export interface loginItem{
    email:string,
    id:string
}
