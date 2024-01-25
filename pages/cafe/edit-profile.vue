<template>
    <div class="edit_content">
        <base-alert
           v-if="showAlert"
            :alertTitle="alertText"
            :aletrType="typeOfAlert">
        </base-alert>
        <v-form>
            <div class="edit_main">
                <p class="avatar_title">{{ langs.userProfile.chooseAvatar }}:</p>
                <div class="avatar_block">
                    <div class="avatar_edit__old">
                        <img :src="mainAvatar(cafeAvatar)" class="profile_img">
                        <button class="edit_old__btn" @click.prevent="makeDefault" type="button">
                            <span class="edit_old__text">{{ langs.userProfile.makeDefault }}</span>
                        </button>
                    </div>
                    <div class="avatar_edit__new">
                        <div v-for="item in photoarr" :key="item">
                            <button @click.prevent="changeAvatar(item)">
                                <img :src=allImages(item) class="profile_img">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="edit_inputs">
                    <v-text-field
                        :label="langs.cafeProfile.name"
                        class="edit_input"
                        v-model="cafeName"
                        :rules="nameValidator"
                    ></v-text-field>
                    <v-combobox
                        class="edit_input"
                        :items="['Kiev', 'Kharkiv', 'Odessa', 'Dnipro', 'Lviv', 'Donetsk', 'Zaporizhia', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Zhytomyr', 'Sumy', 'Rivne', 'Ternopil', 'Kirovohrad', 'Ivano-Frankivsk', 'Lutsk', 'Lysychansk', 'Uzhhorod', 'Enerhodar']"    
                        :label="langs.cafeProfile.city"
                        v-model="cafeCity"
                        :rules="cityValidator"
                    ></v-combobox>
                    <v-text-field
                        class="edit_input"
                        :label="langs.cafeProfile.address"
                        type="text"
                        v-model="cafeAddress"
                    ></v-text-field>
                    <v-text-field
                        class="edit_input"
                        :label="langs.cafeProfile.phone"
                        type="text"
                        v-model="cafePhone"
                    ></v-text-field>
                </div>
                <div class="positions">
                    <h3 class="positions__title">{{ langs.cafeProfile.updatePositions }}</h3>
                    <h3 class="positions__title" v-if="!cafePositions">You have no positions. You can add them</h3>
                    <table class="positions__table" v-if="cafePositions.length >= 1">
                        <thead class="positions__table-head">
                            <tr>
                                <th class="positions__table-title">
                                    {{ langs.cafeProfile.item }}
                                </th>
                                <th class="positions__table-price">
                                    {{ langs.cafeProfile.price }}
                                </th>
                            
                            </tr>
                        </thead>
                        <tbody class="positions__table-body">
                            <tr v-for="(item, index) in cafePositions" :key="index" class="positions__table-item">
                                <td :id="'name'+index" class="positions__table-text">{{ item.name }}</td>
                                <td :id="'price'+index" class="positions__table-text-price">{{ item.price }} UAH</td>
                                <td><v-btn variant="tonal" size="x-small" v-on:click="deletePosition(index)" class="positions__table-btn">{{ langs.cafeProfile.delete }}</v-btn></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="add" v-if="isNewPositionInputActive">
                    <v-text-field
                        class="add_input"
                        :label="langs.cafeProfile.posItem"
                        type="text"
                        v-model="newPosition.name">
                    </v-text-field>
                    <v-text-field
                        class="add_input"
                        :label="langs.cafeProfile.posPrice"
                        type="text"
                        v-model="newPosition.price">
                    </v-text-field>
                    <div class="add__btns">
                        <v-btn icon="mdi-checkbox-marked-circle" class="approve_btn" v-on:click="pushPosition"></v-btn>
                        <v-btn icon="mdi-cancel" class="disapprove_btn" v-on:click="addNewPosition"></v-btn>
                    </div>
                </div>
                <div class="add_btn">
                    <base-button v-if="!isNewPositionInputActive" :text="langs.cafeProfile.addNew" class="update_btn" v-on:click="addNewPosition">{{ langs.cafeProfile.addNew }}</base-button>
                </div>
            </div>
        </v-form>
        <div class="profile_update">
            <base-button :text="langs.cafeProfile.saveBtn" @click="edited"></base-button>

        </div>
    </div>
</template>
<script setup lang="ts">
import{languageState} from '../../types/languageTypes'
import { Positions } from 'types/profileTypes'

const { showAlert, typeOfAlert, alertText, show, close } = useAlert();
const photoarr:number[] = [8,9,10,11,12,13];
const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)


const cafeData = useProfileStore().cafeInfo;
const cafeName:Ref<string> = ref(' ');
const cafeCity:Ref<string> = ref(' ');
const cafeAddress:Ref<string> = ref(' ');
const cafePhone:Ref<string> = ref(' ');
const cafeAvatar:Ref<number> = ref(7); 
const cafePositions:Positions[] = reactive([]);
const isNewPositionInputActive:Ref<boolean> = ref(false);
const newPosition:Positions = reactive({
    name:'',
    price:''
})

//Validations
const isValidData:Ref<boolean> = ref(true);

const nameValidator = [
    (value:string) => {
        if(value.length < 3){
            isValidData.value = false
            return langs.value.regValidators.nameValidator
        }
        isValidData.value = true
        return true
    }
];
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


function mainAvatar(item:number):string{
    return `/images/${item}.png`
}
function makeDefault():void{
    cafeAvatar.value = 7
}
function changeAvatar(item:number):void{
    cafeAvatar.value = item
}
function allImages(item:number):string{
    return `/images/${item}.png`
};
function deletePosition(index:number):void{
    cafePositions.splice(index, 1)   
};
function pushPosition():void{
    console.log(newPosition.name)
    console.log(newPosition.price)
    console.log(cafePositions)
    
    
    cafePositions.push({
        name:newPosition.name,
        price:newPosition.price
    })
    addNewPosition()
    newPosition.price = '';
    newPosition.name = '';
}

function addNewPosition():void{
    isNewPositionInputActive.value = !isNewPositionInputActive.value
}

async function edited():Promise<void>{
    if(!isValidData.value){
        return   
    }
    const cafeUpdatedData = {
        address:cafeAddress.value,
        phone:cafePhone.value,
        positions:cafePositions,
        city:cafeCity.value,
        name:cafeName.value,
        avatar:cafeAvatar.value
    }
    try{
        await useProfileStore().postCafe(cafeUpdatedData);
        show('success', langs.value.alerts.profileUpdated)
    }catch(error){
        console.log(error)
        
    }
};

onBeforeMount(async() => {
    try{
        await useProfileStore().getCafeData();
        cafeName.value = cafeData.name;
        cafeAddress.value = cafeData.address;
        cafeCity.value = cafeData.city;
        cafePhone.value = cafeData.phone;
        cafeAvatar.value = cafeData.avatar;
        cafeData.positions.forEach(one => {
            cafePositions.push(one)
        })    
       
        
    }catch(error){
        console.log(error)
        
    }
    
});

definePageMeta({
    middleware:'authenticated'
})
useHead({
    title: langs.value.pageTitles.cafeProfile
})

</script>
<style lang="scss">
@import "../../assets/editProfile.scss";
@import "../../assets/editInput.scss";
.edit{
    &_main{
        
        padding: 0 5px 0 5px;
        @media  screen and (min-width: 768px){
          padding-left: 20px; 
        } 
    }
}

.avatar{
    &_title{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        } 
    }  
    &_block{
        display: flex;
        gap: 50px;

    }
    &_edit__old{
        display: flex;
        flex-direction: column;
        gap: 10px;
        
    }
    &_edit__new{
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
}
.edit{
    &_old__btn{
        background-color: white;
        border-radius: 50px;
        padding: 5px;
        &:hover{
            outline:2px black solid;
        }
    }
    &_inputs{
        display: flex;
        flex-direction: column;
        padding-top: 20px;
    }
    &_btn{
        padding-left: 20px;
        padding-bottom: 40px;
    }
}
.profile_img{
    max-width: 70px;
    max-height: 70px;
    align-items: center;
}
.positions{

    &__title{
        font-size: 20px;
        font-weight: 700;
        font-family: KARLA;
        color: white;
        padding-bottom: 20px;
        @media  screen and (min-width: 768px){
            font-size: 30px; 
        } 
    }

    &__table{
        &-title{
            font-size: 12px;
            font-weight: 700;
            font-family: KARLA;
            color: yellow;
            text-align: start;
            @media  screen and (min-width: 768px){
                font-size: 20px; 
            } 

        }
        &-price{
            font-size: 12px;
            font-weight: 700;
            font-family: KARLA;
            color: yellow;
            text-align: start;
            padding-left: 20px;
            @media  screen and (min-width: 768px){
                font-size: 20px; 
            } 

        }
        &-text{
            font-size: 12px;
            font-weight: 700;
            font-family: KARLA;
            color: white;
            padding-bottom: 20px;
          
            @media  screen and (min-width: 768px){
                font-size: 20px; 
            } 

        }
        &-text-price{
            font-size: 12px;
            font-weight: 700;
            font-family: KARLA;
            color: white;
            padding-bottom: 20px;
            padding-left: 20px;
            @media  screen and (min-width: 768px){
                font-size: 20px; 
            } 
        }
        &-btn{
            color: yellow;
            margin-bottom: 20px;
            margin-left: 20px;
        }
    }

}
.add{
    padding-top: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: column;
    @media  screen and (min-width: 480px) {
       flex-direction: row; 
    }
    &__btns{
        display: flex;
        gap: 10px;
        align-items: center;
        margin-top: -10px;
    }
    &_btn{
        padding-bottom: 20px;
    }
    &_input{
        color: white;
        width: 100%; 
        background-color: black;
        border: 1px white solid;
        margin-top: 10px;
    opacity: 1;
    }
}
.approve_btn{
    color: green;
}
.disapprove_btn{
    color: red;
}
.profile_update{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
}



</style>