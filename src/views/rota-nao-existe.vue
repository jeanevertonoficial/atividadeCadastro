<template>
  <div class="container-pg-naoencontrado">
    <div class="containar-box">
      <div class="containar-box-text-img">
        <div class="containar-box-text">
          <h1>Oops!</h1>
          <p>Página não encontrada, verifique seu acesso ou
            <router-link class="link-router" :to="rota_princial">
              <strong>volte ao inicio</strong>
            </router-link>
          </p>
        </div>
        <img src="/img/bases/error.svg" width="250" alt="Error 404">
      </div>
    </div>
      <router-link class="link-router" :to="rota_princial">
        <Botao :btn_text="btn_text"/>
      </router-link>
  </div>
</template>

<script>
import Botao from "@/components/shared/Botao";
import caminhoGlobal from "@/router/caminho-global";
export default {
  name: "NaoExiste",
  components: {
    Botao
  },
  data() {
    return {
      btn_text: "Voltar ao inicio",
      botao: "text-decoration: none !important",
      rota_princial: new caminhoGlobal().index
    }
  }

}
</script>