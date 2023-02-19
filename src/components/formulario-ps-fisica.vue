<template>
  <vue-title :title="tituloCadastro"/>
  <div class="modal-comprovante none" id="modal-comprovante">
    <div class="container aletar-senha">
      <div class="div-codigo div-codigo-modal-altera">
        <div class="cont-form">
          <form method="post" @submit.prevent="alterarSenha($event)">
            <div class="divisoes-forms">
              <label for="nm_senha_atual">SENHA ATUAL</label>
              <input type="password" id="nm_senha_atual"
                     @change="verificaSenhaAtual(nm_senha_atual), verificaCamposSenhas(dados.nm_senha_atual, $event)"
                     v-model.trim="nm_senha_atual"
                     placeholder="Insira sua senha atual aqui"
                     tabindex="20">
              <span v-show="nm_senha_atual_span" style="font-size: small"
                    :style="senha_atual_style">{{ texto_senha_atual }}</span>
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
              <span id="password-status-altera"></span>
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
              <span v-show="comp_senha" style="font-size: small; color: red">senhas não confere</span>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
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
      <form method="post" enctype="multipart/form-data" @submit.prevent="salvarFormularioSimples($event)">
        <div class="div-radio">
          <RadioCheck :ativa_tipo_de_pessoa="ativa_radio" :checked_fisico="true"/>
        </div>
        <div class="container">
          <div class="formulario-padrao">
            <div class="cont-form">

              <div class="divisoes-forms">
                <label for="nm_email">E-MAIL</label>
                <input type="email"
                       id="nm_email"
                       name="nm_email"
                       v-model.trim="dados.nm_email"
                       @change="verificaEmail(), verificarEmailCadastrado(dados.nm_email)"
                       class="input-form"
                       placeholder="Insira seu e-mail válido"
                       tabindex="1"
                       required>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrigatório</span>
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
                       minlength="6"
                       maxlength="40"
                       @change="verificaSenha($event)"
                       class="input-form" placeholder="Insira sua senha"
                       v-model.trim="dados.nm_senha"
                       tabindex="3"
                       required>
                <span id="password-status"></span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">
                  Campo deve conter no mínimo 6 caracteres
                </span>
              </div>
              <div class="divisoes-forms">
                <label for="nm">NOME</label>
                <input type="text"
                       id="nm"
                       name="nm"
                       @change="verificaCamposInputs(dados.nm, $event)"
                       v-model.trim="dados.nm"
                       class="input-form"
                       placeholder="Insira seu nome completo"
                       autocomplete="off"
                       tabindex="5"
                       required>
                <span id="nm_span" style="font-size: small; color: red"></span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
              </div>

              <div class="divisoes-forms">
                <label for="rg">RG</label>
                <input type="tel"
                       id="rg"
                       name="nm_rg"
                       @change="verificaCamposInputs(dados.nm_rgouie, $event)"
                       v-model.trim="dados.nm_rgouie"
                       class="input-form"
                       placeholder="Insira o numero do rg" v-mask="'##.###.###-#'" autocomplete="off" tabindex="7"
                       required>
                <span id="span_nm_rg" style="font-size: small; color: red"></span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
              </div>
              <div class="divisoes-forms">
                <label for="nm_cpf">CPF</label>
                <input type="tel"
                       id="nm_cpf"
                       name="nm_cpf"
                       v-model.trim="dados.nm_cpf"
                       class="input-form"
                       v-mask="'###.###.###-##'"
                       placeholder="Insira seu CPF"
                       autocomplete="off"
                       @change="validarCPF(dados.nm_cpf, $event), vefiricaCPFExiste(dados.nm_cpf)" tabindex="9"
                       required>
                <span id="cpf_principal_valida" style="font-size: small; color: red"></span>
                <span v-show="cpf_existe" style="font-size: small; color: red">
                  CPF já cadastrado, por favor verificar seu CPF
                </span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrigatório</span>
              </div>

              <div class="divisoes-forms">
                <label for="nm_celular">CELULAR</label>
                <input type="tel"
                       id="nm_celular"
                       name="nm_celular"
                       v-model.trim="dados.nm_celular"
                       class="input-form"
                       v-mask="['(##) ####-####', '(##) #####-####']"
                       placeholder="Insira o número do celular"
                       tabindex="11"
                       required>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrigatório</span>
              </div>

              <div class="divisoes-forms">
                <label for="nm_pai">NOME DO PAI</label>
                <input type="text"
                       id="nm_pai"
                       name="nm_pai"
                       v-model.trim="dados.nm_pai"
                       @change="verificaCamposInputs(dados.nm_pai, $event)"
                       class="input-form"
                       placeholder="Insira nome do seu pai"
                       autocomplete="off"
                       tabindex="13"
                       required>
                <span id="span_nm_pai" style="font-size: small; color: red"></span>
                <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
              </div>

              <div class="divisoes-forms">
                <label for="bn_sexo">SEXO</label>
                <select id="bn_sexo"
                        name="bn_sexo"
                        v-model.trim="dados.bn_sexo"
                        v-on:select="sexos"
                        tabindex="15"
                        required>
                  <option v-for="sexo in sexos"
                          :key="sexo.id"
                          :selected="sexo.selected"
                          :hidden="sexo.hidden"
                          :disabled="sexo.disabled"
                          :value="sexo.tipo">
                    {{ sexo.sexo_user }}
                  </option>
                </select>
              </div>

            </div>
          </div>

          <div class="formulario-padrao">
            <div class="divisoes-forms">
              <label for="nm_email_confirmacao">CONFIRMAÇÃO DO E-MAIL</label>
              <input type="email"
                     id="nm_email_confirmacao"
                     name="nm_email_confirmacao"
                     v-model.trim="dados.nm_email_confirmacao"
                     @change="comparaEmail()"
                     class="input-form"
                     placeholder="Insira seu e-mail novamente"
                     tabindex="2"
                     required>
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
              <span v-show="comp_senha" style="font-size: small; color: red">Senhas não confere</span>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
            </div>

            <div class="divisoes-forms">
              <label for="dt_datanascimento">DATA DE NASCIMENTO</label>
              <input id="dt_datanascimento"
                     type="date"
                     @change.prevent="verificaIdade($event)"
                     v-model="dados.dt_datanascimento"
                     name="dt_datanascimento"
                     placeholder="dd/mm/aaaa"
                     tabindex="6"
                     required>
              <span v-show="verificaMaiorDeIdade" style="font-size: small; color: red">{{ texto_ref_idade }}</span>
            </div>

            <div class="divisoes-forms">
              <label for="orgao_emissao">ORGÃO EMISSOR</label>
              <input type="text"
                     id='orgao_emissao'
                     name="orgao_emissao"
                     v-model="dados.nm_orgaoemissor"
                     class="input-form"
                     placeholder="Insira o orgão emissão"
                     tabindex="8">
            </div>

            <div class="divisoes-forms">
              <label for="nm_profissao">PROFISSÃO</label>
              <input type="search"
                     id="nm_profissao"
                     name="nm_profissao"
                     v-model.trim="dados.nm_profissao"
                     class="input-form"
                     placeholder="Insira sua profissão atual"
                     tabindex="10">
              <span id="tipo_profissoes"></span>

            </div>

            <div class="divisoes-forms">
              <label for="nm_telefone">TELEFONE PARA CONTATO</label>
              <input type="tel"
                     id="nm_telefone"
                     name="nm_telefone"
                     v-model.trim="dados.nm_telefone"
                     class="input-form"
                     v-mask="['(##) ####-####']"
                     placeholder="número de telefone"
                     tabindex="12"
                     required>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
            </div>

            <div class="divisoes-forms">
              <label for="profissao">NOME DA MÃE</label>
              <input type="text"
                     id="nm_mae"
                     name="nm_mae"
                     v-model.trim="dados.nm_mae"
                     class="input-form"
                     @change="verificaCamposInputs(dados.nm_mae, $event)"
                     placeholder="Insira nome da sua mãe"
                     tabindex="14"
                     required>
              <span id="span_nm_mae" style="font-size: small; color: red"></span>
              <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
            </div>

            <div class="divisoes-forms">
              <label for="statusestadocivil_id">ESTADO CIVIL</label>
              <select name="statusestadocivil_id"
                      v-model="dados.statusestadocivil_id"
                      v-on:select="estado_civies"
                      id="statusestadocivil_id"
                      tabindex="16">
                <option v-for="e_civil in estado_civies"
                        :selected="e_civil.selected"
                        :hidden="e_civil.hidden"
                        :disabled="e_civil.disabled"
                        :key="e_civil.id"
                        :value="e_civil.tipo">
                  {{ e_civil.estado_ci }}
                </option>
              </select>
            </div>

            <div id="div-aceites" v-if="!ehalteracao">
              <div class="divisoes-aceite">
                <input type="checkbox"
                       id="bn_aceite_condicao_de_venda"
                       :title="titulo_condicao"
                       value="bn_aceite_condicao_de_venda"
                       name="bn_aceite_condicao_de_venda"
                       v-model="dados.bn_aceite_condicao_de_venda"
                       class="ac_condicoes"
                       tabindex="25" required>
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
                       tabindex="26"
                       required>
                <label for="bn_politica_privacidade">Aceito os Termos de Privacidade</label>
              </div>
            </div>
          </div>

          <div class="formulario-padrao" v-if="dados.statusestadocivil_id == 'casado'">
            <div class="form_casado" v-show="visivel">
              <form>
                <div class="cont-form-casado">
                  <div class="divisoes-forms-casado">
                    <label for="nm_conjuge">NOME DO CÔNJUGE</label>
                    <input type="text"
                           id="nm_conjuge"
                           name="nm_conjuge"
                           v-model="dados.nm_conjuge"
                           @change="verificaCamposInputs(dados.nm_conjuge, $event)"
                           class="input-form"
                           placeholder="Insira o nome completo"
                           tabindex="17"
                           required>
                    <span id="span_nm_conjuge" style="font-size: small; color: red"></span>
                    <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
                  </div>

                  <div class="div-divisao-rg-orgao">
                    <div class="divisoes-forms-casado rg">
                      <label for="nm_rgconjuge">RG DO CÔNJUGE</label>
                      <input type="tel"
                             id='nm_rgconjuge'
                             name="nm_rgconjuge"
                             v-model="dados.nm_rgconjuge"
                             @change="verificaCamposInputs(dados.nm_rgconjuge, $event)"
                             class="input-form"
                             v-mask="'##.###.###-#'"
                             placeholder="Insira RG do cônjuge"
                             tabindex="18"
                             required>
                      <span id="span_rg_conjuge" style="font-size: small; color: red"></span>
                      <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
                    </div>

                    <div class="divisoes-forms-casado or">
                      <label for="nm_orgaoemissorconjuge">ORGÃO EMISSOR</label>
                      <input type="text"
                             id='nm_orgaoemissorconjuge'
                             name="nm_orgaoemissorconjuge"
                             v-model="dados.nm_orgaoemissorconjuge"
                             class="input-form"
                             placeholder="Insira o orgão emissão"
                             tabindex="19">
                    </div>
                  </div>

                  <div class="divisoes-forms-casado">
                    <label for="nm_cpfconjuge">CPF DO CÔNJUGE</label>
                    <input type="tel"
                           id="nm_cpfconjuge"
                           name="nm_cpfconjuge"
                           v-model="dados.nm_cpfconjuge"
                           class="input-form"
                           v-mask="'###.###.###-##'"
                           placeholder="Insira o CPF do cônjuge"
                           @change="validarCPF(dados.nm_cpfconjuge, $event), vefiricaCPFExiste(dados.nm_cpfconjuge)"
                           tabindex="20"
                           required>
                    <span id="cpf_invalido_conjuge" style="font-size: small; color: red"></span>
                    <span v-show="cpf_existe_conj" style="font-size: small; color: red">
                      CPF já cadastrado, por favor verificar CPF
                    </span>
                    <span v-show="campo_obrigatorio" style="font-size: small; color: red">Campo é obrogatório</span>
                  </div>

                  <div class="divisoes-forms-casado">
                    <label for="nm_profissaoconjugeuge">PROFISSÃO DO CÔNJUGE</label>
                    <input type="text"
                           id="nm_profissaoconjugeuge"
                           name="nm_profissaoconjugeuge"
                           v-model="dados.nm_profissaoconjuge"
                           class="input-form"
                           placeholder="Insira a profissão do cônjuge"
                           tabindex="21">
                  </div>
                  <div class="divisoes-forms-casado">
                    <label for="nm_nacionalidadeconjuge">NASCIONALIDADE DO CÔNJUGE</label>
                    <input type="text"
                           id="nm_nacionalidadeconjuge"
                           name="nm_nacionalidadeconjuge"
                           v-model="dados.nm_nacionalidadeconjuge"
                           class="input-form"
                           placeholder="Insira a nascionalidade do cônjuge"
                           tabindex="22">
                  </div>

                  <div class="divisoes-forms-casado">
                    <label for="statustipocasamento_id">REGIME DO CASAMENTO</label>
                    <select id="statustipocasamento_id"
                            name="statustipocasamento_id"
                            v-model.trim="dados.statustipocasamento_id"
                            v-on:select="tipo_de_regime"
                            tabindex="23"
                            required>
                      <option v-for="regime in tipo_de_regime"
                              :key="regime.id"
                              :disabled="regime.disabled"
                              :selected="regime.selected"
                              :hidden="regime.hidden"
                              :value="regime.tipo">
                        {{ regime.tipo_regime }}
                      </option>
                    </select>
                  </div>

                  <div class="divisoes-forms-casado">
                    <label for="dt_casamento">DATA DO CASAMENTO</label>
                    <input type="date" id="dt_casamento"
                           v-model="dados.dt_casamento"
                           name="dt_casamento"
                           placeholder="dd/mm/aaaa"
                           tabindex="24"
                           required>
                  </div>
                </div>
              </form>

              <div class="botoes-view-ocul">
                <div id="icone-ocul" @click="visivel = !visivel">
                  <span class="material-symbols-outlined">visibility_off</span>
                  ocultar
                </div>
              </div>
            </div>

            <div class="botoes-view-ocul">
              <div id="icone-view" @click="visivel = !visivel">
                <span class="material-symbols-outlined">visibility</span>
                view
              </div>
            </div>
          </div>
        </div>

        <div class="formulario-padrao divisoes-forms" v-show="ehalteracao">
          <div :title="primeiro_alterar_senha"
               class="botao botao-abre-modal" id="botao-altera-senha-modal">{{ btn_text_alterar_senha }}
          </div>
        </div>

        <Botao type="submit"
               :title="primeiro_passo"
               v-show="!proximo && ehalteracao"
               :btn_text="btn_text_alteracao"/>

        <router-link style="text-decoration: none" v-show="ehalteracao"
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
          <router-link style="text-decoration: none" :to="{ params: { id: this.id_user }, name: 'codigo_id' }">
            <Botao type="submit"
                   :title="proximo_passo"
                   v-show="proximo"
                   :btn_text="btn_continuar"/>
          </router-link>
        </div>

      </form>
    </div>
  </div>
</template>
<script>

import vueTitle from "@/components/shared/vue-title";
import Botao from "@/components/shared/Botao";
import BarraPassos from "@/components/shared/BarraPassos";
import Mensagem from "@/components/shared/Mensagem";
import RadioCheck from "@/components/shared/RadioCheck";
import axios from "axios";
import UsuarioPessoaFisica from "@/domain/cadastro/pessoa-fisica/usuario-pessoa-fisica";
import caminhoGlobal from "@/router/caminho-global";
import mapaDeRotas from "@/router/caminho-urls";
import ValidacaoForm from "@/domain/validacao-form";
import verificaForcaSenha from "@/domain/valida-senha-forte";
import {validadorEmail} from "@/domain/validador-email";
import {VerificarTipoCPF} from "@/domain/validador-cpf-cnpj";
import {salvarCadastro} from "@/controllers/salvar-cadastro";
import {AtualizaCadastro} from "@/controllers/atualiza-cadastro";
import {ConsultaUsuario} from "@/controllers/consulta-usuario";
import {verificaRota, verificaRotaNaoExiste} from "@/domain/verifica-rota";
import LoadingDados from "@/components/shared/LoadingDados.vue";

export default {
  name: "Form-padrao",
  components: {
    LoadingDados,
    RadioCheck,
    Botao,
    BarraPassos,
    Mensagem,
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
      ativa_radio: null,
      estilo: null,
      comp_email: false,
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

      //preenchando os selectedOptions
      estado_civies: [
        {estado_ci: 'selecione seu estado civil', disabled: true, selected: true, hidden: true},
        {estado_ci: 'Solteiro(a)', tipo: 'solteiro'},
        {estado_ci: 'Casado(a)', tipo: 'casado'},
        {estado_ci: 'Divorciado(a)', tipo: 'divorciado'},
        {estado_ci: 'Viúvo(a)', tipo: 'viuvo'},
        {estado_ci: 'Separado Judicialmente', tipo: 'separado'},
        {estado_ci: 'União Estável', tipo: 'uniao_estavel'},
      ],

      sexos: [
        {sexo_user: 'selecione seu sexo', disabled: true, selected: true, hidden: true},
        {sexo_user: 'Feminino', tipo: 'feminino'},
        {sexo_user: 'Masculino', tipo: 'masculino'},
      ],

      tipo_de_regime: [
        {tipo_regime: 'selecione tipo de regime', disabled: true, selected: true, hidden: true},
        {tipo_regime: 'Comunhão parcial de bens', tipo: 'comunhão parcial de bens'},
        {tipo_regime: 'Comunhão universal de bens', tipo: 'Comunhão universal de bens'},
        {tipo_regime: 'Separação de bens', tipo: 'Separação de bens'}
      ],
      dados: new UsuarioPessoaFisica(),
      id_user: this.getConsultaUsuario(),
      //validacoes
      campo_obrigatorio: false,
      cpf_invalido: false,
      cpf_principal_valida: false,
      cpf_existe: false,
      cpf_existe_conj: false,
      val_email: false,
      comp_senha: false,
      verifica_email: false,
      login_existe: false,
      rotas: new caminhoGlobal().index,
      url_base: new mapaDeRotas(),
      alteraSenha: false,
      ehalteracao: false,
      nm_senha_atual: '',
      nm_senha_atual_span: false,
      texto_senha_atual: '',
      senha_atual_style: '',
      senhaModalCompletadas: true,
      senhaModalErradaStyle: 'cursor: no-drop',
      btn_text_alterar_senha: 'alterar senha',
      primeiro_alterar_senha: 'click aqui para alterar senha',
      verificaMaiorDeIdade: false,
      texto_ref_idade: '',
      tituloCadastro: 'cadastro',
      filtro: '',
      loading: false
    }
  },
  methods: {
    verificaSenha(e) {
      new verificaForcaSenha(e.target.id).verificaSenhaCadastro(this.dados.nm_senha)
    },
    verificaIdade(e) {
      if (new ValidacaoForm(e.target.id).verificaMaiorIdade(this.dados.dt_datanascimento) === false) {
        this.verificaMaiorDeIdade = true
        this.texto_ref_idade = 'idade inválida, necessário ser maior de idade'
        this.proximo = false
      } else {
        this.texto_ref_idade = ''
        this.verificaMaiorDeIdade = false
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
    async verificaSenhaAtual(atual) {
      this.nm_senha_atual = atual
      const verificacao = (this.nm_senha_atual === this.dados.nm_senha) ? true : false
      if (verificacao === false) {
        this.texto_senha_atual = atual + ", senha incorreta por favor insira uma senha valida";
        this.senha_atual_style = 'color: darkred';
        this.nm_senha_atual_span = true;
        return
      }
      if (verificacao === true) {
        this.texto_senha_atual = 'senha correta';
        this.senha_atual_style = 'color: darkgreen';
        this.nm_senha_atual_span = true;
      }
      if (atual.length == "") {
        this.nm_senha_atual_span = false;
      }
    },
    verificaCamposSenhas(e) {
      if (this.nm_senha_atual != "" && new ValidacaoForm(e.target.id).validaPassword(this.nm_senha_atual) === true
          && this.dados.nm_senha != "" && new ValidacaoForm(e.target.id).validaPassword(this.dados.nm_senha) === true
          && this.dados.verifica_senha != "" && new ValidacaoForm(e.target.id).validaPassword(this.dados.verifica_senha) === true) {
        this.senhaModalErradaStyle = 'cursor: pointer'
        this.senhaModalCompletadas = false;
        return
      }
    },
    verificaCamposInputs(dados, e) {
      if (e.target.id === 'rg') {
        new ValidacaoForm(e.target.id).validaRg(dados, 'span_nm_rg')
      } else if (e.target.id === 'nm_rgconjuge') {
        new ValidacaoForm(e.target.id).validaRg(dados, 'span_rg_conjuge')
      } else {
        new ValidacaoForm(e.target.id).validaCamposCadastroNomes(dados)
      }
    },
    async alterarSenha(e) {
      e.preventDefault;

      const data = {
        nm_senha: this.dados.nm_senha,
        verifica_senha: this.dados.verifica_senha,
      }

      const response = await AtualizaCadastro(this.$route.params.id, data)
      this.ativa_radio = 'disabled'
      if (response === undefined && response.status != 200) {
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
          false
      )
      var fechaauto = document.getElementById('modal-comprovante')
      fechaauto.classList.add('none')
    }
    ,
    async salvarFormularioSimples(e) {
      e.preventDefault();
      if (!validadorEmail(this.dados.nm_email) && this.dados.nm_email) {
        this.proximo = false
        this.val_email = true
        setTimeout(() => {
          this.val_email = false
          this.dados.email = null
        }, 5000)
      } else if (
          // garantindo que não salve caso alguma dessas condições seja bool=false
          new ValidacaoForm(e.target.id).validaPassword(this.dados.nm_senha) === false
          || new ValidacaoForm(e.target.id).validaRg(this.dados.nm_rgouie) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_celular) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_cpf) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_rgouie) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.bn_sexo) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.bn_politica_privacidade) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.bn_aceite_condicao_de_venda) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_email) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.nm_email_confirmacao) === false
          || new ValidacaoForm(e.target.id).validaCamposCadastroNomes(this.dados.statusestadocivil_id) === false
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
            bn_tipo_de_pessoa: 'pessoa_fisica',
            nm: this.dados.nm,
            nm_senha: this.dados.nm_senha,
            verifica_senha: this.dados.verifica_senha,
            bn_sexo: this.dados.bn_sexo,
            nm_rgouie: this.dados.nm_rgouie,
            nm_cpf: this.dados.nm_cpf,
            nm_email: this.dados.nm_email,
            nm_email_confirmacao: this.dados.nm_email_confirmacao,
            dt_datanascimento: this.dados.dt_datanascimento,
            nm_orgaoemissor: this.dados.nm_orgaoemissor,
            nm_celular: this.dados.nm_celular,
            nm_telefoneado: this.dados.nm_telefone,
            nm_profissao: this.dados.nm_profissao,
            nm_pai: this.dados.nm_pai,
            nm_mae: this.dados.nm_mae,
            statusestadocivil_id: this.dados.statusestadocivil_id,
            nm_conjuge: this.dados.nm_conjuge,
            nm_rgconjuge: this.dados.nm_rgconjuge,
            nm_orgaoemissorconjuge: this.dados.nm_orgaoemissorconjuge,
            nm_cpfconjuge: this.dados.nm_cpfconjuge,
            nm_profissaoconjuge: this.dados.nm_profissaoconjuge,
            nm_nacionalidadeconjuge: this.dados.nm_nacionalidadeconjuge,
            statustipocasamento_id: this.dados.statustipocasamento_id,
            dt_casamento: this.dados.dt_casamento,
            bn_aceite_condicao_de_venda: this.dados.bn_aceite_condicao_de_venda,
            bn_politica_privacidade: this.dados.bn_politica_privacidade,
            codigo: 123456
          }

          if (this.$route.params.id == null) {
            const response = await salvarCadastro(data)
            this.ativa_radio = 'disabled'
            if (response === undefined && response.status != 201) {
              this.mensagem(
                  'erro',
                  `tipo do erro: ${response.error}, Desculpe algo deu errado atualize a página e tente novamente.`,
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

            return this.id_user = response

          } else {
            const response = await AtualizaCadastro(this.$route.params.id, data)
            if (response === undefined && response.status != 200) {
              this.mensagem(
                  'erro',
                  `tipo do erro: ${response.error}, Desculpe algo deu errado atualize a página e tente novamente.`,
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
            );

            return this.id_user = response.id

          }
        } catch (error) {
          this.campo_obrigatorio = true
          this.mensagem(
              'erro',
              `Tipo de erro: ${error.message}, Desculpe algo deu errado atualize a página e tente novamente.`,
              null,
              false
          );
        }
      }
    }
    ,
    validarCPF(numero_cpf, e) {
      if (e.target.id == 'nm_cpfconjuge') {
        new VerificarTipoCPF(numero_cpf, e.target.id, this.dados.nm_cpfconjuge)
      } else {
        new VerificarTipoCPF(numero_cpf, e.target.id, this.dados.nm_cpf)
      }
    },
    vefiricaCPFExiste(cpf) {
      axios
          .get(`${this.url_base.rota_api_get}/?nm_cpf=${cpf}`)
          .then(response => {
            this.nm_cpf_verificado = response.data
            for (var i = 0; i < this.nm_cpf_verificado.length; i++) {
              if (this.nm_cpf_verificado[i]['nm_cpf'] == cpf || this.nm_cpf_verificado[i]['nm_cpfconjuge'] == cpf) {
                this.proximo = false
                if (this.dados.nm_cpf) {
                  this.cpf_existe = true
                } else {
                  this.cpf_existe_conj = true
                }
              }
            }
          })
          .catch(error => {
            this.mensagem(
                'erro', `Tipo de erro: ${error.message}, Falha ao tentar cadastrar CPF, caso não consiga reinicia a página.`,
                null,
                false
            );
          })
      this.cpf_existe_conj = false
      this.cpf_existe = false
    }
    ,
    verificaEmail() {
      if (!validadorEmail(this.dados.nm_email) && this.dados.nm_email != "") {
        this.val_email = true
      } else {
        this.proximo = false
        this.val_email = false
      }
    }
    ,
    verificarEmailCadastrado(email) {
      axios
          .get(`${this.url_base.rota_api_get}/?nm_email=${email}`)
          .then(response => {
            this.email_verificado = response.data
            if (this.email_verificado.length != 0) {
              this.proximo = false
              this.verifica_email = true
            }
          })
          .catch(error => {
            this.mensagem(
                'erro', `tipo de erro: ${error.message}, Falha ao tentar cadastrar email.`,
                null,
                false
            );
          })
      this.verifica_email = false;
      return
    }
    ,
    comparaEmail() {
      this.comp_email = (this.dados.nm_email_confirmacao !== this.dados.nm_email) ? this.comp_email = true : this.comp_email = false;
    }
    ,
    comparaSenha() {
      this.comp_senha = (this.dados.verifica_senha !== this.dados.nm_senha) ? this.comp_senha = true : this.comp_senha = false;
    }
    ,
    mensagem(estilo, texto_msg, tempo_msg, libera_proximo, etapa) {
      this.estilo = estilo;
      this.msg = texto_msg;
      this.proximo = libera_proximo;
      (etapa != null || etapa != "") ? localStorage.setItem('etapa', etapa) : localStorage.getItem('etapa');
      this.tempo_msg = (tempo_msg == 0 || tempo_msg == null) ? this.tempo_msg = 3000 : this.tempo_msg = tempo_msg;
      setTimeout(() => {
        this.mostrar_msg = false;
      }, this.tempo_msg);
    }
    ,
    ehBarraEdicao() {
      return verificaRota()
    }
  },
  mounted() {
    this.getConsultaUsuario();
    this.ehBarraEdicao();

    const fechaSenha = document.getElementById('fechaModalAletacaoSenha')
    fechaSenha.addEventListener('click', () => {
      const fechaModal = document.getElementById('modal-comprovante')
      fechaModal.classList.add('none');
    })

    const abreSenha = document.getElementById('botao-altera-senha-modal')
    abreSenha.addEventListener('click', () => {
      const abreSenhaModal = document.getElementById('modal-comprovante')
      abreSenhaModal.classList.remove('none');
    })

    return (this.$route.params.id != null) ? this.tituloCadastro = 'Editar Cadastro | Pessoa Física' : this.tituloCadastro;
  },
}
</script>

<style scoped>
.container {
  margin: auto;
  display: flex;
  justify-content: space-around;
}
</style>