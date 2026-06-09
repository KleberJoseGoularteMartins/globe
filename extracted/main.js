// Carrega o bundle beautified, corrige usos de rgba(...) em atmosphereColor e importa o módulo resultante
(async function(){
  // Prefer modular bundle if built: /extracted/dist/modular.bundle.js
  try{
    const modularUrl = new URL('dist/modular.bundle.js', import.meta.url).href;
    let ok = false;
    try{
      const r = await fetch(modularUrl, { method: 'HEAD' });
      ok = r && r.ok;
    }catch(e){
      ok = false;
    }

    if(ok){
      // Import the modular ES module bundle directly for fastest iteration
      try{
        await import(modularUrl);
        console.log('extracted/main.js: imported dist/modular.bundle.js');
        return;
      }catch(e){
        console.warn('extracted/main.js: failed importing modular bundle, falling back', e);
      }
    }

    // Fallback: load local beautified bundle, apply safe runtime patches and import via Blob
    const bundleUrl = new URL('main.bundle.js', import.meta.url).href;
    const resp = await fetch(bundleUrl);
    if (!resp.ok) throw new Error('Falha ao buscar bundle: ' + resp.status);
    let src = await resp.text();

    // Patch targeted rgba uses (atmosphereColor) preserving safest behavior
    const re = /atmosphereColor\s*\(\s*(['\"])\s*rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)\s*\1\s*\)/g;
    let count = 0;
    src = src.replace(re, function(_, q, r, g, b, a){
      count++;
      return `atmosphereColor("rgb(${r},${g},${b})")`;
    });
    console.log(`extracted/main.js: patched ${count} atmosphereColor(rgba(...)) occurrences`);

    // Replace remote BR geojson URL with local copy
    src = src.replace(/https:\/\/raw\.githubusercontent\.com\/giuliano-macedo\/geodata-br-states\/main\/geojson\/br_states\.geojson/g, '/extracted/br_states.geojson');

    // Conservative rgba->rgb replacer: only within array literals used for path colors (common pattern: ["rgba(...)","rgba(...)"])
    src = src.replace(/\[(?:\s*['\"]rgba\([^\)]*\)['\"],?)+\s*\]/g, function(match){
      return match.replace(/rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)/g, 'rgb($1,$2,$3)');
    });

    const blob = new Blob([src], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    try {
      await import(url);
      console.log('extracted/main.js: módulo importado com sucesso (patched blob)');
    } finally {
      URL.revokeObjectURL(url);
    }

  } catch (err) {
    console.error('extracted/main.js: erro ao carregar ou aplicar patch no bundle', err);
    // Final fallback: try original compiled script by adding a module script
    const s = document.createElement('script');
    s.type = 'module';
    s.src = '../globo-interativo-beautified.js';
    document.body.appendChild(s);
  }
})();
