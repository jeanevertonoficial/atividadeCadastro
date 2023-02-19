import mapaDeRotas from "@/router/caminho-urls";
import axios from "axios";
import token from "@/services/authentction";

export async function ConsultaUsuario(id) {
    const rota = new mapaDeRotas();
    try {
        const token_base = await token();
        if (id === undefined || id === null) {
            const config = {
                method: 'get',
                url: `${rota.rota_api}/`,
                headers: {
                    "content-Type": "multipart/form-data",
                    "Authorization": token_base
                },
            };
            const response = await axios(config);
            return response.data;
        } else {
            const config = {
                method: 'get',
                url: `${rota.rota_api_get}/${id}`,
                headers: {
                    "content-Type": "multipart/form-data",
                    "Authorization": token_base
                },
            };
            const response = await axios(config)
                .then(response => {
                    return response.data;
                })
                .catch(err => {
                    console.log(err);
                });
            return response;
            //  const response = await axios
            //      .post(config.url, config.data, config.method, config.headers)
            //      .then(response => response.data)
            //      .catch(error => console.error(error));
            // return response;
        }
    } catch (error) {
        console.error("Erro: " + error.message);
    }
}