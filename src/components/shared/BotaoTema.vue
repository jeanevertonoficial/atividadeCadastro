<template>
    <span id="btn-tema" class="material-symbols-outlined" :btn_text="textoBotao" @click="alterarTema">contrast</span>
</template>

<script>

export default {
  name: "BotaoTema",
  emits: ['aoTemaAlterado'],
  data() {
    return {
      modoEscuro: false
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuro = !this.modoEscuro
      this.$emit('aoTemaAlterado', this.modoEscuro)
    }
  },
  computed: {
    textoBotao() {
      if (this.modoEscuro) {
        return 'Desativar modo escuro'
      } else {
        return 'Ativar modo escuro'
      }
    }
  }
}
</script>

<style>
:root .modo-escuro {
  --color-base: #FFF;
  --bd-primary: black;
  --bd-primary-hover: #444444;
  --bd-scroll-primary: black;
  --bd-scroll-primary-hover: #414141;
  --bd-base-forms: #f1f1f1;
  --bd-inputs-gerais: #0000001f;
  --bd-html-padrao: #e4e4e4;
  --color-label-forms: black;
}
</style>