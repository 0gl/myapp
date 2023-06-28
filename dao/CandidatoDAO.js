const crypto = require('crypto');

class CandidatoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    _encryptData(data) {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    }

    add(candidato, callback) {
        this._connection.query('INSERT INTO candidatos SET ?', {
            nome: this._encryptData(candidato.nome),
            mae: this._encryptData(candidato.mae),
            pai: this._encryptData(candidato.pai),
            curso: this._encryptData(candidato.curso),
            endereco: this._encryptData(candidato.endereco),
            cep: this._encryptData(candidato.cep),
            cidade: this._encryptData(candidato.cidade),
            estado: this._encryptData(candidato.estado),
        }, callback);
    }
}

module.exports = CandidatoDAO;
