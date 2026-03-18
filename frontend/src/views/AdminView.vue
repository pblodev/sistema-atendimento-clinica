<template>
  <div class="admin-container">
    <div class="admin-card">
      <div class="header">
        <h1>👨‍⚕️ Painel Administrativo</h1>
        <p>Lista de todos os agendamentos da clínica</p>
      </div>

      <div v-if="carregando" class="loading">Carregando consultas...</div>

      <div v-else-if="agendamentos.length === 0" class="empty">
        Nenhuma consulta agendada até o momento.
      </div>

      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Data e Hora</th>
            <th>Endereço</th>
            <th>Clima</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in agendamentos" :key="item._id">
            <td>
              <strong>{{ item.pacienteId?.nome || 'N/A' }}</strong><br>
              <small>{{ item.pacienteId?.email }}</small>
            </td>
            <td>{{ formatarData(item.dataHorario) }}</td>
            <td>{{ item.enderecoCompleto }}</td>
            <td>{{ item.previsaoChuva }}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <button @click="logout" class="btn-sair">Sair do Sistema</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      agendamentos: [],
      carregando: true
    };
  },
  mounted() {
    this.buscarTodos();
  },
  methods: {
    async buscarTodos() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/agendamento/todos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.agendamentos = res.data;
      } catch (err) {
        alert('Erro ao carregar agendamentos.');
      } finally {
        this.carregando = false;
      }
    },
    formatarData(iso) {
      const data = new Date(iso);
      return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.admin-container { padding: 40px 20px; background: #f0f2f5; min-height: 100vh; }
.admin-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 1000px; margin: 0 auto; }
.admin-table { width: 100%; border-collapse: collapse; margin-top: 20px; text-align: left; }
.admin-table th, .admin-table td { padding: 12px; border-bottom: 1px solid #eee; }
.admin-table th { background: #f8f9fa; color: #34495e; }
.btn-sair { margin-top: 20px; color: #e74c3c; cursor: pointer; background: none; border: none; text-decoration: underline; font-weight: bold; }
</style>