// Comparador: dois Pokémon lado a lado. Aceita ?a=4&b=7 na URL e permite salvar a comparação.
import { montarLayout } from "../layout.js";
import { STATS, IDS_INICIAIS } from "../config.js";
import { getVarios } from "../api.js";
import { getSessao, getComparacoes, salvarComparacao } from "../storage.js";
import { criarBarrasStats } from "../components/stats.js";
import { $, h, limpar, toast, formatarNumero } from "../dom.js";
import { icone } from "../icons.js";


montarLayout({ ativo: "comparador" });


const sessao = getSessao();
const params = new URLSearchParams(location.search);
const idDaUrl = (chave) => { const n = Number(params.get(chave)); return Number.isInteger(n) && n > 0 ? n : null; };


/* ---------- Estado ---------- */
const lista = new Map(); // id -> Pokémon (somente os 10 da Pokédex)
const escolhidos = [null, null];
const lados = [];
let urlLiberada = false;


const soma = (p) => STATS.reduce((t, { chave }) => t + (p.stats[chave] ?? 0), 0);


/* ---------- Montagem dos lados ---------- */
function criarLado(indice) {
  const moldura = h("div", { class: "cmp-moldura" });
  const select = h("select", { class: "select-pokemon", "aria-label": `Escolher o ${indice + 1}º Pokémon` }, h("option", { value: "" }, "Pokémon"));
  select.addEventListener("change", () => {
    escolhidos[indice] = lista.get(Number(select.value)) ?? null;
    atualizar();
  });
  const painel = h("div", { class: "cmp-painel" });
  lados.push({ moldura, select, painel });
  return h("div", { class: "cmp-lado" }, moldura, h("div", { class: "cmp-select-caixa" }, select));
}


function preencherOpcoes() {
  const ordenados = [...lista.values()].sort((a, b) => a.id - b.id);
  lados.forEach(({ select }) => {
    const atual = select.value;
    [...select.options].slice(1).forEach((o) => o.remove());
    ordenados.forEach((p) => select.append(h("option", { value: p.id }, `${formatarNumero(p.id)} ${p.nome}`)));
    select.value = atual;
  });
}


/* ---------- Atualização ---------- */
function atualizar() {
  const [a, b] = escolhidos;
  const venc = vencedor(a, b);


  lados.forEach((lado, i) => {
    const p = escolhidos[i];
    lado.select.value = p ? String(p.id) : "";
    lado.moldura.classList.toggle("cmp-moldura--vencedor", venc === i);
    limpar(lado.moldura).append(
      ...(p
        ? [h("span", { class: "cmp-moldura__num" }, formatarNumero(p.id)),
           h("span", { class: "cmp-moldura__nome" }, p.nome),
           h("span", { class: "cmp-moldura__jp", "aria-hidden": "true" }, p.nomeJa),
           h("img", { class: "cmp-moldura__arte", src: p.imagem, alt: p.nome })]
        : [h("span", { class: "cmp-moldura__vazio" }, "?")])
    );
  });


  // painéis de atributos
  const paineis = $("#paineis");
  limpar(paineis);
  escolhidos.forEach((p, i) => {
    const outro = escolhidos[1 - i];
    paineis.append(h("div", { class: "cmp-painel" },
      criarBarrasStats(p, { comparar: p && outro ? outro : null })));
  });


  botaoTrocar.hidden = !(a && b);
  montarAcoes();


  if (!urlLiberada) return; // antes do carregamento inicial não mexe na URL
  // mantém a escolha na URL (recarregar a página não perde a comparação)
  const url = new URL(location.href);
  a ? url.searchParams.set("a", a.id) : url.searchParams.delete("a");
  b ? url.searchParams.set("b", b.id) : url.searchParams.delete("b");
  history.replaceState(null, "", url);
}


/** 0 = esquerda vence, 1 = direita vence, -1 = empate, null = falta escolher */
function vencedor(a, b) {
  if (!a || !b) return null;
  const pa = soma(a), pb = soma(b);
  return pa === pb ? -1 : pa > pb ? 0 : 1;
}


/* ---------- Ações: trocar lados e salvar ---------- */
function montarAcoes() {
  const area = $("#acoes");
  limpar(area);
  const [a, b] = escolhidos;
  if (!a || !b) return;


  if (!sessao) {
    area.append(h("p", { class: "cmp-acoes__aviso" },
      h("a", { href: "login.html?next=" + encodeURIComponent("comparador.html" + location.search) }, "Entre"),
      " ou ", h("a", { href: "registro.html" }, "crie uma conta"), " para salvar esta comparação."));
    return;
  }


  const titulo = h("input", { type: "text", maxlength: "40", placeholder: `${a.nome} vs ${b.nome}`, "aria-label": "Título da comparação" });
  const form = h("form", { class: "cmp-acoes", novalidate: true },
    h("div", { class: "campo" }, h("label", { class: "campo__caixa" }, titulo)),
    h("button", { class: "btn", type: "submit" }, "Salvar comparação"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ja = getComparacoes(sessao.usuarioId).some((c) => c.a === a.id && c.b === b.id);
    if (ja) { toast("Você já salvou esta comparação.", "erro"); return; }
    salvarComparacao(sessao.usuarioId, { a: a.id, b: b.id, titulo: titulo.value || `${a.nome} vs ${b.nome}` });
    toast("Comparação salva em Minha coleção!");
    titulo.value = "";
  });
  area.append(form);
}


/* ---------- Início ---------- */
const arena = $("#lados");
const botaoTrocar = h("button", {
  class: "cmp-trocar", type: "button", hidden: true, title: "Trocar de lado", "aria-label": "Trocar os Pokémon de lado",
  onClick: () => { escolhidos.reverse(); atualizar(); },
}, icone("trocar", 26));
arena.append(criarLado(0), criarLado(1), h("span", { class: "cmp-vs", "aria-hidden": "true" }, "VS"), botaoTrocar);
atualizar();


const idsUrl = [idDaUrl("a"), idDaUrl("b")];
(await getVarios(IDS_INICIAIS)).filter(Boolean).forEach((p) => lista.set(p.id, p));


if (lista.size === 0) {
  $("#resumo").textContent = "Não foi possível carregar os Pokémon. Verifique sua conexão e recarregue a página.";
} else {
  preencherOpcoes();
  idsUrl.forEach((id, i) => { escolhidos[i] = id ? lista.get(id) ?? null : null; });
  urlLiberada = true;
  atualizar();
}
