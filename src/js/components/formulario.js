// Helpers dos formulários de Login/Registro: erros por campo e botões sociais.

import { $, $$, toast } from "../dom.js";

/** Mostra (ou limpa, com texto vazio) o erro de um campo. */
export function mostrarErro(form, nomeCampo, mensagem) {
  const input = form.elements[nomeCampo];
  const span = $(`#erro-${nomeCampo}`, form);
  if (span) span.textContent = mensagem;
  if (input) {
    input.toggleAttribute("aria-invalid", Boolean(mensagem));
    input.closest(".campo")?.classList.toggle("campo--erro", Boolean(mensagem));
  }
}

export function mostrarErroGeral(mensagem) {
  const el = $("#erro-geral");
  el.textContent = mensagem;
}

/** Valida ao sair do campo e limpa o erro enquanto digita */
export function validarAoSair(form, validadores) {
  for (const [campo, fn] of Object.entries(validadores)) {
    const input = form.elements[campo];
    input.addEventListener("blur", () => mostrarErro(form, campo, fn()));
    input.addEventListener("input", () => { if (input.hasAttribute("aria-invalid")) mostrarErro(form, campo, fn()); });
  }
}

/** Login social é apenas visual nesta versão */
export function ativarBotoesSociais() {
  $$(".auth__social").forEach((b) =>
    b.addEventListener("click", () => toast(`Entrar com ${b.dataset.rede} ainda não está disponível.`, "erro")));
}
