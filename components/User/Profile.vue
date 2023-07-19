<template>
    <div>
        <v-container class="profile_container">
            <h1 class="text-center pb-10" >Profile</h1>
            <div class="profile_block">
                <div class="profile_info">
                    <p class="profile_item"><b>Name:</b> {{ props.name }}</p>
                    <p class="profile_item"><b>Phone:</b> {{ props.phone }}</p>
                    <p class="profile_item"><b>Bank:</b> {{ props.bank }}</p>
                    <p class="profile_item"><b>Card number:</b> {{ props.cardNumber == '' ? '': props.cardNumber.slice(0, -8) + "********"  }}</p>
                </div>
                <img
                src="../../public/images/photo.jpg">
            </div>
            <div class="profile_update">
                <v-btn variant="outlined" v-on:click="editProfile">Update profile</v-btn>
            </div>
            <div class="profile_btns">
                <v-btn prepend-icon="mdi-arrow-left" class="profile_btn">Active orders</v-btn>
                <v-btn append-icon="mdi-arrow-right" class="profile_btn">Make order</v-btn>

            </div>
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
const emits = defineEmits(['edit'])

function editProfile(){
    emits('edit')
}

</script>
<style scoped lang="scss">
.profile_container{
    width: 100%;
    background-color: #cff7fc;
    border-radius: 5%;
    @media screen and (min-width: 750px) {
    width: 50%;
    
}
}
.profile_block{
    display: flex;
    justify-content: space-around;
    flex-direction: column-reverse;
    gap: 20px;
    @media screen and (min-width: 450px) {
        flex-direction: row;
    }
}
.profile_info{
    display: flex;
    flex-direction: column;
    gap: 10px;

}
.profile_item{
    font-size: 20px

}
.profile_btns{
    display: flex;
    justify-content: space-around;
    padding-top: 70px;
    flex-direction: column;
    gap: 20px;
    @media screen and (min-width: 450px) {
        flex-direction: row;
    }
}
.profile_btn{
    background-color: blue;
    color: white;
}
.profile_update{
    padding-top: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
}
</style>