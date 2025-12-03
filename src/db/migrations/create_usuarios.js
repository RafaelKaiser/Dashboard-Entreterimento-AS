// Exportamos a função 'up' para o Knex, para criação da migration
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', (table) => {
        // Se cria a coluna Id, que irá armazenar os integer e se Auto-Incrementa
        table.increments('id').primary();

        // Cria uma coluna chamada 'email' que armazena dados do tipo texto (string), e o torna único
        table.string('email').notNullable().unique();

        // Cria uma coluna chamada 'senha_hash'(usando bcrypt)para guardar a senha do usuário.
        table.string('senha_hash').notNullable();

        // Cria uma coluna chamada 'criado_em' que armazena a data e hora da criação do registro
        table.timestamp('criado_em').defaultTo(knex.fn.now());
    });
};


// Exporta a função 'down' ("descida" ou "rollback") para o Knex, logo desfaz a função Up
exports.down = function(knex) {
    // A função retorna uma promessa que instrui o Knex a APAGAR (dropar) a tabela.
    // 'dropTableIfExists' previne erros.
    return knex.schema.dropTableIfExists('usuarios');
};