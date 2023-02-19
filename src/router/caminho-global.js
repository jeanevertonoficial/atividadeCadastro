export default class caminhoGlobal {

    constructor(
        index= '/',
        index_error= '/error',
        codigo = '/codigo',
        index_juridico= '/',
        endereco = '/endereco',
        documentos= '/documentos',
        rota_erro_404 = '/error',
        rota_api_base = 'http://dev.giordanoleiloes.vlance-dev/usuario',
        rota_localhost = 'http://localhost:3000/Formulario',
        rota_api_sms_cod = 'http://dev.giordanoleiloes.vlance-dev/usuario/validar-sms/usuario_id/',
        rota_api_sms_cod_reenvia = 'http://dev.giordanoleiloes.vlance-dev/usuario/enviar-sms/celular/',
        rota_s3_procuracao = 'https://s3-sa-east-1.amazonaws.com/906de634c48fb7d34136160b4c353ae4/public/download/1633609020.pdf'
    ) {
        this.index = index;
        this.index_error = index_error;
        this.index_juridico = index_juridico;
        this.codigo = codigo;
        this.endereco = endereco;
        this.documentos = documentos;
        this.rota_erro_404 = rota_erro_404;
        this.rota_api_base = rota_api_base;
        this.rota_localhost = rota_localhost;
        this.rota_api_sms_cod = rota_api_sms_cod;
        this.rota_api_sms_cod_reenvia = rota_api_sms_cod_reenvia;
        this.rota_s3_procuracao = rota_s3_procuracao;
    }
}