const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');

// CADASTRO
router.post('/cadastro', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const [id] = await db('usuarios').insert({ email, senha: senhaHash });

    return res.status(201).json({ id, email });
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }
    return res.status(500).json({ erro: 'Erro no servidor: ' + error.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await db('usuarios').where({ email }).first();

    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas.' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Credenciais inválidas.' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({ mensagem: 'Login realizado com sucesso!', token });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro no servidor: ' + error.message });
  }
});

// PERFIL
router.get('/perfil', auth, async (req, res) => {
  try {
    const usuario = await db('usuarios').where({ id: req.usuarioId }).first();
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

    delete usuario.senha;
    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
