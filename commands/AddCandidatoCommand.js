class AddCandidatoCommand {
    constructor(candidatoDAO, candidato) {
        this._candidatoDAO = candidatoDAO;
        this._candidato = candidato;
    }

    execute(callback) {
        this._candidatoDAO.add(this._candidato, callback);
    }
}

module.exports = AddCandidatoCommand;
