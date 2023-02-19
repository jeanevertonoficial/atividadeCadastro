import caminhoGlobal from "@/router/caminho-global";

const rota_statica = new caminhoGlobal();

export default class mapaDeRotas {
    constructor(
        rota_api = `${rota_statica.rota_localhost}`,
        rota_api_get = `${rota_statica.rota_localhost}`,
        // rota_api = `${rota_statica.rota_api_base}/cadastro-usuario`,
        // rota_api_get = `${rota_statica.rota_api_base}/cadastro-usuario`,
        rota_procuracao = `${rota_statica.rota_s3_procuracao}`,
        rota_api_sms_cod = `${rota_statica.rota_api_sms_cod}`,
        rota_api_sms_cod_reenvia = `${rota_statica.rota_api_sms_cod_reenvia}`,
    ) {
        this.rota_api = rota_api;
        this.rota_api_get = rota_api_get;
        this.rota_procuracao = rota_procuracao;
        this.rota_api_sms_cod = rota_api_sms_cod;
        this.rota_api_sms_cod_reenvia = rota_api_sms_cod_reenvia;
    }
}
