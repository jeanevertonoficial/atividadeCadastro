class ValidacaoForm {

    constructor(id_input) {
        if (id_input == 'nm') {
            this.id_input = 'nm_span';
        } else if (id_input == 'nm_pai') {
            this.id_input = 'span_nm_pai';
        } else if (id_input == 'nm_mae') {
            this.id_input = 'span_nm_mae';
        } else if (id_input == 'nm_conjuge') {
            this.id_input = 'span_nm_conjuge';
        } else if (id_input == 'rg_responsavel') {
            this.id_input = 'span_nm_rg_responsavel';
        } else if (id_input == 'nm_contato') {
            this.id_input = 'span_nm_contato';
        } else if (id_input == 'nm_cpfcontato') {
            this.id_input = 'span_nm_cpfcontato';
        }
    }

    validaPassword(password) {
        if (password.length < 6 || password == null) {
            return false;
        }
        return true;
    }

    validaRg(rg, tipo) {
        var camposReportRG = document.getElementById(`${tipo}`);
        console.log(tipo)
        camposReportRG.style.fontSize = '12px';
        camposReportRG.style.color = 'red';

        if (rg.length == "") {
            camposReportRG.innerHTML = '';
            return false;
        } else if (rg.length < 12 || rg == null) {
            camposReportRG.innerHTML = 'mínimo de caracteres não atingido, necessário 9 números';
            return false;
        } else {
            camposReportRG.innerHTML = '';
            return true;
        }
    }

    validaCamposCadastroNomes(campos) {
        var camposReport = document.getElementById(`${this.id_input}`);
        camposReport.style.fontSize = '12px';
        camposReport.style.color = 'red';
        if (campos.length < 4) {
            camposReport.innerHTML = 'mínimo de caracteres não atingido, necessário 4 caracteres';
            return false;
        } else if (campos == null || campos == undefined) {
            camposReport.innerHTML = 'Por favor tente novamente, caso de dúvidas entre em contato.';
            return false;
        } else {
            camposReport.innerHTML = '';
            return true;
        }

    }

    verificaMaiorIdade(idade) {
        const dataAtual = new Date().getUTCFullYear();
        const idadeLimpa = (idade.split('-', '1'));
        const ehMaior = (dataAtual - idadeLimpa);
        const ehMaiorValidado = ehMaior >= 18 && ehMaior < 110 ? true : false;

        return ehMaiorValidado;
    }

    estiloPosCod() {
        const estale = document.querySelector('#codigo_conf');
        if (estale.value.length != 0) {
            estale.addEventListener('keyup', () => {
                estale.classList.add('pos-cod');
            });
        } else if (estale.value == "") {
            estale.addEventListener('change', () => {
                estale.classList.remove('pos-cod');
            });
        }
    }
}
export default ValidacaoForm