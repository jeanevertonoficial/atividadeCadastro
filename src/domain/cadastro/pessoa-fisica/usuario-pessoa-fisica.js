export default class UsuarioPessoaFisica{

    constructor(
        bn_tipo_de_pessoa = 'pessoa_fisica',
        nm = '',
        nm_senha = '',
        nm_rgouie = '',
        nm_cpf = '',
        verifica_senha = '',
        nm_email = '',
        nm_email_confirmacao = '',
        nm_orgaoemissor = '',
        dt_datanascimento = '',
        nm_celular = '',
        nm_telefone = '',
        bn_sexo = '',
        nm_profissao = '',
        nm_pai = '',
        nm_mae = '',
        statusestadocivil_id = '',
        nm_conjuge = '',
        nm_rgconjuge = '',
        nm_cpfconjuge = '',
        nm_profissaoconjuge = '',
        nm_nacionalidadeconjuge = '',
        nm_orgaoemissorconjuge = '',
        statustipocasamento_id = '',
        dt_casamento = '',
        bn_aceite_condicao_de_venda = '',
        bn_politica_privacidade = '',
        codigo = '',
        etapa = '',
    ){
        this.bn_tipo_de_pessoa = bn_tipo_de_pessoa
        this.nm = nm
        this.nm_senha = nm_senha
        this.verifica_senha = verifica_senha
        this.nm_rgouie = nm_rgouie
        this.nm_cpf = nm_cpf
        this.nm_email = nm_email
        this.nm_email_confirmacao = nm_email_confirmacao
        this.nm_orgaoemissor = nm_orgaoemissor
        this.dt_datanascimento = dt_datanascimento
        this.nm_celular = nm_celular
        this.nm_telefone = nm_telefone
        this.nm_profissao = nm_profissao
        this.nm_pai = nm_pai
        this.nm_mae = nm_mae
        this.statusestadocivil_id = statusestadocivil_id
        this.nm_conjuge = nm_conjuge
        this.nm_rgconjuge = nm_rgconjuge
        this.nm_orgaoemissorconjuge = nm_orgaoemissorconjuge
        this.nm_cpfconjuge = nm_cpfconjuge
        this.bn_sexo = bn_sexo
        this.nm_profissaoconjuge = nm_profissaoconjuge
        this.nm_nacionalidadeconjuge = nm_nacionalidadeconjuge
        this.statustipocasamento_id = statustipocasamento_id
        this.dt_casamento = dt_casamento
        this.bn_aceite_condicao_de_venda = bn_aceite_condicao_de_venda
        this.bn_politica_privacidade = bn_politica_privacidade
        this.codigo = codigo
        this.etapa = etapa
    }
}
