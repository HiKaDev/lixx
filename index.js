import express from 'express';  // Importa o Express
import dotenv from 'dotenv';     // Importa o dotenv
import cors from 'cors';         // Importa o cors
import axios from 'axios';       // Importa o axios

dotenv.config();  // Carrega as variáveis do .env

const app = express();  // Criação da instância do Express
app.use(cors());  // Habilita CORS
app.use(express.json());  // Permite o uso de JSON no corpo das requisições

// Lê a chave da API do .env
const apiKey = process.env.API_KEY;
console.log('Chave da API do OpenAI:', apiKey);  // Verifica se a chave é carregada corretamente

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('<h1>Servidor em execução!</h1><p>Use <a href="/api-key">/api-key</a> para ver a chave da API.</p>');
});

// Rota que retorna a API Key (apenas para teste, não use em produção)
app.get('/api-key', (req, res) => {
  res.json({ apiKey });
});

// Rota para interação com IA (POST) - GPT-4o-2024-08-06
app.post('/ia', async (req, res) => {
  const userQuestion = req.body.question;  // Obtém a pergunta do corpo da requisição

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-2024-08-06",  // Usando o modelo GPT-4o-2024-08-06
        messages: [{ role: "user", content: userQuestion }],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,  // Usa a chave da API do .env
          'Content-Type': 'application/json',
        },
      }
    );

    const gptResponse = response.data.choices[0].message.content;  // Extrai a resposta
    res.json({ answer: gptResponse });  // Envia a resposta de volta ao cliente
  } catch (error) {
    console.error('Erro ao acessar a API do OpenAI:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao processar a solicitação' });
  }
});

// Define a porta e inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
