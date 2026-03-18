const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
    // Aqui nós "linkamos" a consulta ao ID do paciente que está logado
    pacienteId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    dataHorario: { 
        type: Date, 
        required: true 
    },
    cep: { 
        type: String, 
        required: true 
    },
    enderecoCompleto: { 
        type: String // O ViaCEP vai preencher isso para nós!
    },
    previsaoChuva: {
        type: String // Deixaremos preparado para a API de clima depois
    }
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);