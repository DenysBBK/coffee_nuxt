export interface languageState{
    language:string,
    login:{
        main:string,
        haveAccount:string,
        toRegistration:string,
        email:string,
        password:string,
        toCafeAccount:string,
        toUserAccount:string,
        btn:string
    },
    header:{
        login:string,
        registration:string
    }

}
export interface langItem{
    name:string,
    img:number,
    type:string
}