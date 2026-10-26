const ICONES = {
  coracao: '<path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2.1 0 3.7 1.2 4.6 2.7h2c.9-1.5 2.5-2.7 4.6-2.7 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z"/>',
  lupa: '<circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15 15l6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  filtro: '<path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  globo: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  ordenar: '<path d="M8 20V5M8 5L4 9M8 5l4 4M16 4v15M16 19l-4-4M16 19l4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  voltar: '<path d="M9 7L4 12l5 5M4 12h11a5 5 0 015 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  dado: '<rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8.5" cy="8.5" r="1.4"/><circle cx="15.5" cy="8.5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="8.5" cy="15.5" r="1.4"/><circle cx="15.5" cy="15.5" r="1.4"/>',
  peso: '<path d="M7 8h10l3.2 11.2A1.5 1.5 0 0118.8 21H5.2a1.5 1.5 0 01-1.4-1.8z"/><circle cx="12" cy="5" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  altura: '<path d="M12 3v18M12 3L7 8M12 3l5 5M12 21l-5-5M12 21l5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  seta: '<path d="M8 4l9 8-9 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  trocar: '<path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  lixeira: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
};

export function icone(nome, tamanho = 24) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", tamanho);
  svg.setAttribute("height", tamanho);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("fill", "currentColor");
  svg.innerHTML = ICONES[nome] ?? ""; // conteúdo 100% estático definido acima
  return svg;
}
