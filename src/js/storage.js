// Camada de acesso ao LocalStorage.
// Toda leitura/escrita passa por aqui, com try/catch (o navegador pode bloquear
// o storage) e JSON automático. As demais páginas nunca chamam localStorage direto.

import { CHAVES } from "./config.js";

/* ---------- Básico ---------- */

export function ler(chave, padrao = null, armazenamento = localStorage) {
  try {
    const bruto = armazenamento.getItem(chave);
    return bruto === null ? padrao : JSON.parse(bruto);
  } catch {
    return padrao;
  }
}

export function gravar(chave, valor, armazenamento = localStorage) {
  try {
    armazenamento.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false; // storage cheio ou bloqueado
  }
}

export function remover(chave, armazenamento = localStorage) {
  try { armazenamento.removeItem(chave); } catch { /* ignora */ }
}

/* ---------- Sessão (usuário logado) ---------- */
// "Lembrar de mim" marcado  -> localStorage (sobrevive ao fechar o navegador)
// "Lembrar de mim" desmarcado -> sessionStorage (some ao fechar a aba)

export function getSessao() {
  return ler(CHAVES.sessao, null, localStorage) ?? ler(CHAVES.sessao, null, sessionStorage);
}

export function iniciarSessao(usuario, lembrar = false) {
  encerrarSessao();
  const sessao = { usuarioId: usuario.id, nome: usuario.nome, email: usuario.email, em: Date.now() };
  gravar(CHAVES.sessao, sessao, lembrar ? localStorage : sessionStorage);
  return sessao;
}

export function encerrarSessao() {
  remover(CHAVES.sessao, localStorage);
  remover(CHAVES.sessao, sessionStorage);
}

export const estaLogado = () => getSessao() !== null;

/* ---------- Favoritos (por usuário) ---------- */

const todosFavoritos = () => ler(CHAVES.favoritos, {});

export function getFavoritos(usuarioId) {
  return todosFavoritos()[usuarioId] ?? [];
}

export function isFavorito(usuarioId, pokemonId) {
  return getFavoritos(usuarioId).includes(pokemonId);
}

/** Alterna o favorito e devolve true se agora está favoritado */
export function alternarFavorito(usuarioId, pokemonId) {
  const tudo = todosFavoritos();
  const lista = tudo[usuarioId] ?? [];
  const existe = lista.includes(pokemonId);
  tudo[usuarioId] = existe ? lista.filter((id) => id !== pokemonId) : [...lista, pokemonId];
  gravar(CHAVES.favoritos, tudo);
  return !existe;
}

/* ---------- Comparações salvas (por usuário) ---------- */
// { id, titulo, a, b, favorita, criadaEm }

const todasComparacoes = () => ler(CHAVES.comparacoes, {});

export const getComparacoes = (usuarioId) => todasComparacoes()[usuarioId] ?? [];

export function salvarComparacao(usuarioId, { a, b, titulo }) {
  const tudo = todasComparacoes();
  const lista = tudo[usuarioId] ?? [];
  const nova = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    titulo: titulo?.trim() || `Comparação ${lista.length + 1}`,
    a, b, favorita: false, criadaEm: Date.now(),
  };
  tudo[usuarioId] = [nova, ...lista];
  gravar(CHAVES.comparacoes, tudo);
  return nova;
}

export function alternarComparacaoFavorita(usuarioId, comparacaoId) {
  const tudo = todasComparacoes();
  const item = (tudo[usuarioId] ?? []).find((c) => c.id === comparacaoId);
  if (!item) return false;
  item.favorita = !item.favorita;
  gravar(CHAVES.comparacoes, tudo);
  return item.favorita;
}

export function removerComparacao(usuarioId, comparacaoId) {
  const tudo = todasComparacoes();
  tudo[usuarioId] = (tudo[usuarioId] ?? []).filter((c) => c.id !== comparacaoId);
  gravar(CHAVES.comparacoes, tudo);
}

/* ---------- Newsletter ---------- */

export function inscreverNewsletter(email) {
  const lista = ler(CHAVES.newsletter, []);
  const normalizado = email.trim().toLowerCase();
  if (lista.includes(normalizado)) return false;
  gravar(CHAVES.newsletter, [...lista, normalizado]);
  return true;
}
