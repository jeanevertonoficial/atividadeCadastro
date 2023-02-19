import mapaDeRotas from "@/router/caminho-urls";
import axios from 'axios';
import token from "@/services/authentction";

export async function salvarCadastro(dados) {
    const token_base = await token();
    const caminho = new mapaDeRotas();

    const config = {
        method: "POST",
        url: `${caminho.rota_api}`,
        data: dados,
        headers: {
            "content-Type": "multipart/form-data",
            "Authorization": token_base,
        },
    };
    // const requisicao = await axios(config)
    //     .then(response => {
    //         return response.data;
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // return requisicao;
     const response = await axios
         .post(config.url, config.data, config.method, config.headers)
         .then(response => response.data)
         .catch(error => console.error(error));
    return response;
}

// link para autorizar acesso api https://cors-anywhere.herokuapp.com/corsdemo