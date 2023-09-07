<template >
    <teleport to="body">
        <transition name="alert-t">
               <v-alert
               :type="props.aletrType"
               :title="alertTitle"
               class="alert"
               v-if="visible"
               ></v-alert>
        </transition>
    </teleport>
</template>
<script setup lang="ts">
type alert = "error" | "success" | "warning" | "info" | undefined
const props = defineProps<{
    aletrType:alert,
    alertTitle:string
}>()
const visible:Ref<boolean> = ref(true)

</script>
<style lang="scss">
.alert{
    max-width: 30%;
    position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
    @media  screen and (max-width: 750px) {
        max-width: 80%;
    }
}
.alert-t-enter-active,
.alert-t-leave-active {
  transition: all 0.8s ease-in;
}

.alert-t-enter,
.alert-t-leave-to {
  opacity: 1;
  transform: translateX(30px);
}

.alert-t-enter-from {
  opacity: 0;
  transform: translateX(30px);
}


</style>