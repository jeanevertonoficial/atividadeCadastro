<template>
  <div id="div-aceites">
    <div class="divisoes-aceite">
      <input type="checkbox"
             id="ac_condicoes"
             :title="titulo"
             value="aceite_cond"
             name="aceite_cond"
             v-model="aceite_cond"
             class="ac_condicoes">
      <label for="ac_condicoes">Aceito os Termos e Condições</label>
    </div>
    <div class="divisoes-aceite">
      <input type="checkbox"
             id="ac_politica_privacidade"
             :title="titulo"
             value="ac_politica_privacidade"
             name="ac_politica_privacidade"
             v-model="aceite_pol"
             class="ac_politica_privacidade">
      <label for="ac_politica_privacidade">Aceito os Termos de Privacidade</label>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aceites",
  props: {
    titulo: String
  },
  data () {
    return {
      aceite_cond: true,
      aceite_pol: true,
    }
  }
}
</script>

<style scoped>
  #div-aceites {
    display: flex;
    flex-direction: column;
  }
  .divisoes-aceite label {
    font-size: 0.85rem;
    margin-left: 5px;
  }
  .divisoes-aceite {
    margin-bottom: 10px;
  }

</style>