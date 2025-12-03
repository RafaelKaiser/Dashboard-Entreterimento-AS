## Requisição

POST http://localhost:3000/usuarios/cadastro

## Body enviado

{
  "email": "rafael@example.com",
  "senha": "123456"
}

## Resposta obtida (201 OK)
{
  "id": 2,
  "email": "rafael@example.com"
}

====================================================

## Requisição

POST http://localhost:3000/usuarios/login

## Body enviado

{
  "email": "rafael@example.com",
  "senha": "123456"
}

## Resposta obtida (200 OK)

{
    "mensagem": "Login realizado com sucesso!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyYWZhZWxAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjQzODIxNjksImV4cCI6MTc2NDQ2ODU2OX0.h75uS-5WJwvO391F2HXE_H7iT-ZkHsxoN1DxkgWfI1A"
}

====================================================

## Requisição

GET http://localhost:3000/usuarios/perfil

## Header enviado

KEY - Authorization | VALUE - Bearer TOKEN COlADO

## Resposta obtida (200 OK)

{
  "id": 2,
  "email": "rafael@example.com",
  "criado_em": "2025-11-26T..."
}