export default class verificaForcaSenha {
    constructor(id_input) {
        this.numeros = /([0-9])/;
        this.alfabeto = /([a-zA-Z])/;
        this.chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<,.,])/;
        this.id_input = (id_input == 'nm_senha') ? 'password-status' : 'password-status-altera';
    }

    verificaSenhaCadastro(senha) {
        var spanDescSenha = document.getElementById(`${this.id_input}`);
        spanDescSenha.style.fontSize = '12px';
        if (senha.length == "") {
            spanDescSenha.innerHTML = '';
            spanDescSenha.style.color = '#929292';
        } else if (senha.length < 6) {
            spanDescSenha.innerHTML = 'senha fraca, insira no mínimo 6 caracteres';
            spanDescSenha.style.color = 'red';
        } else {
            if (senha.match(this.numeros) && senha.match(this.alfabeto) && senha.match(this.chEspeciais)) {
                spanDescSenha.innerHTML = 'senha forte';
                spanDescSenha.style.color = '#4353ff';
            } else {
                spanDescSenha.innerHTML = 'senha média, insira um caracter especial e numero';
                spanDescSenha.style.color = 'orange';
            }
        }
        return spanDescSenha;
    }
}