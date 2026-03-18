const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const authMiddleware = require('../middlewares/authMiddleware'); // Chamamos o Segurança

// Olha o Segurança (authMiddleware) parado na frente da função de criar agendamento!
// O Node tenta passar pelo authMiddleware. Se der certo, ele vai pro agendamentoController.
router.post('/novo', authMiddleware, agendamentoController.criar);

// Rota para o secretário ver todas as consultas (Nova!)
// O Segurança também protege essa rota para garantir que apenas usuários logados acessem.
router.get('/todos', authMiddleware, agendamentoController.listarTodos);

module.exports = router;
