export default class DocumentosUsuario {

    constructor(
        doc_foto = '',
        doc_selfie_rosto = '',
        doc_conjuge = '',
        doc_certidao = '',
        doc_extra = '',
        doc_procuracao= '',
        doc_psj_selfie = '',
        doc_psj_foto = '',
        doc_psj_alteracao = '',
        doc_psj_extra = '',
        doc_psj_procuracao= '',
        etapa = '',
    ) {
        this.doc_foto = doc_foto;
        this.doc_selfie_rosto = doc_selfie_rosto;
        this.doc_conjuge = doc_conjuge;
        this.doc_certidao = doc_certidao;
        this.doc_extra = doc_extra;
        this.doc_psj_selfie = doc_psj_selfie;
        this.doc_psj_foto = doc_psj_foto;
        this.doc_psj_alteracao = doc_psj_alteracao;
        this.doc_psj_extra = doc_psj_extra;
        this.doc_procuracao = doc_procuracao;
        this.doc_psj_procuracao = doc_psj_procuracao;
        this.etapa = etapa;
    }
}