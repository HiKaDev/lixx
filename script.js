// Referências aos elementos
const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const fileInput = document.getElementById('fileInput');
const loadingIndicator = document.getElementById('loading');

// Função para exibir uma mensagem no chat
function addMessage(content, sender = 'user') {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = content;
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Função para enviar mensagem e interagir com o backend
async function sendMessage() {
    const text = userInput.value.trim();
    const file = fileInput.files[0];

    if (!text && !file) return;

    addMessage(text, 'user');  // Adiciona a mensagem do usuário
    userInput.value = '';      // Limpa o campo de texto

    // Exibe o ícone de carregamento
    loadingIndicator.classList.remove('hidden');

    const formData = new FormData();
    formData.append('question', text);
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await fetch('https://seu-backend.replit.app/ia', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        addMessage(data.answer, 'bot');  // Adiciona a resposta da IA
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        addMessage('Erro ao processar sua mensagem.', 'bot');
    } finally {
        loadingIndicator.classList.add('hidden');  // Oculta o ícone de carregamento
    }
}

