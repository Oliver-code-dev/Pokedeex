import { $ , toast } from "../dom.js";
import { entrar, redirecionarSeLogado, destinoPosLogin } from "../auth.js";
import { mostrarErro, mostrarErroGeral, ativarBotoesSociais, validarAoSair } from "../components/formulario.js";

redirecionarSeLogado(destinoPosLogin());
ativarBotoesSociais();

const form = $("#form-login");
const regras = {
  identificador: () => (form.identificador.value.trim() ? "" : "Informe seu usuário ou e-mail."),
  senha: () => (form.senha.value ? "" : "Informe sua senha."),
};
validarAoSair(form, regras);

$("#esqueceu").addEventListener("click", () =>
  toast("Recuperação de senha ainda não está disponível. Crie uma nova conta se precisar.", "erro"));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mostrarErroGeral("");
  const erros = Object.entries(regras).map(([campo, fn]) => [campo, fn()]);
  erros.forEach(([campo, msg]) => mostrarErro(form, campo, msg));
  if (erros.some(([, msg]) => msg)) { form.elements[erros.find(([, m]) => m)[0]].focus(); return; }

  const botao = form.querySelector("[type=submit]");
  botao.disabled = true;
  const r = await entrar({ identificador: form.identificador.value, senha: form.senha.value, lembrar: form.lembrar.checked });
  botao.disabled = false;
  if (!r.ok) { mostrarErroGeral(r.erro); form.senha.select(); return; }
  window.location.href = destinoPosLogin();
});
