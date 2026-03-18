const Agendamento = require('../models/Agendamento');
const axios = require('axios');

// FUNÇÃO 1: CRIAR NOVO AGENDAMENTO (Paciente)
exports.criar = async (req, res) => {
    try {
        const { dataHorario, cep } = req.body;
        // O ID vem do nosso Segurança (authMiddleware) que conferiu a pulseira
        const pacienteId = req.usuario.id; 

        // 1. VERIFICAÇÃO DE HORÁRIO (Para não chocar consultas)
        const horarioOcupado = await Agendamento.findOne({ dataHorario });
        if (horarioOcupado) {
            return res.status(400).json({ erro: 'Este horário já está ocupado!' });
        }

        // 2. BUSCAR O ENDEREÇO (API do ViaCEP)
        const respostaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (respostaCep.data.erro) {
            return res.status(400).json({ erro: 'CEP inválido ou não encontrado!' });
        }
        
        const enderecoCompleto = `${respostaCep.data.logradouro}, ${respostaCep.data.bairro}, ${respostaCep.data.localidade} - ${respostaCep.data.uf}`;
        const cidade = respostaCep.data.localidade; // Guardamos a cidade para usar no clima

        // 3. BUSCAR O CLIMA (API do OpenWeatherMap)
        let previsaoChuva = "Não foi possível obter a previsão";
        try {
            const chave = process.env.CHAVE_CLIMA;
            const respostaClima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br`);
            
            const descricao = respostaClima.data.weather[0].description.toLowerCase();
            
            if (descricao.includes('chuva')) {
                previsaoChuva = "Alerta: Há previsão de chuva (" + descricao + ")";
            } else {
                previsaoChuva = "Tempo limpo (" + descricao + ")";
            }
        } catch (erroClima) {
            console.log("🔍 ERRO DO CLIMA:", erroClima.response ? erroClima.response.data : erroClima.message);
            console.log("Aviso: A API de clima falhou, mas vamos agendar mesmo assim.");
        }

        // 4. SALVAR A CONSULTA NO BANCO DE DADOS
        const novoAgendamento = new Agendamento({
            pacienteId,
            dataHorario,
            cep,
            enderecoCompleto,
            previsaoChuva 
        });

        await novoAgendamento.save();

        res.status(201).json({ 
            mensagem: 'Consulta agendada com sucesso!', 
            agendamento: novoAgendamento 
        });

    } catch (erro) {
        console.log("🔍 ERRO NO AGENDAMENTO:", erro);
        res.status(500).json({ erro: 'Erro ao criar agendamento.' });
    }
};

// FUNÇÃO 2: LISTAR TODAS AS CONSULTAS (Painel do Secretário)
exports.listarTodos = async (req, res) => {
    try {
        // O .populate() vai até a "gaveta" de usuários e traz o nome e email do paciente
        // Assim o secretário sabe de quem é a consulta!
        const agendamentos = await Agendamento.find().populate('pacienteId', 'nome email');
        res.status(200).json(agendamentos);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
    }
};