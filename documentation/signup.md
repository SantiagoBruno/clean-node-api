# SignUp 

## Casos sucesso:
1. :heavy_check_mark: Recebe uma requisição do tipo POST na rota /api/signup
2. :heavy_check_mark: Valida dados obrigatórios **name**, **email**, **password**, e **passwordConfirmation**
3. :heavy_check_mark: Valida que **password** e **passwordConfirmation** são iguais
4. :heavy_check_mark: Valida que o campo **email** é um email válido
5. :heavy_multiplication_x: Valida se já existe um usuário com o email fornecido
6. :heavy_check_mark: Gera uma senha criptografada (Essa senha não pode ser descriptografada)
7. :heavy_check_mark: Cria uma conta para o usuário com os dados informados, substituindo a senha para senha criptografada 
8. :heavy_multiplication_x: Gera um token de acesso a partir do ID do usuário 
9. :heavy_multiplication_x: Atualiza os dados do usuário com o token de acesso gerado
10. :heavy_multiplication_x: Retorna 200 com o token de acesso
11. :heavy_multiplication_x: Envia email de verificação de email

## Exceções:

1. :heavy_check_mark: Retorna erro 404 se a API não existir 
2. :heavy_check_mark: Retorna erro 400 se **name**, **email**, **password**, e **passwordConfirmation** não forem fornecidos pelo client
3. :heavy_check_mark: Retorna erro 400 se **password** e **passwordConfirmation** não forem iguais
4. :heavy_check_mark: Retorna erro 400 se o campo **email** for um email inválido
5. :heavy_multiplication_x: Retorna 403 se o email fornecido já estiver em uso 
6. :heavy_check_mark: Retorna erro 500 se der erro ao tentar gerar uma senha criptografada
7. :heavy_check_mark: Retorna erro 500 se der erro ao tentar criar a conta do usuário
8. :heavy_multiplication_x: Retorna erro 500 se der erro ao tentar gerar o token de acesso
9. :heavy_multiplication_x: Retorna erro 500 se der erro ao tentar atualizar o usuário com o token de acesso gerado