document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;

    fetch(`/candidatos/${nome}`)
        .then(response => response.json())
        .then(candidato => {
            // Cria a tabela de resultados
            let resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Detalhes</th>
                    </tr>
                    <tr>
                        <td>${candidato.nome}</td>
                        <td><a href="/resultado.html?nome=${candidato.nome}">Ver detalhes</a></td>
                    </tr>
                </table>
            `;
        });
});
