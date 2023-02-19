import token from "@/services/authentction";
import mapaDeRotas from "@/router/caminho-urls";
import axios from "axios";

export async function validaCodigo(codigo, id) {
    const token_base = await token(), caminho = new mapaDeRotas(), config = {
        method: 'get',
        url: `${caminho.rota_api_sms_cod}${id}/codigo/${codigo}`,
        headers: {
            'authentction': token_base,
        }
    }, requisicao = await axios(config)
        .then(function (response) {
            return response.status != 201 ? new Error('não encontrou qualquer resultado dos dados enviado pelo api validação de token.') : response.data;
        })
        .catch(function (err) {
            console.log(err.message);
            return false;
        });

    return requisicao;
}

export async function reenviarCodigo(numero) {
    const token_base = await token(), caminho = new mapaDeRotas(), config = {
        method: 'get',
        url: `${caminho.rota_api_sms_cod_reenvia}/${numero}`,
        headers: {
            'authentction': token_base,
        }
    }, requisicao = await axios(config)
        .then(response => {
            return response.status != 201 ? new Error('não encontrou qualquer resultado dos dados enviado pelo api validação de token.') : response.data;
        })
        .catch(err => {
            console.log(err);
        });

    return requisicao;
}