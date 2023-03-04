# Listar enquetes

## Casos de sucesso
1. :heavy_multiplication_x: Recebe requisiçõa do tipo **GET** na rota **/api/loadsurveys**
1. :heavy_multiplication_x: Valida se a requisição foi feita por um usuário
1. :heavy_check_mark: Retorna 204 se não houver nenhuma enquete
1. :heavy_check_mark: Retorna 200 com os dados das enquetes

## Exceções 
1. :heavy_multiplication_x: Retorna erro 404 se a API não existir
1. :heavy_multiplication_x: Retorna erro 403 se não for um usuário
1. :heavy_check_mark: Retorna erro 500 se der erro ao tentar listar enquetes