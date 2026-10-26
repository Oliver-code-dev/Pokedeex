// Cards de Pokémon: normal (com dados) e bloqueado ("????").

import { h, formatarNumero } from "../dom.js";
import { icone } from "../icons.js";
import { criarTipo } from "./tipo.js";

function botaoFavorito(pokemon, favoritado, aoAlternar) {
  const botao = h("button", {
    class: "btn-favorito", type: "button", "aria-pressed": String(favoritado),
    "aria-label": `Favoritar ${pokemon.nome}`,
  }, icone("coracao"));
  botao.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const novo = botao.getAttribute("aria-pressed") !== "true";
    botao.setAttribute("aria-pressed", String(novo));
    botao.classList.remove("pulsar");
    void botao.offsetWidth; // reinicia a animação
    botao.classList.add("pulsar");
    aoAlternar?.(pokemon, novo);
  });
  return botao;
}

/**
 * @param {Object} pokemon  retorno de api.getPokemon
 * @param {Object} [opcoes]
 *   mostrarFavorito (bool), favoritado (bool), aoFavoritar(pokemon, novoEstado),
 *   href (string), revelar (bool) -> animação de flip, atraso (segundos)
 */
export function criarCardPokemon(pokemon, { mostrarFavorito = false, favoritado = false, aoFavoritar, href, revelar = false, atraso = 0 } = {}) {
  const card = h("article", {
    class: `card-pokemon${revelar ? " card-pokemon--revelar" : ""}`,
    style: atraso ? `--atraso:${atraso}s` : null,
    dataset: { id: pokemon.id },
  },
    h("a", { class: "card-pokemon__link", href: href ?? `detalhes.html?id=${pokemon.id}`, "aria-label": `Ver detalhes de ${pokemon.nome}` }),
    h("div", { class: "card-pokemon__topo" },
      h("div", {},
        h("div", { class: "card-pokemon__numero" }, formatarNumero(pokemon.id)),
        h("div", { class: "card-pokemon__nome" }, pokemon.nome)
      ),
      mostrarFavorito ? botaoFavorito(pokemon, favoritado, aoFavoritar) : null
    ),
    h("div", { class: "card-pokemon__figura" },
      h("img", { src: pokemon.imagem, alt: pokemon.nome, loading: "lazy", width: 475, height: 475 })
    ),
    h("div", { class: "card-pokemon__tipos" }, pokemon.tipos.map(criarTipo))
  );
  return card;
}

/** Card "????" para Pokémon ainda não descobertos */
export function criarCardBloqueado({ mostrarFavorito = false } = {}) {
  return h("article", { class: "card-pokemon card-pokemon--bloqueado", "aria-label": "Pokémon não descoberto" },
    h("div", { class: "card-pokemon__topo" },
      h("div", {},
        h("div", { class: "card-pokemon__numero" }, "#????"),
        h("div", { class: "card-pokemon__nome" }, "???????")
      ),
      mostrarFavorito ? h("span", { class: "btn-favorito", "aria-hidden": "true" }, icone("coracao")) : null
    ),
    h("div", { class: "card-pokemon__figura", "aria-hidden": "true" }, "?")
  );
}

/** Card de carregamento (esqueleto) */
export function criarCardEsqueleto() {
  return h("article", { class: "card-pokemon esqueleto", "aria-hidden": "true" });
}
