<template>
  <vue-title :title="tituloCadastro"/>
  <div class="modal-comprovante" :style="imagem_renderizada">
    <div class="img_modal">
      <div class="img_link">
        <img class="modal_img">
        <a class="link_img" target="_blank">
          <p>Abrir original</p>
        </a>
      </div>
    </div>
    <button @click="fechaImagem()" class="fechar_img_mobile">FECHAR</button>
  </div>
  <div>
    <BarraPassos :situacao_um="situacao"
                 :situacao_dois="situacao"
                 :situacao_tres="situacao"
                 :situacao_quatro="situacaoatual"
                 :posicao_um="posicao"
                 :posicao_dois="posicao_dois"
                 :posicao_tres="posicao_tres"
                 :posicao_quatro="posicao_quatro"
                 :nome_passo="ehBarraEdicao()"
    />
    <div class="mensagem_doc">
      <Mensagem :msg="msg" v-show="msg" :class="estilo"/>
    </div>
    <loading-dados v-show="loading"/>
    <div v-show="!loading" class="posicao_lista_e_formulario">
      <div class="container">
        <div class="container-div">
          <div class="div-box" id="doc_inputs">
            <div class="centralizador">
              <router-link style="text-decoration:none;" :to="{params: {id: this.$route.params.id}, name: tipo() }">
                <span id="icone-volta" class="material-symbols-outlined">
                  <img src="/img/icones/arrow_back_ios_FILL.png" alt="botão para voltar">
                </span>
              </router-link>
              <div class="titulo_documentos">
                <legend>Documentos</legend>
              </div>
            </div>
            <form class="formulario-documentos" method="post"
                  enctype="multipart/form-data">
              <div class="centralizador">
                <div v-if="this.bn_tipo_de_pessoa == 'pessoa_fisica'">
                  <div class="alinhar-txt">
                    <label>
                      <p>Procuração assinada <a :href="this.url_produracao.rota_procuracao" target="_blank">
                        <strong>(clique aqui para baixar a procuração)</strong></a></p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p>
                          <strong>Procuração:</strong> Para cumprimento do Art. 903 do CPC.
                        </p>
                      </div>
                    </label>
                    <div class="check-anexo doc_procuracao none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo">
                      <label for="doc_procuracao" class="botao comprovante">Anexar</label>
                      <input type="file"
                             ref="doc_procuracao"
                             id="doc_procuracao"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_procuracao, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_procuracao"
                             name="doc_procuracao">
                    </div>
                  </div>
                  <div class="alinhar-txt">
                    <label>
                      <p> Documento com foto <strong>(CNH, RG ou equivalente)</strong></p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p>
                          Foto frente e verso do documento.
                        </p>
                      </div>
                    </label>
                    <div class="check-anexo doc_foto none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo">
                      <label for="doc_foto" class="botao comprovante">Anexar</label>
                      <input type="file"
                             ref="doc_foto"
                             id="doc_foto"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_foto, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_foto"
                             name="doc_foto">
                    </div>
                  </div>
                  <div class="alinhar-txt">
                    <label>
                      <p> Selfie segurando um documento com foto ao lado do rosto </p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p>
                          Uma foto sua <strong>(selfie)</strong> segurando seu documento de identificação <br> ao lado
                          do
                          seu rosto <strong>(RG e
                          CPF ou documento equivalente).</strong>
                        </p>
                      </div>
                    </label>
                    <div class="check-anexo doc_selfie-rosto none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo">
                      <label for="doc_selfie-rosto" class="botao comprovante">Anexar</label>
                      <input type="file"
                             ref="doc_selfie"
                             id="doc_selfie-rosto"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_selfie_rosto, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_selfie_rosto"
                             name="doc_selfie-rosto">
                    </div>
                  </div>

                  <div v-if="this.estado_civil == 'casado'">

                    <div class="alinhar-txt">
                      <label>
                        <p> Certidão de casamento</p>
                        <div class="informacoes">
                          <span class="material-symbols-outlined">
                            <img src="/img/icones/info.png" alt="informação do documento">
                          </span>
                          <p>
                            Uma cópia da Certidão de Casamento
                          </p>
                        </div>
                      </label>
                      <div class="check-anexo doc_certidao none">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/done_all.png" alt="informação do documento">
                        </span>
                      </div>
                      <div class="lado-anexo">
                        <label for="doc_certidao" class="botao comprovante">Anexar</label>
                        <input type="file"
                               ref="doc_certidao"
                               id="doc_certidao"
                               accept="image/*, application/pdf"
                               alt="imagem"
                               @change.prevent="documentos.doc_certidao, retornoViewDocs($event)"
                               v-on:focus="documentos.doc_certidao"
                               name="doc_certidao">
                      </div>
                    </div>
                    <div class="alinhar-txt">
                      <label>
                        <p> Certidão do Cônjuge <strong>(RG ou CNH)</strong></p>
                        <div class="informacoes">
                          <span class="material-symbols-outlined">
                            <img src="/img/icones/info.png" alt="informação do documento">
                          </span>
                          <p>
                            Fotos frente e verso do documento com foto do Cônjuge <strong>(RG e CPF ou documento
                            equivalente)</strong>;
                          </p>
                        </div>
                      </label>
                      <div class="check-anexo doc_conjuge none">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/done_all.png" alt="informação do documento">
                        </span>
                      </div>
                      <div class="lado-anexo">
                        <label for="doc_conjuge" class="botao comprovante">Anexar</label>
                        <input type="file"
                               ref="doc_conjuge"
                               id="doc_conjuge"
                               accept="image/*, application/pdf"
                               alt="imagem"
                               @change.prevent="documentos.doc_conjuge, retornoViewDocs($event)"
                               v-on:focus="documentos.doc_conjuge"
                               name="doc_conjuge">
                      </div>
                    </div>
                  </div>
                  <div class="alinhar-txt">
                    <label>
                      <p> Documentos extras </p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p><strong>Documentos excepcionais:</strong> para participação em leilões que necessitam de
                          habilitações especiais.</p>
                      </div>
                    </label>
                    <div class="check-anexo doc_extra none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo" title="Clique para selecionar e enviar anexo">
                      <label for="doc_extra" class="botao comprovante">Anexar</label>
                      <input type="file"
                             ref="doc_extra"
                             id="doc_extra"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_extra, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_extra"
                             name="doc_extra">
                    </div>
                  </div>
                </div>

                <div v-if="this.bn_tipo_de_pessoa == 'pessoa_juridica'">

                  <div class="alinhar-txt">
                    <label>
                      <p>Procuração assinada <a :href="this.url_produracao.rota_procuracao" target="_blank">
                        <strong>(clique aqui para baixar a procuração)</strong></a></p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p><strong>Procuração:</strong> Para cumprimento do Art. 903 do CPC.</p>
                      </div>
                    </label>
                    <div class="check-anexo doc_psj_procuracao none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo" title="Clique para selecionar e enviar anexo">
                      <label for="doc_psj_procuracao" class="botao comprovante">Anexar</label>
                      <input type="file"
                             ref="doc_psj_procuracao"
                             id="doc_psj_procuracao"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_psj_procuracao, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_psj_procuracao" name="doc_psj_procuracao">
                    </div>
                  </div>
                  <div class="alinhar-txt">
                    <label>
                      <p> Documento do administrador da empresa <strong>(CNH, RG ou equivalente)</strong></p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p><strong>Documento do administrador:</strong> Foto frente e verso do documento.
                          <img class="foto-frente-verso"
                               src="../../public/img/bases/frente-verso.png"
                               alt="documento frente e verso">
                          <a href="/img/bases/frente-verso.png" target="_blank" class="link_img_frente_verso">
                            abrir original
                          </a>
                        </p>
                      </div>
                    </label>
                    <div class="check-anexo doc_psj_foto none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo" title="Clique para selecionar e enviar anexo">
                      <label for="doc_psj_foto" class="botao comprovante">Anexar</label>
                      <input ref="doc_psj_foto"
                             name="doc_psj_foto"
                             type="file"
                             id="doc_psj_foto"
                             alt="imagem"
                             accept="image/*, application/pdf"
                             @change.prevent="documentos.doc_psj_foto, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_psj_foto">
                    </div>
                  </div>
                  <div class="alinhar-txt">
                    <label>
                      <p> Selfie do administrador segurando um documento com foto ao lado do rosto</p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p>
                          <strong>Selfie do administrador:</strong> Uma foto do administrador da empresa (selfie)<br>
                          segurando um
                          documento de
                          identificação ao lado do <br>seu rosto <strong>(RG e CPF ou documento equivalente)</strong>.
                        </p>
                      </div>
                    </label>
                    <div class="check-anexo doc_psj_selfie none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo" title="Clique para selecionar e enviar anexo">
                      <label for="doc_psj_selfie" class="botao comprovante">Anexar</label>
                      <input type="file"
                             ref="doc_psj_selfie"
                             id="doc_psj_selfie"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_psj_selfie, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_psj_selfie"
                             name="doc_psj_selfie">
                    </div>
                  </div>

                  <div class="alinhar-txt">
                    <label>
                      <p> Última alteração do contrato social ou declaração de firma indivídual </p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p>
                          <strong>Última alteração do contrato:</strong> Uma cópia da última alteração do contrato <br>
                          social ou
                          declaração de
                          firma individual
                        </p>
                      </div>
                    </label>
                    <div class="check-anexo doc_psj_alteracao none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo" title="Clique para selecionar e enviar anexo">
                      <label for="doc_psj_alteracao" class="botao comprovante">Anexar</label>
                      <input type="file"
                             ref="doc_psj_alteracao"
                             id="doc_psj_alteracao"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_psj_alteracao, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_psj_alteracao"
                             name="doc_psj_alteracao">
                    </div>
                  </div>

                  <div class="alinhar-txt">
                    <label class="extra_mais">
                      <p> Documentos extras </p>
                      <div class="informacoes">
                        <span class="material-symbols-outlined">
                          <img src="/img/icones/info.png" alt="informação do documento">
                        </span>
                        <p>
                          <strong>Documentos excepcionais:</strong> para participação em leilões que necessitam de
                          habilitações
                          especiais.
                        </p>
                      </div>
                    </label>
                    <div class="check-anexo doc_psj_extra none">
                      <span class="material-symbols-outlined">
                        <img src="/img/icones/done_all.png" alt="informação do documento">
                      </span>
                    </div>
                    <div class="lado-anexo" title="Clique para selecionar e enviar anexo">
                      <label for="doc_psj_extra" class="botao comprovante">Anexar</label>
                      <input type="file"
                             title="Clique para selecionar e enviar anexo"
                             ref="doc_psj_extra"
                             id="doc_psj_extra"
                             accept="image/*, application/pdf"
                             alt="imagem"
                             @change.prevent="documentos.doc_psj_extra, retornoViewDocs($event)"
                             v-on:focus="documentos.doc_psj_extra"
                             name="doc_psj_extra">
                    </div>
                  </div>

                </div>
              </div>
              <div class="ajuste-botao">
                <Botao
                    :titulo="titulo_btn_salvar"
                    v-show="!proximo"
                    @click="salvarDocumentos($event)"
                    :btn_text="btn_text"
                    :disabled="libera"/>
              </div>
            </form>
            <router-link :to="rotas.index" v-if="bn_tipo_de_pessoa == 'pessoa_fisica'">
              <Botao
                  :titulo="titulo_voltar"
                  title="Voltar para atapa endereço"
                  v-show="proximo"
                  :btn_text="btn_voltar"/>
            </router-link>
            <router-link :to="rotas.index_juridico" v-else>
              <Botao
                  :titulo="titulo_voltar"
                  v-show="proximo"
                  :btn_text="btn_voltar"/>
            </router-link>
          </div>
          <div id="btn-deleta-tudo" class="div-btn-delete none">
            <div class="btn-apagar-todos"
                 id="btn-delete"
                 title="Clique aqui para deletar todos os anexos"
                 @click.prevent="deleteTodosItens($event)">
              <div class="div-btn-delete">
                Apagar todos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- lista retorno visual pessoa_juridica-->
    <div class="posicao_lista_e_formulario_lista">
      <div class="box-lista" v-if="visualizar_lista != ''">
        <div v-for="(item, index) in visualizar_lista" :key="index">
          <div class="lista">
            <div>
              <div class="div-box lista-box" v-if="item">
                <div class="img-span">
                  <img
                      @click="abrirImagem"
                      :src="item"
                      class="img_mod"
                      title="Clique aqui para ver imagem">
                  <div class="conteudo-img" title="Informações do anexo">
                    <div class="tamanho_nome">Nome:
                      <strong>{{ filtrarNome(file[index].name)[0] }}</strong>
                    </div>
                    <div class="tamanho_img">Tamanho:
                      <strong>{{ calculaTamanhoDaImagem(file[index].size) }}</strong>
                    </div>
                  </div>
                  <span
                      title="clique aqui para deletar anexo"
                      class="material-symbols-outlined"
                      @click="delete this.visualizar_lista[index],
                      alertaDeRetorno(true, 'erro', 'cancel', 'Removido com sucesso', 700)"
                      v-bind:value="index">
                    <img src="/img/icones/delete_FILL.png" alt="botão para deletar arquivo">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="conteudo-alert-excluido">
      <AlertaMode :text_msg="text_alerta" v-show="mostrar_msg" :class="estiloDoAlerta" :tipo_icon="tipo_icone"/>
    </div>
  </div>
</template>

<script>

import vueTitle from "@/components/shared/vue-title";
import BarraPassos from "@/components/shared/BarraPassos";
import Botao from "@/components/shared/Botao";
import Mensagem from "@/components/shared/Mensagem";
import AlertaMode from "@/components/shared/AlertaMode";
import DocumentosUsuario from "@/domain/cadastro/documentos/documentos-usuario";
import caminhoGlobal from "@/router/caminho-global";
import mapaDeRotas from "@/router/caminho-urls";
import {ConsultaUsuario} from "@/controllers/consulta-usuario";
import {AtualizaCadastro} from "@/controllers/atualiza-cadastro";
import {tipoDeRota, verificaRota, verificaRotaNaoExiste} from "@/domain/verifica-rota";
import LoadingDados from "@/components/shared/LoadingDados.vue";

export default {
  name: "AnexarDoc",
  components: {
    LoadingDados,
    Mensagem,
    BarraPassos,
    Botao,
    AlertaMode,
    vueTitle
  },
  data() {
    return {
      titulo_btn_salvar: "Clique para salvar anexos",
      titulo_voltar: "Voltar para atapa endereço",
      preview: null,
      image: null,
      visualizar_lista: [],
      file: [],
      btn_text: "ENVIAR DOCUMENTOS",
      btn_voltar: "FINALIZAR",
      situacao: 'done',
      situacaoatual: 'active',
      posicao: '1',
      posicao_dois: '2',
      posicao_tres: '3',
      posicao_quatro: '4',
      documentos: new DocumentosUsuario(),
      rotas: new caminhoGlobal(),
      url_produracao: new mapaDeRotas(),
      msg: '',
      text_alerta: '',
      estilo: null,
      estiloDoAlerta: null,
      mostrar_msg: null,
      tipo_icone: null,
      proximo: false,
      libera: false,
      imagem_renderizada: 'display:none',
      excluido: false,
      tituloCadastro: 'Documentos | Cadastro',
      bn_tipo_de_pessoa: [],
      estado_civil: [],
      loading: false,
    }
  },
  methods: {
    salvarArquivo(e) {
      this.file = e.target.files[0];
    },
    abrirImagem() {
      let imagens = document.querySelectorAll('.img_mod');
      let modalImg = document.querySelector('.modal_img');
      let link_img = document.querySelector('.link_img');
      this.imagem_renderizada = "display:initial"

      console.log(imagens.length)

      for (let i = 0; i < imagens.length; i++) {
        imagens[i].addEventListener('click', () => {
          const srcVal = imagens[i].getAttribute('src');
          modalImg.setAttribute('src', srcVal);
          link_img.setAttribute('href', srcVal);
        })
      }
    },
    fechaImagem() {
      this.imagem_renderizada = "display:none";
    },
    async getDadosSalvo() {

      this.loading = true;

      const data = ConsultaUsuario(this.$route.params.id);

      const response = await data;
      try {

        if (verificaRotaNaoExiste() == true) {
          setTimeout(() => {
            console.log('Erro Página não encontrada.')

            this.$router.push({name: 'NaoExiste'})
          }, 3000)
        }

        this.loading = false;
        this.id_user = response.id;
        this.documentos = response;
        this.bn_tipo_de_pessoa = response.bn_tipo_de_pessoa;
        this.estado_civil = response.estado_civil;
      } catch (e) {
        this.loading = true;
        setTimeout(() => {
          console.log('Tipo do erro: ' + e.code)
          console.log('Erro Página não encontrada.')

          this.$router.push({name: 'NaoExiste'})
        }, 3000)
      }
    },
    retornoViewDocs(dados) {
      var input = dados.target;
      var id_file = dados.target.id;
      var count = input.files.length;
      var index = 0;
      var rt = document.querySelector(`.${id_file}`);

      rt.classList.remove("none");

      if (input.files) {
        while (count--) {
          var reader = new FileReader();

          reader.onload = (e) => {
            this.visualizar_lista.push(e.target.result);
          }
          this.file.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          this.div_lista = 'display:initial;';

          const formData = new FormData();
          let ver = input.files[index]
          ver[index] = ver
          formData.append('imagens[]', input.files[index]);

          index++;
          console.log(ver)
          this.alertaDeRetorno(true, 'sucesso', 'info', 'Inserido com sucesso', 700);
        }
        if (this.visualizar_lista.length >= 2) {
          this.deleteTodosItens(id_file);
        }
      }
    }
    ,
    deleteTodosItens() {
      const btn_deleta = document.querySelector('.div-btn-delete');

      btn_deleta.classList.remove('none');
      btn_deleta.addEventListener('click', () => {
        this.visualizar_lista = this.visualizar_lista.splice();
        btn_deleta.classList.add('none');
        this.alertaDeRetorno(true, 'erro', 'cancel', 'Arquivos Removidos', 700);
      })
    }
    ,
    calculaTamanhoDaImagem(a, b) {
      if (0 == a) return "0 Bytes";
      var c = 1024,
          d = b || 2,
          e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          f = Math.floor(Math.log(a) / Math.log(c));
      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
    }
    ,
    filtrarNome(e) {
      const nomeLimpo = e.split('.');
      return nomeLimpo;
    }
    ,
    async salvarDocumentos(e) {
      e.preventDefault()
      try {
        const data = {
          doc_procuracao: this.documentos.doc_procuracao,
          doc_foto: this.documentos.doc_foto,
          doc_selfie_rosto: this.documentos.doc_selfie_rosto,
          doc_conjuge: this.documentos.doc_conjuge,
          doc_certidao: this.documentos.doc_certidao,
          doc_extra: this.documentos.doc_extra,
          doc_psj_selfie: this.documentos.doc_psj_selfie,
          doc_psj_foto: this.documentos.doc_psj_foto,
          doc_psj_alteracao: this.documentos.doc_psj_alteracao,
          doc_psj_extra: this.documentos.doc_psj_extra,
          doc_psj_procuracao: this.documentos.doc_psj_procuracao,
        }

        const response = await AtualizaCadastro(this.$route.params.id, data)
        if (response === 'undefined' && response.status != 200) {
          this.mensagem(
              'erro',
              `Tipo do erro: ${response.error}, por favor inserir os documentos necessários ou tente novamente!.`,
              null,
              false
          );
        }
        this.mensagem('sucesso', `Documentos salvos com sucesso!`, 5000, true);
        localStorage.setItem('etapa', '')
        localStorage.setItem('doc_foto_verso', '')
      } catch (e) {
        this.mensagem('erro', `falta os anexos, por favor inserir os documentos necessários!`, null, false);
      }
    }
    ,
    mensagem(estilo, texto_msg, tempo_msg, libera_proximo) {
      this.estilo = estilo;
      this.msg = texto_msg;
      this.proximo = libera_proximo;
      this.tempo_msg = (tempo_msg == 0 || tempo_msg == null) ? this.tempo_msg = 3000 : this.tempo_msg = tempo_msg;
      setTimeout(() => {
        this.mostrar_msg = false;
      }, this.tempo_msg);
    }
    ,
    alertaDeRetorno(mostrar, estilo, icone, msg_alerta, tempo_msg) {
      this.mostrar_msg = mostrar;
      this.estiloDoAlerta = estilo;
      this.tipo_icone = icone;
      this.text_alerta = msg_alerta;
      this.tempo_msg = (tempo_msg == 0 || tempo_msg == null) ? this.tempo_msg = 2000 : this.tempo_msg = tempo_msg;
      setTimeout(() => {
        this.mostrar_msg = false;
      }, this.tempo_msg);
    }
    ,
    ehBarraEdicao() {
      return verificaRota()
    }
    ,
    tipo() {
      return tipoDeRota(this.bn_tipo_de_pessoa, 4)
    }
  },
  mounted() {
    this.getDadosSalvo();
    this.ehBarraEdicao();
    this.$route.params.id != null ? this.tituloCadastro = 'Editar Cadastro | Documentos' : this.tituloCadastro;
  }
}
</script>

<style scoped>
.none {
  display: none;
}

strong {
  margin: auto;
}

a {
  text-decoration: inherit !important;
}

a:hover > strong {
  color: var(--bd-primary);
  border-bottom: 2px solid var(--bd-primary);
}

input[type="file"] {
  display: none;
}

span {
  margin-left: 10px;
}

div span img {
  width: 24px !important;
}

.informacoes p > img {
  display: flex;
  flex-direction: column;
}

img.foto-frente-verso {
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: auto !important;
  height: 100px !important;
  border-radius: 5px;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.16);
  transition: all 0.3s;
}

img.foto-frente-verso:hover {
  transition: all 0.7s;
  cursor: zoom-in;
  transform: scale(3);
}

.link_img_frente_verso {
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 2px;
  color: var(--bd-primary)
}

#icone-volta {
  max-width: 30px;
  z-index: -1;
  margin-bottom: -33px;
}

.container {
  width: 100%;
  display: flex;
  margin-top: 5rem;
  height: 33rem;
  justify-content: center;
  align-items: center;
}

.box-lista {
  height: 255px;
  max-height: 280px;
  overflow-y: scroll;
  margin-top: 2rem;
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.conteudo-img {
  width: 70%;
  display: flex;
  font-weight: bold;
  flex-direction: column;
}

.check-anexo {
  margin: auto;
  margin-right: 45px;
  flex-direction: row;
  cursor: pointer;
  color: var(--bd-primary);
}

.img-span span {
  color: var(--bd-primary);
}

.img-span span:hover {
  color: var(--bd-primary-hover);
}

.lista {
  height: auto;
  width: 40%;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  z-index: 1;
}

.lista-box {
  border-bottom: 5px solid var(--bd-primary);
}

#checklist_dow {
  color: var(--bd-primary);
}

#checklist_dow:hover {
  color: var(--bd-primary-hover);
}

.nome_lista {
  position: absolute;
  margin-top: 2px;
  padding: 10px;
  width: 200px;
  max-width: 300px;
  overflow: hidden;
  background: var(--bd-primary);
  color: var(--color-base);
  border-radius: 5px;
  transition: all 1s ease;
}

.nome_lista:hover {
  background: black;
}

.doc_list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.doc_list > span.material-symbols-outlined {
  cursor: pointer;
}

.div-box img {
  height: 50px;
  width: 50px;
  object-fit: scale-down;
}

span.material-symbols-outlined {
  cursor: pointer;
}

.mensagem_doc {
  display: flex;
  justify-content: center;
}

.ver_nomes {
  opacity: 0;
  transition: 1s;
}

.ver_nomes:hover {
  opacity: 1;
  transition: 0.8s;
}

.img-span {
  font-size: 0.8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.img-span img {
  cursor: pointer;
}

.div-btn-delete {
  margin: 5px 0px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-apagar-todos {
  display: flex;
  width: 101%;
  justify-content: center;
  background-color: var(--bd-primary);
  color: var(--color-base);
  border-radius: 0 0px 24px 24px;
  padding: 5px;
  margin-top: -1rem;
  cursor: pointer;
}

.btn-apagar-todos:hover {
  transition: linear 0.5s;
  background: var(--bd-primary);
  color: var(--bd-geral-white) !important;
}

.conteudo-alert-excluido {
  width: 100%;
  display: flex;
  margin-top: 5rem;
  justify-content: flex-end;
  position: fixed;
  height: 122px;
  z-index: 5;
}

@media (max-width: 768px) and (min-width: 551px) {
  .btn-apagar-todos {
    width: 96%;
    margin: auto;
    margin-top: -15px;
  }

  .lista {
    width: auto;
  }

  .lista-box {
    width: 90%;
  }
}

@media (max-width: 551px) {
  .div-box {
    width: 90%;
    margin: auto;
  }

  .check-anexo {
    display: flex;
    margin-right: 0px;
    width: 100%;
    justify-content: center;
  }

  .container {
    width: 100%;
    display: flex;
    margin-top: 1rem;
    margin-bottom: 3rem;
    justify-content: center;
    align-items: flex-start;
  }

  .informacoes p {
    margin-right: 17px;
    padding: 20px;
  }

  .alinhar-txt {
    border-top: 1px solid #EBEFF2;
    margin: auto;
    margin-bottom: 15px;
    padding: 0px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
  }

  .alinhar-txt label {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  span {
    margin-left: 0px;
  }

  span.p {
    text-align: center;
    width: initial;
  }

  .btn-apagar-todos {
    margin: auto;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
    width: 92%;
  }

  .ajuste-botao {
    margin-bottom: 2rem;
  }

  .box-lista {
    margin-top: 10rem;
  }
}
</style>