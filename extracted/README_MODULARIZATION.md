README — Modularização do bundle

Objetivo
- Tornar o bundle extraído mais fácil de modificar: dividir em módulos lógicos (dados, visual, UI, utilitários) e adicionar anotações.

Recomendação de etapas
1. Identificar responsabilidades no `globo-interativo-beautified.js` (ou `extracted/main.bundle.js`).
   - `data` (geojson, paths, labels)
   - `render` (three-globe init, materiais, cameras)
   - `ui` (botões, tooltips, inputs)
   - `init` (bootstrapping, react root)
2. Criar arquivos em `extracted/src/`: `data.js`, `globe.js`, `ui.js`, `init.js`.
3. Copiar partes relevantes do bundle beautified para cada arquivo e refatorar para usar ES modules.
4. Usar um bundler simples (e.g., esbuild) para produzir um novo `main.bundle.js` para carregar localmente.

Atalho (rápido, sem bundler):
- Em `extracted/main.js` você pode apply runtime patches ou small wrapper modules that override specific props (e.g., polygon color callbacks) without fully splitting the bundle.

Precauções
- O bundle original é compilado/minificado; separar exige trabalho manual e testes.
- Mantive um loader dinâmico em `extracted/main.js` para permitir patches sem recompilar.

Quer que eu
- crie a estrutura `extracted/src/` com arquivos iniciais e copie trechos anotados daqui para começar a modularização, ou
- faça apenas um split mínimo (ex.: extrair dados para `data.js` e the rest stays bundled)?

Implementado (inicial)
- Criei a estrutura `extracted/src/` com módulos iniciais: `data.js`, `globe.js`, `ui.js`, `init.js`.
- Adicionei `extracted/package.json` com um exemplo de script `build` usando `esbuild`.

Como construir o bundle modular (opcional):

```bash
# usando npx (não precisa instalar globalmente)
npx esbuild extracted/src/init.js --bundle --outfile=extracted/dist/modular.bundle.js --format=esm --sourcemap
```

Notas:
- O scaffold atual é seguro para testes locais e não substitui automaticamente o `main.bundle.js` compilado.
- Próximo passo recomendado: extrair incrementalmente funções do bundle beautified para os módulos acima, começando por `data.js` (geojson, paths).
