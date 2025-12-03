const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const axios = require('axios');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const key = process.env.TMDB_API_KEY;

    const [favoritos, popular, piada] = await Promise.all([
      db('filmes_favoritos').where({ usuario_id: usuarioId }).select('*'),
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR`)
           .then(r => r.data.results[0]),
      axios.get('https://api.chucknorris.io/jokes/random').then(r => r.data)
    ]);

    return res.json({
      meus_favoritos: favoritos,
      filme_popular: popular,
      piada_do_dia: piada
    });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
