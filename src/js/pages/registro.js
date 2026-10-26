import { $ } from "../dom.js";
import { registrar, validar, redirecionarSeLogado } from "../auth.js";
import { mostrarErro, mostrarErroGeral, ativarBotoesSociais, validarAoSair } from "../components/formulario.js";

redirecionarSeLogado();
ativarBotoesSociais();

const form = $("#form-registro");
const regras = {
  nome: () => validar.nome(form.nome.value),
  email: () => validar.email(form.email.value),
  senha: () => validar.senha(form.senha.value),
  confirmacao: () => validar.confirmacao(form.senha.value, form.confirmacao.value),
  termos: () => (form.termos.checked ? "" : "Aceite os termos para continuar."),
};
validarAoSair(form, regras);
// ao mudar a senha, revalida a confirmação (se já foi preenchida)
form.senha.addEventListener("input", () => { if (form.confirmacao.value) mostrarErro(form, "confirmacao", regras.confirmacao()); });
form.termos.addEventListener("change", () => mostrarErro(form, "termos", regras.termos()));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mostrarErroGeral("");
  const erros = Object.entries(regras).map(([campo, fn]) => [campo, fn()]);
  erros.forEach(([campo, msg]) => mostrarErro(form, campo, msg));
  const primeiro = erros.find(([, msg]) => msg);
  if (primeiro) { form.elements[primeiro[0]].focus(); return; }

  const botao = form.querySelector("[type=submit]");
  botao.disabled = true;
  const r = await registrar({ nome: form.nome.value, email: form.email.value, senha: form.senha.value });
  botao.disabled = false;
  if (!r.ok) {
    if (r.campo === "geral") mostrarErroGeral(r.erro);
    else { mostrarErro(form, r.campo, r.erro); form.elements[r.campo].focus(); }
    return;
  }
  window.location.href = "pokedex.html";
});
