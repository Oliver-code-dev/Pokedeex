import { h } from "../dom.js";
import { icone } from "../icons.js";


/**
 * @param {Object} cfg
 *  icone      nome do ícone (icons.js)      rotulo  texto de acessibilidade do botão
 *  titulo     título dentro do menu         opcoes  () => [{ valor, rotulo, icone? }]
 *  atual      () => valor selecionado       padrao  valor "sem filtro" (não mostra o ponto azul)
 *  aoEscolher (valor) => void               aoMudar () => void  (chamado após escolher)
 * @returns {{ el: HTMLElement, marcar: () => void }}
 */
export function criarFerramentaMenu({ icone: nomeIcone, rotulo, titulo, opcoes, atual, padrao = "", aoEscolher, aoMudar }) {
  const botao = h("button", { class: "btn-icone", type: "button", "aria-label": rotulo, "aria-haspopup": "menu", "aria-expanded": "false" }, icone(nomeIcone));
  const caixa = h("div", { class: "ferramenta" }, botao);
  let menu = null;

  const fechar = () => { menu?.remove(); menu = null; botao.setAttribute("aria-expanded", "false"); };
  const abrir = () => {
    document.dispatchEvent(new Event("fechar-menus"));
    menu = h("div", { class: "menu-opcoes", role: "menu", "aria-label": rotulo },
      h("div", { class: "menu-opcoes__titulo" }, titulo),
      opcoes().map((o) => h("button", {
        class: "menu-opcoes__item", type: "button", role: "menuitemradio", "aria-checked": String(atual() === o.valor),
        onClick: () => { aoEscolher(o.valor); fechar(); aoMudar(); },
      }, o.icone ?? null, o.rotulo)));
    caixa.append(menu);
    botao.setAttribute("aria-expanded", "true");
  };
  botao.addEventListener("click", (e) => { e.stopPropagation(); menu ? fechar() : abrir(); });
  document.addEventListener("fechar-menus", fechar);
  document.addEventListener("click", (e) => { if (menu && !caixa.contains(e.target)) fechar(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(); });


  const marcar = () => {
    const ativo = atual() !== padrao;
    botao.classList.toggle("ativo", ativo);
    caixa.querySelector(".ferramenta__ponto")?.remove();
    if (ativo) caixa.append(h("span", { class: "ferramenta__ponto", "aria-hidden": "true" }));
  };
  return { el: caixa, marcar };
}
