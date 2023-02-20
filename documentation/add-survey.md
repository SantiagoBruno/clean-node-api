# Criar enquete

## Casos de sucesso
1. :heavy_multiplication_x: Recebe uma requisição do tipo **POST** na rota **/api/surveys/**
1. :heavy_multiplication_x: Valida se a requisição foi feita por um admin 
1. :heavy_multiplication_x: Valida dados obrigatórios: **question** e **answers**
1. :heavy_multiplication_x: Cria uma enquete com os dados fornecidos 
1. :heavy_check_mark: Retorna 204 

## Exceções 
1. :heavy_multiplication_x: Retorna erro 404 se a API não existir
1. :heavy_multiplication_x: Retorna erro 403 se o usuário não for admin
1. :heavy_check_mark: Retorna erro 400 se **question** ou **answers** não forem fornecidos pelo client
1. :heavy_check_mark: Retorna erro 500 se der erro ao tentar criar enquete