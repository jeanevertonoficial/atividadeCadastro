<template>
  <vue-title :title="tituloCadastro"/>
  <div class="modal-comprovante" v-if="Endereco.statusanexo_id" :style="imagem_renderizada">
    <div class="img_modal">
      <div class="img_link">
        <img :src="this.doc_file" alt="imagem">
        <a :href="`${this.doc_file}`" target="_blank">
          <p title="clique aqui para ver imagem com tamanho original">Abrir original</p>
        </a>
      </div>
    </div>
    <button @click="fechaImagem" title="clique aqui para fechar modal"
            class="fechar_img_mobile">FECHAR
    </button>
  </div>
  <BarraPassos
      :nome_passo="ehBarraEdicao()"
      :tipo_de_pessoa="tipo()"
      :situacao_um="situacao"
      :situacao_dois="situacao"
      :situacao_tres="situacaoatual"
      :posicao_um="posicao"
      :posicao_dois="posicao_dois"
      :posicao_tres="posicao_tres"
      :posicao_quatro="posicao_quatro"/>

  <div class="container">
    <Mensagem :msg="msg" v-show="msg" :class="estilo"/>
  </div>
  <loading-dados v-show="loading"/>
  <div v-show="!loading" class="formulario-container">
    <div id="form_padrao">
      <router-link style="text-decoration:none" :to="{params: {id: this.$route.params.id}, name: tipo() }">
        <span id="icone-volta" class="material-symbols-outlined">
          <img src="/img/icones/arrow_back_ios_FILL.png" alt="botão para voltar">
        </span>
      </router-link>
      <form @submit.prevent="AtualizarFormularioEndereco($event)">
        <div class="container">
          <div class="formulario-padrao">

            <div class="divisoes-forms">
              <label for="nm_cep">CEP</label>
              <input type="tel"
                     id="nm_cep"
                     name="nm_cep"
                     v-model="Endereco.nm_cep"
                     @change="getCep()"
                     class="input-form"
                     v-mask="'#####-###'"
                     placeholder="Insira seu CEP"
                     title="Insira seu CEP"
                     maxlength="9"
                     tabindex="1">
              <small style="color: red" v-show="cep_valido">CEP Invalido, por fazer inserir CEP valido</small>
            </div>
            <div class="divisoes-forms">
              <label for="nm_endereco">ENDEREÇO</label>
              <input type="text"
                     id="nm_endereco"
                     name="nm_endereco"
                     v-model="Endereco.nm_endereco"
                     class="input-form"
                     title="Insira seu endereço"
                     placeholder="Insira seu endereço"
                     tabindex="2">
            </div>

            <div class="divisoes-forms">
              <label for="nm_cidade">CIDADE</label>
              <input type="text"
                     name="nm_cidade"
                     v-model="Endereco.nm_cidade"
                     id="nm_estado"
                     placeholder="Insira o nome da cidade"
                     title="Insira o nome da cidade"
                     tabindex="4">
            </div>
            <div class="divisoes-forms">
              <label for="nm_complemento">COMPLEMENTO</label>
              <textarea type="text"
                        id="nm_complemento"
                        name="nm_complemento"
                        v-model="Endereco.nm_complemento"
                        class="input-form"
                        title="Digite complemento do endereço, ex: ponto de referência, é casa, prédio..."
                        placeholder="Digite complemento do endereço, ex: ponto de referência, é casa, prédio..."
                        tabindex="6">
              </textarea>
            </div>
          </div>

          <div class="formulario-padrao">
            <div class="divisoes-forms" style="opacity: 0">
              <label for="nm_estado">campo oculto</label>
              <input>
            </div>

            <div class="divisoes-forms">
              <label for="nm_nendereco">NÚMERO</label>
              <input type="text"
                     id="nm_nendereco"
                     name="nm_nendereco"
                     v-model="Endereco.nm_nendereco"
                     class="input-form"
                     placeholder="Insira número residêncial"
                     title="Insira número residêncial"
                     tabindex="3">
            </div>

            <div class="divisoes-forms">
              <label for="nm_bairro">BAIRRO</label>
              <input type="text"
                     id="nm_bairro"
                     name="nm_bairro"
                     v-model="Endereco.nm_bairro"
                     class="input-form"
                     placeholder="Insira o bairro"
                     title="Insira o bairro"
                     tabindex="5">
            </div>

            <div class="divisoes-forms">
              <label for="nm_estado">ESTADO</label>
              <input v-model="Endereco.nm_estado"
                     title="insira a uf do seu estado"
                     id="nm_estado"
                     placeholder="insira a uf do seu estado"
                     tabindex="7">
            </div>

            <div class="divisoes-forms residencia" id="residencia">
              <label class="titulo_comprovante">COMPROVANTE DE RESIDÊNCIA</label>
              <span class="material-symbols-outlined"
                    v-if="Endereco.statusanexo_id">
                <img src="/img/icones/done_all.png" alt="check arquivo">
              </span>
              <label class="botao comprovante"
                     title="clique aqui para selecionar e enviar o arquivo"
                     for="statusanexo_id">anexar</label>
              <input type="file"
                     id="statusanexo_id"
                     ref="arquivo"
                     accept="image/*, application/pdf"
                     class="input-form"
                     @change.prevent="comprovanteRed($event), salvarArquivo($event)"
                     alt="documento comprovante"
                     tabindex="8">
            </div>
            <span style="font-size: small; color: red" v-if="!Endereco.statusanexo_id">
              {{ texto_ref_file }}
            </span>

            <div class="comprovante_nome" v-if="Endereco.statusanexo_id">
              <div class="ver_comprovante">
                <div title="clique aqui para ver imagem" @click="ver_Imagem">
                  {{ Endereco.statusanexo_id.name }}
                </div>
                <span class="material-symbols-outlined del-comprovante"
                      title="clique aqui para excluir anexo"
                      @click="delete this.Endereco.statusanexo_id">
                  <img src="/img/icones/delete_FILL.png" alt="botão para deletar arquivo">
                </span>
              </div>
            </div>
          </div>

        </div>
        <Botao :btn_text="btn_text"
               :title="titulo_confirmar"
               v-show="!proximo && !ehBarraEdicao()"
               v-if="!proximo && !ehBarraEdicao()"
               class="botao-endereco"/>
        <Botao :btn_text="btn_text_alteracao"
               :title="titulo_confirmar"
               v-else
               v-show="!proximo && ehBarraEdicao()"
               class="botao-endereco"/>
      </form>
      <router-link style="text-decoration: none"
                   v-if="ehBarraEdicao()"
                   :to="{ params: { id:this.$route.params.id }, name: 'documentos_idEdita'}">
        <Botao type="submit"
               :title="titulo_proximo"
               v-show="proximo"
               :btn_text="btn_continuar"/>
      </router-link>
      <router-link style="text-decoration: none"
                   v-else
                   :to="{ params: { id:this.$route.params.id }, name: 'documentos_id'}">
        <Botao type="submit"
               :title="titulo_proximo"
               v-show="proximo"
               :btn_text="btn_continuar"/>
      </router-link>
    </div>
  </div>
</template>

<script>

import vueTitle from "@/components/shared/vue-title";
import Botao from "@/components/shared/Botao";
import BarraPassos from "@/components/shared/BarraPassos";
import Mensagem from "@/components/shared/Mensagem";
import LoadingDados from "@/components/shared/LoadingDados.vue";
import EnderecoUsuario from "@/domain/cadastro/endereco/endereco-usuario";
import {ConsultaUsuario} from "@/controllers/consulta-usuario";
import {AtualizaCadastro} from "@/controllers/atualiza-cadastro";
import {tipoDeRota, verificaRota, verificaRotaNaoExiste} from "@/domain/verifica-rota";

//import {salvarArquivo} from "@/controllers/salvar-arquivo";
export default {
  name: "EnderecoCad",
  components: {
    LoadingDados,
    Botao, BarraPassos, Mensagem, vueTitle
  },
  data() {
    return {
      titulo_proximo: 'Ir para a proxima etapa',
      titulo_confirmar: 'click aqui para salvar os dados',
      btn_text: 'salvar',
      btn_text_alteracao: 'salvar alteração',
      btn_continuar: "PRÓXIMA ETAPA",
      msg: null,
      proximo: false,
      imagem_renderizada: "display:none",
      situacao: 'done',
      situacaoatual: 'active',
      posicao: '1',
      posicao_dois: '2',
      posicao_tres: '3',
      posicao_quatro: '4',
      Endereco: new EnderecoUsuario(),
      errocep: null,
      estilo: '',
      doc_file: '',
      nome: '',
      cep_valido: false,
      file: '',
      texto_ref_file: 'comprovante de endereço obrigatório',
      tituloCadastro: 'Endereço | Cadastro',
      loading: false
    }
  },
  methods: {
    getCep() {
      const axios = require('axios').default;
      this.cepLimpo = this.Endereco.nm_cep.replace(/[^\d]+/g, '');
      if (this.cepLimpo.length == 8) {
        axios
            //API externa para autocomplete de endereço via CEP
            .get(`https://viacep.com.br/ws/${this.Endereco.nm_cep}/json/`)
            .then(response => {
              if (!response.data.uf) {
                this.cep_valido = true
                this.proximo = false
                setTimeout(() => {
                  this.cep_valido = false
                }, 5000)
                return
              } else {
                this.Endereco.nm_estado = response.data.uf
                this.Endereco.nm_cidade = response.data.localidade
              }
            })
            .catch(error => {
              error
              this.mensagem('erro', 'CEP não encontrado')
            })
      }
    },
    async getConsultaUsuario() {
      this.loading = true;

      const data = await ConsultaUsuario(this.$route.params.id);

      try {

        if (verificaRotaNaoExiste() == true) {
          setTimeout(() => {
            console.log('Erro Página não encontrada.')

            this.$router.push({name: 'NaoExiste'})
          }, 3000)
        }

        this.loading = false;
        this.Endereco = data;
      } catch (e) {
        this.loading = true;
        setTimeout(() => {
          console.log('Tipo do erro: ' + e.code)
          console.log('Erro Página não encontrada.')

          this.$router.push({name: 'NaoExiste'})
        }, 3000)
      }
    },
    salvarArquivo(e) {
      this.file = e.target.files[0];
    },
    async AtualizarFormularioEndereco(e) {
      e.preventDefault()

      if (this.doc_file === false
          || this.doc_file.length == ""
      ) {
        return this.mensagem('erro', 'Comprovante de endereço obrigatório, por favor insira o anexo.', 0, false)
      } else {
        console.log(this.file)
        const formData = new FormData();
        formData.append('file', this.file);
        try {
          const data = {
            nm_cep: this.Endereco.nm_cep,
            nm_endereco: this.Endereco.nm_endereco,
            nm_complemento: this.Endereco.nm_complemento,
            nm_nendereco: this.Endereco.nm_nendereco,
            nm_bairro: this.Endereco.nm_bairro,
            nm_estado: this.Endereco.nm_estado,
            nm_cidade: this.Endereco.nm_cidade,
            statusanexo_id: formData
          }

          const response = await AtualizaCadastro(this.$route.params.id, data)

          if (response === 'undefined' && response.status != 200) {
            this.mensagem(
                'erro',
                `Tipo do erro: ${response.error}, Desculpe algo deu errado atualize a página e tente novamente.`,
                null,
                false
            );
          }

          this.mensagem('sucesso', `Endereço inserido com sucesso!`, 5000, true, 4)

          const resi = document.querySelector('#statusanexo_id')
          const resi_span = document.querySelector('.del-comprovante')
          resi.setAttribute('disabled', 'disabled')
          resi_span.style.display = 'none'

        } catch (error) {
          this.mensagem('erro', 'Erro ao tentar cadastrar endereco.', null, false)
        }
      }
    },
    ver_Imagem() {
      this.imagem_renderizada = "display:initial"
    },
    fechaImagem() {
      this.imagem_renderizada = "display:none"
    },
    async comprovanteRed(e) {
      this.$refs.arquivo.click()
      this.Endereco.statusanexo_id = e.target.files[0];
      this.doc_file = URL.createObjectURL(this.Endereco.statusanexo_id)
    },
    mensagem(estilo, texto_msg, tempo_msg, libera_proximo, etapa) {
      this.estilo = estilo;
      this.msg = texto_msg;
      this.proximo = libera_proximo;
      (etapa != null || etapa != "") ? localStorage.setItem('etapa', etapa) : localStorage.getItem('etapa');
      this.tempo_msg = (tempo_msg === 0 || tempo_msg === null) ? this.tempo_msg = 300 : this.tempo_msg = tempo_msg;
      setTimeout(() => {
        this.mostrar_msg = false
      }, this.tempo_msg);
    },
    ehBarraEdicao() {
      return verificaRota()
    },
    tipo() {
      return tipoDeRota(this.Endereco.bn_tipo_de_pessoa, 3)
    }
  },
  mounted() {
    this.getConsultaUsuario()
    this.ehBarraEdicao()

    return (this.$route.params.id != null) ? this.tituloCadastro = 'Editar Cadastro | Endereço' : this.tituloCadastro
  },
  computed: {
    fileName() {
      const {statusanexo_id} = this.Endereco
      if (statusanexo_id) {
        const split = statusanexo_id.name.split(".")
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}

span img {
  width: 24px;
}

#form_padrao {
  padding: 0px 3px;
}

.residencia {
  margin-bottom: 3px;
}

/** Estilo Mobile*/
@media screen and (max-width: 551px) {
  #form_padrao {
    margin: auto;
    width: 325px;
  }

  .formulario-padrao {
    width: 95%;
  }

  .formulario-container {
    margin-left: initial;
  }
}

@media screen and (max-width: 912px) and (min-width: 768px) {
  .formulario-padrao {
    width: initial;
  }

  .formulario-container {
    margin-left: 3rem;
  }
}
</style>