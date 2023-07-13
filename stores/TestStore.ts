import { defineStore } from "pinia";

export const TestStore = defineStore('test', {
    state:() => ({
        message:'Hello Pinia',
        secondMessage:'Buy Pinia'
    }),
    getters:{
        getMessage:state => state.message
    }
});

