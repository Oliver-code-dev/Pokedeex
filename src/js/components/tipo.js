// Selo de tipo do Pokémon (ícone redondo ou, se não houver ícone, selo colorido com texto).

import { h } from "../dom.js";
import { TIPOS_COM_ICONE, TIPOS_PT } from "../config.js";

export function criarTipo(tipo) {
  const nomePt = TIPOS_PT[tipo] ?? tipo;
  if (TIPOS_COM_ICONE.includes(tipo)) {
    return h("span", { class: "tipo", title: nomePt },
      h("img", { src: `assets/img/tipo-${tipo}.png`, alt: nomePt, loading: "lazy" }));
  }
  return h("span", { class: `tipo tipo--texto tipo--${tipo}`, title: nomePt }, nomePt);
}
