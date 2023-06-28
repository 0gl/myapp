const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const CandidatoController = require('./controllers/CandidatoController');

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'db_escola',
});

app.use(bodyParser.json());
app.use(express.static('public'));

const candidatoController = new CandidatoController(db);

app.get('/candidatos/:nome', (req, res) => {
  const nome = req.params.nome;
  candidatoController.buscarCandidatoPorNome(nome, (err, candidato) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro na consulta');
      return;
    }

    if (candidato) {
      res.json(candidato);
    } else {
      res.status(404).send('Candidato não encontrado');
    }
  });
});

app.post('/candidatos', (req, res) => {
  candidatoController.adicionarCandidato(req, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro no cadastro');
      return;
    }

    res.status(200).send('Candidato cadastrado com sucesso');
  });
});

app.put('/candidatos/:nome', (req, res) => {
  const nome = req.params.nome;
  candidatoController.atualizarCandidato(req, nome, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro na atualização');
      return;
    }

    res.status(200).send('Candidato atualizado com sucesso');
  });
});

app.delete('/candidatos/:nome', (req, res) => {
  const nome = req.params.nome;
  candidatoController.excluirCandidato(nome, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro na exclusão');
      return;
    }

    res.status(200).send('Candidato excluído com sucesso');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/cadastrar.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views/cadastrar.html'));
});

app.get('/pesquisar.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views/pesquisar.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
