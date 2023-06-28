const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get('nome');

fetch(`/candidatos/${nome}`)
    .then(response => response.json())
    .then(candidato => {
        let detailsForm = document.getElementById('detailsForm');
        detailsForm.innerHTML = `
            <label>Nome:
                <input type="text" value="${candidato.nome}">
            </label>
            <!-- Adicione mais campos aqui conforme necessário -->
        `;
    });

document.getElementById('deleteButton').addEventListener('click', function() {
    if (confirm('Tem certeza de que deseja excluir este candidato?')) {
        fetch(`/candidatos/${nome}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Candidato excluído com sucesso');
                window.location.href = '/';
            } else {
                alert('Erro ao excluir candidato');
            }
        });
    }
});
