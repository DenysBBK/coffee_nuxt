<template>
    <div>
        <cafe-profile v-if="!updatedProfile"
        :name="cafeName"
        :address="cafeAddress"
        :city="cafeCity"
        :positions="cafePositions"
        :phone="cafePhone"
        @edit="editProfile">

        </cafe-profile>
        <cafe-edit-profile v-if="updatedProfile"
        :positions="cafePositions"
        :name="cafeName"
        :address="cafeAddress"
        :city="cafeCity"
        :phone="cafePhone"
        @edited="profileIsUpdated">

        </cafe-edit-profile>
    </div>
</template>
<script setup lang="ts">
import { Positions } from '../types/profileTypes'

const cafeData = useProfileStore().cafeInfo

const updatedProfile:Ref<boolean> = ref(false);
const cafeName:Ref<string> = ref('');
const cafeAddress:Ref<string> = ref('');
const cafeCity:Ref<string> = ref('');
const cafePhone:Ref<string> = ref('')
let cafePositions:Positions[] = reactive([{
    name:'',
    price:''
}])   

function editProfile():void{
    updatedProfile.value = true
}

function profileIsUpdated(data:any):void{
    updatedProfile.value = false;
    cafeName.value = data.name;
    cafeAddress.value = data.address;
    cafeCity.value = data.city;
    cafePositions = data.positions
    cafePhone.value = data.phone
    
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
    cafePhone.value = cafeData.phone
    
});

definePageMeta({
    middleware:'authenticated'
})
useHead({
    title:'Profile'
})



</script>