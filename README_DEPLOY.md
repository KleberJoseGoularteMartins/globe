Publicar no GitHub Pages — passo a passo

Este guia mostra como publicar o projeto `projeto-html` no GitHub Pages (gratuito).

1) Criar repositório no GitHub
- Faça login em https://github.com e clique em "New repository".
- Defina um nome (ex.: `globo-interativo`) e deixe como público.

2) Fazer push local para o repositório (Windows / PowerShell)
Abra PowerShell no diretório do projeto e execute:

```powershell
cd C:\Users\Kleber\Desktop\EBAC\projeto-html
git init
git add .
git commit -m "site: initial"
git branch -M main
# substitua USERNAME/REPO pela sua conta e nome do repo
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

3) Ativar GitHub Pages
- No GitHub, vá ao repositório > Settings > Pages.
- Em "Build and deployment", escolha "Deploy from a branch".
- Branch: `main`, Folder: `/ (root)` e salve.
- O site ficará disponível em `https://<USERNAME>.github.io/<REPO>/` (pode levar alguns minutos).

4) Atualizações posteriores
- Faça alterações localmente, commit e `git push`. O site será atualizado automaticamente.

5) Se quiser publicar o build modular (se você rodar `npm run build` e gerar `dist/modular.bundle.js`):
- Gere `dist/modular.bundle.js` localmente conforme `extracted/package.json`.
- Confirme que `dist/` está incluído no commit (ou ajuste `.gitignore`).

ZIP pronto
- Eu gerei `globo-interativo.zip` na raiz do projeto. Você pode baixar esse ZIP e subir pelo botão "Upload files" no GitHub caso prefira a interface web.

Se quiser, eu crio o workflow GitHub Actions para automatizar `npm run build` e publicar (automatiza builds), ou gero o ZIP com apenas os arquivos necessários para a raiz do Pages (minimizar arquivos). Diga o que prefere.