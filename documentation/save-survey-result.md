# Responder enquete

## Caso de sucesso

1. :heavy_check_mark: Recebe uma requisição do tipo **PUT** na rota **/api/survey/{survey_id}/results**
1. :heavy_check_mark: Valida se a requisição foi feita por um **usuário** autorizado 
1. :heavy_check_mark: Valida o parâmetro **survey_id**
1. :heavy_check_mark: Valida se o campo **answer** é uma resposta válida
1. :heavy_check_mark: **Cria** um resultado de enquete com os dados fornecidos caso não tenha um registro 
1. :heavy_check_mark: **Atualiza** um resultado de enquete com os dados fornecidos daso já tenha 
1. :heavy_check_mark: Retorna **200** com os dados do resultado da enquete

## Exceção 

1. :heavy_check_mark: Retorna erro **404** se a API não existir
1. :heavy_check_mark: Retorna erro **403** se não for um usuário autorizado 
1. :heavy_check_mark: Retorna erro **403** se o survey_id passado na URL for inválido 
1. :heavy_check_mark: Retorna erro **403** se a resposta enviada pelo cliente for uma resposta inválida 
1. :heavy_check_mark: Retorna erro **500** se der erro ao tentar cirar o resultado da enquete
1. :heavy_check_mark: Retorna erro **500** se der erro ao tentar atualizar o resultado da enquete 
1. :heavy_check_mark: Retorna erro **500** se der erro ao tentar carregar a enquete 