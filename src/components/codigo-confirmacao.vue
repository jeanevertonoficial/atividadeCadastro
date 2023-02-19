<template>
  <vue-title :title="tituloCadastro"/>
  <BarraPassos
      :situacao_um="situacao"
      :situacao_dois="situacaoatual"
      :posicao_um="posicao"
      :posicao_dois="posicao_dois"
      :posicao_tres="posicao_tres"
      :posicao_quatro="posicao_quatro"/>

  <div class="container">
    <Mensagem :msg="msg" v-show="msg" :class="estilo"/>
  </div>
  <LoadingDados v-show="loading"/>
  <div v-show="!loading" class="container-codigo">
    <div class="div-codigo">
      <div class="cont-info">
        <div class="icone-conf">
          <span class="material-symbols-outlined check-icon" :style="btn_ok">check</span>
        </div>
        <div class="texto-valida">
          <p>Insira aqui o token enviado ao número de telefone para validar a sua conta</p>
        </div>
        <form @submit.prevent="validaCodigo($event)">
          <div class="codigo-input">
            <label for="codigo_conf">Código de autorização</label>
            <input type="text" name="codigo_conf"
                   @keyup.prevent="verificarCodigoEstilo(codigo_enviado_input)"
                   v-model.trim="codigo_enviado_input"
                   class
                   id="codigo_conf"
                   placeholder="Insira o código">
          </div>
          <div class="botoes-valida-reenvia">
            <button estilo="token"
                    :title="titulo_valida_codigo"
                    type="submit"
                    class="botao botao-enviar"
                    style="background: var(--bd-primary); color: var(--color-base)">
              {{ btn_text_valida }}
            </button>
            <router-link style="text-decoration:none"
                         :to="{ params: { id: this.$route.params.id }, name: 'endereco_id' }">
              <Botao :titulo="proximo_passo"
                     v-show="proximo"
                     :btn_text="btn_text"
                     class="botao_proximo"/>
            </router-link>
            <button estilo="token"
                    :title="titulo_reenvia_codigo"
                    type="button"
                    class="botao botao-reenvia"
                    id="timer"
                    @click="reenviarCodigo"
                    :disabled="!isDisabled">
              {{ this.temporalizador || btn_text_reenvia }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import Botao from "@/components/shared/Botao";
import BarraPassos from "@/components/shared/BarraPassos";
import Mensagem from "@/components/shared/Mensagem";
// import {AtualizaCadastro} from "@/controllers/atualiza-cadastro";
import {ConsultaUsuario} from "@/controllers/consulta-usuario";
import {reenviarCodigo, validaCodigo} from "@/controllers/valida-codigo";
import vueTitle from "@/components/shared/vue-title";
import validacaoForm from "@/domain/validacao-form";
import LoadingDados from "@/components/shared/LoadingDados.vue";
import {verificaRotaNaoExiste} from "@/domain/verifica-rota";

export default {
  name: "CodigoConf",
  components: {
    LoadingDados,
    Botao, BarraPassos, Mensagem, vueTitle
  },
  data() {
    return {
      // BOTÕES
      titulo_valida_codigo: 'validar o código inserido',
      titulo_reenvia_codigo: 'click aqui para reenviar o código',
      proximo_passo: 'Ir para o proximo passo',
      btn_text: 'PRÓXIMA ETAPA',
      btn_text_valida: 'valida código',
      btn_text_reenvia: 'reenvia código',
      estilo: null,
      btn_ok: null,
      // mensagens de avisos
      msg: null,
      proximo: false,
      situacao: 'done',
      situacaoatual: 'active',
      posicao: '1',
      posicao_dois: '2',
      posicao_tres: '3',
      posicao_quatro: '4',
      codigo_conf: null,
      codigos: '',
      tipo_pessoa: '',
      ativar: true,
      temporalizador: '',
      habilita: false,
      codigo_enviado_input: '',
      tituloCadastro: 'Válidação do Código | Cadastro',
      loading: false
    }
  },
  methods: {
    verificarCodigoEstilo(cod) {
      new validacaoForm().estiloPosCod(cod)
    },

    async getDadosSalvo() {
      this.loading = true;

      const data = ConsultaUsuario(this.$route.params.id);

      const response = await data

      try {

        if (verificaRotaNaoExiste() == true) {
          setTimeout(() => {
            console.log('Erro Página não encontrada.')

            this.$router.push({name: 'NaoExiste'})
          }, 3000)
        }

        this.loading = false
        this.codi = response.codigo;
        this.nm_celular = response.nm_celular;
        this.tipo_pessoa = response.tipo_de_pessoa;
        this.login = response.login;
        console.log(this.codi);
      } catch (e) {
        this.loading = true;
        setTimeout(() => {
          console.log('Tipo do erro: ' + e.code)
          console.log('Erro Página não encontrada.')

          this.$router.push({name: 'NaoExiste'})
        }, 3000)
      }
    },

    reenviarCodigo() {
      this.habilita = true;

      reenviarCodigo(this.nm_celular)

      this.mensagem(
          'info',
          'código reenviado com sucesso, confira sua caixa de mensagens.',
          15000,
          false
      );

      const duration = 60 * 1;
      var timer = duration, minutes, seconds;

      const tempoDecorrido = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        const temporalizador = minutes + ":" + seconds;
        this.temporalizador = temporalizador
        if (timer !== 0) {
          while (--timer < 0) {
            timer = duration;
          }

          setTimeout(() => {
            this.msg = "";
          }, 5000)
          return
        } else if (timer === 0) {
          this.habilita = false;
          this.temporalizador = 'reenviar código';
          clearInterval(tempoDecorrido);
          return
        }
        return
      }, 1000);
    },
    async validaCodigo(e) {
      e.preventDefault();

      const response = await validaCodigo(this.codigo_enviado_input, this.$route.params.id)

      if (response !== false) {
        this.mensagem('erro', `Código inválido, insira um código valido!`, 5000, false, null);
        return this.habilita = false;
      } else if (response == false) {
        if (this.codi) {
          document.querySelector('.botao-enviar').classList.add('none')
          document.querySelector('.botao-reenvia').classList.add('none')

          this.mensagem(
              'sucesso',
              `Cadastro realizado com sucesso, continue seu cadastro`,
              null,
              true,
              3
          );

          this.btn_ok = 'background: var(--bd-primary); color: var(--color-base);';
          this.habilita = true;

        } else {
          this.mensagem('erro', `Código inválido, insira um código valido!`, 5000, false, null);
          this.habilita = false;
        }
      }
    },
    mensagem(estilo, texto_msg, tempo_msg, libera_proximo, etapa) {
      this.estilo = estilo;
      this.msg = texto_msg;
      this.proximo = libera_proximo;
      (etapa != null || etapa != "") ? localStorage.setItem('etapa', etapa) : localStorage.getItem('etapa');
      this.tempo_msg = (tempo_msg == 0 || tempo_msg == null) ? this.tempo_msg = 3000 : this.tempo_msg = tempo_msg;
      setTimeout(() => {
        this.mostrar_msg = false;
      }, this.tempo_msg);
    },
  },
  mounted() {
    this.getDadosSalvo();
  },
  computed: {
    isDisabled() {
      return !this.habilita;
    }
  }
}
</script>

<style scoped>

.none {
  display: none;
}

input {
  text-align: center;
}

input {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.39);
}

.pos-cod {
  letter-spacing: 5px;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
  background: var(--bd-disabled);
  color: grey;
}

.botao-personalizado {
  margin: inherit;
}

@media (max-width: 551px) {
  .div-codigo {
    margin-top: -2rem;
    width: 275px;
  }
}
</style>