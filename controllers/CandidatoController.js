const CandidatoFacade = require('./CandidatoFacade');
const CandidatoViewHelper = require('../helpers/CandidatoViewHelper');

class CandidatoController {
    constructor(db) {
        this._candidatoFacade = new CandidatoFacade(db);
        this._candidatoViewHelper = new CandidatoViewHelper();
    }

    adiciona(req, res) {
        this._candidatoFacade.adicionarCandidato(req, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erro ao inserir o candidato');
                return;
            }

            const enderecoFormatado = this._candidatoViewHelper.getEnderecoFormatado(req.body.endereco, req.body.cep, req.body.cidade, req.body.estado);
            res.send(`Cadastro realizado com sucesso! Endereço: ${enderecoFormatado}`);
        });
    }
}

module.exports = CandidatoController;
