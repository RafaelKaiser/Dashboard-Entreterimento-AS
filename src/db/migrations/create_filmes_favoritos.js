// Exporta a função 'up', que cria a tabela no banco.
exports.up = function(knex) {
    // Retorna a promessa para criar a tabela 'filmes_favoritos'.
    return knex.schema.createTable('filmes_favoritos', (table) => {
        // Cria a coluna 'id' auto-incrementável, definindo-a como chave primária.
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.string('poster_url');
        table.integer('tmdb_id').notNullable();
        // Cria a coluna 'usuario_id', não podendo ser negativa, para a chave estrangeira (FK) e a torna obrigatória.
        table.integer('usuario_id').unsigned().notNullable()
        // Define que 'usuario_id' referencia a coluna 'id' da tabela 'usuarios'.
        .references('id').inTable('usuarios')
        // Regra de cascata: se o usuário for deletado, seus favoritos também serão (CASCADE).
        .onDelete('CASCADE');
        // Cria a coluna 'criado_em' (data/hora) e define a data/hora atual como padrão.
        table.timestamp('criado_em').defaultTo(knex.fn.now());
    });
};


// Exporta a função 'down', que é usada para desfazer a criação da tabela (rollback).
exports.down = function(knex) {
    // Retorna a promessa para apagar a tabela 'filmes_favoritos' se ela existir.
    return knex.schema.dropTableIfExists('filmes_favoritos');
};

// pega o id do usuário vindo do token
const usuarioId = req.usuarioId;

// executa 3 tarefas ao mesmo tempo (paralelo)
const [favoritos, popular, piada] = await Promise.all([

  // 1. dados internos do banco (Knex)
  db('filmes_favoritos')
    .where({ usuario_id: usuarioId })
    .select('*'),

  // 2. filme popular do TMDB (API externa)
  axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR`
  ).then(r => r.data.results[0]),

  // 3. piada aleatória (API externa)
  axios.get('https://api.chucknorris.io/jokes/random')
    .then(r => r.data)
]);

// resposta unificada do dashboard
return res.json({
  meus_favoritos: favoritos,
  filme_popular: popular,
  piada_do_dia: piada
});
