# Pokédex

Projeto desenvolvido para a entrega do **PM2 (Projeto Multidisciplinar 2)**, dando continuidade ao desenvolvimento da Pokédex iniciado no PM1.

O projeto consiste no desenvolvimento de uma aplicação web voltada à consulta e exploração de informações sobre Pokémon, aplicando conceitos de **UX/UI Design, prototipação, desenvolvimento web, estruturação de dados e metodologia ágil**.

A estrutura dos dados dos Pokémon utilizada no projeto tem como referência a **PokéAPI**, uma API pública que disponibiliza informações sobre os Pokémon.

---

## 1. Objetivo

O desenvolvimento do projeto tem como principais objetivos:

- Aplicar conceitos de **UX/UI Design** no planejamento e organização das interfaces;
- Desenvolver protótipos de alta fidelidade utilizando o **Figma**;
- Aplicar a metodologia ágil **Scrum** na organização e acompanhamento do desenvolvimento;
- Utilizar ferramentas de gerenciamento e documentação, como **Trello** e **Notion**;
- Desenvolver páginas utilizando **HTML5**;
- Aplicar estilização e identidade visual utilizando **CSS3**;
- Utilizar **JavaScript** para trabalhar com estruturas de dados e funcionalidades da aplicação;
- Trabalhar com objetos e arrays baseados na estrutura de dados da **PokéAPI**;
- Desenvolver o projeto de forma colaborativa entre os integrantes da equipe;
- Organizar o código e os arquivos do projeto utilizando uma estrutura adequada para desenvolvimento web.

---

## 2. Metodologia de Desenvolvimento

O desenvolvimento do projeto utiliza a metodologia ágil **Scrum** como base para a organização e acompanhamento das atividades da equipe.

Para auxiliar no gerenciamento do projeto, foram utilizadas as ferramentas **Trello** e **Notion**, permitindo organizar tarefas, documentar informações e acompanhar o desenvolvimento das atividades.

A utilização dessas ferramentas contribuiu para a divisão das responsabilidades entre os integrantes e para o acompanhamento da evolução do projeto.

### Práticas utilizadas

- Organização e divisão das tarefas;
- Definição de prioridades;
- Acompanhamento do progresso;
- Trabalho colaborativo entre os integrantes;
- Documentação das informações do projeto;
- Desenvolvimento incremental;
- Revisão e evolução contínua do projeto.

---

## 3. Integrantes

| Integrante |
|---|
| Gustavo Oliveira |
| Karoline Garlet Goulart |
| Lucas Benjamin Garcia Andrade |
| Vitor Knopka da Silva |
| João Pedro Leão Soares |
| Pedro Roberto Rodrigues Constancio |

---

## 4. Protótipos de Alta Fidelidade

Os protótipos de alta fidelidade foram desenvolvidos no **Figma**, considerando a identidade visual definida para o projeto, a organização das informações, a hierarquia visual e os fluxos de navegação da aplicação.

As telas foram organizadas em dois fluxos principais: **usuário não autenticado** e **usuário autenticado**.

### 4.1 Fluxo não autenticado — Logar

| Tela | Protótipo |
|---|---|
| Login | [Visualizar protótipo](docs/login.pdf) |
| Registro | [Visualizar protótipo](docs/registro.pdf) |
| Site Inicial | [Visualizar protótipo](docs/site-inicial-logar.pdf) |
| Pokédex | [Visualizar protótipo](docs/pokedex-logar.pdf) |
| Detalhes do Pokémon | [Visualizar protótipo](docs/detalhe-logar.pdf) |

### 4.2 Fluxo autenticado — Logado

| Tela | Protótipo |
|---|---|
| Pokédex | [Visualizar protótipo](docs/pokedex-logado.pdf) |
| Detalhes do Pokémon | [Visualizar protótipo](docs/detalhes-logado.pdf) |
| Comparador | [Visualizar protótipo](docs/comparador.pdf) |
| Minha Coleção | [Visualizar protótipo](docs/minha-colecao.pdf) |

---

## 5. Tecnologias e Ferramentas

### Desenvolvimento

- **HTML5** — estrutura das páginas;
- **CSS3** — estilização e identidade visual;
- **JavaScript** — estruturação dos dados e desenvolvimento das funcionalidades.

### Design e Prototipação

- **Figma** — criação dos protótipos de alta fidelidade e planejamento das interfaces.

### Organização e Gerenciamento

- **Trello** — organização das tarefas, divisão das atividades e acompanhamento do progresso;
- **Notion** — documentação e organização das informações do projeto.

### Metodologia

- **Scrum** — metodologia ágil utilizada como base para organização, planejamento e acompanhamento do desenvolvimento.

### Fonte de Dados

- **PokéAPI** — referência para a estrutura e organização dos dados dos Pokémon.

---

## 6. Estrutura de Dados

Foi desenvolvida uma estrutura de dados estática em **JavaScript**, composta por um array contendo **3 objetos Pokémon**.

A estrutura foi elaborada com base no formato dos objetos retornados pela PokéAPI, utilizando propriedades e estruturas semelhantes às disponibilizadas pela API.

Entre as informações utilizadas estão:

- Identificação do Pokémon;
- Nome;
- Altura;
- Peso;
- Tipos;
- Sprite.

A implementação está disponível em:

[`src/js/pokemon.js`](src/js/pokemon.js)

---

## 7. Página Desenvolvida

Como parte da implementação do projeto, foi desenvolvida uma página utilizando **HTML5, CSS3 e JavaScript**, seguindo como referência o protótipo de alta fidelidade desenvolvido no Figma.

Os arquivos responsáveis pela implementação são:

| Arquivo | Descrição |
|---|---|
| [`index.html`](src/index.html) | Estrutura HTML da página |
| [`style.css`](src/css/style.css) | Estilização e identidade visual |
| [`pokemon.js`](src/js/pokemon.js) | Estrutura de dados dos Pokémon |

---

## 8. Organização do Projeto

O repositório foi organizado de forma a separar os arquivos de desenvolvimento e os documentos referentes aos protótipos.

```text
Pokedeex/
│
├── README.md
│
├── docs/
│   ├── login.pdf
│   ├── registro.pdf
│   ├── site-inicial-logar.pdf
│   ├── pokedex-logar.pdf
│   ├── detalhe-logar.pdf
│   ├── pokedex-logado.pdf
│   ├── detalhes-logado.pdf
│   ├── comparador.pdf
│   └── minha-colecao.pdf
│
└── src/
    ├── index.html
    │
    ├── css/
    │   └── style.css
    │
    └── js/
        └── pokemon.js
