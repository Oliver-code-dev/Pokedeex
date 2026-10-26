// Barras de atributos de batalha (HP, Ataque, ...). A largura anima de 0 até o valor.

import { h } from "../dom.js";
import { STATS, STAT_MAXIMO } from "../config.js";

/**
 * @param {Object} pokemon  objeto retornado por api.getPokemon
 * @param {Object} [opcoes] { comparar: outroPokemon } marca em verde o maior valor
 */
export function criarBarrasStats(pokemon, { comparar = null } = {}) {
  const lista = h("div", { class: "stats" });
  for (const { chave, rotulo } of STATS) {
    const valor = pokemon?.stats?.[chave];
    const outro = comparar?.stats?.[chave];
    const maior = valor != null && outro != null && valor > outro;
    const preench = h("span", { class: `stat__preench${maior ? " stat__preench--maior" : ""}` });
    lista.append(
      h("div", { class: "stat" },
        h("span", { class: "stat__nome" }, rotulo),
        h("div", { class: "stat__barra", role: "img", "aria-label": `${rotulo}: ${valor ?? "desconhecido"}` }, preench),
        h("span", { class: "stat__valor" }, valor ?? "??")
      )
    );
    // dispara a transição depois de inserir no DOM
    const alvo = valor == null ? 0 : Math.min(100, (valor / STAT_MAXIMO) * 100);
    requestAnimationFrame(() => requestAnimationFrame(() => { preench.style.width = `${alvo}%`; }));
  }
  return lista;
}
