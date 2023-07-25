<template>
    <div>
        <v-container class="profile_container">
            <h1 class="text-center pb-10" >Update Profile</h1>
            <v-form @submit.prevent="edited">
                <div class="update_main">
                    <v-file-input
                    label="Add your photo"
                    variant="filled"
                    prepend-icon="mdi-camera"
                    class="update_input"
                    :v-model="photo"
                    ></v-file-input>
                    <v-text-field
                    class="update_input"
                    label="Name"
                    type="text"
                    v-model="name"
                    ></v-text-field>
                    <v-text-field
                    class="update_input"
                    label="Phone"
                    type="text"
                    v-model="phone"
                    ></v-text-field>
                    <v-combobox
                    class="update_input"
                    label="Choose you bank"
                    :items="['Monobank', 'PrivatBank', 'Oshad Bank', 'Pumb']"
                    v-model="bank"
                    ></v-combobox>
                    <v-text-field
                    class="update_input"
                    label="Bank Card"
                    type="text"
                    v-model="card"
                    :rules="cardValidator"
                    ></v-text-field>
                </div>
                <div class="profile_update">
                <v-btn variant="outlined" v-on:click="edited"
                :loading="load">Update profile</v-btn>
            </div>
        </v-form>
        </v-container>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    },
    bank:{
        type:String,
        required:false
    },
    cardNumber:{
        type:String,
        required:true
    }
})

const load:Ref<boolean> = ref(false)
const name:Ref<string> = ref(props.name);
const phone:Ref<string | undefined> = ref(props.phone);
const card:Ref<string | undefined> = ref(props.cardNumber);
const cardValidator = [((value: string | null) => value?.length! == 16 || 'Card need to have 16 numbers ')]
const bank:Ref<string | undefined> = ref(props.bank);
const photo = ref(null)


const emits = defineEmits(['edited']);


async function edited(){
    load.value = true
    const userUpdatedData = {
        name:name.value,
        phone:phone.value,
        card:card.value,
        bank:bank.value
    }
    try{
        await useProfileStore().postUser(userUpdatedData)
        emits('edited', userUpdatedData)
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

}
.update{
    &_input{
    background-color: white;
    margin-bottom: 15px;
}
    &_main{
    background-color: #cff7fc;
}
}


</style>