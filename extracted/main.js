// Carrega o bundle beautified, corrige usos de rgba(...) em atmosphereColor e importa o módulo resultante
(async function(){
  try {
    const resp = await fetch('../globo-interativo-beautified.js');
    if (!resp.ok) throw new Error('Falha ao buscar bundle: ' + resp.status);
    let src = await resp.text();

    // Substitui chamadas como .atmosphereColor("rgba(100, 200, 255, 0.3)")
    // por .atmosphereColor("rgb(100,200,255)").atmosphereOpacity(0.3)
    const re = /atmosphereColor\s*\(\s*(['\"])\s*rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)\s*\1\s*\)/g;
    let count = 0;
    src = src.replace(re, function(_, q, r, g, b, a){
      count++;
      return `.atmosphereColor("rgb(${r},${g},${b})").atmosphereOpacity(${a})`;
    });

    console.log(`extracted/main.js: patched ${count} atmosphereColor(rgba(...)) occurrences`);

    // Cria um blob e importa dinamicamente como módulo para preservar scope de module
    const blob = new Blob([src], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    try {
      await import(url);
      console.log('extracted/main.js: módulo importado com sucesso');
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    console.error('extracted/main.js: erro ao carregar ou aplicar patch no bundle', err);
    // Em caso de falha, tenta carregar o bundle original (fallback)
    const s = document.createElement('script');
    s.type = 'module';
    s.src = '../globo-interativo-beautified.js';
    document.body.appendChild(s);
  }
})();
