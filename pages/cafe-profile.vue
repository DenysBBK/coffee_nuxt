<template>
    <div>
        <cafe-profile v-if="!updatedProfile"
        :name="cafeName"
        :address="cafeAddress"
        :city="cafeCity"
        :positions="cafePositions"
        @edit="editProfile">

        </cafe-profile>
        <cafe-edit-profile v-if="updatedProfile"
        :positions="cafePositions"
        :name="cafeName"
        :address="cafeAddress"
        :city="cafeCity">

        </cafe-edit-profile>
    </div>
</template>
<script setup lang="ts">
import { Positions } from '../types/profileTypes'

const cafeData = useProfileStore().cafeInfo

const updatedProfile:Ref<boolean> = ref(true);
const cafeName:Ref<string> = ref('Aroma');
const cafeAddress:Ref<string> = ref('');
const cafeCity:Ref<string> = ref('');
let cafePositions:Positions[] = reactive([{
    name:'',
    price:''
}])   

function editProfile():void{
    updatedProfile.value = true
}

function profileIsUpdated(data:any):void{
    updatedProfile.value = false;
    cafeName.value = data.cafeName;
    cafeAddress.value = data.cafeAddress;
    cafeCity.value = data.cafeCity;
    cafePositions.values = data.cafePositions
    
}

onMounted(async () =>{
    try{
        await useProfileStore().getCafeData();

    }catch(error){
        console.log(error)
        
    }
    cafeName.value = cafeData.name;
    cafeAddress.value = cafeData.address;
    cafeCity.value = cafeData.city;
    cafePositions = cafeData.positions
    
})

</script>