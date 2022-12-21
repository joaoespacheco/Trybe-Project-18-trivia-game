# Trivia Game 🧠

## 📄 Sobre:

Projeto desenvolvido em <strong>grupo</strong> durante o módulo de front-end do curso de desenvolvimento web da [Trybe](https://www.betrybe.com/).

Neste projeto foi desenvolvido a aplicação de um jogo no estilo [trivia](https://www.collinsdictionary.com/dictionary/english/trivia-game#:~:text=(%CB%88tr%C9%AAv%C9%AA%C9%99%20%C9%A1e%C9%AAm%20)%20or%20trivia%20quiz,unimportant%20facts%20in%20many%20subjects). 

Através da aplicação os usuários poderão:
> * Logar no jogo e, se o email tiver cadastro no site [Gravatar](https://pt.gravatar.com/), ter sua foto associada ao perfil da pessoa usuária.
> * Acessar a página referente ao jogo, onde o usuário deverá escolher uma das respostas disponíveis antes do contador de tempo chegar a zero. 
> * Ser redirecionados ao final do jogo para a tela de score, onde o texto mostrado depende do número de acertos.
> * Visualizar a página de ranking, se quiser, ao final de cada jogo.
> * Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.

Os dados das perguntas utilizadas no projeto originalmente eram obtidos através da [Open Trivia Database](https://opentdb.com/api_config.php). Porém para está aplicação foi criada uma API própria chamada [Tryvia API](https://github.com/peterfritz/tryvia-api) com perguntas e respostas em PT-BR.

Para o gerenciamento do estado global foi utilizada a biblioteca <strong>Redux</strong>.

Também foram realizados testes unitários utilizando <strong>React Testing Library</strong>.

Durante a elaboração do projeto foram utilizadas metodologias de desenvolvimento ágil.

</br>
<details>
<summary><strong>Desempenho</strong></summary>
Aprovado com 100% de desempenho em todos os requisitos
</details>

<details>
<summary><strong>Requisitos</strong></summary>
</br>
<strong>Requisitos obrigatórios:</strong>
</br>
Tela de início/login: </br>
1. Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo  </br>
2. Crie o botão de iniciar o jogo  </br>
3. Crie um botão que leva a pessoa para tela de configuração  </br>
4. Desenvolva testes para atingir 90% de cobertura da tela de Login  </br>
</br>

Tela de jogo: </br>
5. Crie um _header_ que deve conter as informações da pessoa jogadora </br>
6. Crie a página de jogo que deve conter as informações relacionadas à pergunta </br>
7. Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas </br>
8. Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder </br>
9. Crie o placar </br>
10. Crie um botão de next que apareça após a resposta ser dada </br>
</br>

Tela de feedback: </br>
11. Desenvolva o jogo de forma que a pessoa jogadora deve responder 5 perguntas no total </br>
13. Crie a mensagem de _feedback_ para ser exibida a pessoa usuária </br>
14. Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária </br>
15. Crie a opção para a pessoa jogadora poder jogar novamente </br>
16. Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_ </br>
17. Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks </br>
</br>

Tela de ranking: </br>
18. Crie um botão para ir ao início
19. Crie o conteúdo da tela de _ranking_
20. Desenvolva testes para atingir 90% de cobertura da tela de Ranking
</br>

Testes da tela de jogo: </br>
21. Desenvolva testes para atingir 90% de cobertura da tela de Jogo
</br>

Testes de cobertura da aplicação: </br>
22. Desenvolva testes para atingir 95% de cobertura total </br>
</br>
<strong>Requisitos não avaliativos:</strong>
</br>
23. Ao mudar o valor do dropdown categoria, apenas perguntas da categoria selecionada devem aparecer para a pessoa que está jogando  </br>
24. Ao mudar o valor do dropdown dificuldade, apenas perguntas da dificuldade selecionada devem aparecer para a pessoa que está jogando  </br>
25. Ao mudar o valor do dropdown tipo, apenas perguntas do tipo selecionado devem aparecer para a pessoa que está jogando </br>
</details>

<details>
<summary><strong>Visualizar projeto</strong></summary>
:construction: Área em construção ! :construction:
</details>
</br>

## 🤹🏽 Habilidades Desenvolvidas:
* Trabalhar em grupo utilizando metodologias de desenvolvimento ágil
* Desenvolver uma aplicação react utilizando <strong>Redux</strong> como gerenciador de estado global
* Consumir dados de uma API
* Utilizar <strong>React Router</strong>
* Realizar testes unitários utilizando <strong>React Testing Library</strong>
</br>

## 🧰 Ferramentas:
* HTML
* CSS
* JavaScript
* React
  * React Router
  * Redux
  * React Testing Library
* Trello
</br>

## 📝 Desenvolvido por:
* [João Emanuel Soares Pacheco](https://github.com/joaoespacheco)
* [Jean Paul Bernhardt](https://github.com/beralb)
* [Lucas Martins Figueiredo](https://github.com/lucasmartinsf)
* [Leandro Camargo](https://github.com/leandro-bcamargo)
* [Peter Fritz](https://github.com/peterfritz)
