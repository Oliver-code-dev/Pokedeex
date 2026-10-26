// Tela de Início: hero, destaques, prévia da Pokédex e prévia do Comparador.
import { montarLayout } from "../layout.js";
import { IDS_INICIAIS, DESTAQUES } from "../config.js";
import { getVarios } from "../api.js";
import { getSessao, isFavorito, alternarFavorito } from "../storage.js";
import { criarCardPokemon, criarCardEsqueleto } from "../components/card.js";
import { criarTipo } from "../components/tipo.js";
import { criarBarrasStats } from "../components/stats.js";
import { $, h, limpar, formatarNumero } from "../dom.js";

montarLayout({ ativo: "inicio" });

const sessao = getSessao();
if (sessao) $("#cta-hero").textContent = "Ir para a Pokédex";
else $("#cta-hero").href = "registro.html";

/* ---------- Destaques ---------- */

function criarDestaque(pokemon, { imagem, cor }, indice) {
  return h("a", {
    class: "destaque anima-subir", href: `detalhes.html?id=${pokemon.id}`,
    style: `--cor:${cor};animation-delay:${indice * 0.12}s`,
    "aria-label": `${pokemon.nome}, ${formatarNumero(pokemon.id)}`,
  },
    h("div", { class: "destaque__moldura" },
      h("span", { class: "destaque__num" }, formatarNumero(pokemon.id)),
      h("span", { class: "destaque__nome" }, pokemon.nome),
      h("div", { class: "destaque__tipos" },
        h("span", { class: "destaque__tipos-rotulo" }, "TIPOS"),
        h("div", { class: "destaque__tipos-caixa" }, pokemon.tipos.map(criarTipo))
      ),
      h("span", { class: "destaque__jp", "aria-hidden": "true" }, pokemon.nomeJa),
      h("img", { class: "destaque__arte", src: imagem, alt: pokemon.nome, loading: "lazy" })
    )
  );
}

async function carregarDestaques() {
  const lista = $("#destaques-lista");
  const dados = await getVarios(DESTAQUES.map((d) => d.id));
  limpar(lista);
  dados.forEach((p, i) => {
    if (p) lista.append(criarDestaque(p, DESTAQUES[i], i));
  });
  if (!lista.children.length) lista.append(h("p", { class: "estado-vazio" }, "Não foi possível carregar os destaques."));
}

/* ---------- Pokédex (prévia) ---------- */

const grade = $("#pokedex-grade");
let carregados = []; // os 10 Pokémon exibidos (também alimentam o comparador)

function cardDaPrevia(pokemon, i) {
  return criarCardPokemon(pokemon, {
    mostrarFavorito: Boolean(sessao),
    favoritado: sessao ? isFavorito(sessao.usuarioId, pokemon.id) : false,
    aoFavoritar: (p) => alternarFavorito(sessao.usuarioId, p.id),
    revelar: true,
    atraso: i * 0.06,
  });
}

async function carregarPokedex() {
  grade.append(...IDS_INICIAIS.map(criarCardEsqueleto));
  const dados = (await getVarios(IDS_INICIAIS)).filter(Boolean);
  limpar(grade);
  if (!dados.length) {
    $("#pokedex-erro").hidden = false;
    return;
  }
  carregados = dados;
  dados.forEach((p, i) => grade.append(cardDaPrevia(p, i)));
}

/* ---------- Comparador (prévia) ---------- */

const escolhidos = [null, null];
const slots = [];

function criarSlot(indice) {
  const moldura = h("div", { class: "vs-slot__moldura" }, h("span", { class: "vs-slot__vazio" }, "?"));
  const stats = h("div", { class: "vs-slot__stats" });
  const select = h("select", { class: "select-pokemon", "aria-label": `Escolher o ${indice + 1}º Pokémon` },
    h("option", { value: "" }, "Pokémon"));
  select.addEventListener("change", () => {
    escolhidos[indice] = carregados.find((p) => String(p.id) === select.value) ?? null;
    redesenharComparador();
  });
  slots.push({ moldura, stats, select });
  return h("div", { class: "vs-slot" }, moldura, stats, select);
}

function atualizarOpcoesComparador() {
  for (const { select } of slots) {
    const atual = select.value;
    [...select.options].slice(1).forEach((o) => o.remove());
    carregados.forEach((p) => select.append(h("option", { value: p.id }, `${formatarNumero(p.id)} ${p.nome}`)));
    select.value = atual;
  }
}

function redesenharComparador() {
  slots.forEach((slot, i) => {
    const p = escolhidos[i];
    const outro = escolhidos[1 - i];
    limpar(slot.moldura);
    if (p) {
      slot.moldura.append(
        h("span", { class: "vs-slot__num" }, formatarNumero(p.id)),
        h("img", { class: "vs-slot__arte", src: p.imagem, alt: p.nome })
      );
    } else {
      slot.moldura.append(h("span", { class: "vs-slot__vazio" }, "?"));
    }
    limpar(slot.stats).append(criarBarrasStats(p, { comparar: p && outro ? outro : null }));
  });
}

const arena = $("#vs-slots");
arena.append(criarSlot(0), criarSlot(1), h("span", { class: "vs-texto", "aria-hidden": "true" }, "VS"));
redesenharComparador();

/* ---------- Início ---------- */
carregarDestaques();
await carregarPokedex();
atualizarOpcoesComparador();
