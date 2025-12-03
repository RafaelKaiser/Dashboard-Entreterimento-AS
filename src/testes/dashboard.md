## Requisição

GET http://localhost:3000/dashboard

## Header enviado

KEY:     Authorization          | VALUE:       Bearer TOKEN COlADO

## Resposta obtida (200 OK)

{
  "meus_favoritos": [
    {
      "id": 3,
      "titulo": "Clube da Luta",
      "poster_url": "https://image.tmdb.org/t/p/w500/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg",
      "tmdb_id": 550,
      "usuario_id": 4,
      "criado_em": "2025-12-03 04:02:31"
    }
  ],
  "filme_popular": {
    "adult": false,
    "backdrop_path": "/5h2EsPKNDdB3MAtOk9MB9Ycg9Rz.jpg",
    "genre_ids": [16, 10751, 35, 12, 9648],
    "id": 1084242,
    "original_language": "en",
    "original_title": "Zootopia 2",
    "overview": "Os detetives Judy Hopps e Nick Wilde se encontram na trilha sinuosa de um réptil misterioso que chega a Zootopia e vira a metrópole dos mamíferos de cabeça para baixo.",
    "popularity": 588.0777,
    "poster_path": "/fthvYnjERbXt3ILjLjHpPNd5IVJ.jpg",
    "release_date": "2025-11-26",
    "title": "Zootopia 2",
    "video": false,
    "vote_average": 7.729,
    "vote_count": 269
  },
  "piada_do_dia": {
    "categories": [],
    "created_at": "2020-01-05 13:42:24.696555",
    "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "id": "vHifE0qvR7y-rbStHCThMA",
    "updated_at": "2020-01-05 13:42:24.696555",
    "url": "https://api.chucknorris.io/jokes/vHifE0qvR7y-rbStHCThMA",
    "value": "Chuck Norris' go-cart is tricked out with twin gatling guns, stinger missiles, an 8,000 horsepower engine and a state-of-th-art sound system. And it can fly."
  }
}
====================================================

## Requisição

GET http://localhost:3000/dashboard

## Resposta obtida (401 Unauthorized)

{
  "erro": "Token não fornecido."
}
