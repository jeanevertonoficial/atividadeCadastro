import mapaDeRotas from "@/router/caminho-urls";
import axios from "axios";
import token from "@/services/authentction";

export async function AtualizaCadastro(id, dados) {
    const token_base = await token();
    const caminho = new mapaDeRotas();
    const config = {
        method: 'PATCH',
        url: `${caminho.rota_api_get}/${id}`,
        data: dados,
        headers: {
            "content-Type": "multipart/form-data",
            "Authorization": token_base
        }
    };
    // const requisicao = await axios(config)
    //     .then(response => {
    //         return response.status === 200 ? response.data : new Error('não encontrou qualquer resultado');
    //     })
    //     .catch(err => {
    //         console.log(new Error(`${err}, não encontrou qualquer resultado`));
    //     })
    // return requisicao;
    const response = await axios
        .patch(config.url, config.data, config.method, config.headers)
        .then(response => response.data)
        .catch(error => console.error(error));
    return response;
}