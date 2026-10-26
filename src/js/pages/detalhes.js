// Detalhes do Pokémon: detalhes.html?id=4
import { montarLayout } from "../layout.js";
import { TIPOS_PT, STATS, IDS_PERMITIDOS } from "../config.js";
import { getDetalhes, getVarios } from "../api.js";
import { getSessao, isFavorito, alternarFavorito } from "../storage.js";
import { criarCardPokemon, criarCardBloqueado } from "../components/card.js";
import { criarTipo } from "../components/tipo.js";
import { criarBarrasStats } from "../components/stats.js";
import { icone } from "../icons.js";
import { $, h, limpar, formatarNumero } from "../dom.js";

montarLayout({ ativo: "pokedex" });

const principal = $("#principal");
const sessao = getSessao();
const id = Number(new URLSearchParams(location.search).get("id"));

const fmt = (n) => String(n).replace(".", ",");

function mostrarErro(msg) {
  limpar(principal).append(
    h("div", { class: "container estado-vazio" },
      h("p", {}, msg),
      h("p", {}, h("a", { class: "link-destaque", href: "pokedex.html" }, "Voltar para a Pokédex")))
  );
}

function voltar() {
  const veioDoSite = document.referrer && new URL(document.referrer).origin === location.origin;
  if (veioDoSite && history.length > 1) history.back();
  else window.location.href = "pokedex.html";
}

/* ---------- Blocos da página ---------- */

function blocoTopo(p) {
  const favorito = sessao
    ? (() => {
        const btn = h("button", { class: "btn-favorito", type: "button", "aria-pressed": String(isFavorito(sessao.usuarioId, p.id)), "aria-label": `Favoritar ${p.nome}` }, icone("coracao"));
        btn.addEventListener("click", () => {
          const novo = alternarFavorito(sessao.usuarioId, p.id);
          btn.setAttribute("aria-pressed", String(novo));
          btn.classList.remove("pulsar"); void btn.offsetWidth; btn.classList.add("pulsar");
        });
        return h("div", { class: "dt-topo__favorito" }, btn);
      })()
    : null;

  return h("section", { class: "dt-topo", "aria-labelledby": "pk-nome" },
    h("span", { class: "dt-topo__jp", "aria-hidden": "true" }, p.nomeJa),
    favorito,
    h("div", { class: "container dt-topo__interno" },
      h("div", { class: "dt-topo__info" },
        h("button", { class: "dt-topo__voltar", type: "button", "aria-label": "Voltar", onClick: voltar }, icone("voltar", 34)),
        h("span", { class: "dt-topo__numero" }, formatarNumero(p.id)),
        h("h1", { class: "dt-topo__nome", id: "pk-nome" }, p.nome),
        h("div", { class: "dt-topo__tipos" },
          p.tipos.length > 1 ? "Tipos:" : "Tipo:",
          p.tipos.map((t) => h("span", { style: "display:inline-flex;align-items:center;gap:0.35rem" }, TIPOS_PT[t] ?? t, criarTipo(t))))
      ),
      h("img", { class: "dt-topo__arte", src: p.imagem, alt: p.nome, width: 475, height: 475 })
    )
  );
}

const blocoMedidas = (p) =>
  h("section", { class: "dt-medidas", "aria-label": "Medidas" },
    h("div", { class: "container dt-medidas__interno" },
      h("div", { class: "dt-medida" }, icone("peso", 56), `${fmt(p.peso)} kg`),
      h("div", { class: "dt-medida" }, icone("altura", 56), `${fmt(p.altura)} m`),
      h("div", { class: "dt-medida" }, `${p.geracao}ª Geração`)
    )
  );

function blocoDescricao(p) {
  const linhas = p.movimentos.length
    ? p.movimentos.map((m) => h("tr", {},
        h("td", {}, m.nome),
        h("td", {}, TIPOS_PT[m.tipo] ?? m.tipo),
        h("td", {}, m.pp ? `${m.pp}/${m.pp}` : "—")))
    : [h("tr", {}, h("td", { colspan: 3 }, "Sem movimentos registrados."))];

  return h("section", { class: "dt-descricao", "aria-labelledby": "t-desc" },
    h("div", { class: "container dt-descricao__interno" },
      h("div", {},
        h("h2", { class: "dt-titulo", id: "t-desc" }, "Descrição"),
        h("p", { class: "dt-descricao__texto" }, p.descricao)
      ),
      h("div", { class: "dt-movimentos" },
        h("h2", { class: "dt-movimentos__titulo" }, "Movimentos aprendidos:"),
        h("table", {},
          h("thead", {}, h("tr", {}, h("th", { scope: "col" }, "MOVIMENTO"), h("th", { scope: "col" }, "TIPO"), h("th", { scope: "col" }, "PP"))),
          h("tbody", {}, linhas))
      )
    )
  );
}

function blocoAtributos(p) {
  const total = STATS.reduce((soma, { chave }) => soma + (p.stats[chave] ?? 0), 0);
  return h("section", { class: "dt-atributos", "aria-labelledby": "t-attr" },
    h("div", { class: "container" },
      h("h2", { class: "dt-titulo", id: "t-attr" }, "Atributos de Batalha"),
      h("div", { class: "dt-atributos__lista" }, criarBarrasStats(p)),
      h("p", { class: "dt-total" }, `Total: ${total}`)
    )
  );
}

async function blocoEvolucoes(p) {
  const secao = h("section", { class: "dt-evolucoes", "aria-labelledby": "t-evo" },
    h("div", { class: "container" }, h("h2", { class: "dt-titulo", id: "t-evo", style: "margin-bottom:0" }, "Evoluções"), h("hr")));
  const container = secao.firstChild;

  const ids = [...new Set(p.evolucao.flat().map((e) => e.id))];
  if (ids.length <= 1) {
    container.append(h("p", { class: "evolucao__unico" }, `${p.nome} não possui evoluções.`));
    return secao;
  }
  const liberados = ids.filter((i) => IDS_PERMITIDOS.includes(i));
  const dados = new Map((await getVarios(liberados)).filter(Boolean).map((d) => [d.id, d]));

  const linha = h("div", { class: "evolucao" });
  let atraso = 0;
  p.evolucao.forEach((estagio, i) => {
    if (i > 0) {
      const nivel = estagio[0].nivel;
      linha.append(h("div", { class: "evolucao__seta", "aria-label": typeof nivel === "number" ? `Evolui no nível ${nivel}` : `Evolui: ${nivel}` },
        h("span", { class: "evolucao__nivel" }, nivel ?? "?"), icone("seta", 44)));
    }
    linha.append(h("div", { class: "evolucao__estagio" },
      estagio.map((e) => {
        const d = dados.get(e.id);
        // Pokémon fora da lista aparecem como card bloqueado "????"
        const card = d ? criarCardPokemon(d, { href: `detalhes.html?id=${d.id}`, atraso: (atraso += 0.12) }) : criarCardBloqueado();
        if (d?.id === p.id) { card.classList.add("card-pokemon--atual"); card.setAttribute("aria-current", "true"); }
        return h("div", { class: "evolucao__item" }, card,
          estagio.length > 1 && i > 0 ? h("span", { class: "evolucao__cond" }, typeof e.nivel === "number" ? `Nível ${e.nivel}` : e.nivel) : null);
      })));
  });
  container.append(linha);
  return secao;
}

/* ---------- Carregar ---------- */
if (!Number.isInteger(id) || !IDS_PERMITIDOS.includes(id)) {
  mostrarErro("Pokémon não encontrado. Escolha um na Pokédex.");
} else {
  try {
    const p = await getDetalhes(id);
    document.title = `${p.nome} — GuguDex`;
    limpar(principal).append(blocoTopo(p), blocoMedidas(p), blocoDescricao(p), blocoAtributos(p), await blocoEvolucoes(p));
  } catch {
    mostrarErro("Não foi possível carregar este Pokémon. Verifique sua conexão e tente novamente.");
  }
}
