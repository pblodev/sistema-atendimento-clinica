<<<<<<< HEAD
# 🏥 Sistema de Atendimento Inteligente para Clínicas Médicas

Este projeto é uma aplicação Full-Stack desenvolvida para a disciplina de Desenvolvimento Web. O sistema permite o agendamento de consultas médicas com integração automática de endereço via CEP e previsão do tempo em tempo real.

## 🚀 Tecnologias Utilizadas

### Backend (Cozinha)
* **Node.js & Express:** Servidor robusto e gerenciamento de rotas.
* **MongoDB & Mongoose:** Banco de dados NoSQL para armazenamento de usuários e consultas.
* **JWT (JSON Web Token):** Autenticação segura para proteger os dados sensíveis.
* **Bcrypt.js:** Criptografia de senhas para garantir a segurança dos usuários.
* **Axios:** Consumo de APIs externas (ViaCEP e OpenWeatherMap).

### Frontend (Vitrine)
* **Vue.js 3:** Framework reativo para uma interface de usuário moderna.
* **Vue Router:** Gerenciamento de navegação entre telas (Login, Agendamento, Admin).
* **CSS3 Moderno:** Layout responsivo e organizado.

## 🛠️ Funcionalidades principais

1.  **Autenticação:** Cadastro e login com distinção de cargos (Paciente vs. Secretário).
2.  **Agendamento Inteligente:**
    * Verificação de conflito de horários (não permite dois agendamentos no mesmo horário).
    * Busca automática de endereço via **API ViaCEP**.
    * Previsão do tempo automática via **API OpenWeatherMap** para alertar sobre chuvas no dia da consulta.
3.  **Painel Administrativo:** Tela exclusiva para secretários visualizarem a lista consolidada de todos os pacientes agendados.

## 📦 Como rodar o projeto

### 1. Configuração do Backend
1.  Entre na pasta `/backend`.
2.  Execute `npm install` para instalar as dependências.
3.  Crie um arquivo `.env` com as seguintes chaves:
    * `URL_DO_BANCO`: Sua string de conexão do MongoDB Atlas.
    * `SEGREDO_JWT`: Uma frase secreta para o token.
    * `CHAVE_CLIMA`: Sua API Key do OpenWeatherMap.
4.  Inicie o servidor com: `node server.js`.

### 2. Configuração do Frontend
1.  Entre na pasta `/frontend`.
2.  Execute `npm install`.
3.  Inicie a aplicação com: `npm run dev`.
4.  Acesse no navegador: `http://localhost:5173`.

## 🧑‍💻 Credenciais de Teste sugeridas
* **Paciente:** joao@email.com / senha: 123
* **Secretário:** pablo@clinica.com / senha: admin123 (Cadastrar via Postman conforme documentação interna).

---
Desenvolvido como Trabalho Acadêmico - 2026
=======
# 🏥 Sistema de Atendimento Inteligente para Clínicas Médicas

Este projeto é uma aplicação Full-Stack desenvolvida para a disciplina de Desenvolvimento Web. O sistema permite o agendamento de consultas médicas com integração automática de endereço via CEP e previsão do tempo em tempo real.

## 🚀 Tecnologias Utilizadas

### Backend (Cozinha)
* **Node.js & Express:** Servidor robusto e gerenciamento de rotas.
* **MongoDB & Mongoose:** Banco de dados NoSQL para armazenamento de usuários e consultas.
* **JWT (JSON Web Token):** Autenticação segura para proteger os dados sensíveis.
* **Bcrypt.js:** Criptografia de senhas para garantir a segurança dos usuários.
* **Axios:** Consumo de APIs externas (ViaCEP e OpenWeatherMap).

### Frontend (Vitrine)
* **Vue.js 3:** Framework reativo para uma interface de usuário moderna.
* **Vue Router:** Gerenciamento de navegação entre telas (Login, Agendamento, Admin).
* **CSS3 Moderno:** Layout responsivo e organizado.

## 🛠️ Funcionalidades principais

1.  **Autenticação:** Cadastro e login com distinção de cargos (Paciente vs. Secretário).
2.  **Agendamento Inteligente:**
    * Verificação de conflito de horários (não permite dois agendamentos no mesmo horário).
    * Busca automática de endereço via **API ViaCEP**.
    * Previsão do tempo automática via **API OpenWeatherMap** para alertar sobre chuvas no dia da consulta.
3.  **Painel Administrativo:** Tela exclusiva para secretários visualizarem a lista consolidada de todos os pacientes agendados.

## 📦 Como rodar o projeto

### 1. Configuração do Backend
1.  Entre na pasta `/backend`.
2.  Execute `npm install` para instalar as dependências.
3.  Crie um arquivo `.env` com as seguintes chaves:
    * `URL_DO_BANCO`: Sua string de conexão do MongoDB Atlas.
    * `SEGREDO_JWT`: Uma frase secreta para o token.
    * `CHAVE_CLIMA`: Sua API Key do OpenWeatherMap.
4.  Inicie o servidor com: `node server.js`.

### 2. Configuração do Frontend
1.  Entre na pasta `/frontend`.
2.  Execute `npm install`.
3.  Inicie a aplicação com: `npm run dev`.
4.  Acesse no navegador: `http://localhost:5173`.

## 🧑‍💻 Credenciais de Teste sugeridas
* **Paciente:** joao@email.com / senha: 123
* **Secretário:** pablo@clinica.com / senha: admin123 (Cadastrar via Postman conforme documentação interna).

---
Desenvolvido como Trabalho Acadêmico - 2026
>>>>>>> dc1b181 (Sincronizando com as alterações do site)
