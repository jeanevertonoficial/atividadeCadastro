<template>
  <div class="botao-personalizado">
    <button class="botao" :title="titulo" :class="estiloDoBotao">{{ btn_text }}</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Botao",
  props: {
    btn_text: String,
    titulo: String,
    estilo: {
      required: false,
      default: 'padrao',
      type: String,
      disabled: false,
    },
  },
  computed: {
    estiloDoBotao: function () {
      let estiloDoBotao;
      if (this.estilo == 'padrao' || !this.estilo) {
        estiloDoBotao = 'botao-padrao';
      } else if (this.estilo == 'token') {
        estiloDoBotao = 'botao-token';
      }
      return estiloDoBotao
    }
  }
}
</script>