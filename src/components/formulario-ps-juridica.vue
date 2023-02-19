<template>
  <vue-title :title="tituloCadastro"/>
  <div class="modal-comprovante none" id="modal-comprovante">
    <div class="container aletar-senha">
      <div class="div-codigo div-codigo-modal-altera">
        <div class="cont-form">
          <form method="post" @submit.prevent="alterarSenha($event)">
            <div class="divisoes-forms">
              <label for="nm_senha_atual">SENHA ATUAL</label>
              <input type="password"
                     id="nm_senha_atual"
                     @change="verificaSenhaAtual(nm_senha_atual), verificaCamposSenhas(dados.nm_senha_atual)"
                     v-model.trim="nm_senha_atual"
                     placeholder="Insira sua senha atual aqui"
                     tabindex="20">
              <strong style="font-size: small">
              <span v-show="nm_senha_atual_span"
                    :style="senha_atual_style">{{ texto_senha_atual }}</span>
              </strong>
            </div>
            <div class="divisoes-forms">
              <label for="nm_senha_atualiza">NOVA SENHA</label>
              <input type="password"
                     id="nm_senha_atualiza"
                     name="nm_senha_atualiza"
                     class="input-form"
                     placeholder="Insira sua senha"
                     @change="verificaSenha($event), verificaCamposSenhas(dados.nm_senha)"
                     v-model.trim="dados.nm_senha"
                     tabindex="21"
                     required>
              <strong style="font-size: small">
                <span id="password-status-altera"></span>
              </strong>
            </div>
            <div class="divisoes-forms">
              <label for="verifica_senha_atualiza">CONFIRMAR NOVA SENHA</label>
              <input type="password"
                     id="verifica_senha_atualiza"
                     name="verifica_senha_atualiza"
                     class="input-form"
                     placeholder="Confirme sua senha"
                     @change="comparaSenha(), verificaCamposSenhas(dados.verifica_senha)"
                     v-model.trim="dados.verifica_senha"
                     tabindex="22"
                     required>
              <strong style="font-size: small; color: red">
                <span v-show="comp_senha">senhas não confere</span>
                <span v-show="campo_obrigatorio">Campo é obrogatório</span>
              </strong>
            </div>
            <div class="botoes-valida-reenvia base-botoes-modal-altera">
              <button type="submit"
                      @click.prevent="alterarSenha($event)"
                      class="botao-modal-altera-senha altera-senha"
                      :disabled="senhaModalCompletadas"
                      :style="senhaModalErradaStyle"
                      tabindex="23"
              >ALTERAR
              </button>
              <button type="button"
                      class="botao-modal-altera-senha"
                      id="fechaModalAletacaoSenha"
                      tabindex="24">FECHAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <BarraPassos :nome_passo="ehBarraEdicao()"
               :situacao_um="situacaoatual"
               :posicao_um="posicao"
               :posicao_dois="posicao_dois"
               :posicao_tres="posicao_tres"
               :posicao_quatro="posicao_quatro"
               :posicao_cinco="posicao_cinco"/>

  <div class="container">
    <Mensagem :msg="msg" v-show="msg" :class="estilo"/>
  </div>
  <loading-dados v-show="loading"/>
  <div v-show="!loading" class="formulario-container">
    <div id="form_padrao">
      <form method="post" @submit.prevent="salvarFormularioSimples($event)">
        <div class="div-radio">
          <RadioCheck :ativa_tipo_de_pessoa="ativa_radio" :checked_juridico='true'/>
        </div>
        <div class="container">
          <div class="formulario-padrao">
            <div class="cont-form">
              <div class="divisoes-forms">
                <label for="nm_email">E-MAIL</label>
                <input type="nm_email"
                       id="nm_email"
                       name="nm_email"
                       v-model.trim="dados.nm_email"
                       class="input-form"
                       @change="verificaEmail(dados.nm_email), verificarEmailCadastrado(dados.nm_email)"
                       placeholder="Insira seu e-mail válido"
                       tabindex="1"
                       required>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
                <span v-show="val_email" style="font-size: small; color: red">
                  E-mail inválido, por favor insira um e-mail valido.
                </span>
                <span v-show="verifica_email" style="font-size: small; color: red">
                  E-mail já cadastrado, por favor insira um e-mail valido.
                </span>
              </div>

              <div class="divisoes-forms" v-if="!ehalteracao">
                <label for="nm_senha">SENHA</label>
                <input type="password"
                       id="nm_senha"
                       name="nm_senha"
                       class="input-form"
                       placeholder="Insira sua senha"
                       v-model.trim="dados.nm_senha"
                       @change="verificaSenha($event)"
                       tabindex="3"
                       required>
                <span id="password-status"></span>
              </div>

              <div class="divisoes-forms">
                <label for="nm">RAZÃO SOCIAL</label>
                <input type="text"
                       id="nm"
                       name="nm"
                       v-model.trim="dados.nm"
                       @change="verificaCamposInputs(dados.nm, $event)"
                       class="input-form"
                       placeholder="Digite a razão social..."
                       tabindex="5"
                       autocomplete="off"
                       required>
                <span id="nm_span" style="font-size: small; color: red"></span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
              </div>

              <div class="divisoes-forms">
                <label for="nm_contato">NOME DO RESPONSÁVEL</label>
                <input type="text"
                       id="nm_contato"
                       name="nm_contato"
                       v-model.trim="dados.nm_contato"
                       @change="verificaCamposInputs(dados.nm_contato, $event)"
                       class="input-form"
                       placeholder="Digite o nome do responsável"
                       tabindex="7"
                       required autocomplete="off">
                <span id="span_nm_contato" style="font-size: small; color: red"></span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
              </div>

              <div class="divisoes-forms">
                <label for="rg_responsavel">RG DO RESPONSÁVEL</label>
                <input type="tel"
                       id="rg_responsavel"
                       name="rg_responsavel"
                       v-model.trim="dados.nm_rgouie"
                       @change="verificaCamposInputs(dados.nm_rgouie, $event)"
                       class="input-form"
                       v-mask="'##.###.###-#'"
                       placeholder="Digite o rg do responsável"
                       tabindex="9"
                       required
                       autocomplete="off">
                <span id="span_nm_rg_responsavel" style="font-size: small; color: red"></span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
              </div>

              <div class="divisoes-forms">
                <label for="celular">CELULAR</label>
                <input type="tel"
                       id="celular"
                       name="celular"
                       v-model.trim="dados.nm_celular"
                       class="input-form"
                       v-mask="['(##) ####-####', '(##) #####-####']"
                       placeholder="Insira o número do celular"
                       tabindex="11"
                       required>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
              </div>
            </div>

          </div>
          <div class="formulario-padrao">
            <div class="divisoes-forms">
              <label for="nm_email_confirmacao">CONFIRMAÇÃO DO E-MAIL</label>
              <input type="email"
                     id="nm_email_confirmacao"
                     name="nm_email_confirmacao"
                     @change="comparaEmail()"
                     v-model.trim="dados.nm_email_confirmacao"
                     class="input-form"
                     placeholder="Insira seu e-mail novamente"
                     tabindex="2">
              <span v-show="comp_email" style="font-size: small; color: red">E-mails não confere</span>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
            </div>

            <div class="divisoes-forms" v-if="!ehalteracao">
              <label for="verifica_senha">CONFIRMAÇÃO DE SENHA</label>
              <input type="password"
                     id="verifica_senha"
                     name="verifica_senha"
                     class="input-form"
                     placeholder="confirme sua senha"
                     @change="comparaSenha()"
                     v-model.trim="dados.verifica_senha"
                     tabindex="4"
                     required>
              <span v-show="comp_senha" style="font-size: small; color: red">senhas não confere</span>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
            </div>

            <div class="divisoes-forms">
              <label for="nm_cpfoucnpj">CNPJ</label>
              <input type="tel"
                     id="nm_cpfoucnpj"
                     v-model.trim="dados.nm_cpfoucnpj"
                     v-mask="'##.###.###/####-##'"
                     name="nm_cpfoucnpj"
                     placeholder="Insira o CNPJ"
                     @change="validarCNPJ()"
                     tabindex="6"
                     required>
              <span v-show="comp_cnpj" style="font-size: small; color: red">CNPJ inválido, por favor insira um CNPJ
                valido.</span>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
            </div>

            <div class="divisoes-forms">
              <label for="nm_cpfcontato">CPF DO RESPONSÁVEL</label>
              <input type="tel"
                     id="nm_cpfcontato"
                     name="nm_cpfcontato"
                     v-model.trim="dados.nm_cpfcontato"
                     class="input-form"
                     v-mask="'###.###.###-##'"
                     placeholder="Insira CPF do responsável"
                     autocomplete="off"
                     title="Insira o número do seu CPF"
                     @change="validarCPF(dados.nm_cpfcontato, $event), vefiricaCPFExiste(dados.nm_cpfcontato)"
                     tabindex="8"
                     required>
              <span id="span_nm_cpfcontato" style="font-size: small; color: red"></span>
              <span v-show="cpf_existe" style="font-size: small; color: red">
                CPF já cadastrado, por favor verificar seu CPF
              </span>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrigatório</span>
            </div>

            <div class="divisoes-forms">
              <label for="nm_orgaoemissorcontato">ORGÃO EMISSOR</label>
              <input type="text"
                     id='nm_orgaoemissorcontato'
                     name="nm_orgaoemissorcontato"
                     v-model="dados.nm_orgaoemissorcontato"
                     class="input-form"
                     placeholder="Insira o orgão emissão"
                     tabindex="10">
            </div>

            <div class="divisoes-forms">
              <label for="nm_telefone">TELEFONE PARA CONTATO</label>
              <input type="tel"
                     id="nm_telefone"
                     name="nm_telefone"
                     v-mask="['(##) ####-####']"
                     v-model.trim="dados.nm_telefone"
                     class="input-form"
                     placeholder="número de telefone"
                     tabindex="12">
            </div>

            <div id="div-aceites" v-if="!ehalteracao">
              <div class="divisoes-aceite">
                <input type="checkbox"
                       id="bn_aceite_condicao_de_venda"
                       :title="titulo_condicao"
                       value="bn_aceite_condicao_de_venda"
                       name="bn_aceite_condicao_de_venda"
                       v-model="dados.bn_aceite_condicao_de_venda"
                       class="bn_aceite_condicao_de_venda"
                       tabindex="13"
                       required>
                <label for="bn_aceite_condicao_de_venda">Aceito os Termos e Condições</label>
              </div>
              <div class="divisoes-aceite">
                <input type="checkbox"
                       id="bn_politica_privacidade"
                       :title="titulo_politica"
                       value="bn_politica_privacidade"
                       name="bn_politica_privacidade"
                       v-model="dados.bn_politica_privacidade"
                       class="bn_politica_privacidade"
                       tabindex="14"
                       required>
                <label for="bn_politica_privacidade">Aceito os Termos de Privacidade</label>
              </div>
            </div>
          </div>
        </div>

        <div class="formulario-padrao divisoes-forms" v-show="alteraSenha">
          <div :title="primeiro_alterar_senha"
               class="botao botao-abre-modal"
               id="botao-altera-senha-modal">
            {{ btn_text_alterar_senha }}
          </div>
        </div>

        <Botao type="submit"
               :title="primeiro_passo"
               v-show="!proximo && ehalteracao"
               :btn_text="btn_text_alteracao"/>


        <router-link style="text-decoration: none"
                     v-show="ehalteracao"
                     :to="{ params: { id: this.id_user }, name: 'endereco_id' }">
          <Botao type="submit"
                 :title="proximo_passo"
                 v-show="proximo"
                 :btn_text="btn_continuar"/>
        </router-link>

        <Botao type="submit"
               :title="primeiro_passo"
               v-show="!ehalteracao && !proximo"
               :btn_text="btn_text"/>

        <div v-if="this.id_user != '' && this.id_user != 'undefiled'" v-show="!ehalteracao">
          <router-link style="text-decoration: none"
                       :to="{ params: {id: this.id_user} , name:'codigo_id'}">
            <Botao :titulo="proximo_passo"
                   type="submit"
                   v-show="proximo"
                   :btn_text="btn_continuar"/>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Botao from "@/components/shared/Botao";
import BarraPassos from "@/components/shared/BarraPassos";
import Mensagem from "@/components/shared/Mensagem";
import axios from "axios";
import vueTitle from "@/components/shared/vue-title";
import RadioCheck from "./shared/RadioCheck.vue";
import UsuarioPessoaJuridica from "@/domain/cadastro/pessoa-juridica/usuario-pessoa-juridica";
import caminhoGlobal from "@/router/caminho-global";
import mapaDeRotas from "@/router/caminho-urls";
import verificaForcaSenha from "@/domain/valida-senha-forte";
import {validadorCNPJ, VerificarTipoCPF} from "@/domain/validador-cpf-cnpj";
import {validadorEmail} from "@/domain/validador-email";
import ValidacaoForm from "@/domain/validacao-form";
import {salvarCadastro} from "@/controllers/salvar-cadastro";
import {AtualizaCadastro} from "@/controllers/atualiza-cadastro";
import {ConsultaUsuario} from "@/controllers/consulta-usuario";
import {verificaRota, verificaRotaNaoExiste} from "@/domain/verifica-rota";
import validacaoForm from "@/domain/validacao-form";
import LoadingDados from "@/components/shared/LoadingDados.vue";

export default {
  name: "Form-padrao",
  components: {
    LoadingDados,
    Botao,
    BarraPassos,
    Mensagem,
    RadioCheck,
    vueTitle,
  },
  props: {
    aceite: Boolean,
    id: String
  },
  data() {
    return {
      titulo_condicao: 'aceite dos temos de condição de vendas',
      titulo_politica: 'aceite das politicas de privacidade',
      primeiro_passo: 'concluir primeiro passo',
      proximo_passo: 'Ir para proximo etapa',
      btn_text: "CONCLUIR",
      btn_text_alteracao: "SALVAR ALTERAÇÃO",
      btn_continuar: "PRÓXIMA ETAPA",
      btn_text_alterar_senha: 'alterar senha',
      primeiro_alterar_senha: 'click aqui para alterar senha',
      ativa_radio: null,
      estilo: null,
      visivel: true,
      msg: null,
      checked: true,
      proximo: false,
      situacaoatual: 'active',
      posicao: '1',
      posicao_dois: '2',
      posicao_tres: '3',
      posicao_quatro: '4',
      posicao_cinco: '5',
      tamanho_auto: '',
      dados: new UsuarioPessoaJuridica(),
      rotas: new caminhoGlobal(),
      rota_url: new mapaDeRotas(),
      id_user: this.getConsultaUsuario(),
      campo_obrigatorio: false,
      cpf_invalido: false,
      cpf_principal_valida: false,
      comp_email: false,
      comp_senha: false,
      comp_cnpj: false,
      cpf_existe: false,
      val_email: false,
      verifica_email: false,
      login_existe: false,
      ehalteracao: false,
      alteraSenha: false,
      nm_senha_atual: '',
      nm_senha_atual_span: false,
      texto_senha_atual: '',
      senha_atual_style: '',
      senhaModalCompletadas: true,
      senhaModalErradaStyle: 'cursor: no-drop',
      tituloCadastro: 'cadastro',
      loading: false
    }
  },
  methods: {
    verificaSenha(e) {
      new verificaForcaSenha(e.target.id).verificaSenhaCadastro(this.dados.nm_senha)
    },
    async verificaSenhaAtual(atual) {
      this.nm_senha_atual = atual
      const verificacao = (this.nm_senha_atual === this.nm_senha_atualiza) ? true : false
      if (verificacao === false) {
        this.texto_senha_atual = `"${atual}", senha incorreta por favor insira uma senha valida`
        this.senha_atual_style = 'color: darkred'
        this.nm_senha_atual_span = true
      }
      if (verificacao === true) {
        this.texto_senha_atual = 'senha correta'
        this.senha_atual_style = 'color: darkgreen'
        this.nm_senha_atual_span = true
      }
      if (atual.length === "") {
        this.nm_senha_atual_span = false
      }
    },
    async getConsultaUsuario() {
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

        this.dados = response;

        if (this.$route.params.id) {
          this.ehalteracao = true;
          this.alteraSenha = true;
        }

      } catch (e) {
        this.loading = true;
        setTimeout(() => {
          console.log('Tipo do erro: ' + e.code)
          console.log('Erro Página não encontrada.')

          this.$router.push({name: 'NaoExiste'})
        }, 3000)
      }
    },
    verificaCamposSenhas(e) {
      if (this.nm_senha_atual != "" && new validacaoForm(e.target.id).validaPassword(this.nm_senha_atual) === true
          && this.dados.nm_senha != "" && new validacaoForm(e.target.id).validaPassword(this.dados.nm_senha) === true
          && this.dados.verifica_senha != "" && new validacaoForm(e.target.id).validaPassword(this.dados.verifica_senha) === true) {
        this.senhaModalErradaStyle = 'cursor: pointer';
        this.senhaModalCompletadas = false;
        return
      }
    },
    async alterarSenha(e) {
      e.preventDefault;

      const data = {
        nm_senha: this.dados.nm_senha,
        verifica_senha: this.dados.verifica_senha,
      }

      const response = await AtualizaCadastro(this.$route.params.id, data)

      if (response === 'undefined' && response.status != 200) {
        this.mensagem(
            'erro',
            `Tipo do erro: ${response.error}, Desculpe algo deu errado tente novamente.`,
            null,
            false
        );
      }
      this.mensagem(
          'sucesso',
          `Senha atualizada com sucesso!`,
          100,
          true
      )
      var fechaAuto = document.getElementById('modal-comprovante')
      fechaAuto.classList.add('none')
    },
    async salvarFormularioSimples(e) {
      e.preventDefault();
      if (!validadorEmail(this.dados.nm_email) && this.dados.nm_email) {
        this.proximo = false
        this.val_email = true
        setTimeout(() => {
          this.val_email = false
          this.dados.nm_email = null
        }, 5000)
      } else if (
          new validacaoForm(e.target.id).validaPassword(this.dados.nm_senha) === false
          && new validacaoForm(e.target.id).validaRg(this.dados.nm_rgouie) === false
          && new validacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_celular) === false
          && new validacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm) === false
          && new validacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_cpfoucnpj) === false
          && new validacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_email) === false
          && new validacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_email_confirmacao) === false
          && new validacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.bn_aceite_condicao_de_venda) === false
          && new validacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.bn_politica_privacidade) === false
      ) {
        this.proximo = false
        this.campo_obrigatorio = true
        setTimeout(() => {
          this.campo_obrigatorio = false;
        }, 5000)
      } else {
        this.campo_obrigatorio = false
        try {
          const data = {
            bn_tipo_de_pessoa: 'pessoa_juridica',
            nm: this.dados.nm,
            nm_contato: this.dados.nm_contato,
            nm_email: this.dados.nm_email,
            nm_email_confirmacao: this.dados.nm_email_confirmacao,
            nm_cpfoucnpj: this.dados.nm_cpfoucnpj,
            nm_cpfcontato: this.dados.nm_cpfcontato,
            nm_rgouie: this.dados.nm_rgouie,
            nm_orgaoemissorcontato: this.dados.nm_orgaoemissorcontato,
            nm_telefone: this.dados.nm_telefone,
            nm_celular: this.dados.nm_celular,
            nm_senha: this.dados.nm_senha,
            verifica_senha: this.dados.verifica_senha,
            bn_aceite_condicao_de_venda: this.dados.bn_aceite_condicao_de_venda,
            bn_politica_privacidade: this.dados.bn_politica_privacidade,
            etapa: 2,
            codigo: 123456
          }

          if (this.$route.params.id == null) {
            const response = await salvarCadastro(data)
            console.log(response)
            if (response === 'undefined' && response.status != 201) {
              this.mensagem(
                  'erro',
                  `Tipo do erro: ${response.error}, Desculpe algo deu errado atualize a página e tente novamente.`,
                  null,
                  false
              );
            }

            this.mensagem(
                'sucesso',
                `Cadastro realizado com sucesso!`,
                5000,
                true,
                2
            );
            this.id_user = response.id
            return

          } else {
            const response = await AtualizaCadastro(this.$route.params.id, data)
            this.tituloCadastro = 'editar cadastro | dados gerais'
            this.ativa_radio = 'disabled'

            if (response === 'undefined' && response.status != 200) {
              this.mensagem(
                  'erro',
                  `Tipo do erro: ${response.error}, Desculpe algo deu errado atualize a página e tente novamente.`,
                  null,
                  false
              );
            }

            this.mensagem(
                'sucesso',
                `Cadastro atualizado com sucesso!`,
                5000,
                true,
                2
            )
            this.id_user = response.id
            return
          }
        } catch (error) {
          this.campo_obrigatorio = true
          this.mensagem(
              'erro',
              `Tipo do erro: ${error.message}, Desculpe algo deu errado atualize a página e tente novamente.`,
              null,
              false
          );
        }
      }
    },
    verificaEmail(nm_email) {
      if (!validadorEmail(nm_email) && nm_email != "") {
        this.val_email = true
      } else {
        this.proximo = false
        this.val_email = false
      }
    },
    verificarEmailCadastrado(email) {
      axios
          .get(`${this.rota_url.rota_api_get}/?nm_email=${email}`)
          .then(response => {
            this.email_verificado = response.data
            if (this.email_verificado.length != 0) {
              this.proximo = false
              this.verifica_email = true
            }
          })
          .catch(error => {
            this.mensagem('erro', `Tipo do erro: ${error.message}, Falha ao tentar cadastrar email, caso não consiga reinicia a página.`, null, false)
          })
      this.verifica_email = false
      return
    },
    verificaCamposInputs(dados, e) {
      if (e.target.id == 'rg_responsavel') {
        new ValidacaoForm(e.target.id).validaRg(dados, 'span_nm_rg_responsavel')
      } else {
        new ValidacaoForm(e.target.id).validaCamposCadastroNomes(dados)
      }
    },
    validarCNPJ() {
      this.cnpj_limpo = this.dados.nm_cpfoucnpj.replace(/[^\d]+/g, '')
      if (!validadorCNPJ(this.cnpj_limpo)) {
        this.comp_cnpj = true
        this.proximo = false
        return
      }
      this.comp_cnpj = false
    },
    validarCPF(numero_cpf, e) {
      new VerificarTipoCPF(numero_cpf, e.target.id, this.dados.nm_cpfcontato)
    },
    vefiricaCPFExiste(cpf) {
      axios
          .get(`${this.url_base.rota_api_get}/?nm_cpf=${cpf}`)
          .then(response => {
            this.nm_cpf_verificado = response.data
            for (var i = 0; i < this.nm_cpf_verificado.length; i++) {
              if (this.nm_cpf_verificado[i]['nm_cpf'] == cpf) {
                this.proximo = false
                if (this.dados.nm_cpfcontato) {
                  this.cpf_existe = true
                }
              }
            }
          })
          .catch(error => {
            this.mensagem(
                'erro',
                `Tipo de erro: ${error.message}, Falha ao tentar cadastrar CPF, caso não consiga reinicia a página.`,
                null,
                false
            )
          })
      this.cpf_existe = false
    },
    comparaEmail() {
      this.comp_email = (this.dados.nm_email_confirmacao !== this.dados.nm_email) ? this.comp_email = true : this.comp_email = false
    },
    comparaSenha() {
      this.comp_senha = (this.dados.verifica_senha !== this.dados.nm_senha) ? this.comp_senha = true : this.comp_senha = false
    },
    mensagem(estilo, texto_msg, tempo_msg, libera_proximo, etapa) {
      this.estilo = estilo;
      this.msg = texto_msg;
      this.proximo = libera_proximo;
      (etapa != null || etapa != "") ? localStorage.setItem('etapa', etapa) : localStorage.getItem('etapa');
      this.tempo_msg = (tempo_msg == 0 || tempo_msg == null) ? this.tempo_msg = 3000 : this.tempo_msg = tempo_msg;
      setTimeout(() => {
        this.mostrar_msg = false
      }, this.tempo_msg);
    },
    ehBarraEdicao() {
      return verificaRota()
    }
  },
  mounted() {
    this.ehBarraEdicao()
    this.getConsultaUsuario()
    const fechaSenha = document.getElementById('fechaModalAletacaoSenha')
    fechaSenha.addEventListener('click', () => {
      const fechaModal = document.getElementById('modal-comprovante')
      fechaModal.classList.add('none')
    })

    const abreSenha = document.getElementById('botao-altera-senha-modal')
    abreSenha.addEventListener('click', () => {
      const abreSenhaModal = document.getElementById('modal-comprovante')
      abreSenhaModal.classList.remove('none')
    })

    return (this.$route.params.id != null) ? this.tituloCadastro = 'Editar Cadastro | Pessoa Jurídica' : this.tituloCadastro
  }
}
</script>

<style scoped>
.container {
  margin: auto;
  display: flex;
  justify-content: space-around;
}
</style>