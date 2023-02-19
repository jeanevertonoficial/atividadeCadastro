<template>
<!--  barra 4 passos ao cadastrar -->
  <div v-if="!ehCadastro()" class="barra">
    <ol class="progress" data-steps="4">
      <li :class="situacao_um">
          <span class="name">1º Etapa</span>
          <span class="step"><span>{{ posicao_um }}</span></span>
      </li>
      <li :class="situacao_dois">
          <span class="name">2º Etapa</span>
          <span class="step"><span>{{ posicao_dois }}</span></span>
      </li>
      <li :class="situacao_tres">
          <span class="name">3° Etapa</span>
          <span class="step"><span>{{ posicao_tres }}</span></span>
      </li>
      <li :class="situacao_quatro">
        <span class="name">4º Etapa</span>
        <span class="step"><span>{{ posicao_quatro }}</span></span>
      </li>
    </ol>
  </div>

<!--  barra 3 passos ao editar -->
  <div v-else class="barra">
    <ol class="progress" data-steps="3">
      <li :class="situacao_um">
        <router-link :to="{ params: { id: this.nm_id }, name: tipoDePessoa() }"
                      style="text-decoration: none">
          <span class="name">Dados Gerais</span>
          <span class="step"><span>{{ posicao_um }}</span></span>
        </router-link>
      </li>
      <li :class="situacao_tres">
        <router-link :to="{ params: { id: this.nm_id }, name: 'endereco_idEdita' }"
                     style="text-decoration: none">
          <span class="name">Endereço</span>
          <span class="step"><span>{{ posicao_dois }}</span></span>
        </router-link>
      </li>
      <li :class="situacao_quatro">
        <router-link :to="{ params: { id: this.nm_id }, name: 'documentos_idEdita' }"
                     style="text-decoration: none">
          <span class="name">Documentos</span>
          <span class="step"><span>{{ posicao_tres }}</span></span>
        </router-link>
      </li>
    </ol>
  </div>

</template>

<script>

import caminhoGlobal from "@/router/caminho-global";

export default {
  name: "BarraPassos",
  props: {
    id_passo: Number,
    nome_passo: Boolean,
    tipo_de_pessoa: String,
    posicao_um: String,
    posicao_dois: String,
    posicao_tres: String,
    posicao_quatro: String,
    posicao_cinco: String,
    situacao_um: String,
    situacao_dois: String,
    situacao_tres: String,
    situacao_quatro: String,
  },
  data() {
    return {
      rotas: new caminhoGlobal(),
      nm_id: this.$route.params.id
    }
  },
  methods: {
    ehCadastro() {
      this.nm_id = (this.nm_id != 'undefined') ? this.nm_id : false;

      let ehCadastro = (this.nome_passo == true) ? true : false;

      return ehCadastro;
    },
    tipoDePessoa() {
      return this.tipo_de_pessoa
    }
  },
  mounted() {
    this.ehCadastro()
  }
}
</script>