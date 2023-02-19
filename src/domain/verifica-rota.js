export function verificaRota() {
    var url = window.location.href;
    return (url.indexOf('editar-dados') !== -1) ? true : false
}
export function verificaRotaNaoExiste() {
    var url = window.location.href;
    return (url.indexOf('null') !== -1) ? true : false
}
export function tipoDeRota(tipo_pessoa, etapa) {
    if (etapa == 1) {
        if (verificaRota() == true) {
            return (tipo_pessoa == 'pessoa_fisica') ? 'index_idEdita' : 'PsJuridica_idEdita'
        } else {
            return (tipo_pessoa == 'pessoa_fisica') ? 'index_id' : 'PsJuridica_id'
        }
    }

    if (etapa == 3) {
        if (verificaRota() == true) {
            return (tipo_pessoa == 'pessoa_fisica') ? 'index_idEdita' : 'PsJuridica_idEdita'
        } else {
            return (tipo_pessoa == 'pessoa_fisica') ? 'index_id' : 'PsJuridica_id'
        }
    }

    if (etapa == 4) {
        if (verificaRota() == true) {
            return (tipo_pessoa == 'pessoa_fisica') ? 'endereco_idEdita' : 'endereco_idEdita'
        } else {
            return (tipo_pessoa == 'pessoa_fisica') ? 'endereco_id' : 'endereco_id'
        }
    }
}