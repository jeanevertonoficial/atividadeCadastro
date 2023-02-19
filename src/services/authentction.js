import axios from "axios";

export default async function token(router) {
    try {
        const data = new FormData();
        data.append('email', 'leiloar@leiloesjudiciais.com.br');
        data.append('senha', '0nN$g00hH6Cx');
        const config = {
            method: 'post',
            url: 'http://teste.giordanoleiloes.com.br/usuario/gera-token',
            data: data,
        };
        const response = await axios(config);
        const ver = response.data.usuario.nm_statusliberacao
        const token = "Bearer " + response.data.token

        if (!ver == 'Liberado' && response.status != "200") {
            return router.push({name: 'NaoExiste'});
        }
        return token;
    } catch (error) {
        console.error(error.message)
    }
}

//https://cors-anywhere.herokuapp.com/