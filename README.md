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

![image](https://user-images.githubusercontent.com/99846604/211173286-ebad2b96-3783-4bab-9006-b2ef2ba88b0c.png)

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
<summary><strong>Imagens do projeto</strong></summary>

### Tela de login:

![image](https://user-images.githubusercontent.com/99846604/211173346-eac3637c-594f-48aa-9697-ef850b17b7e4.png)


### Tela de configurações:

![image](https://user-images.githubusercontent.com/99846604/211173388-7c211c6c-91fb-40ee-a6e2-b2aafd108294.png)

### Tela de jogo:

![image](https://user-images.githubusercontent.com/99846604/211173420-b23e79ae-3d58-455d-8e82-8897e6be592f.png)

### Tela de feedback:

![image](https://user-images.githubusercontent.com/99846604/211173441-37f8c8c3-582d-47af-8804-a700bfc82b91.png)

### Tela de ranking:

![image](https://user-images.githubusercontent.com/99846604/211173448-6d1381f3-2b73-4221-9307-76b1f00693ce.png)

</details>

</br>

### [👨‍💻 Clique aqui para acessar o projeto em seu navegador](https://trivia-joaoespacheco.vercel.app/) 

</br>

## ⚙️ Execução

Faça o clone deste repositório com o seguinte comando:

        git clone git@github.com:joaoespacheco/Trybe-Project-18-trivia-game.git

Dentro da pasta raiz do projeto, instale as dependências com o seguinte comando:

        npm install

Inicie a aplicação com o comando abaixo:

        npm start
        
Para exeutar os testes deve-se utilizar o seguinte comando:

        npm test

Caso queira executar um teste específico, rode o comando abaixo:

        npm test <nome-do-arquivo>

Para executar e verificar a cobertura de testes, rode o comando abaixo:

        npm run test-coverage

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
