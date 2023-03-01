# Forgot password

## Casos de sucesso: 
1. :heavy_multiplication_x: Recebe uma requisição do tipo **POST** na rota **/api/forgotpassword**
1. :heavy_multiplication_x: Valida dado obrigatório: **email** 
1. :heavy_multiplication_x: Valida que o campo **email** é um email válido
1. :heavy_multiplication_x: Envia email para recuperação de senha

## Exceções:
1. :heavy_multiplication_x: Retorna erro 404 se a API não existir
1. :heavy_multiplication_x: Retorna erro 400 se **email** ou não for fornecido pelo client
1. :heavy_multiplication_x: Retorna erro 400 se o campo **email** for um email inválido
1. :heavy_multiplication_x: Retorna erro 500 se der erro ao tentar enviar o email