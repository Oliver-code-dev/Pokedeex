
const API = "https://pokeapi.co/api/v2/pokemon/";
const CHAVE_FAVORITOS = "gugudexFavoritos";
const CHAVE_COMPARACOES = "gugudexComparacoes";
const CHAVE_COMPARACOES_FAVORITAS = "gugudexComparacoesFavoritas";

const pesquisa = document.getElementById("pesquisaPokemon");
const listaFavoritos = document.getElementById("listaFavoritos");
const comparacoesFavoritas = document.getElementById("comparacoesFavoritas");
const listaComparacoes = document.getElementById("listaComparacoes");

let favoritos = carregar(CHAVE_FAVORITOS);
let comparacoes = carregar(CHAVE_COMPARACOES);
let favoritasComparacoes = carregar(CHAVE_COMPARACOES_FAVORITAS);

let resultadosPesquisa = [];
let tiposDisponiveis = [];
let tipoSelecionado = "";
let ordem = "numero";
let somenteFavoritos = true;
let temporizador;


function carregar(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave));
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}


function salvar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function escapar(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function formatarNome(nome) {
    return String(nome)
        .replace(/-/g, " ")
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

function ehFavorito(id) {
    return favoritos.some(pokemon => Number(pokemon.id) === Number(id));
}


async function buscarPokemon(identificador) {
    const resposta = await fetch(
        API + encodeURIComponent(String(identificador).toLowerCase().trim())
    );

    if (!resposta.ok) {
        throw new Error("Pokémon não encontrado.");
    }

    const pokemon = await resposta.json();

    return {
        id: pokemon.id,
        nome: pokemon.name,
        imagem:
            pokemon.sprites.other?.["official-artwork"]?.front_default ||
            pokemon.sprites.front_default ||
            "",
        tipos: pokemon.types.map(item => item.type.name),
        altura: pokemon.height,
        peso: pokemon.weight
    };
}


function criarCard(pokemon) {
    const favorito = ehFavorito(pokemon.id);
    const tipos = (pokemon.tipos || []).map(tipo =>
        `<span class="tipo-pokemon">${escapar(formatarNome(tipo))}</span>`
    ).join("");

    return `
        <article class="card-pokemon">
            <span class="numero-pokemon">
                #${String(pokemon.id).padStart(4, "0")}
            </span>

            <button
                class="coracao ${favorito ? "favoritado" : ""}"
                type="button"
                data-favorito="${pokemon.id}"
                aria-label="${favorito ? "Remover dos" : "Adicionar aos"} favoritos"
                aria-pressed="${favorito}"
            >♥</button>

            <div class="imagem-pokemon">
                ${pokemon.imagem
                    ? `<img src="${escapar(pokemon.imagem)}"
                        alt="${escapar(formatarNome(pokemon.nome))}"
                        loading="lazy">`
                    : "?"}
            </div>

            <span class="nome-pokemon">
                ${escapar(formatarNome(pokemon.nome))}
            </span>

            <div class="tipos-pokemon">${tipos}</div>
        </article>
    `;
}


function renderizarPokemon(lista, elemento) {
    if (!lista.length) {
        elemento.innerHTML = `
            <p class="mensagem-vazia">
                Nenhum Pokémon por aqui ainda.
            </p>
        `;
        return;
    }

    elemento.innerHTML = lista.map(criarCard).join("");
}

function renderizarFavoritos() {
    let lista = somenteFavoritos
        ? [...favoritos]
        : [...resultadosPesquisa];

    if (tipoSelecionado) {
        lista = lista.filter(pokemon =>
            (pokemon.tipos || []).includes(tipoSelecionado)
        );
    }

    if (ordem === "numero") {
        lista.sort((a, b) => a.id - b.id);
    } else if (ordem === "numero-desc") {
        lista.sort((a, b) => b.id - a.id);
    } else if (ordem === "nome") {
        lista.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    renderizarPokemon(lista, listaFavoritos);
}


function alternarFavorito(id) {
    const numero = Number(id);
    const existente = favoritos.some(pokemon => Number(pokemon.id) === numero);

    if (existente) {
        favoritos = favoritos.filter(pokemon => Number(pokemon.id) !== numero);
    } else {
        const pokemon = [...favoritos, ...resultadosPesquisa]
            .find(item => Number(item.id) === numero);

        if (!pokemon) return;

        favoritos.push(pokemon);
    }

    salvar(CHAVE_FAVORITOS, favoritos);
    renderizarFavoritos();
}

// Pesquisa por nome ou número na PokeAPI.
async function pesquisarPokemon(termo) {
    if (!termo.trim()) {
        resultadosPesquisa = [];
        somenteFavoritos = true;
        renderizarFavoritos();
        return;
    }

    somenteFavoritos = false;

    listaFavoritos.innerHTML =
        `<p class="mensagem-vazia">Buscando Pokémon...</p>`;

    try {
        let lista = [];

        
        try {
            lista.push(await buscarPokemon(termo.trim()));
        } catch {
         
        }

        if (!lista.length) {
            const resposta = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=100000"
            );

            if (!resposta.ok) throw new Error("Falha na pesquisa.");

            const dados = await resposta.json();

            const correspondentes = dados.results.filter(pokemon =>
                pokemon.name.includes(termo.toLowerCase().trim())
            ).slice(0, 30);

            lista = await Promise.all(
                correspondentes.map(pokemon => buscarPokemon(pokemon.name))
            );
        }

        resultadosPesquisa = lista;
        renderizarFavoritos();

        if (!lista.length) {
            listaFavoritos.innerHTML =
                `<p class="mensagem-vazia">Nenhum Pokémon encontrado.</p>`;
        }
    } catch (erro) {
        listaFavoritos.innerHTML =
            `<p class="mensagem-vazia">
                Não foi possível carregar os Pokémon. Verifique sua conexão.
            </p>`;
    }
}

document.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-favorito]");

    if (botao) {
        alternarFavorito(botao.dataset.favorito);
    }
});


pesquisa.addEventListener("input", () => {
    clearTimeout(temporizador);

    temporizador = setTimeout(() => {
        pesquisarPokemon(pesquisa.value);
    }, 400);
});


const botoesFiltro = document.querySelectorAll(".filtros .filtro");

botoesFiltro[0]?.addEventListener("click", () => {
    somenteFavoritos = !somenteFavoritos;

    if (!somenteFavoritos && !resultadosPesquisa.length) {
        pesquisa.focus();
        pesquisa.placeholder = "Digite o nome ou número de um Pokémon";
        return;
    }

    renderizarFavoritos();
});

botoesFiltro[1]?.addEventListener("click", async () => {
    if (!tiposDisponiveis.length) {
        try {
            const resposta = await fetch("https://pokeapi.co/api/v2/type");
            const dados = await resposta.json();

            tiposDisponiveis = dados.results
                .map(tipo => tipo.name)
                .filter(tipo => !["unknown", "shadow"].includes(tipo));
        } catch {
            alert("Não foi possível carregar os tipos.");
            return;
        }
    }

    const escolha = prompt(
        "Digite um tipo Pokémon ou deixe vazio para remover o filtro:\n\n" +
        tiposDisponiveis.join(", ")
    );

    if (escolha === null) return;

    const tipo = escolha.trim().toLowerCase();

    if (tipo && !tiposDisponiveis.includes(tipo)) {
        alert("Tipo não encontrado.");
        return;
    }

    tipoSelecionado = tipo;
    renderizarFavoritos();
});

botoesFiltro[2]?.addEventListener("click", () => {
    ordem = ordem === "numero"
        ? "numero-desc"
        : ordem === "numero-desc"
            ? "nome"
            : "numero";

    renderizarFavoritos();
});

document.querySelector(".botao-tipos")?.addEventListener("click", () => {
    tipoSelecionado = "";
    renderizarFavoritos();
});


function renderizarComparacoes(lista, elemento, favoritas = false) {
    if (!lista.length) {
        elemento.innerHTML = `
            <p class="mensagem-vazia">
                ${favoritas
                    ? "Você ainda não tem comparações favoritas."
                    : "Suas comparações aparecerão aqui quando forem salvas."}
            </p>
        `;
        return;
    }

    elemento.innerHTML = lista.map((comparacao, indice) => {
        const primeiro = comparacao.pokemon1 || comparacao.primeiro;
        const segundo = comparacao.pokemon2 || comparacao.segundo;

        const nome1 = typeof primeiro === "object"
            ? primeiro.nome || primeiro.name
            : primeiro;

        const nome2 = typeof segundo === "object"
            ? segundo.nome || segundo.name
            : segundo;

        return `
            <article class="card-comparacao">
                <div class="comparacao-pokemon">
                    <span>${escapar(formatarNome(nome1 || "Pokémon 1"))}</span>
                    <strong>VS</strong>
                    <span>${escapar(formatarNome(nome2 || "Pokémon 2"))}</span>
                </div>

                <button
                    type="button"
                    data-comparacao-favorita="${indice}"
                    aria-pressed="${favoritas}"
                    aria-label="${favoritas
                        ? "Remover comparação dos favoritos"
                        : "Favoritar comparação"}"
                >${favoritas ? "★" : "☆"}</button>

                ${favoritas ? `
                    <button
                        type="button"
                        data-remover-comparacao="${indice}"
                    >Remover</button>
                ` : ""}
            </article>
        `;
    }).join("");
}


document.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-comparacao-favorita]");
    if (!botao) return;

    const indice = Number(botao.dataset.comparacaoFavorita);
    const lista = botao.closest("#comparacoesFavoritas")
        ? favoritasComparacoes
        : comparacoes;

    const comparacao = lista[indice];
    if (!comparacao) return;

    if (lista === favoritasComparacoes) {
        favoritasComparacoes.splice(indice, 1);
    } else {
        const existe = favoritasComparacoes.some(item =>
            JSON.stringify(item) === JSON.stringify(comparacao)
        );

        if (!existe) favoritasComparacoes.push(comparacao);
    }

    salvar(CHAVE_COMPARACOES_FAVORITAS, favoritasComparacoes);
    renderizarTudo();
});


document.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-remover-comparacao]");
    if (!botao) return;

    favoritasComparacoes.splice(
        Number(botao.dataset.removerComparacao), 1
    );

    salvar(CHAVE_COMPARACOES_FAVORITAS, favoritasComparacoes);
    renderizarTudo();
});

function renderizarTudo() {
    renderizarFavoritos();

    renderizarComparacoes(
        favoritasComparacoes,
        comparacoesFavoritas,
        true
    );

    renderizarComparacoes(comparacoes, listaComparacoes);
}


document.querySelector(".form-newsletter")?.addEventListener("submit", evento => {
    evento.preventDefault();
    alert("Formulário validado! O envio real exige integrar um serviço de e-mail.");
    evento.target.reset();
});

renderizarTudo();
