<template>
    <div>
        <v-btn class="button" @click="dialog = true">
        <slot name="openButton"></slot>
      </v-btn>
      <v-dialog v-model="dialog" width="auto" class="dialog_full">
        <v-card class="dialog">
          <v-card-text class="dialog_text">
            <slot name="text"></slot>
          </v-card-text>
          <div class="dialog_btns">
            <v-btn class="button" @click="actionButton">
                <slot name="buttonAction"></slot>
            </v-btn>
          <v-btn @click="dialog = false" class="dialog_btns__close">
            Close
          </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
<script setup lang="ts">
const dialog:Ref<boolean> = ref(false);

const emit = defineEmits(['action'])

function actionButton(){
    dialog.value = false
    emit('action')
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic");

.v-overlay__scrim{
    background-color: aliceblue;
}
.dialog{
    background-color: black;
    border: 1px solid white;
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    &_btns{
        width: 100%;
        display: flex;
        justify-content: space-between;
        &__close{
           align-self: flex-end;
           margin-bottom: -30px;
        }

    }
    

}
.button{
    color: black;
    font-weight: 600;
    font-family: KARLA;
    font-size: 20px;
    background-color: yellow;
    padding: 5px 15px 5px 15px;
    border-radius: 20px 20px;
    margin-top: 10px;
}</style>