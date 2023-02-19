<template>
  <div>
    <formulario-ps-juridico/>
<!--    {{titulo}}-->
  </div>
</template>

<script>
import FormularioPsJuridico from "@/components/formulario-ps-juridica";
// import {computed} from "vue";
// import { useStore } from 'vuex'

export default {
  name: "FomularioPsJuridica",
  components: {FormularioPsJuridico},
  // setup(){
  //   const store = useStore();
  //   const titulo = computed(() => store.state.juridico)
  //   store.state.juridico = "editando o titulo teste"
  //   return {
  //     titulo
  //   }
  // }
}
</script>