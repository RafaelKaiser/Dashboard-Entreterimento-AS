require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const filmeRoutes = require('./routes/filmeRoutes');
const painelRoutes = require('./routes/painelRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/filmes', filmeRoutes);
app.use('/dashboard', painelRoutes);

// rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'API Dashboard – rodando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
