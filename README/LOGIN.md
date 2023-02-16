# Cadastro 

## Casos sucesso:
1. :heavy_check_mark: Recebe uma requisição do tipo POST na rota /api/signup
2. Valida dados obrigatórios **name**, **email**, **password**, e **passwordConfirmation**
3. Valida que **password**, e **passwordConfirmation** são iguais
4. Valida que o campo **email** é um email válido
5. :heavy_multiplication_x: Valida se já existe um usuário com o email fornecido
6. Gera uma senha criptografada (Essa senha não pode ser descriptografada)
7. Cria uma conta para o usuário com os dados informados, substituindo a senha para senha criptografada 
8. Gera um token de acesso a partir do ID do usuário 
9. Atualiza os dados do usuário com o token de acesso gerado
10. Retorna 200 com o token de acesso

## Exceções: