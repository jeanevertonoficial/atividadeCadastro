function validadorCPF(cpf) {

    var primeiro_digito = 0
    var segundo_digito = 0

    for (var i = 0, peso = 10; i <= 8; i++, peso--) {
        primeiro_digito += cpf[i] * peso;
    }

    for (i = 0, peso = 11; i <= 9; i++, peso--) {
        segundo_digito += cpf[i] * peso;
    }

    var calculo_um = ((primeiro_digito % 11) < 2) ? 0 : 11 - (primeiro_digito % 11);
    var calculo_dois = ((segundo_digito % 11) < 2) ? 0 : 11 - (segundo_digito % 11);

    if (calculo_um != cpf[9] || calculo_dois != cpf[10]) return false;

    return true;
}

export function VerificarTipoCPF(numero_cpf, id, dados) {
    var cpf_limpo = numero_cpf.replace(/[^\d]+/g, '');

    if (id == 'nm_cpf') {
        var cpf = document.getElementById('cpf_principal_valida');
        if (dados) {
            if (!validadorCPF(cpf_limpo)) {
                cpf.innerHTML = 'CPF inválido, por favor insira um CPF valido';
            } else if (validadorCPF(cpf_limpo)) {
                cpf.innerHTML = '';
            }
        } else {
            cpf.innerHTML = '';
        }
    }

    if (id == 'nm_cpfconjuge') {
        var conj = document.getElementById('cpf_invalido_conjuge');
        if (dados) {
            if (!validadorCPF(cpf_limpo)) {
                conj.innerHTML = 'CPF inválido, por favor insira um CPF valido';
            } else if (validadorCPF(cpf_limpo)) {
                conj.innerHTML = '';
            }
        } else {
            conj.innerHTML = '';
        }
    }

    if (id == 'nm_cpfcontato') {
        var cpfContato = document.getElementById('span_nm_cpfcontato');
        if (dados) {
            if (!validadorCPF(cpf_limpo)) {
                cpfContato .innerHTML = 'CPF inválido, por favor insira um CPF valido';
            } else if (validadorCPF(cpf_limpo)) {
                cpfContato .innerHTML = '';
            }
        } else {
            cpfContato .innerHTML = '';
        }
    }
}

export function validadorCNPJ(cnpj) {
    var primeiro_digito = 0;
    var segundo_digito = 0;

    for (var i = 0, peso = 5; i <= 11; i++, peso--) {
        peso = (peso < 2) ? 9 : peso;
        primeiro_digito += cnpj[i] * peso;
    }

    for (i = 0, peso = 6; i <= 12; i++, peso--) {
        peso = (peso < 2) ? 9 : peso;
        segundo_digito += cnpj[i] * peso;
    }

    var calculo_um = ((primeiro_digito % 11) < 2) ? 0 : (11 - (primeiro_digito % 11));
    var calculo_dois = ((segundo_digito % 11) < 2) ? 0 : (11 - (segundo_digito % 11));

    if (calculo_um != cnpj[12] || calculo_dois != cnpj[13]) return false;

    return true;
}