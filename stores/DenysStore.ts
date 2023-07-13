import { defineStore } from "pinia";
interface tolik{
    alert:string
}
export const useDenys = defineStore('denys', {
    state:() => ({
        alert:'Toliabma'
    }),
    getters:{
        thisAlert:(state:tolik) => {
            return state.alert
        }
    },
    actions:{
        getName():void{
            this.$state.alert = 'Ne toliamba'
            console.log(this.$state.alert)
            
            
        }
        
    }
})