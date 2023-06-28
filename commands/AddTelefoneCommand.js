class AddTelefoneCommand {
    constructor(telefoneDAO, telefone, candidatoId) {
        this._telefoneDAO = telefoneDAO;
        this._telefone = telefone;
        this._candidatoId = candidatoId;
    }

    execute(callback) {
        this._telefoneDAO.add(this._telefone, this._candidatoId, callback);
    }
}

module.exports = AddTelefoneCommand;
