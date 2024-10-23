// Função para interagir com a IA
document.getElementById('sendRequest').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value; // Obtém a pergunta do usuário
    
    // Envia a pergunta para a API de IA
    fetch('http://localhost:3000/ia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = `Resposta: ${data.answer}`;
    })
    .catch(error => {
        console.error('Erro ao enviar a pergunta:', error);
    });
});
