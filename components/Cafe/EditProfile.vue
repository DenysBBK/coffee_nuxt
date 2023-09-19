<template>
    <div>
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-container class="profile_container">
            <h1 class="text-center pb-10" >{{ langs.cafeProfile.updateTitle }}</h1>
            <v-form @submit.prevent="edited">
                <div class="update_main">
                    <p>{{ langs.cafeProfile.chooseAvatar }}:</p>
                    <div class="update_img">
                        <div class="update_avatar">
                            <img :src=mainAvatar(choosenImage) class="profile_img">
                            <button class="avatar_btn" @click.prevent="makeDefault" type="button">
                                <span class="update_span">{{ langs.cafeProfile.default }}</span>
                            </button>
                        </div>
                        <div class="update_avatars" >
                            <div v-for="item in photoarr" :key="item">
                                <button @click.prevent="changeAvatar(item)">
                                    <img :src=allImages(item) class="profile_img">
                                </button>
                            </div>
                        </div>
                    </div>
                    <v-text-field
                    :label="langs.cafeProfile.name"
                    v-model="name"
                    :rules="nameValidator"
                    >
                    </v-text-field>
                    <v-combobox
                    :items="['Kiev', 'Kharkiv', 'Odessa', 'Dnipro', 'Lviv', 'Donetsk', 'Zaporizhia', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Zhytomyr', 'Sumy', 'Rivne', 'Ternopil', 'Kirovohrad', 'Ivano-Frankivsk', 'Lutsk', 'Lysychansk', 'Uzhhorod', 'Enerhodar']"
                    :label="langs.cafeProfile.city"
                    v-model="city"
                    :rules="cityValidator"
                    >
                    </v-combobox>
                    <v-text-field
                    :label="langs.cafeProfile.address"
                    v-model="address">
                    </v-text-field>
                    <v-text-field
                    :label="langs.cafeProfile.phone"
                    v-model="phone">
                    </v-text-field>
                    <h3 class="text-center pb-10">{{ langs.cafeProfile.updatePositions }}</h3>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    {{ langs.cafeProfile.item }}
                                </th>
                                <th class="text-left">
                                    {{ langs.cafeProfile.price }}
                                </th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in allPositions" :key="index">
                                <td :id="'name'+index">{{ item.name }}</td>
                                <td :id="'price'+index">{{ item.price }} UAH</td>
                                <td><v-btn variant="tonal" size="x-small" v-on:click="deletePosition(index)">{{ langs.cafeProfile.delete }}</v-btn></td>
                            </tr>
                        </tbody>
                    </v-table>
                    <div class="add_input" v-if="isNewPositionInput">
                        <v-text-field
                        :label="langs.cafeProfile.posItem"
                        type="text"
                        v-model="newPosition.name"></v-text-field>
                        <v-text-field
                        :label="langs.cafeProfile.posPrice"
                        type="text"
                        v-model="newPosition.price"></v-text-field>
                        <v-btn icon="mdi-checkbox-marked-circle" class="approve_btn" v-on:click="pushPosition"></v-btn>
                        <v-btn icon="mdi-cancel" class="disapprove_btn" v-on:click="addNewPosition"></v-btn>
                    </div>
                    <v-btn v-if="!isNewPositionInput" variant="outlined" size="small" class="update_btn" v-on:click="addNewPosition">{{ langs.cafeProfile.addNew }}</v-btn>
                </div>
            </v-form>
            <div class="profile_update">
                <v-btn variant="outlined" v-on:click="edited" class="edit_btn"
                :loading="load">{{ langs.cafeProfile.saveBtn }}</v-btn>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">

import {Positions} from '../../types/profileTypes'
import{languageState} from '../../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
const { showAlert, typeOfAlert, alertText, show, close } = useAlert();
const props = defineProps<{
    name: string;
    address?: string; 
    city?: string;
    phone?:string;  
    positions?: Positions[]|undefined;
    avatar:number
}>();

const isNewPositionInput:Ref<boolean> = ref(false);
const newPosition:Positions = reactive({
    name:'',
    price:''
})


const allPositions:Positions[] = reactive([])

function pushPosition():void{
    allPositions.push({
        name:newPosition.name,
        price:newPosition.price
    })
    addNewPosition()
    newPosition.price = '';
    newPosition.name = '';
}

function addNewPosition():void{
    isNewPositionInput.value = !isNewPositionInput.value
}

function deletePosition(index:number):void{
    console.log('hello')
    allPositions.splice(index, 1)
    console.log(allPositions)
    
}
if(props.positions){
    props.positions.forEach(one => {
    allPositions.push(one)
})
}

const isValidData:Ref<boolean> = ref(true)

const name:Ref<string> = ref(props.name);
const nameValidator = [
    (value:string) => {
        if(value.length < 3){
            isValidData.value = false
            return langs.value.regValidators.nameValidator
        }
        isValidData.value = true
        return true
    }
]


const city:Ref<string | undefined> = ref(props.city);
const cityValidator = [
    (value:string) => {
        if(value.length < 3){
            isValidData.value = false
            return langs.value.regValidators.cityValidator
        }
        isValidData.value = true
        return true
    }
]

const address:Ref<string | undefined> = ref(props.address);
const phone:Ref<string | undefined> = ref(props.phone)
const load:Ref<boolean> = ref(false)
const choosenImage:Ref<number> = ref(props.avatar);

const photoarr:number[] = [8,9,10,11,12,13]
function mainAvatar(item:number):string{
    return `/images/${item}.png`
};
function makeDefault():void{
    choosenImage.value = 7
}
function allImages(item:number):string{
    return `/images/${item}.png`
}
function changeAvatar(item:number):void{
    choosenImage.value = item
}


const emits = defineEmits(['edited']);

async function edited():Promise<void>{
    if(!isValidData.value){
        console.log('It work');
        return
        
    }
    load.value = true
    const cafeUpdatedData = {
        address:address.value,
        phone:phone.value,
        positions:allPositions,
        city:city.value,
        name:name.value,
        avatar:choosenImage.value
    }
    try{
        await useProfileStore().postCafe(cafeUpdatedData);
        show('success', langs.value.alerts.profileUpdated)
        setTimeout(() =>{
            emits('edited', cafeUpdatedData)
        },2000)
    }catch(error){
        console.log(error)
        
    }
   load.value = false
}

</script>
<style scoped lang="scss">
.profile{
    &_container{
    width: 100%;
    background-color: #cff7fc;
    border-radius: 5%;
    @media screen and (min-width: 750px) {
    width: 50%;
    
}
}
    &_update{
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
}
    &_img{
    max-width: 70px;
        max-height: 70px;
        align-items: center;
}


}
.update{
    &_input{
    background-color: white;
    margin-bottom: 15px;
}
    &_main{
    background-color: #cff7fc;
}
    &_btn{
        margin-top: 20px;
        color:#FEF2F1;
        background-color: #7d4e08;
}
    &_img{
        display: flex;
        justify-content: space-between;
        gap: 50px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    &_avatar{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    &_avatars{
        display: flex;
        flex-wrap: wrap;
        max-width: 500px;
        gap: 10px;
    }
}
.add_input{
    padding-top: 20px;
    display: flex;
    gap: 30px;

}
.approve_btn{
    color: green;
}
.disapprove_btn{
    color: red;
}
.edit_btn{
    color: white;
    background-color: blue;
    
}
.avatar_btn{
    background-color: white;
        border-radius: 50px;
        padding: 5px;
        &:hover{
            outline:2px black solid;
        }
}


</style>