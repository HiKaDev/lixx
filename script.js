async function sendMessage() {
    const input = document.getElementById('userInput').value;
    if (!input) return;

    // Exibe a mensagem do usuário no chat
    const messagesDiv = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.textContent = `Você: ${input}`;
    messagesDiv.appendChild(userMessage);

    try {
        const response = await fetch('https://<seu-backend>.replit.app/ia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: input })
        });

        const data = await response.json();
        const botMessage = document.createElement('div');
        botMessage.textContent = `Bot: ${data.answer}`;
        messagesDiv.appendChild(botMessage);
    } catch (error) {
        console.error('Erro:', error);
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Erro ao se comunicar com o bot.';
        messagesDiv.appendChild(errorMessage);
    }
}
