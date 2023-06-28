const CandidatoDAO = require('../dao/CandidatoDAO');
const TelefoneDAO = require('../dao/TelefoneDAO');
const Candidato = require('../models/Candidato');
const Telefone = require('../models/Telefone');
const { StringValidator, NumberValidator } = require('../models/validators');
const AddCandidatoCommand = require('../commands/AddCandidatoCommand');
const AddTelefoneCommand = require('../commands/AddTelefoneCommand');

class CandidatoFacade {
    constructor(db) {
        this._CandidatoDAO = new CandidatoDAO(db);
        this._TelefoneDAO = new TelefoneDAO(db);
        this._stringValidator = new StringValidator();
        this._numberValidator = new NumberValidator();
    }

    adicionarCandidato(req, callback) {
        const { nome, mae, pai, curso, endereco, cep, cidade, estado, telefone, tipo } = req.body;

        if (!this._stringValidator.validate(nome) ||
            !this._stringValidator.validate(mae) ||
            !this._stringValidator.validate(pai) ||
            !this._stringValidator.validate(curso) ||
            !this._stringValidator.validate(endereco) ||
            !this._numberValidator.validate(cep) ||
            !this._stringValidator.validate(cidade) ||
            !this._stringValidator.validate(estado) ||
            !this._numberValidator.validate(telefone) ||
            !this._stringValidator.validate(tipo)) {
            callback(new Error('Dados inválidos'));
            return;
        }

        const candidato = new Candidato(nome, mae, pai, curso, endereco, cep, cidade, estado);
        const telefoneData = new Telefone(telefone, tipo);

        const addCandidatoCommand = new AddCandidatoCommand(this._CandidatoDAO, candidato);
        addCandidatoCommand.execute((err, result) => {
            if (err) {
                callback(err);
                return;
            }

            const candidatoId = result.insertId;
            const addTelefoneCommand = new AddTelefoneCommand(this._TelefoneDAO, telefoneData, candidatoId);
            addTelefoneCommand.execute(callback);
        });
    }
}

module.exports = CandidatoFacade;
