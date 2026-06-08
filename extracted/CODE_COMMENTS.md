# Código — comentários e pontos importantes

- `atmosphereColor("rgba(100, 200, 255, 0.3)")`
  - Problema: `THREE.Color` ignora o componente alpha; a chamada com `rgba(...)` gera o aviso no console.
  - Recomendações:
    - Use cor sem alpha: `atmosphereColor("rgb(100,200,255)")` ou `atmosphereColor("#64C8FF")`.
    - Controle opacidade separadamente (se a API do globe permitir): `atmosphereOpacity(0.3)` ou via material/mesh `opacity`.
    - Em Three.js puro, usar `new THREE.Color(r/255, g/255, b/255)` e ajustar `material.opacity`.

- `globeImageUrl(...)` / `backgroundImageUrl(...)`
  - São URLs para imagens externas (earth, night sky). Para trocar imagens, atualize esses argumentos.

- `polygonCapColor` / `polygonSideColor`
  - Funções que atribuem cores a polígonos (paises/regiões). Localize callbacks para ajustar cores dinamicamente.

- `window.addEventListener("resize", ...)` e chamadas `.width(window.innerWidth).height(window.innerHeight)`
  - Confirme se o handler é debounced para evitar recálculo excessivo.

- `createRoot(document.getElementById("root")).render(...)`
  - Ponto de entrada da aplicação; o componente raiz monta a cena.

- `source maps` ausentes
  - Arquivos `.map` candidatas retornaram HTML; as fontes originais (React/TSX) não estão disponíveis via servidor.

- `404 resource` observado no console
  - Verifique o painel Network no DevTools para identificar a URL faltante e restaurar/atualizar o recurso.

Recomendações de busca rápida (no arquivo `globo-interativo-beautified.js`):

```text
atmosphereColor
globeImageUrl
backgroundImageUrl
polygonCapColor
polygonSideColor
resize
createRoot
``` 

Exemplo de correção rápida:

```js
// Substituir isto (causa aviso):
.atmosphereColor("rgba(100, 200, 255, 0.3)")

// Por isto (opção A):
.atmosphereColor("rgb(100,200,255)")

// Ou (opção B) se a API expor controle de opacidade:
.atmosphereColor("rgb(100,200,255)")
.atmosphereOpacity(0.3)
```
