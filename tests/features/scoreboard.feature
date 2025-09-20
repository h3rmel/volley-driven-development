# language: pt
Funcionalidade: Placar de Vôlei
Como um árbitro de vôlei
Eu quero registrar pontos dos times
Para manter o controle do placar durante a partida

Cenário: Adicionar um ponto para o Time A durante o jogo
Dado que o placar do set atual é "Time A 10 x 9 Time B"
Quando eu clico no botão de adicionar ponto para o "Time A"
Então o placar do set atual deve ser "Time A 11 x 9 Time B"

Cenário: Adicionar um ponto para o Time B durante o jogo
Dado que o placar do set atual é "Time A 15 x 12 Time B"
Quando eu clico no botão de adicionar ponto para o "Time B"
Então o placar do set atual deve ser "Time A 15 x 13 Time B"

Cenário: Começar jogo do zero
Dado que o placar do set atual é "Time A 0 x 0 Time B"
Quando eu clico no botão de adicionar ponto para o "Time A"
Então o placar do set atual deve ser "Time A 1 x 0 Time B"

Cenário: Empatar o placar
Dado que o placar do set atual é "Time A 20 x 19 Time B"
Quando eu clico no botão de adicionar ponto para o "Time B"
Então o placar do set atual deve ser "Time A 20 x 20 Time B"

Cenário: Times com nomes personalizados
Dado que o placar do set atual é "Águias 5 x 3 Leões"
Quando eu clico no botão de adicionar ponto para o "Leões"
Então o placar do set atual deve ser "Águias 5 x 4 Leões"

Cenário: Um time atinge 25 pontos e vence o set
Dado que o placar do set atual é "Time A 24 x 20 Time B"
Quando eu clico no botão de adicionar ponto para o "Time A"
Então o placar de sets vencidos deve ser atualizado para "Time A 1 x 0 Time B"
E o placar do próximo set deve ser resetado para "Time A 0 x 0 Time B"