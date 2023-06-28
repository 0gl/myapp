class CandidatoViewHelper {
    getEnderecoFormatado(endereco, cep, cidade, estado) {
        return `${endereco}, ${cep}, ${cidade} - ${estado}`;
    }
}

module.exports = CandidatoViewHelper;
