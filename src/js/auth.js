// Autenticação simulada no navegador (projeto acadêmico, sem servidor).
// Usuários ficam no LocalStorage; a senha NUNCA é salva em texto puro:
// guardamos um hash SHA-256 com "sal" individual.

import { CHAVES } from "./config.js";
import { ler, gravar, getSessao, iniciarSessao } from "./storage.js";

/* ---------- Hash de senha ---------- */

const paraHex = (buffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");

async function hashSenha(senha, sal) {
  const texto = `${sal}:${senha}`;
  if (globalThis.crypto?.subtle) {
    const dados = new TextEncoder().encode(texto);
    return paraHex(await crypto.subtle.digest("SHA-256", dados));
  }
  // Fallback (páginas abertas fora de localhost/HTTPS não têm crypto.subtle)
  let h = 5381;
  for (const c of texto) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0;
  return `djb2-${h.toString(16)}`;
}

const gerarSal = () => paraHex(crypto.getRandomValues(new Uint8Array(12)));

/* ---------- Validações (reutilizadas pelos formulários) ---------- */

export const validar = {
  nome(valor) {
    const v = valor.trim();
    if (!v) return "Informe um nome de usuário.";
    if (v.length < 3) return "Use pelo menos 3 caracteres.";
    if (v.length > 20) return "Use no máximo 20 caracteres.";
    if (!/^[\p{L}\p{N}_.-]+$/u.test(v)) return "Use apenas letras, números, ponto, hífen ou _.";
    return "";
  },
  email(valor) {
    const v = valor.trim();
    if (!v) return "Informe seu e-mail.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "E-mail inválido.";
    return "";
  },
  senha(valor) {
    if (!valor) return "Informe uma senha.";
    if (valor.length < 6) return "A senha precisa ter pelo menos 6 caracteres.";
    return "";
  },
  confirmacao(senha, confirmacao) {
    if (!confirmacao) return "Confirme sua senha.";
    if (senha !== confirmacao) return "As senhas não coincidem.";
    return "";
  },
};

/* ---------- Usuários ---------- */

const getUsuarios = () => ler(CHAVES.usuarios, []);
const norm = (t) => t.trim().toLowerCase();

/**
 * Cria a conta e já inicia a sessão.
 * @returns {{ok:true}|{ok:false, campo:string, erro:string}}
 */
export async function registrar({ nome, email, senha }) {
  const usuarios = getUsuarios();
  if (usuarios.some((u) => norm(u.nome) === norm(nome))) {
    return { ok: false, campo: "nome", erro: "Este nome de usuário já está em uso." };
  }
  if (usuarios.some((u) => norm(u.email) === norm(email))) {
    return { ok: false, campo: "email", erro: "Já existe uma conta com este e-mail." };
  }
  const sal = gerarSal();
  const usuario = {
    id: `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    nome: nome.trim(),
    email: email.trim(),
    sal,
    senhaHash: await hashSenha(senha, sal),
    criadoEm: Date.now(),
  };
  if (!gravar(CHAVES.usuarios, [...usuarios, usuario])) {
    return { ok: false, campo: "geral", erro: "Não foi possível salvar (armazenamento do navegador bloqueado)." };
  }
  iniciarSessao(usuario, true);
  return { ok: true };
}

/** Login por nome de usuário OU e-mail */
export async function entrar({ identificador, senha, lembrar }) {
  const alvo = norm(identificador);
  const usuario = getUsuarios().find((u) => norm(u.nome) === alvo || norm(u.email) === alvo);
  const generico = { ok: false, campo: "geral", erro: "Usuário ou senha incorretos." }; // não revela qual está errado
  if (!usuario) return generico;
  if ((await hashSenha(senha, usuario.sal)) !== usuario.senhaHash) return generico;
  iniciarSessao(usuario, lembrar);
  return { ok: true };
}

/* ---------- Guardas de página ---------- */

/** Em login/registro: se já está logado, vai direto para a Pokédex */
export function redirecionarSeLogado(destino = "pokedex.html") {
  if (getSessao()) window.location.replace(destino);
}

/** Em páginas restritas (ex.: Minha coleção): sem login, vai para o login e volta depois */
export function exigirLogin() {
  const sessao = getSessao();
  if (!sessao) {
    const volta = encodeURIComponent(location.pathname.split("/").pop() + location.search);
    window.location.replace(`login.html?next=${volta}`);
  }
  return sessao;
}

/** Destino pós-login: ?next=... (apenas páginas internas .html) ou Pokédex */
export function destinoPosLogin() {
  const next = new URLSearchParams(location.search).get("next");
  return next && /^[\w-]+\.html(\?[\w=&%.-]*)?$/.test(next) ? next : "pokedex.html";
}
