export default class EnderecoUsuario {

    constructor(
        nm_cep = '',
        nm_nendereco = '',
        nm_endereco = '',
        nm_complemento = '',
        nm_bairro = '',
        nm_cidade = '',
        nm_estado = '',
        statusanexo_id = '',
        etapa = '',
    ){
        this.nm_cep= nm_cep
        this.nm_endereco = nm_endereco
        this.nm_complemento = nm_complemento
        this.nm_nendereco = nm_nendereco
        this.nm_bairro = nm_bairro
        this.nm_estado = nm_estado
        this.nm_cidade = nm_cidade
        this.statusanexo_id = statusanexo_id
        this.etapa = etapa
    }
}