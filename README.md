# Pokédex

Projeto desenvolvido para a entrega do **PM2 (Projeto Multidisciplinar 2)**, dando continuidade ao desenvolvimento da Pokédex iniciado no PM1.

A proposta do projeto surgiu a partir de uma necessidade identificada no processo de consulta e organização de informações sobre Pokémon. O usuário precisava recorrer a diferentes fontes para pesquisar informações e utilizava um bloco de notas para registrar manualmente os Pokémon de seu interesse.

A partir dessa necessidade, o projeto busca desenvolver uma aplicação web que reúna informações sobre Pokémon em um único ambiente, proporcionando uma experiência mais organizada e visual para consulta, comparação e organização dos Pokémon.

---

## 1. Contexto do Projeto

O projeto teve início no **Projeto Mensal 1 (PM1)**, a partir da identificação de uma necessidade de um entusiasta de Pokémon.

O problema apresentado estava relacionado à fragmentação das informações. Para pesquisar um Pokémon, o usuário precisava acessar diferentes páginas e fontes na internet, enquanto utilizava um bloco de notas para registrar os Pokémon de seu interesse.

A proposta da aplicação é centralizar essas informações e oferecer recursos que tornem a experiência de consulta e organização mais prática.

Durante o PM1, foram desenvolvidos os artefatos de levantamento e definição do projeto, incluindo:

- Documento de Visão de Projeto;
- Histórias de Usuário;
- Requisitos Funcionais;
- Requisitos Não Funcionais;
- Protótipos de baixa fidelidade;
- Diagrama de Casos de Uso;
- Planejamento e organização das atividades utilizando Scrum e Trello.

O PM2 dá continuidade a esse trabalho, avançando para a prototipação de alta fidelidade e implementação da aplicação.

---

## 2. Objetivos

O desenvolvimento do projeto tem como principais objetivos:

- Aplicar conceitos de **UX/UI Design** no planejamento e organização das interfaces;
- Transformar os requisitos e fluxos definidos no PM1 em protótipos de alta fidelidade;
- Desenvolver protótipos utilizando o **Figma**;
- Aplicar a metodologia ágil **Scrum** na organização e acompanhamento do desenvolvimento;
- Utilizar ferramentas de gerenciamento e documentação, como **Trello** e **Notion**;
- Desenvolver páginas utilizando **HTML5**;
- Aplicar estilização e identidade visual utilizando **CSS3**;
- Utilizar **JavaScript** para estruturação e organização dos dados;
- Trabalhar com objetos e arrays baseados na estrutura de dados da **PokéAPI**;
- Desenvolver o projeto de forma colaborativa entre os integrantes da equipe;
- Evoluir a solução desenvolvida no PM1 para uma implementação baseada nos protótipos definidos no PM2.

---

## 3. Metodologia de Desenvolvimento

O desenvolvimento do projeto utiliza a metodologia ágil **Scrum** como base para a organização e acompanhamento das atividades da equipe.

A metodologia foi definida desde o PM1 e utilizada para auxiliar no planejamento, divisão e acompanhamento das tarefas durante o desenvolvimento do projeto.

### Ferramentas de organização

**Trello**

Utilizado para o registro, organização e acompanhamento das tarefas da equipe.

**Notion**

Utilizado para documentação e organização das informações relacionadas ao projeto.

### Práticas utilizadas

- Organização e divisão das tarefas;
- Definição de prioridades;
- Acompanhamento do progresso;
- Trabalho colaborativo entre os integrantes;
- Documentação das informações do projeto;
- Desenvolvimento incremental;
- Revisão e evolução contínua da aplicação.

---

## 4. Integrantes

| Integrante |
|---|
| Gustavo Oliveira |
| Karoline Garlet Goulart |
| Lucas Benjamin Garcia Andrade |
| Vitor Knopka da Silva |
| João Pedro Leão Soares |
| Pedro Roberto Rodrigues Constancio |

---

## 5. Protótipos de Alta Fidelidade

Os protótipos de alta fidelidade foram desenvolvidos no **Figma** a partir dos requisitos, histórias de usuário e fluxos definidos durante o PM1.

As interfaces foram planejadas considerando a identidade visual, organização das informações, hierarquia visual e experiência de navegação do usuário.

Os protótipos foram organizados em dois fluxos principais:

- Fluxo não autenticado;
- Fluxo autenticado.

### 5.1 Fluxo não autenticado — Logar

| Tela | Protótipo |
|---|---|
| Login | [Visualizar protótipo](docs/login.pdf) |
| Registro | [Visualizar protótipo](docs/registro.pdf) |
| Site Inicial | [Visualizar protótipo](docs/site-inicial-logar.pdf) |
| Pokédex | [Visualizar protótipo](docs/pokedex-logar.pdf) |
| Detalhes do Pokémon | [Visualizar protótipo](docs/detalhe-logar.pdf) |

### 5.2 Fluxo autenticado — Logado

| Tela | Protótipo |
|---|---|
| Pokédex | [Visualizar protótipo](docs/pokedex-logado.pdf) |
| Detalhes do Pokémon | [Visualizar protótipo](docs/detalhes-logado.pdf) |
| Comparador | [Visualizar protótipo](docs/comparador.pdf) |
| Minha Coleção | [Visualizar protótipo](docs/minha-colecao.pdf) |

---

## 6. Tecnologias e Ferramentas

### Desenvolvimento

- **HTML5** — estrutura das páginas;
- **CSS3** — estilização e identidade visual;
- **JavaScript** — estruturação e organização dos dados.

### Design e Prototipação

- **Figma** — criação dos protótipos de alta fidelidade e planejamento das interfaces.

### Organização e Gerenciamento

- **Trello** — registro, organização e acompanhamento das tarefas;
- **Notion** — documentação e organização das informações do projeto.

### Metodologia

- **Scrum** — metodologia ágil utilizada para organização, planejamento e acompanhamento do desenvolvimento.

### Fonte de Dados

- **PokéAPI** — referência para a estrutura e organização dos dados dos Pokémon.

---

## 7. Estrutura de Dados

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

## 8. Recursos Visuais

O projeto utiliza diferentes recursos visuais para compor as interfaces da aplicação, incluindo imagens de Pokémon, fundos, ícones e outros elementos gráficos.

Os arquivos utilizados no desenvolvimento estão organizados na pasta:

[`src/assets/`](src/assets/)

### Organização dos recursos

- **`images/pokemon/`** — imagens e sprites dos Pokémon;
- **`images/backgrounds/`** — imagens utilizadas como fundos e cenários;
- **`images/icons/`** — ícones utilizados nas interfaces;
- **`images/others/`** — outros recursos visuais utilizados no projeto.

A organização dos recursos tem como objetivo facilitar a manutenção do projeto e manter os arquivos separados de acordo com sua finalidade.

---

## 9. Página Desenvolvida

Como parte da implementação do projeto, foi desenvolvida uma página utilizando **HTML5, CSS3 e JavaScript**, tendo como referência o protótipo de alta fidelidade desenvolvido no Figma.

Os arquivos responsáveis pela implementação são:

| Arquivo | Descrição |
|---|---|
| [`index.html`](src/index.html) | Estrutura HTML da página |
| [`style.css`](src/css/style.css) | Estilização e identidade visual |
| [`pokemon.js`](src/js/pokemon.js) | Estrutura de dados dos Pokémon |

---

## 10. Organização do Projeto

O repositório foi organizado de forma a separar os documentos de prototipação dos arquivos utilizados no desenvolvimento da aplicação.

```textPokedeex/
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
    ├── js/
    │   └── pokemon.js
    │
    └── assets/
        ├── images/
        │   ├── pokemon/
        │   ├── backgrounds/
        │   ├── icons/
        │   └── others/
        │
        └── ...
```

### Organização das pastas

**`docs/`**

Armazena os protótipos de alta fidelidade desenvolvidos no Figma.

**`src/`**

Contém os arquivos utilizados na implementação da aplicação.

**`src/css/`**

Contém os arquivos responsáveis pela estilização das páginas.

**`src/js/`**

Contém os arquivos JavaScript e as estruturas de dados utilizadas no projeto.

---

## 11. Evolução do Projeto

O desenvolvimento da aplicação ocorre de forma incremental, acompanhando as etapas propostas nos projetos mensais.

### PM1

Durante o PM1 foram realizados o levantamento e a definição da solução, incluindo:

- Documento de Visão de Projeto;
- Histórias de Usuário;
- Requisitos Funcionais e Não Funcionais;
- Protótipos de baixa fidelidade;
- Diagrama de Casos de Uso;
- Organização das atividades utilizando Scrum e Trello.

### PM2

No PM2, o projeto avança para a etapa de desenvolvimento e detalhamento visual, incluindo:

- Criação dos protótipos de alta fidelidade;
- Definição da identidade visual;
- Estruturação das páginas em HTML;
- Desenvolvimento da estilização utilizando CSS;
- Criação da estrutura de dados em JavaScript;
- Organização dos arquivos do projeto em um repositório GitHub.

---

## 12. Referências

### PokéAPI

A PokéAPI foi utilizada como referência para a estrutura dos objetos e informações dos Pokémon.

[Documentação oficial da PokéAPI](https://pokeapi.co/)

### Figma

O Figma foi utilizado para o desenvolvimento dos protótipos de alta fidelidade e planejamento das interfaces.

[Site oficial do Figma](https://www.figma.com/)

### Trello

O Trello foi utilizado para o registro, organização e acompanhamento das tarefas do projeto.

[Site oficial do Trello](https://trello.com/)

### Notion

O Notion foi utilizado para documentação e organização das informações relacionadas ao projeto.

[Site oficial do Notion](https://www.notion.so/)

---

## 13. Status do Projeto

**Em desenvolvimento.**

O projeto está sendo desenvolvido de forma incremental, seguindo as etapas estabelecidas para o PM2 e dando continuidade à solução inicialmente definida no PM1.
