# Globo Interativo — Arquivos extraídos

O objetivo desta pasta `extracted/` é organizar o bundle compilado em artefatos editáveis para facilitar inspeção e mudanças.

- `index.html` — stub que monta um `#root` e carrega o bundle beautified localizado na raiz como `../globo-interativo-beautified.js`.
- `styles.css` — importa o CSS gerado pelo build remoto via `@import` (arquivo original: `assets/index-Bj-c6jOt.css`).
- `CODE_COMMENTS.md` — anotações rápidas com strings encontradas e recomendações de correção.

Observações importantes:

- O bundle original é compilado (não há source maps utilizáveis), então o código foi só formatado — não é o código-fonte modular original.
- Para editar de forma segura:
  1. Faça alterações pequenas e testáveis (ex.: trocar `atmosphereColor` para remover alpha).
  2. Teste localmente abrindo `extracted/index.html` em um servidor local.

Comandos rápidos para testar localmente (na pasta do projeto):

```powershell
# Iniciar servidor HTTP simples (Windows / Python instalado)
python -m http.server 8000

# Depois abra http://localhost:8000/extracted/index.html
```

Próximos passos sugeridos (posso executar):

- Copiar `globo-interativo-beautified.js` para `extracted/main.js` e dividir manualmente em módulos (trabalho manual grande).
- Aplicar correção automática para `atmosphereColor` (ex.: remover alpha) e testar.
- Procurar e identificar a URL que retorna 404 e corrigi-la.
