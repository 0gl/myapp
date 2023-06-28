const crypto = require('crypto');

class TelefoneDAO {
    constructor(connection) {
        this._connection = connection;
    }

    _encryptData(data) {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    }

    add(telefone, candidatoId, callback) {
        this._connection.query('INSERT INTO telefones SET ?', {
            telefone: this._encryptData(telefone.telefone),
            tipo: this._encryptData(telefone.tipo),
            candidato_id: candidatoId,
        }, callback);
    }
}

module.exports = TelefoneDAO;
