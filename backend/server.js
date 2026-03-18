const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Configurações básicas
app.use(express.json());
app.use(cors());

// Conexão com o Banco de Dados
mongoose.connect(process.env.URL_DO_BANCO)
    .then(() => console.log('Conectado ao Banco de Dados MongoDB com sucesso!'))
    .catch((erro) => console.log('Deu erro ao conectar no Banco de Dados:', erro));

// --- AS NOSSAS PORTAS (ROTAS) FICAM AQUI ---
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); 

const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/api/agendamento', agendamentoRoutes);
// ------------------------------------------

// Ligando o servidor
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});