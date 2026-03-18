const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// FUNÇÃO 1: CADASTRAR NOVO USUÁRIO
exports.registrar = async (req, res) => {
    try {
        // ESPIÃO 1: Avisa que a mensagem chegou do Postman
        console.log("🚨 ALERTA: Alguém bateu na porta de cadastro!", req.body);

        const { nome, email, senha, cargo } = req.body;

        const usuarioExiste = await User.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ erro: 'Este email já está cadastrado!' });
        }

        const novoUsuario = new User({ nome, email, senha, cargo });
        await novoUsuario.save(); 

        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (erro) {
        // ESPIÃO 2: Mostra o erro real se algo der errado
        console.log("🔍 O ERRO VERDADEIRO É:", erro); 
        res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
    }
};

// FUNÇÃO 2: FAZER LOGIN
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ erro: 'Email ou senha incorretos!' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ erro: 'Email ou senha incorretos!' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.SEGREDO_JWT, { expiresIn: '1d' });

        res.status(200).json({ mensagem: 'Login feito com sucesso!', token, cargo: usuario.cargo });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao fazer login.' });
    }
};