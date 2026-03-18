<template>
  <div class="agendar-container">
    <div class="agendar-card">
      <div class="header">
        <h1>📅 Agendar Consulta</h1>
        <p>Preencha os dados abaixo para marcar seu atendimento.</p>
      </div>

      <form @submit.prevent="marcarConsulta">
        <div class="row">
          <div class="input-group">
            <label>Data</label>
            <input type="date" v-model="dataApenas" required />
          </div>
          <div class="input-group">
            <label>Hora</label>
            <input type="time" v-model="horaApenas" required />
          </div>
        </div>

        <div class="input-group">
          <label>CEP</label>
          <div class="cep-field">
            <input 
              type="text" 
              v-model="form.cep" 
              placeholder="00000-000" 
              maxlength="9"
              required 
            />
            <button type="button" @click="buscarEndereco" class="btn-buscar">Buscar</button>
          </div>
          <small>Digite o CEP e clique em Buscar</small>
        </div>

        <transition name="fade">
          <div v-if="enderecoBuscado" class="info-painel">
            <h3>📍 Dados da Localização</h3>
            <p><strong>Endereço:</strong> {{ enderecoBuscado }}</p>
            <div class="clima-tag" :class="{ 'chuva': temPrevisaoChuva }">
              <span class="icon">{{ temPrevisaoChuva ? '☔' : '☀️' }}</span>
              {{ climaInfo }}
            </div>
          </div>
        </transition>

        <button type="submit" :disabled="enviando" class="btn-confirmar">
          {{ enviando ? 'Agendando...' : 'Confirmar Agendamento' }}
        </button>
      </form>

      <div class="footer">
        <button @click="logout" class="btn-sair">Sair do Sistema</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AgendamentoView',
  data() {
    return {
      // Separamos no front-end para facilitar para o usuário
      dataApenas: '', 
      horaApenas: '',
      form: {
        cep: ''
      },
      enderecoBuscado: '',
      climaInfo: 'Aguardando CEP...',
      temPrevisaoChuva: false,
      enviando: false
    };
  },
  methods: {
    async buscarEndereco() {
      // Limpa espaços e traços
      const cepLimpo = this.form.cep.replace(/\D/g, '');
      if (cepLimpo.length < 8) {
        alert("Por favor, digite um CEP válido com 8 números.");
        return;
      }
      
      this.climaInfo = "Buscando dados...";
      this.enderecoBuscado = '';

      try {
        const token = localStorage.getItem('token');
        
        // Fazemos uma chamada 'fake' pro agendamento só pra pegar os dados do ViaCEP/Clima
        const res = await axios.post('http://localhost:3000/api/agendamento/novo', 
          { 
            // Mandamos uma data qualquer só pra API aceitar
            dataHorario: new Date().toISOString(), 
            cep: cepLimpo 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Preenchemos a tela com o que o backend descobriu
        this.enderecoBuscado = res.data.agendamento.enderecoCompleto;
        this.climaInfo = res.data.agendamento.previsaoChuva;
        this.temPrevisaoChuva = this.climaInfo.toLowerCase().includes('chuva');

      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        this.climaInfo = "Erro ao buscar dados do CEP ou clima.";
        this.enderecoBuscado = '';
        this.temPrevisaoChuva = false;
      }
    },

    async marcarConsulta() {
      this.enviando = true;
      try {
        const token = localStorage.getItem('token');
        
        // Juntamos a data e a hora em um formato que o backend entende (ISO)
        const dataParaEnviar = `${this.dataApenas}T${this.horaApenas}:00.000Z`;

        await axios.post('http://localhost:3000/api/agendamento/novo', 
          {
            dataHorario: dataParaEnviar,
            cep: this.form.cep.replace(/\D/g, '') // Envia CEP limpo
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        alert('🎉 Consulta marcada com sucesso!');
        // Limpa o formulário
        this.dataApenas = '';
        this.horaApenas = '';
        this.form.cep = '';
        this.enderecoBuscado = '';
        this.climaInfo = 'Aguardando CEP...';
        this.temPrevisaoChuva = false;

      } catch (err) {
        console.error("Erro no agendamento:", err);
        
        // Modo Detetive ativado!
        if (err.code === 'ERR_NETWORK') {
           alert('🚨 O servidor (backend) parece estar desligado!');
        } else if (err.response && err.response.data.erro) {
           alert('❌ ' + err.response.data.erro);
        } else {
           alert('❌ Ocorreu um erro inesperado ao tentar agendar.');
        }
      } finally {
        this.enviando = false;
      }
    },

    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* ESTILOS MODERNOS E ORGANIZADOS */
.agendar-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinha no topo para não sumir se a tela for pequena */
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 40px 20px;
  box-sizing: border-box;
}

.agendar-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.header p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.row {
  display: flex;
  gap: 20px; /* Separa data da hora */
  margin-bottom: 1.5rem;
}

.row .input-group {
  flex: 1; /* Cada campo pega metade */
  margin-bottom: 0;
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
  box-sizing: border-box;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

/* Estilo para o campo de CEP com botão ao lado */
.cep-field {
  display: flex;
  gap: 10px;
}

.cep-field input {
  flex: 1;
}

.btn-buscar {
  width: auto;
  padding: 0 20px;
  background-color: #34495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-buscar:hover {
  background-color: #2c3e50;
}

small {
  color: #7f8c8d;
  display: block;
  margin-top: 5px;
  font-size: 0.85rem;
}

/* PAINEL DE INFORMAÇÕES DO ENDEREÇO */
.info-painel {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 5px solid #42b983;
  margin-bottom: 2rem;
  text-align: left;
}

.info-painel h3 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.info-painel p {
  margin: 5px 0 15px 0;
  color: #34495e;
}

/* Tag de clima estilizada */
.clima-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #e6f7ed; /* Verde clarinho para tempo limpo */
  color: #1e7e4e;
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}

.clima-tag.chuva {
  background-color: #fdeaea; /* Vermelho clarinho para alerta de chuva */
  color: #c0392b;
}

.clima-tag .icon {
  font-size: 1.2rem;
}

/* BOTÕES FINAIS */
.btn-confirmar {
  width: 100%;
  padding: 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-confirmar:hover {
  background-color: #3aa876;
}

.btn-confirmar:disabled {
  background-color: #a8d8c0;
  cursor: not-allowed;
}

.footer {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.btn-sair {
  background: none;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.95rem;
  font-weight: bold;
}

.btn-sair:hover {
  color: #c0392b;
}

/* Animação suave para quando o painel de endereço aparece */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>