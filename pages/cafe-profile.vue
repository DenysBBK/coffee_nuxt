<template>
    <div>
        <cafe-profile v-if="!updatedProfile"
        :name="cafeName"
        :address="cafeAddress"
        :city="cafeCity"
        :positions="cafePositions"
        :phone="cafePhone"
        :avatar="cafeAvatar"
        @edit="editProfile">

        </cafe-profile>
        <cafe-edit-profile v-if="updatedProfile"
        :positions="cafePositions"
        :name="cafeName"
        :address="cafeAddress"
        :city="cafeCity"
        :phone="cafePhone"
        :avatar="cafeAvatar"
        @edited="profileIsUpdated">

        </cafe-edit-profile>
    </div>
</template>
<script setup lang="ts">
import { Positions } from '../types/profileTypes'
import{languageState} from '../types/languageTypes'

const langs:ComputedRef<languageState> = computed(() => useLanguageStore().lang)
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
const cafeAvatar:Ref<number> = ref(7)

function editProfile():void{
    updatedProfile.value = true
}

function profileIsUpdated(data:any):void{
    updatedProfile.value = false;
    cafeName.value = data.name;
    cafeAddress.value = data.address;
    cafeCity.value = data.city;
    cafePositions = data.positions
    cafePhone.value = data.phone;
    cafeAvatar.value = data.avatar
    
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
    cafeAvatar.value = cafeData.avatar
    
});

definePageMeta({
    middleware:'authenticated'
})
useHead({
    title: langs.value.pageTitles.cafeProfile
})



</script>