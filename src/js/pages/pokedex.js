import { montarLayout } from "../layout.js";
import { GERACOES, TIPOS_PT, IDS_INICIAIS } from "../config.js";
import { getVarios } from "../api.js";
import { getSessao, isFavorito, alternarFavorito } from "../storage.js";
import { criarCardPokemon, criarCardBloqueado } from "../components/card.js";
import { criarTipo } from "../components/tipo.js";
import { criarFerramentaMenu } from "../components/ferramentas.js";
import { icone } from "../icons.js";
import { $, h, limpar, toast, formatarNumero } from "../dom.js";


montarLayout({ ativo: "pokedex" });


const sessao = getSessao();
const LINHA = 5; // cards por linha (e quantos ficam visíveis quando a geração está recolhida)

const estado = {
  busca: "",
  tipo: "",          // "" = todos
  geracao: 0,        // 0 = todas
  ordem: "numero-asc",
  expandidas: new Set([1]),   // gerações abertas (a 1ª começa aberta, como no design)
  pokemons: new Map(),        // id -> dados (os 10 Pokémon da lista)
};


const ORDENS = {
  "numero-asc": { rotulo: "Número (crescente)", fn: (a, b) => a.id - b.id },
  "numero-desc": { rotulo: "Número (decrescente)", fn: (a, b) => b.id - a.id },
  "nome-asc": { rotulo: "Nome (A–Z)", fn: (a, b) => a.nome.localeCompare(b.nome) },
  "nome-desc": { rotulo: "Nome (Z–A)", fn: (a, b) => b.nome.localeCompare(a.nome) },
};

async function carregarPokemons() {
  const dados = await getVarios(IDS_INICIAIS);
  dados.forEach((p) => p && estado.pokemons.set(p.id, p));
}

function cardPokemon(p) {
  return criarCardPokemon(p, {
    mostrarFavorito: Boolean(sessao),
    favoritado: sessao ? isFavorito(sessao.usuarioId, p.id) : false,
    aoFavoritar: (pk) => alternarFavorito(sessao.usuarioId, pk.id),
  });
}

function secaoGeracao(numero) {
  const { regiao, de, ate } = GERACOES[numero];
  const descobertos = [...estado.pokemons.values()]
    .filter((p) => p.id >= de && p.id <= ate)
    .sort(ORDENS[estado.ordem].fn);
  const restantes = ate - de + 1 - descobertos.length;
  const aberta = estado.expandidas.has(numero);


  const itens = [...descobertos.map((p) => ({ p })), ...Array.from({ length: Math.min(aberta ? LINHA * 2 : LINHA, restantes) }, () => ({ bloqueado: true }))];
  const visiveis = aberta ? itens : itens.slice(0, LINHA);


  const grade = h("div", { class: "grade-pokemon" },
    visiveis.map((it) => (it.p ? cardPokemon(it.p) : criarCardBloqueado({ mostrarFavorito: Boolean(sessao) }))));


  const alternar = h("button", {
    class: "link-destaque geracao__alternar", type: "button", "aria-expanded": String(aberta),
    onClick: () => { aberta ? estado.expandidas.delete(numero) : estado.expandidas.add(numero); renderizar(); },
  }, aberta ? "Mostrar Menos" : "Mostrar Mais");


  return h("section", { class: "geracao", "aria-labelledby": `geracao-${numero}` },
    h("div", { class: "geracao__cabecalho" },
      h("h2", { class: "geracao__titulo", id: `geracao-${numero}` }, `${numero}ª Geração: ${regiao}`),
      restantes + descobertos.length > LINHA ? alternar : null),
    grade
  );
}

function filtrar() {
  const termo = estado.busca.trim().toLowerCase().replace(/^#/, "");
  return [...estado.pokemons.values()]
    .filter((p) => !estado.geracao || p.geracao === estado.geracao)
    .filter((p) => !estado.tipo || p.tipos.includes(estado.tipo))
    .filter((p) => !termo || p.nome.toLowerCase().includes(termo) || p.nomeJa.includes(termo)
      || String(p.id) === termo.replace(/^0+/, "") || formatarNumero(p.id).slice(1).includes(termo))
    .sort(ORDENS[estado.ordem].fn);
}


const filtrosAtivos = () => Boolean(estado.busca.trim() || estado.tipo);

const conteudo = $("#conteudo");
const resumo = $("#resumo");


function limparFiltros() {
  Object.assign(estado, { busca: "", tipo: "", geracao: 0, ordem: "numero-asc" });
  $("#busca").value = "";
  renderizar();
}


function renderizar() {
  limpar(conteudo);
  limpar(resumo);


  if (filtrosAtivos()) {
    const lista = filtrar();
    resumo.append(`${lista.length} resultado(s)`, h("button", { type: "button", onClick: limparFiltros }, "Limpar filtros"));
    if (!lista.length) {
      conteudo.append(h("p", { class: "estado-vazio" }, "Nenhum Pokémon encontrado para essa busca."));
    } else {
      conteudo.append(h("div", { class: "grade-pokemon" }, lista.map((p) => cardPokemon(p))));
    }
  } else {
    const numeros = estado.geracao ? [estado.geracao] : Object.keys(GERACOES).map(Number);
    conteudo.append(...numeros.map(secaoGeracao));
    if (estado.geracao || estado.ordem !== "numero-asc") resumo.append("Filtros ativos.", h("button", { type: "button", onClick: limparFiltros }, "Limpar filtros"));
  }
  marcarBotoes();
}

const botoesBarra = [];


function criarFerramenta({ id, ...cfg }) {
  const padrao = id === "ordem" ? "numero-asc" : id === "geracao" ? 0 : "";
  const ferramenta = criarFerramentaMenu({ ...cfg, padrao, aoMudar: renderizar });
  botoesBarra.push(ferramenta);
  return ferramenta.el;
}


const marcarBotoes = () => botoesBarra.forEach((f) => f.marcar());


function montarBarra() {
  $("#icone-lupa").replaceWith(icone("lupa"));
  $("#form-busca").addEventListener("submit", (e) => e.preventDefault());
  $("#busca").addEventListener("input", (e) => { estado.busca = e.target.value; renderizar(); });


  const tipos = Object.keys(TIPOS_PT);
  const areaBotoes = $("#botoes");
  areaBotoes.append(
    criarFerramenta({
      id: "tipo", icone: "filtro", rotulo: "Filtrar por tipo", titulo: "Tipo",
      opcoes: () => [{ valor: "", rotulo: "Todos os tipos" }, ...tipos.map((t) => ({ valor: t, rotulo: TIPOS_PT[t], icone: criarTipo(t) }))],
      atual: () => estado.tipo, aoEscolher: (v) => { estado.tipo = v; },
    }),
    criarFerramenta({
      id: "geracao", icone: "globo", rotulo: "Filtrar por região", titulo: "Região",
      opcoes: () => [{ valor: 0, rotulo: "Todas as regiões" }, ...Object.entries(GERACOES).map(([n, g]) => ({ valor: Number(n), rotulo: `${n}ª — ${g.regiao}` }))],
      atual: () => estado.geracao, aoEscolher: (v) => { estado.geracao = v; if (v) estado.expandidas.add(v); },
    }),
    criarFerramenta({
      id: "ordem", icone: "ordenar", rotulo: "Ordenar", titulo: "Ordenar por",
      opcoes: () => Object.entries(ORDENS).map(([valor, o]) => ({ valor, rotulo: o.rotulo })),
      atual: () => estado.ordem, aoEscolher: (v) => { estado.ordem = v; },
    }),
    h("button", {
      class: "btn-icone", type: "button", "aria-label": "Abrir um Pokémon aleatório", title: "Pokémon aleatório",
      onClick: () => {
        window.location.href = `detalhes.html?id=${IDS_INICIAIS[Math.floor(Math.random() * IDS_INICIAIS.length)]}`;
      },
    }, icone("dado"))
  );
}

montarBarra();
conteudo.append(h("p", { class: "estado-vazio" }, "Carregando Pokédex..."));
await carregarPokemons();
if (estado.pokemons.size === 0) {
  limpar(conteudo).append(h("p", { class: "estado-vazio" }, "Não foi possível carregar os Pokémon. Verifique sua conexão e recarregue a página."));
} else {
  renderizar();
}
