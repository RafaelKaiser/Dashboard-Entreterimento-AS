# Dashboard de Mídia e Entretenimento

**Aluno:** Rafael Kaiser
**Projeto:** Avaliação Semestral - Backend

## Sobre o Projeto

API para gerenciar filmes favoritos com integração à API do TMDB.
Permite cadastro de usuários, autenticação JWT, e um dashboard que combina dados locais com APIs externas.

## Tecnologias Requisitadas

- Node.js, Express, Knex, SQLite3
- JWT, Bcrypt, Axios
- Helmet, CORS

## Como Rodar

```bash
# Instalar dependências
npm install

## Configurar Banco de Dados (Migrations e Seeds)
npx knex migrate:latest
npx knex seed:run

# Configurar .env
PORT=3000
JWT_SECRET=sua_chave_aqui
TMDB_API_KEY=sua_chave_tmdb

# Iniciar servidor
npm node src/server.js

# URL Padrão
http://localhost:3000/
```
## Funcionalidades

- Cadastro e login com senha criptografada
- Autenticação JWT
- Busca de filmes na API TMDB
- Verificação de posse ao deletar
- Dashboard com Promise.all (3 fontes em paralelo)

---

# Relatório de Uso de IA

## Contexto

Utilizei o Gemini como ferramenta de aprendizado para tirar dúvidas conceituais.

## Consultas e Aprendizados

### 1. JWT e Autenticação

**Pergunta:** Como funciona JWT? O que é payload?

**Resposta:** JWT tem 3 partes (header, payload, signature). O payload armazena dados do usuário e a assinatura valida integridade.

**Aprendi:** Posso autenticar sem consultar o banco toda vez. O token expira automaticamente.  -- Já imaginava, mas consultei e reafirmei.

---

### 2. Bcrypt

**Pergunta:** Por que usar bcrypt? Hash vs criptografia?

**Resposta:** Hash é unidirecional. Bcrypt adiciona salt automático contra rainbow tables.

**Aprendi:** Nunca armazeno senhas em texto puro. bcrypt.compare() valida sem expor a senha.

---

### 3. Foreign Keys

**Pergunta:** Como funciona o CASCADE?

**Resposta:** CASCADE deleta dependentes automaticamente.

**Aprendi:** Ao deletar usuário, seus filmes também são deletados.

---

### 4. Promise.all

**Pergunta:** Por que Promise.all é mais rápido?

**Resposta:** Executa requisições simultaneamente. Sequencial seria a soma dos tempos.

**Aprendi:** No dashboard, busco 3 fontes em paralelo, economizando tempo.

---

### 5. API TMDB

**Pergunta:** Como integrar com TMDB?

**Resposta:** API REST com endpoints documentados. Precisa de API key.

**Aprendi:** Faço requisição com axios, extraio dados do response, salvo no banco.

---

### 6. Verificação de Posse

**Pergunta:** Como impedir usuário de deletar recurso de outro?

**Resposta:** Buscar com WHERE id AND usuario_id. Se não achar, não existe ou não pertence.

**Aprendi:** Segurança é autenticação (quem é) + autorização (o que pode fazer).

---

### 7. Helmet e CORS

**Pergunta:** São realmente necessários?

**Resposta:** Sim, e muito, pois Helmet adiciona headers de segurança e CORS permite acesso de outras origens.

**Aprendi:** Segurança vai além de JWT. Poranto, além de um requisito, importante entender melhor.

---

### Consumi diversos Canais, com conteudos riquíssimos no Youtube, como:

- **Código Fonte TV**
- **Fabio AKITA**
- **DevClub | Programação**

## Dificuldades

**Problema 1:** URL do poster TMDB incompleta.
**Solução:** Concateno `https://image.tmdb.org/t/p/w500` + poster_path.

**Problema 2:** Promise.all retornando ordem errada.
**Solução:** Aprendi que mantém ordem do array de entrada.

## Declaração

A IA serve como uma ótima ferramenta de aprendizado. apenas consultoria conceitual, similar a ler documentação. O raciocínio e implementação foram meus.

**Rafael Kaiser**
Data: 02/12/2025