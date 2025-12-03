const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const axios = require('axios');
const auth = require('../middleware/authMiddleware');

// POST /filmes - ADICIONAR FILME FAVORITO
router.post('/', auth, async (req, res) => {
  try {
    const { tmdb_id } = req.body;
    const usuarioId = req.usuarioId;

    if (!tmdb_id) {
      return res.status(400).json({ erro: 'tmdb_id é obrigatório.' });
    }

    // Buscar dados do filme na API do TMDB
    const url = `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`;
    const resp = await axios.get(url);
    const filme = resp.data;

    const poster = filme.poster_path
      ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
      : null;

    // Salvar no banco
    const [id] = await db('filmes_favoritos').insert({
      titulo: filme.title || filme.original_title,
      poster_url: poster,
      tmdb_id,
      usuario_id: usuarioId
    });

    return res.status(201).json({
      mensagem: 'Filme adicionado aos favoritos!',
      filme: {
        id,
        titulo: filme.title || filme.original_title,
        poster_url: poster,
        tmdb_id
      }
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ erro: 'Filme não encontrado na API do TMDB.' });
    }
    return res.status(500).json({ erro: error.message });
  }
});

// GET /filmes - LISTAR FILMES FAVORITOS
router.get('/', auth, async (req, res) => {
  try {
    const filmes = await db('filmes_favoritos')
      .where({ usuario_id: req.usuarioId })
      .select('*');

    return res.json(filmes);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

// DELETE /filmes/:id - REMOVER FILME FAVORITO
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    // Verificar se o filme existe E pertence ao usuário
    const filme = await db('filmes_favoritos')
      .where({ id: id, usuario_id: usuarioId })
      .first();

    if (!filme) {
      return res.status(404).json({ 
        erro: 'Filme não encontrado ou não pertence a você.' 
      });
    }

    // Deletar
    await db('filmes_favoritos').where({ id: id }).del();

    return res.json({ mensagem: 'Filme removido dos favoritos!' });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
