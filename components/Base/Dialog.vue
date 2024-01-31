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
          <v-btn @click="closeDialog" class="dialog_btns__close">
            Close
          </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
<script setup lang="ts">
const dialog:Ref<boolean> = ref(false);

const emit = defineEmits(['action','close-dialog'])
function closeDialog(){
  dialog.value = false;
  emit('close-dialog')
}
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
           
        }

    }
    &_title{
      color: white;
      font-family: KARLA;
      font-size: 30px;
      font-weight: 700;
      padding-bottom: 10px;
      @media  screen and (min-width: 480px) {
       font-size: 50px;  
      }
    }
    &_shop_name{
      font-family: KARLA;
      color: white;
      font-size: 20px;
      font-weight: 700;
      @media  screen and (min-width: 480px) {
       font-size: 30px;  
      }
    }
    &_y{
      font-family: KARLA;
      color: yellow;
      font-size: 20px;
      font-weight: 700; 
      @media  screen and (min-width: 480px) {
       font-size: 30px;  
      }
    }
    &_w{
      font-family: KARLA;
      color: white;
      font-size: 20px;
      font-weight: 700;
      @media  screen and (min-width: 480px) {
       font-size: 30px;  
      }
    }
    &_total_price{
      padding-top: 20px;
    }
    &_review{
      padding-top: 15px;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }
    &_textarea{
      color: white;
      resize: none;
      border: 1px solid white;
      border-radius: 15px;
      padding: 15px;
      overflow: hidden;
      height: 150px;
      width: 100%;
      outline: none; 
      &:focus {
        border: 1px solid yellow;
     
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
}



</style>