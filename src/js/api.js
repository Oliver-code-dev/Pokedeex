// Acesso à PokéAPI (https://pokeapi.co) com cache no LocalStorage.
//
// - getPokemon(id)     -> dados básicos (cards, comparador): nome, nome em japonês,
//                         tipos, atributos, peso, altura, geração, imagem.
// - getDetalhes(id)    -> getPokemon + movimentos e cadeia de evolução (tela de detalhes).
//
// Os nomes em japonês vêm do endpoint /pokemon-species (campo "names").
// Depois da 1ª consulta, tudo fica salvo no LocalStorage e a Pokédex abre
// instantaneamente (e funciona mesmo sem internet para o que já foi visto).

import { POKEAPI, CACHE_VERSAO, CHAVES, GERACOES, TIPOS_PT } from "./config.js";
import { DADOS_PT } from "./dados-pt.js";
import { ler, gravar } from "./storage.js";
import { capitalizar } from "./dom.js";

const emAndamento = new Map(); // evita pedir o mesmo Pokémon duas vezes ao mesmo tempo

const chaveCache = (tipo, id) => `${CHAVES.cache}:v${CACHE_VERSAO}:${tipo}:${id}`;

async function buscarJson(url) {
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error(`PokéAPI respondeu ${resposta.status} para ${url}`);
  return resposta.json();
}

/** Cache + deduplicação: executa `carregar` só se não houver no cache */
async function comCache(tipo, id, carregar) {
  const chave = chaveCache(tipo, id);
  const guardado = ler(chave);
  if (guardado) return guardado;
  if (emAndamento.has(chave)) return emAndamento.get(chave);

  const promessa = carregar()
    .then((dado) => { gravar(chave, dado); return dado; })
    .finally(() => emAndamento.delete(chave));
  emAndamento.set(chave, promessa);
  return promessa;
}

/* ---------- Pokémon básico ---------- */

function normalizarPokemon(pokemon, especie) {
  const nomeEn = especie.names.find((n) => n.language.name === "en")?.name ?? capitalizar(pokemon.name);
  const jp = especie.names.find((n) => n.language.name === "ja-Hrkt") ?? especie.names.find((n) => n.language.name === "ja");
  const geracao = Number(especie.generation.url.match(/\/generation\/(\d+)\//)[1]);
  const tipos = [...pokemon.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name);
  const stats = Object.fromEntries(pokemon.stats.map((s) => [s.stat.name, s.base_stat]));
  const artes = pokemon.sprites.other?.["official-artwork"];
  const regiao = GERACOES[geracao]?.regiao ?? "";

  return {
    id: pokemon.id,
    slug: pokemon.name,
    nome: nomeEn,
    nomeJa: jp?.name ?? "",
    tipos,
    stats,
    peso: pokemon.weight / 10,   // hectogramas -> kg
    altura: pokemon.height / 10, // decímetros -> m
    geracao,
    regiao,
    imagem: artes?.front_default ?? pokemon.sprites.front_default,
    imagemBrilhante: artes?.front_shiny ?? null,
    // descrição em português escrita à mão (js/dados-pt.js); se não houver, monta uma a partir dos dados
    descricao: DADOS_PT[pokemon.id]?.descricao ??
      `${nomeEn} é um Pokémon do tipo ${tipos.map((t) => TIPOS_PT[t] ?? t).join(" / ")} ` +
      `da ${geracao}ª geração${regiao ? `, da região de ${regiao}` : ""}. ` +
      `Pesa ${String(pokemon.weight / 10).replace(".", ",")} kg e mede ${String(pokemon.height / 10).replace(".", ",")} m.`,
    cadeiaEvolucao: especie.evolution_chain?.url ?? null,
  };
}

export function getPokemon(id) {
  return comCache("pokemon", id, async () => {
    const [pokemon, especie] = await Promise.all([
      buscarJson(`${POKEAPI}/pokemon/${id}`),
      buscarJson(`${POKEAPI}/pokemon-species/${id}`),
    ]);
    return normalizarPokemon(pokemon, especie);
  });
}

/** Vários de uma vez, mantendo a ordem. Falhas individuais viram `null`. */
export async function getVarios(ids) {
  const resultados = await Promise.allSettled(ids.map(getPokemon));
  return resultados.map((r) => (r.status === "fulfilled" ? r.value : null));
}

/* ---------- Detalhes: movimentos e evolução ---------- */

/** Transforma a árvore de evolução em estágios: [[{id,nome}], [{id,nome,nivel}], ...] */
function achatarEvolucoes(cadeia) {
  const estagios = [];
  let atual = [{ no: cadeia, nivel: null }];
  while (atual.length) {
    estagios.push(
      atual.map(({ no, nivel }) => ({
        id: Number(no.species.url.match(/\/pokemon-species\/(\d+)\//)[1]),
        nivel,
      }))
    );
    atual = atual.flatMap(({ no }) =>
      no.evolves_to.map((prox) => {
        const det = prox.evolution_details[0] ?? {};
        return { no: prox, nivel: det.min_level ?? (det.trigger?.name === "trade" ? "Troca" : det.item ? "Pedra ou item" : "?") };
      })
    );
  }
  return estagios;
}

export function getDetalhes(id) {
  return comCache("detalhes", id, async () => {
    const base = await getPokemon(id);
    const evolucao = base.cadeiaEvolucao ? await buscarJson(base.cadeiaEvolucao).then((c) => achatarEvolucoes(c.chain)) : [];
    const { cadeiaEvolucao, ...resto } = base;
    return { ...resto, movimentos: DADOS_PT[id]?.movimentos ?? [], evolucao };
  });
}
