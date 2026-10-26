// Configurações e constantes compartilhadas por todo o projeto.

export const POKEAPI = "https://pokeapi.co/api/v2";

// Versão do cache. Se a estrutura dos dados mudar, aumente este número
// e o cache antigo do LocalStorage é ignorado automaticamente.
export const CACHE_VERSAO = 2;

// Os 10 Pokémon iniciais exibidos (#0001 a #0010)
export const IDS_INICIAIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// IDs que podem ser abertos na tela de detalhes: os 10 da lista + os 3 dos Destaques
export const IDS_PERMITIDOS = [...IDS_INICIAIS, 94, 778, 720];

// Pokémon da seção "Destaques" da tela de início (Gengar, Mimikyu, Hoopa)
export const DESTAQUES = [
  { id: 94, imagem: "assets/img/destaque-gengar.png", cor: "#c77dff" },
  { id: 778, imagem: "assets/img/destaque-mimikyu.png", cor: "#e6df82" },
  { id: 720, imagem: "assets/img/destaque-hoopa.png", cor: "#e87d96" },
];

// Gerações: nome da região e intervalo de IDs na Pokédex Nacional
export const GERACOES = {
  1: { regiao: "Kanto", de: 1, ate: 151 },
  2: { regiao: "Johto", de: 152, ate: 251 },
  3: { regiao: "Hoenn", de: 252, ate: 386 },
  4: { regiao: "Sinnoh", de: 387, ate: 493 },
  5: { regiao: "Unova", de: 494, ate: 649 },
  6: { regiao: "Kalos", de: 650, ate: 721 },
  7: { regiao: "Alola", de: 722, ate: 809 },
  8: { regiao: "Galar", de: 810, ate: 905 },
  9: { regiao: "Paldea", de: 906, ate: 1025 },
};

// Nome dos tipos em português
export const TIPOS_PT = {
  normal: "Normal", fire: "Fogo", water: "Água", electric: "Elétrico", grass: "Planta",
  ice: "Gelo", fighting: "Lutador", poison: "Veneno", ground: "Terra", flying: "Voador",
  psychic: "Psíquico", bug: "Inseto", rock: "Pedra", ghost: "Fantasma", dragon: "Dragão",
  dark: "Sombrio", steel: "Aço", fairy: "Fada",
};

// Tipos que já têm ícone desenhado em assets/img/tipo-<nome>.png
export const TIPOS_COM_ICONE = ["fire", "flying", "water", "bug", "poison", "grass", "ghost", "psychic"];

// Atributos de batalha: chave da PokéAPI -> rótulo na interface
export const STATS = [
  { chave: "hp", rotulo: "HP" },
  { chave: "attack", rotulo: "Ataque" },
  { chave: "defense", rotulo: "Defesa" },
  { chave: "special-attack", rotulo: "At. Esp." },
  { chave: "special-defense", rotulo: "Def. Esp." },
  { chave: "speed", rotulo: "Velocidade" },
];
export const STAT_MAXIMO = 255; // valor máximo possível de um atributo base

// Chaves do LocalStorage (todas com prefixo para não colidir com outros apps)
export const CHAVES = {
  usuarios: "gugudex:usuarios",
  sessao: "gugudex:sessao",
  favoritos: "gugudex:favoritos",       // { [usuarioId]: [pokemonId, ...] }
  comparacoes: "gugudex:comparacoes",   // { [usuarioId]: [ {...}, ... ] }
  newsletter: "gugudex:newsletter",
  cache: "gugudex:cache",               // prefixo do cache da PokéAPI
};
