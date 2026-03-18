const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. O Segurança pede para ver a pulseira (procura o token no 'Header' da requisição)
    const token = req.header('Authorization');

    // 2. Se o paciente chegou sem pulseira, ele barra na hora (Erro 401 - Não Autorizado)
    if (!token) {
        return res.status(401).json({ erro: 'Acesso negado. Faça login para continuar.' });
    }

    try {
        // 3. O padrão da internet é mandar o token escrito "Bearer kj32h4k2j...".
        // Aqui nós tiramos a palavra "Bearer " para sobrar só o código puro.
        const tokenLimpo = token.replace('Bearer ', '');

        // 4. O Segurança usa nosso "carimbo secreto" para verificar se a pulseira não é falsa
        const verificado = jwt.verify(tokenLimpo, process.env.SEGREDO_JWT);

        // 5. Se for verdadeira, ele anota na prancheta quem é o usuário logado (o ID dele)
        req.usuario = verificado;

        // 6. E libera a catraca para o paciente entrar na rota de agendamento!
        // (Aqui usamos o 'next()' porque estamos no Express, e ele significa "pode ir para a próxima função")
        next();
    } catch (erro) {
        // Se a pulseira for falsa ou estiver vencida
        res.status(400).json({ erro: 'Token inválido ou expirado.' });
    }
};