<template>
  <div id="ps_checkbox">
    <div class="check-aceite">
      <router-link :to="{params: rotas.index, name:'formulario'}" style="text-decoration: none; color: initial">
        <vue-title v-if="checked_fisico" title="Pessoa Física | Cadastro"/>
        <input
            type="radio"
            id="ps_fisica"
            value="pessoa_fisica"
            v-model="check"
            name="tipo_de_pessoa"
            :disabled="ativaDesativa"
            class="ac_condicoes"
            :checked="checked_fisico"
        >
      </router-link>
      <label for="ps_fisica">Pessoa física</label>
    </div>

    <div class="check-aceite">
      <router-link :to="{ params:rotas.index_juridico, name:'FomularioPsJuridica'}"
                   style="text-decoration: none; color: initial">
        <vue-title v-if="checked_juridico" title="Pessoa Jurídica | Cadastro"/>
        <input
            type="radio"
            id="ps_juridica"
            value="pessoa_juridica"
            v-model="check"
            name="tipo_de_pessoa"
            class="ac_politica_privacidade"
            :disabled="ativaDesativa"
            :checked="checked_juridico"
        >
      </router-link>
      <label for="ps_juridica">Pessoa jurídica</label>
    </div>
  </div>
</template>

<script>
import caminhoGlobal from "@/router/caminho-global";
import vueTitle from "@/components/shared/vue-title";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "RadioCheck",
  components: {vueTitle},
  props: {
    ativa_tipo_de_pessoa: String,
    checked_fisico: {checked: true},
    checked_juridico: {checked: true},
  },
  data() {
    return {
      check: null,
      rotas: new caminhoGlobal()
    }
  },
  computed: {
    ativaDesativa: function () {
      return (this.$route.params.id) ? 'disabled' : false;
    },
  }
}
</script>

<style scoped>

#ps_checkbox {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.check-aceite label {
  font-size: 0.85rem;
  margin-left: 5px;
}

.check-aceite {
  margin-bottom: 10px;
}

input:disabled {
  cursor: no-drop;
}

</style>