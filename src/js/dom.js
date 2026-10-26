// Utilitários de DOM usados por todas as páginas.
// Tudo é criado com createElement/textContent (nunca innerHTML com dados),
// o que evita injeção de HTML.

/** Cria um elemento: h("div", { class: "x", onClick: fn }, filho1, filho2) */
export function h(tag, atributos = {}, ...filhos) {
  const el = document.createElement(tag);
  for (const [chave, valor] of Object.entries(atributos || {})) {
    if (valor === false || valor == null) continue;
    if (chave === "class") el.className = valor;
    else if (chave === "dataset") Object.assign(el.dataset, valor);
    else if (chave.startsWith("on") && typeof valor === "function") {
      el.addEventListener(chave.slice(2).toLowerCase(), valor);
    } else if (valor === true) el.setAttribute(chave, "");
    else el.setAttribute(chave, valor);
  }
  for (const filho of filhos.flat()) {
    if (filho == null || filho === false) continue;
    el.append(filho.nodeType ? filho : document.createTextNode(String(filho)));
  }
  return el;
}

export const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
export const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];

/** Remove todos os filhos de um elemento */
export function limpar(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

/** 4 -> "#0004" */
export const formatarNumero = (id) => `#${String(id).padStart(4, "0")}`;

/** "mr-mime" -> "Mr Mime" */
export const capitalizar = (texto = "") =>
  texto.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");

/** Mensagem flutuante: toast("Salvo!", "sucesso" | "erro") */
export function toast(mensagem, tipo = "sucesso") {
  let area = $(".toast-area");
  if (!area) {
    area = h("div", { class: "toast-area", role: "status", "aria-live": "polite" });
    document.body.append(area);
  }
  const item = h("div", { class: `toast toast--${tipo}` }, mensagem);
  area.append(item);
  setTimeout(() => item.remove(), 3200);
}

/** Atraso simples (útil para animações escalonadas) */
export const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
