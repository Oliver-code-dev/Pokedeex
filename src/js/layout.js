// Header e footer compartilhados. Cada página tem:
//   <header id="site-header"></header> ... <footer id="site-footer"></footer>
// e chama montarLayout({ ativo: "pokedex" }).
// O header muda conforme o usuário está logado ou não (telas "antes/depois de logar").

import { h, $, limpar, toast } from "./dom.js";
import { icone } from "./icons.js";
import { getSessao, encerrarSessao, inscreverNewsletter } from "./storage.js";

const LINKS_VISITANTE = [
  { id: "inicio", rotulo: "Início", href: "index.html" },
  { id: "destaques", rotulo: "Destaques", href: "index.html#destaques" },
  { id: "pokedex", rotulo: "Pokédex", href: "pokedex.html" },
  { id: "comparador", rotulo: "Comparador", href: "comparador.html" },
  { id: "sobre", rotulo: "Sobre", href: "#site-footer" },
];

const LINKS_LOGADO = [
  { id: "inicio", rotulo: "Início", href: "index.html" },
  { id: "pokedex", rotulo: "Pokédex", href: "pokedex.html" },
  { id: "comparador", rotulo: "Comparador", href: "comparador.html" },
  { id: "colecao", rotulo: "Minha coleção", href: "colecao.html" },
  { id: "sobre", rotulo: "Sobre", href: "#site-footer" },
];

function criarMenuUsuario(sessao) {
  const painel = h("div", { class: "usuario-menu__painel", hidden: true, role: "menu" },
    h("div", { class: "usuario-menu__nome" }, sessao.nome),
    h("a", { class: "usuario-menu__item", href: "colecao.html", role: "menuitem" }, "Minha coleção"),
    h("button", {
      class: "usuario-menu__item", type: "button", role: "menuitem",
      onClick: () => { encerrarSessao(); window.location.href = "index.html"; },
    }, "Sair")
  );
  const botao = h("button", {
    class: "usuario-menu__botao", type: "button", "aria-haspopup": "true", "aria-expanded": "false",
    "aria-label": `Menu de ${sessao.nome}`,
  }, h("img", { src: "assets/img/avatar.png", alt: "" }));

  const alternar = (abrir) => {
    painel.hidden = !abrir;
    botao.setAttribute("aria-expanded", String(abrir));
  };
  botao.addEventListener("click", (e) => { e.stopPropagation(); alternar(painel.hidden); });
  document.addEventListener("click", () => alternar(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") alternar(false); });

  return h("div", { class: "usuario-menu" }, botao, painel);
}

export function montarHeader(ativo) {
  const alvo = $("#site-header");
  if (!alvo) return;
  const sessao = getSessao();
  const links = sessao ? LINKS_LOGADO : LINKS_VISITANTE;

  alvo.className = "site-header";
  limpar(alvo).append(
    h("div", { class: "container site-header__inner" },
      h("a", { class: "logo", href: "index.html", "aria-label": "GuguDex — página inicial" }, "GuguDex"),
      h("button", { class: "btn-menu", type: "button", "aria-label": "Abrir menu", "aria-expanded": "false", "aria-controls": "nav-principal" }, icone("menu", 30)),
      h("nav", { class: "nav", id: "nav-principal", "aria-label": "Navegação principal" },
        h("ul", { class: "nav__lista" },
          links.map((l) => h("li", {},
            h("a", { class: "nav__link", href: l.href, "aria-current": l.id === ativo ? "page" : null }, l.rotulo)))
        ),
        h("div", { class: "nav__acoes" },
          sessao
            ? criarMenuUsuario(sessao)
            : [
                h("a", { class: "nav__link", href: "login.html" }, "Acessar"),
                h("a", { class: "btn", href: "registro.html" }, "Começar"),
              ]
        )
      )
    )
  );

  // menu hambúrguer (celular)
  const btnMenu = $(".btn-menu", alvo);
  const nav = $(".nav", alvo);
  btnMenu.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", String(aberto));
    btnMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) nav.classList.remove("aberto"); });
}

function criarNewsletter() {
  const msg = h("p", { class: "newsletter__msg", role: "status" });
  const campo = h("input", { type: "email", id: "newsletter-email", placeholder: "Seu e-mail", required: true, autocomplete: "email", "aria-label": "Seu e-mail" });
  const form = h("form", { class: "newsletter__form", novalidate: true },
    h("img", { src: "assets/img/email-claro.png", alt: "" }), campo,
    h("button", { type: "submit" }, "Enviar")
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = campo.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = "Digite um e-mail válido.";
      msg.style.color = "var(--cor-erro)";
      return;
    }
    const novo = inscreverNewsletter(email);
    msg.textContent = novo ? "Inscrição feita! Obrigado." : "Este e-mail já está inscrito.";
    msg.style.color = novo ? "var(--cor-sucesso)" : "var(--cor-texto-suave)";
    if (novo) { toast("Você vai receber as novidades!"); form.reset(); }
  });
  return h("section", { class: "newsletter", "aria-labelledby": "newsletter-titulo" },
    h("h2", { class: "newsletter__titulo", id: "newsletter-titulo" }, "Fique por dentro das novidades!"),
    h("p", { class: "newsletter__texto" }, "Receba as novidades, atualizações e conteúdos exclusivos no seu e-mail"),
    form, msg
  );
}

export function montarFooter() {
  const alvo = $("#site-footer");
  if (!alvo) return;
  alvo.className = "site-footer";
  limpar(alvo).append(
    h("div", { class: "container" },
      criarNewsletter(),
      h("div", { class: "rodape__base" },
        h("a", { class: "logo", href: "index.html" }, "GuguDex"),
        h("span", { class: "rodape__linha", "aria-hidden": "true" }),
        h("nav", { class: "rodape__links", "aria-label": "Links legais" },
          h("a", { href: "#" }, "Termos de uso"), h("a", { href: "#" }, "Política de Privacidade"), h("a", { href: "#" }, "Contato")),
        h("span", { class: "rodape__linha", "aria-hidden": "true" }),
        h("div", { class: "rodape__sociais" },
          h("a", { href: "#", "aria-label": "Instagram" }, h("img", { src: "assets/img/ig.png", alt: "" })),
          h("a", { href: "#", "aria-label": "Discord" }, h("img", { src: "assets/img/discord-branco.png", alt: "" })),
          h("a", { href: "#", "aria-label": "X" }, h("img", { src: "assets/img/x.png", alt: "" })))
      )
    )
  );
}

/** Chame uma vez por página */
export function montarLayout({ ativo = "" } = {}) {
  // link "pular para o conteúdo" (acessibilidade para teclado e leitores de tela)
  const principal = $("main");
  if (principal && !$(".pular-link")) {
    principal.id ||= "principal";
    principal.tabIndex = -1;
    document.body.prepend(h("a", { class: "pular-link", href: `#${principal.id}` }, "Pular para o conteúdo"));
  }
  montarHeader(ativo);
  montarFooter();

  // links ainda sem página (termos, redes sociais...) não devem rolar a página para o topo
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (!link) return;
    e.preventDefault();
    toast("Esta página ainda não está disponível.", "erro");
  });
}

