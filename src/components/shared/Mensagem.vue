<template>
  <div class="messege-container" :style="btnFecha" :class="estiloDaMensagem" role="alert">
    <p>{{ msg }}</p>
    <button class="btn-fecha" :style="btnFecha" @click="fecha">x</button>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Mensagem",
  props: {
    msg: String,
    estilo: {
      required: false,
      default: 'sucesso',
      type: String
    }
  },
  data() {
    return {
      btnFecha: ''
    }
  },
  methods: {fecha() { return this.btnFecha = 'opacity: 0'; }},
  computed: {
    estiloDaMensagem: function () { 
      let estiloDaMensagem = (this.estilo == 'sucesso' || !this.estilo) ? estiloDaMensagem = 'success' : (this.estilo == 'erro') ? estiloDaMensagem = 'danger' : (this.estilo == 'info') ? estiloDaMensagem = 'info' : estiloDaMensagem
      return estiloDaMensagem;
    }
  }
}
</script>

<style scoped>

.messege-container {
  margin: auto;
  position: absolute;
  border-radius: 5px;
  width: 95%;
  padding: 15px;
  text-align: center;
  animation: mymove;
  animation-duration: 0.7s;
  transition: linear 0.7s;
  display: flex;
  justify-content: space-between;
}

.btn-fecha {
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-label-forms)
}

.messege-container .btn-fecha:hover {
  color: var(--color-base)
}

@keyframes mymove {
  from {
    top: 10px;
    opacity: 0;
  }
  to {
    opacity:1;
    top: 80px;
  }
}

@media (max-width: 551px) {
  p {
    width: 80%;
  }
  .btn-fecha {
    font-size: 1.5rem;
    cursor: pointer;
  }
  @keyframes mymove {
    from {
      top: 10px;
      opacity: 0;
    }
    to {
      opacity:1;
      top: 95px;
    }
  }
}

p {
  margin: inherit;
  padding: 0;
}

.sucesso {
  background: var(--bd-alert-sucesso);
  color: #155724;
}

.erro {
  background: var(--bd-alert-erro);
  color: #721c24;
}
.info {
  background-color: var(--bd-alert-info);
  color: #004085;
}
</style>