export default class UsuarioPessoaJuridica {

    constructor(
        nm = '',
        nm_contato = '',
        razao_social = '',
        nm_email = '',
        nm_email_confirmacao = '',
        nm_cpfoucnpj= '',
        nm_cpfcontato= '',
        nm_rgouie = '',
        nm_orgaoemissorcontato = '',
        nm_telefone = '',
        nm_celular = '',
        nm_senha = '',
        verifica_senha = '',
        bn_politica_privacidade = '',
        bn_aceite_condicao_de_venda = '',
        codigo = '',
        bn_tipo_de_pessoa = 'pessoa_juridica',
        etapa = '',
        ) {
        this.bn_tipo_de_pessoa = bn_tipo_de_pessoa;
        this.nm_contato = nm_contato;
        this.nm = nm;
        this.razao_social = razao_social;
        this.nm_email = nm_email;
        this.nm_email_confirmacao = nm_email_confirmacao;
        this.nm_cpfoucnpj = nm_cpfoucnpj;
        this.nm_cpfcontato = nm_cpfcontato;
        this.nm_rgouie = nm_rgouie;
        this.nm_orgaoemissorcontato = nm_orgaoemissorcontato;
        this.nm_telefone = nm_telefone;
        this.nm_celular = nm_celular;
        this.nm_senha = nm_senha;
        this.verifica_senha= verifica_senha;
        this.bn_aceite_condicao_de_venda = bn_aceite_condicao_de_venda;
        this.bn_politica_privacidade = bn_politica_privacidade;
        this.codigo = codigo;
        this.etapa = etapa;
    }
}