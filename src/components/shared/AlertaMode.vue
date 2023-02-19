<template>
    <div class="informacao_excluir_arquivo" :class="verificaTipo">
      <div class="div_exsucesso">
        <span class="material-symbols-outlined">{{ tipo_icon }}</span>
        <p>{{ text_msg }}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: "AlertaMode",
  props: {
    text_msg: String,
    tipo_icon: {
      default: "info"
    },
    estiloDoAlerta: {
      type: String,
    }
  },
  computed: {
    verificaTipo: function () {
      let verificaTipo
      if (this.estiloDoAlerta == 'sucesso' || !this.estiloDoAlerta) {
        verificaTipo = 'sucesso'
      } else if (this.estiloDoAlerta == 'erro') {
        verificaTipo = 'erro'
      }
      return verificaTipo
    }
  }
}
</script>

<style scoped>
.div_exsucesso {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.informacao_excluir_arquivo {
  position: absolute;
  width: 250px;
  margin: auto;
  margin-right: 3rem;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: -20px 20px 100px #05050575;
  border-left: 9px solid #ffffff;
  color: var(--color-base);
  transition: linear 0.5s;
}

.sucesso {
  background: var(--bd-alert-success);
}

.erro {
  background: var(--bd-alert-danger);
}

@media (max-width: 551px) {
  .informacao_excluir_arquivo {
    display: none;
  }
}
</style>