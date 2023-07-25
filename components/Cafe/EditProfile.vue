<template>
    <div>
        <v-container class="profile_container">
            <h1 class="text-center pb-10" >Update Profile</h1>
            <v-form @submit.prevent="edited">
                <div class="update_main">
                    <v-file-input
                    label="Caffe photo">
                    </v-file-input>
                    <v-text-field
                    label="Caffe name">
                    </v-text-field>
                    <v-text-field
                    label="City">
                    </v-text-field>
                    <v-text-field
                    label="Address">
                    </v-text-field>
                    <h3 class="text-center pb-10">Positions</h3>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Item
                                </th>
                                <th class="text-left">
                                    Price
                                </th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in props.positions" :key="index">
                                <td>{{ item.name }}</td>
                                <td>{{ item.price }}</td>
                                <td><v-btn variant="tonal" size="x-small">delete</v-btn></td>
                            </tr>
                        </tbody>
                    </v-table>
                    <div class="add_input" v-if="isNewPositionInput">
                        <v-text-field
                        label="Position name"></v-text-field>
                        <v-text-field
                        label="Price"></v-text-field>
                        <v-btn icon="mdi-checkbox-marked-circle" class="approve_btn"></v-btn>
                        <v-btn icon="mdi-cancel" class="disapprove_btn" v-on:click="addNewPosition"></v-btn>
                    </div>
                    <v-btn v-if="!isNewPositionInput" variant="outlined" size="small" class="update_btn" v-on:click="addNewPosition">Add new position</v-btn>
                </div>
            </v-form>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import {Positions} from '../../types/profileTypes'

const isNewPositionInput:Ref<boolean> = ref(false);

function addNewPosition():void{
    isNewPositionInput.value = !isNewPositionInput.value
}

const props = defineProps<{
  name: string;
  address?: string; 
  city?: string;    
  positions: Positions[];
}>();

function edited(){
    console.log('Hello')
    
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
    &_btn{
        margin-top: 20px;
        color:#FEF2F1;
        background-color: #7d4e08;
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


</style>