const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Limpa tabelas (opcional)
  await knex('filmes_favoritos').del();
  await knex('usuarios').del();

  const senhaHash = await bcrypt.hash('123456', 10);

  const [usuarioId] = await knex('usuarios').insert({
    email: 'rafael@test.com',
    senha: senhaHash
  });

  // Inserir exemplo de filme favorito (opcional)
  await knex('filmes_favoritos').insert([
    {
      titulo: 'Exemplo - Clube da Luta (placeholder)',
      poster_url: null,
      tmdb_id: 550,
      usuario_id: usuarioId
    }
  ]);
};
