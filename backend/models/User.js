const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    cargo: { 
        type: String, 
        enum: ['paciente', 'secretario'],
        default: 'paciente'
    }
});

// Truque mágico para embaralhar a senha
userSchema.pre('save', async function() {
    if (this.isModified('senha')) {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
    }
});

module.exports = mongoose.model('User', userSchema);