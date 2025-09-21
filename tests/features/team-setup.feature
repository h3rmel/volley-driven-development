# language: pt
Funcionalidade: Configuração de Times de Vôlei
Como um árbitro de vôlei
Eu quero configurar os nomes dos times antes do jogo
Para personalizar a experiência e identificar corretamente os times durante a partida

Cenário: Configurar nomes dos times com sucesso
Dado que estou na tela de configuração de times
Quando preencho "Flamengo" como nome do Time A
E preencho "Santos" como nome do Time B
E clico no botão "Iniciar Jogo"
Então devo ver o placar inicial "Flamengo 0 x 0 Santos"
E devo estar na tela do jogo

Cenário: Configurar times com nomes especiais
Dado que estou na tela de configuração de times
Quando preencho "Águias Douradas" como nome do Time A
E preencho "Leões do Mar" como nome do Time B
E clico no botão "Iniciar Jogo"
Então devo ver o placar inicial "Águias Douradas 0 x 0 Leões do Mar"

Cenário: Nome vazio para Time A não é permitido
Dado que estou na tela de configuração de times
Quando preencho "" como nome do Time A
E preencho "Santos" como nome do Time B
E clico no botão "Iniciar Jogo"
Então devo ver a mensagem de erro "Nome do Time A não pode estar vazio"
E devo continuar na tela de configuração

Cenário: Nome vazio para Time B não é permitido
Dado que estou na tela de configuração de times
Quando preencho "Flamengo" como nome do Time A
E preencho "" como nome do Time B
E clico no botão "Iniciar Jogo"
Então devo ver a mensagem de erro "Nome do Time B não pode estar vazio"
E devo continuar na tela de configuração

Cenário: Nomes apenas com espaços não são permitidos
Dado que estou na tela de configuração de times
Quando preencho "   " como nome do Time A
E preencho "Santos" como nome do Time B
E clico no botão "Iniciar Jogo"
Então devo ver a mensagem de erro "Nome do Time A não pode estar vazio"
E devo continuar na tela de configuração

Cenário: Nomes iguais não são permitidos
Dado que estou na tela de configuração de times
Quando preencho "Flamengo" como nome do Time A
E preencho "Flamengo" como nome do Time B
E clico no botão "Iniciar Jogo"
Então devo ver a mensagem de erro "Times devem ter nomes diferentes"
E devo continuar na tela de configuração

Cenário: Fluxo completo - configuração até pontuação
Dado que estou na tela de configuração de times
Quando preencho "Corinthians" como nome do Time A
E preencho "Palmeiras" como nome do Time B
E clico no botão "Iniciar Jogo"
E eu clico no botão de adicionar ponto para o "Corinthians"
E eu clico no botão de adicionar ponto para o "Palmeiras"
Então o placar do set atual deve ser "Corinthians 1 x 1 Palmeiras"

Cenário: Iniciar novo jogo volta para configuração
Dado que estou na tela do jogo com times "Botafogo" e "Vasco"
E que o placar do set atual é "Botafogo 5 x 3 Vasco"
Quando clico no botão "Novo Jogo"
Então devo estar na tela de configuração de times
E os campos de nome devem estar vazios
