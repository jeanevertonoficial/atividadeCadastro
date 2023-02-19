<template>
  <main :class="{'modo-escuro': modoEscuro}">
    <router-view/>
    <!--   <button @click="mudaTema">{{ textoBotao }}</button>-->
  </main>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      modoEscuro: false
    }
  },
  async created() {
    this.tipoRota()
  },
  methods: {
    mudaTema() {
      this.modoEscuro = !this.modoEscuro
    },

    async tipoRota() {
      this.$router.push({name: 'formulario'})

      if (window.localStorage.getItem('etapa') != null && window.localStorage.getItem('etapa') != undefined) {

        const dados = [
          ['', ''],
          [2, 'codigo'],
          [3, 'endereco'],
          [4, 'documentos']
        ];

        for (var i = 0; i < dados.length; i++) {
          if (window.localStorage.getItem('etapa') >= dados[i][0]) {
            var valor = dados[i][1]
          }
        }

        if (window.localStorage.getItem('etapa') == "" || window.localStorage.getItem('etapa') == undefined) {
          this.$router.push({name: 'formulario'})
          return
        }

        this.idEtapa = window.localStorage.getItem('id');
        this.vl = valor;

        // forçar o redirecionamento para onde o usuário parou
        this.$router.push(`${this.vl}/${this.idEtapa}`)
        this.return

      } else {
        this.$router.push({name: 'formulario'})
      }
    }
  },
  computed: {
    textoBotao() {
      if (this.modoEscuro) {
        return 'Desativar modo escuro'
      } else {
        return 'Ativar modo Escuro'
      }
    },
  }
}

</script>

<style>

body, html {
  padding: 0;
  margin: 0;
}

.modo-escuro {
  --color-base: #232323;
  --color-label-forms: #444444;
  --bd-primary: #d8d8d8;
  --bd-primary-hover: #232323;
  --bd-scroll-primary: #303030;
  --bd-scroll-primary-hover: #1a1a1a;
  --bd-base-forms: #FFF;
  --bd-inputs-gerais: rgb(167 167 167 / 22%);
  --bd-modal-comprovante: rgb(167 167 167 / 39%);
  --bd-html-padrao: #dad4d4;
  --bd-geral-black: #212121;
  --bd-geral-white: #5a5a5a;
  --bd-project: #070707 !important;
}

html {
  height: 100%;
  font-family: FontPadraoRegularCond;
  background: var(--bd-project);
  box-sizing: border-box;
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: auto;
  z-index: 0;
}

@media (max-width: 551px) {
  html {
    height: auto;
  }
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>