// Textos em português dos Pokémon exibidos no site (a PokéAPI não traz descrição nem
// nome de golpes em português). Para corrigir ou trocar um texto, edite aqui.
//
// descricao  -> texto da seção "Descrição" da tela de detalhes
// movimentos -> { nome, tipo (chave da PokéAPI, ex.: "fire"), pp }

export const DADOS_PT = {
  1: {
    descricao: "O Bulbasaur é um Pokémon da primeira geração da franquia Pokémon, dos tipos Planta e Veneno. Ele carrega uma semente nas costas desde que nasce, e ela cresce junto com ele. É um dos Pokémon iniciais da região de Kanto.",
    movimentos: [
      { nome: "Investida", tipo: "normal", pp: 35 },
      { nome: "Rosnar", tipo: "normal", pp: 40 },
      { nome: "Chicote de Vinha", tipo: "grass", pp: 25 },
      { nome: "Pó do Sono", tipo: "grass", pp: 15 },
    ],
  },
  2: {
    descricao: "O Ivysaur é a evolução do Bulbasaur, dos tipos Planta e Veneno. O bulbo em suas costas cresce e começa a formar um botão de flor, o que o deixa mais pesado e firme sobre as patas. É um Pokémon da região de Kanto.",
    movimentos: [
      { nome: "Investida", tipo: "normal", pp: 35 },
      { nome: "Rosnar", tipo: "normal", pp: 40 },
      { nome: "Chicote de Vinha", tipo: "grass", pp: 25 },
      { nome: "Folha Navalha", tipo: "grass", pp: 25 },
    ],
  },
  3: {
    descricao: "O Venusaur é a evolução final do Bulbasaur, dos tipos Planta e Veneno. Ele tem uma grande flor nas costas, que absorve a luz do sol e a transforma em energia. É um dos Pokémon iniciais mais famosos da região de Kanto.",
    movimentos: [
      { nome: "Chicote de Vinha", tipo: "grass", pp: 25 },
      { nome: "Folha Navalha", tipo: "grass", pp: 25 },
      { nome: "Pó do Sono", tipo: "grass", pp: 15 },
      { nome: "Raio Solar", tipo: "grass", pp: 10 },
    ],
  },
  4: {
    descricao: "O Charmander é um Pokémon da primeira geração da franquia Pokémon. Conhecido por sua aparência de pequeno lagarto alaranjado e pela chama na ponta da cauda, ele é um dos Pokémon iniciais mais famosos da região de Kanto.",
    movimentos: [
      { nome: "Arranhão", tipo: "normal", pp: 35 },
      { nome: "Rosnar", tipo: "normal", pp: 40 },
      { nome: "Brasa", tipo: "fire", pp: 25 },
      { nome: "Cortina de Fumaça", tipo: "normal", pp: 20 },
    ],
  },
  5: {
    descricao: "O Charmeleon é a evolução do Charmander, do tipo Fogo. Ele tem um temperamento agressivo, e a chama na ponta de sua cauda queima com mais intensidade. É um Pokémon da primeira geração, da região de Kanto.",
    movimentos: [
      { nome: "Arranhão", tipo: "normal", pp: 35 },
      { nome: "Rosnar", tipo: "normal", pp: 40 },
      { nome: "Brasa", tipo: "fire", pp: 25 },
      { nome: "Cortina de Fumaça", tipo: "normal", pp: 20 },
    ],
  },
  6: {
    descricao: "O Charizard é a evolução final do Charmander, dos tipos Fogo e Voador. Ele voa pelos céus e solta chamas muito quentes pela boca. É um dos Pokémon iniciais mais famosos da região de Kanto.",
    movimentos: [
      { nome: "Brasa", tipo: "fire", pp: 25 },
      { nome: "Lança-chamas", tipo: "fire", pp: 15 },
      { nome: "Ataque de Asa", tipo: "flying", pp: 35 },
      { nome: "Garra de Dragão", tipo: "dragon", pp: 15 },
    ],
  },
  7: {
    descricao: "O Squirtle é um Pokémon da primeira geração da franquia Pokémon, do tipo Água. Ele se protege dentro do casco e esguicha jatos de água pela boca. É um dos Pokémon iniciais da região de Kanto.",
    movimentos: [
      { nome: "Investida", tipo: "normal", pp: 35 },
      { nome: "Bolhas", tipo: "water", pp: 30 },
      { nome: "Jato d'Água", tipo: "water", pp: 25 },
      { nome: "Mordida", tipo: "dark", pp: 25 },
    ],
  },
  8: {
    descricao: "O Wartortle é a evolução do Squirtle, do tipo Água. Suas orelhas e sua cauda são peludas, e o casco fica mais resistente. É um Pokémon da primeira geração, da região de Kanto.",
    movimentos: [
      { nome: "Investida", tipo: "normal", pp: 35 },
      { nome: "Bolhas", tipo: "water", pp: 30 },
      { nome: "Jato d'Água", tipo: "water", pp: 25 },
      { nome: "Mordida", tipo: "dark", pp: 25 },
    ],
  },
  9: {
    descricao: "O Blastoise é a evolução final do Squirtle, do tipo Água. Ele tem canhões de água no casco, com os quais dispara jatos muito potentes. É um dos Pokémon iniciais mais famosos da região de Kanto.",
    movimentos: [
      { nome: "Jato d'Água", tipo: "water", pp: 25 },
      { nome: "Mordida", tipo: "dark", pp: 25 },
      { nome: "Surfe", tipo: "water", pp: 15 },
      { nome: "Hidrobomba", tipo: "water", pp: 5 },
    ],
  },
  10: {
    descricao: "O Caterpie é um Pokémon da primeira geração da franquia Pokémon, do tipo Inseto. Ele se alimenta de folhas e solta um cheiro forte pelas antenas para afastar os inimigos. Evolui rapidamente e é um Pokémon da região de Kanto.",
    movimentos: [
      { nome: "Investida", tipo: "normal", pp: 35 },
      { nome: "Jato de Seda", tipo: "bug", pp: 40 },
    ],
  },
  // Pokémon da seção "Destaques" da tela de início
  94: {
    descricao: "O Gengar é um Pokémon da primeira geração da franquia Pokémon, dos tipos Fantasma e Veneno. Ele gosta de se esconder nas sombras e é conhecido por seu sorriso largo e travesso. Evolui do Haunter por troca.",
    movimentos: [
      { nome: "Hipnose", tipo: "psychic", pp: 20 },
      { nome: "Bola Sombria", tipo: "ghost", pp: 15 },
      { nome: "Bomba de Lodo", tipo: "poison", pp: 10 },
      { nome: "Soco Sombrio", tipo: "ghost", pp: 20 },
    ],
  },
  778: {
    descricao: "O Mimikyu é um Pokémon dos tipos Fantasma e Fada, da região de Alola. Ele se cobre com um pano que imita um Pikachu e raramente mostra o que existe por baixo dele.",
    movimentos: [
      { nome: "Arranhão", tipo: "normal", pp: 35 },
      { nome: "Garra Sombria", tipo: "ghost", pp: 15 },
      { nome: "Soco Sombrio", tipo: "ghost", pp: 20 },
      { nome: "Bola Sombria", tipo: "ghost", pp: 15 },
    ],
  },
  720: {
    descricao: "O Hoopa é um Pokémon Lendário dos tipos Psíquico e Fantasma, da região de Kalos. Ele usa seus anéis para abrir portais e trazer objetos de lugares distantes.",
    movimentos: [
      { nome: "Confusão", tipo: "psychic", pp: 25 },
      { nome: "Psíquico", tipo: "psychic", pp: 10 },
      { nome: "Bola Sombria", tipo: "ghost", pp: 15 },
      { nome: "Soco Sombrio", tipo: "ghost", pp: 20 },
    ],
  },
};
