<template>
    <v-row class="pl-2">
      <v-col cols="auto">
        <v-dialog
          transition="dialog-bottom-transition"
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="modal_btn"
              v-bind="props"
            >ORDER</v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-toolbar
                color="primary"
                title="Order you coffee"
              ></v-toolbar>
              <v-card-text>
                <div class="pa-8">
                    <h1 class="modal_title">
                        {{ props.data.name }}
                    </h1>
                    <h3>
                        Choose you drink
                    </h3>
                    <ul class="modal_list">
                        <li class=""
                        v-for="(item, index) in props.data.positions" :key="index">
                        <div class="modal_positions">
                            <div class="list_item">
                                {{ item.name }}
                            </div>
                            <div class="list_item">
                                {{ item.price }} UAH
                            </div>
                            <v-btn>Add
                            <v-icon
                            end
                            icon="mdi-checkbox-marked-circle"></v-icon>
                        </v-btn>
                        </div>
                        
                        </li>
                    </ul>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  variant="text"
                  @click="isActive.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </template>
<script setup lang="ts">
import { shopsArr} from 'types/profileTypes';

const props = defineProps<{
    data:shopsArr 
}>()
</script>
<style scoped lang="scss">
.modal{
    &_btn{
    background-color: blue;
    color: white;
}
    &_title{
        padding-top: 10px;
        
    }
    &_list{
        list-style-type: none;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        
    
        
    }
    &_positions{
        display: flex;
        justify-content: space-between;
        gap: 50px;
        
    }
}
.list_item{
    vertical-align: middle;
}
</style>