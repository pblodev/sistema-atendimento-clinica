<template>
  <div class="login-container">
    <div class="login-card">
      <h1>🩺 Clínica Médica</h1>
      <p>Acesse sua conta para gerenciar consultas</p>

      <form @submit.prevent="fazerLogin">
        <div class="input-group">
          <label>Email</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="seu@email.com"
            required 
          />
        </div>
        
        <div class="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            v-model="senha" 
            placeholder="Digite sua senha"
            required 
          />
        </div>

        <button type="submit" :disabled="carregando">
          {{ carregando ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p v-if="mensagemErro" class="erro-msg">
        ⚠️ {{ mensagemErro }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      senha: '',
      mensagemErro: '',
      carregando: false
    };
  },
  methods: {
    async fazerLogin() {
      this.carregando = true;
      this.mensagemErro = '';

      try {
        // O .trim() remove espaços acidentais no começo ou fim do email
        const resposta = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email.trim(),
          senha: this.senha
        });

        // 1. Guardar o Token e o Cargo no navegador (LocalStorage)
        localStorage.setItem('token', resposta.data.token);
        localStorage.setItem('cargo', resposta.data.cargo);

        // 2. Redirecionar dependendo de quem logou
        if (resposta.data.cargo === 'secretario') {
          this.$router.push('/admin'); // Vai para o painel de todas as consultas
        } else {
          this.$router.push('/agendar'); // Paciente vai para a tela de agendamento
        }

      } catch (erro) {
        console.error("Erro no login:", erro);
        
        // Verifica se o erro é porque o backend está desligado
        if (erro.code === 'ERR_NETWORK') {
          this.mensagemErro = 'Não foi possível conectar ao servidor. O backend está ligado?';
        } else if (erro.response && erro.response.data) {
          this.mensagemErro = erro.response.data.erro || 'Email ou senha incorretos.';
        } else {
          this.mensagemErro = 'Ocorreu um erro inesperado.';
        }
      } finally {
        this.carregando = false;
      }
    }
  }
};
</script>

<style scoped>
/* Estilização moderna e limpa */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.input-group {
  text-align: left;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #34495e;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  box-sizing: border-box; /* Garante que o padding não aumente a largura */
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #3aa876;
}

button:disabled {
  background-color: #a8d8c0;
  cursor: not-allowed;
}

.erro-msg {
  margin-top: 1.5rem;
  color: #e74c3c;
  background-color: #fdeaea;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>