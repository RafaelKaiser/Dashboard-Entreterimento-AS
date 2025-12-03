## Requisição

POST http://localhost:3000/filmes

## Header enviado

KEY:     Authorization          | VALUE:       Bearer TOKEN COlADO

## Body enviado

{
  "tmdb_id": 550
}

## Resposta obtida (201 Created)

{
  "mensagem": "Filme adicionado aos favoritos!",
  "filme": {
    "id": 3,
    "titulo": "Clube da Luta",
    "poster_url": "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "tmdb_id": 550
  }
}

## Resultado

✔ Filme adicionado aos favoritos com sucesso! Dados enriquecidos da API TMDB.

====================================================

## Requisição

POST http://localhost:3000/filmes

## Header enviado

KEY:     Authorization          | VALUE:       Bearer TOKEN COlADO

## Body enviado

{
  "tmdb_id": 680
}

## Resposta obtida (201 Created)

{
  "mensagem": "Filme adicionado aos favoritos!",
  "filme": {
    "id": 4,
    "titulo": "Pulp Fiction: Tempo de Violência",
    "poster_url": "https://image.tmdb.org/t/p/w500/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    "tmdb_id": 680
  }
}

## Resultado

✔ Segundo filme adicionado com sucesso!

====================================================

## Requisição

POST http://localhost:3000/filmes

## Body enviado

{
  "tmdb_id": 550
}

## Resposta obtida (401 Unauthorized)

{
  "erro": "Token não fornecido."
}

## Resultado

✔ Sistema bloqueou corretamente tentativa de adicionar filme sem autenticação.

====================================================

## Requisição

POST http://localhost:3000/filmes

## Header enviado

KEY:     Authorization          | VALUE:       Bearer TOKEN COlADO

## Body enviado

{
  "tmdb_id": 999999999
}

## Resposta obtida (404 Not Found)

{
  "erro": "Filme não encontrado na API do TMDB."
}

## Resultado

✔ Validação funcionando corretamente ao tentar adicionar filme inexistente.

====================================================

## Requisição

GET http://localhost:3000/filmes

## Header enviado

KEY:     Authorization          | VALUE:       Bearer TOKEN COlADO

## Resposta obtida (200 OK)

[
  {
    "id": 3,
    "titulo": "Clube da Luta",
    "poster_url": "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "tmdb_id": 550,
    "usuario_id": 4,
    "criado_em": "2025-12-03T..."
  },
  {
    "id": 4,
    "titulo": "Pulp Fiction: Tempo de Violência",
    "poster_url": "https://image.tmdb.org/t/p/w500/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    "tmdb_id": 680,
    "usuario_id": 4,
    "criado_em": "2025-12-03T..."
  }
]

====================================================

## Requisição

GET http://localhost:3000/filmes

## Resposta obtida (401 Unauthorized)

{
  "erro": "Token não fornecido."
}

====================================================

## Requisição

DELETE http://localhost:3000/filmes/1

## Header enviado

KEY:     Authorization          | VALUE:       Bearer TOKEN COlADO

## Resposta obtida (200 OK)

{
  "mensagem": "Filme removido dos favoritos!"
}

====================================================

## Requisição

DELETE http://localhost:3000/filmes/999

## Header enviado

KEY:     Authorization          | VALUE:       Bearer TOKEN COlADO

## Resposta obtida (404 Not Found)

{
  "erro": "Filme não encontrado ou não pertence a você."
}

====================================================

## Requisição

DELETE http://localhost:3000/filmes/1

## Resposta obtida (401 Unauthorized)

{
  "erro": "Token não fornecido."
}