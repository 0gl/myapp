const form = document.getElementById('cadastrarForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const candidato = {};
  for (const [key, value] of formData.entries()) {
    candidato[key] = value;
  }

  fetch('/candidatos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidato),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      form.reset();
    })
    .catch((error) => {
      console.error('Erro no cadastro:', error);
      alert('Erro no cadastro. Verifique o console para mais detalhes.');
    });
});
