const express = require('express');
const CandidatoController = require('../controllers/CandidatoController');
const mysql = require('mysql');

const router = express.Router();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'db_escola',
});

const candidatoController = new CandidatoController(db);

router.post('/', (req, res) => candidatoController.adiciona(req, res));

module.exports = router;
