<template >
    <teleport to="body">  
            <div class="alert_block">
                <v-alert
                :type="props.aletrType"
                :title="alertTitle"
                class="alert"
                ></v-alert>
            </div>
    </teleport>
</template>
<script setup lang="ts">
type alert = "error" | "success" | "warning" | "info" | undefined
const props = defineProps<{
    aletrType:alert,
    alertTitle:string
}>()

definePageMeta({
    layoutTransition:{
        name:'alert',
        mode:'out-in'
    }
})
</script>
<style scoped lang="scss">
.alert{
    max-width: 25%;
    position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
    @media  screen and (max-width: 750px) {
        max-width: 50%;
    }
    &_block{
        display: flex;
        justify-content: flex-end;       
    }
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.8s ease-in;
}

.alert-enter,
.alert-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.alert-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>