// import {ref, watch} from 'vue'

export default function useAlert(){
    const showAlert:Ref<boolean> = ref(false);
    const typeOfAlert:Ref<string> = ref('');
    const alertText:Ref<string> = ref('');

    function close():void{
        showAlert.value = false
    }

    function show(type:string, text:string):void{
        showAlert.value = true
        typeOfAlert.value = type
        alertText.value = text
    };

    watch(showAlert, (newValue) => {
        if (newValue) {
          setTimeout(() => {
            close();
          }, 4000);
        }
      });

      return {
        showAlert,
        typeOfAlert,
        alertText,
        show,
        close,
      };
}