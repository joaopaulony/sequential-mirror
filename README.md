## Projeto Faculdade Sequencial – Mirror + Site Estático com CMS

Este repositório contém:

- **Um “espelho” (mirror) estático** do site atual da faculdade (que hoje roda em WordPress).
- **Um novo site em React/Vite**, que será o futuro site oficial.
- **Um CMS moderno (Sanity)** para gerenciar conteúdos (notícias, editais, etc.).

A ideia é **sair do WordPress** usando o mirror como base visual e ir migrando o conteúdo para o novo site estático com CMS.

---

### O que é o “mirror” do site?

- O **mirror** é uma **cópia estática** (HTML, CSS, JS, imagens) do site WordPress atual.
- Os scripts `mirror:home` e `mirror:site` acessam `https://gruposequencial.com.br` e salvam as páginas em:
  - `index.html` na raiz
  - pasta `public/` (ex.: `public/noticias/.../index.html`, `public/editais/.../index.html` etc.).
- Isso é útil para:
  - Ter um “snapshot” do site atual, mesmo que o WordPress saia do ar.
  - Ver como são os textos, layouts e URLs para recriar tudo em React.

O mirror **não tem CMS**: é só HTML. Para mudar textos nele, você teria que editar arquivos HTML ou rodar o script de mirror de novo.

---

### O que é o site estático em React/Vite?

- É o **novo site** da faculdade, feito com:
  - **Vite** (ferramenta de build e dev server).
  - **React + TypeScript**.
  - **shadcn-ui + Tailwind CSS** (componentes visuais).
  - **react-router-dom** (rotas, ex.: `/noticias`, `/editais/...`).
  - **@tanstack/react-query** (busca de dados).
  - **Sanity** como CMS (conteúdos dinâmicos).

Algumas rotas importantes já existem:

- `/` – home em React (layout novo).
- `/noticias` e `/noticias/:slug` – lista e detalhe de notícias vindas do Sanity.
- `/editais` e `/editais/:slug` – lista e detalhe de editais do Sanity.

Aos poucos, outras páginas (história, unidades, cursos etc.) podem ser migradas para React e conectadas ao CMS.

---

### Tecnologias e dependências principais

- **Ferramentas base**
  - **Vite** – bundler/dev server.
  - **TypeScript** – tipagem estática.
  - **React** – biblioteca principal de UI.
  - **React Router DOM** – rotas SPA.
  - **Tailwind CSS** + **shadcn-ui** – design system e componentes.

- **UI / UX / componentes**
  - `@radix-ui/*` – vários componentes acessíveis (menus, diálogos, etc.).
  - Componentes shadcn-ui em `src/components/ui`.
  - `framer-motion` – animações.

- **Gerenciamento de formulários e validação**
  - `react-hook-form`
  - `zod`

- **Dados e gráficos**
  - `@tanstack/react-query` – fetch/cache de dados (usado para buscar dados do Sanity).
  - `recharts` – gráficos (se necessário no futuro).

- **CMS / Conteúdo**
  - `sanity` – Studio (a interface de CMS).
  - `@sanity/client` – cliente para consumir o conteúdo no React.

Para ver a lista completa de dependências, basta abrir o arquivo `package.json` na raiz do projeto.

---

### Estrutura geral do projeto (resumida)

- `src/`
  - `main.tsx` – ponto de entrada React.
  - `App.tsx` – definição das rotas principais.
  - `pages/`
    - `Index.tsx` – home.
    - `NoticiasList.tsx` – lista de notícias.
    - `NoticiaDetalhe.tsx` – detalhe de notícia.
    - `EditaisList.tsx` – lista de editais.
    - `EditalDetalhe.tsx` – detalhe de edital.
  - `components/`
    - `Header.tsx`, `Footer.tsx`, seções da home etc.
  - `lib/`
    - `sanityClient.ts` – cliente do Sanity.
    - `content.ts` – funções que buscam notícias/editais no Sanity.

- `public/`
  - Espelho das páginas do WordPress (mirror estático).

- `sanity/`
  - `schemas/` – schemas do CMS (notícias, editais, páginas, unidades, cursos).

---

### Como rodar o projeto localmente (site React + mirror)

Pré-requisitos:

- Node.js instalado (versão LTS recomendada).
- npm instalado (vem junto com o Node).

#### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/sequential-mirror.git
cd sequential-mirror
```

#### 2. Instalar dependências

```bash
npm install
```

#### 3. Rodar o **site React/Vite** (novo site)

```bash
npm run dev
```

Ou, se quiser em uma porta específica (por exemplo 8080):

```bash
npm run dev -- --port 8080
```

Depois abra no navegador:

- `http://localhost:5173/` (porta padrão do Vite)  
  ou  
- `http://localhost:8080/` (se você tiver passado `--port 8080`).

Rotas úteis:

- `http://localhost:5173/` – home nova.
- `http://localhost:5173/noticias` – lista de notícias.
- `http://localhost:5173/noticias/algum-slug` – detalhe de notícia.
- `http://localhost:5173/editais` – lista de editais.
- `http://localhost:5173/editais/algum-slug` – detalhe de edital.

> Obs.: para ver dados reais em notícias/editais, é preciso ter o **Sanity configurado** e com conteúdo criado (ver seção “CMS Sanity” abaixo).

#### 4. Rodar **apenas o mirror estático**

Se você quiser ver o espelho exato do site WordPress (HTML estático em `public/`):

```bash
npm run dev:mirror
```

Isso sobe um servidor simples na porta `8080` servindo **apenas a pasta `public/`**.

- Acesse: `http://localhost:8080/`
- Os menus e links funcionam como no site WordPress original, porque estão usando o HTML espelhado.

#### 5. Gerar build de produção do site React/Vite

```bash
npm run build
```

O resultado fica em `dist/`, pronto para ser publicado em serviços como Vercel, Netlify, etc.

---

### CMS Sanity – como funciona neste projeto

O Sanity é o CMS onde você cadastra **notícias**, **editais**, **páginas institucionais**, **unidades** e **cursos**.

#### 1. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz com:

```bash
VITE_SANITY_PROJECT_ID=SEU_PROJECT_ID
VITE_SANITY_DATASET=production
```

E um arquivo `.env` (para o Studio do Sanity) com:

```bash
SANITY_STUDIO_PROJECT_ID=SEU_PROJECT_ID
SANITY_STUDIO_DATASET=production
```

> O `SEU_PROJECT_ID` você obtém ao criar o projeto no site do Sanity.

#### 2. Rodar o Sanity Studio

```bash
npx sanity dev
```

Isso abre o CMS (Studio) em:

- `http://localhost:3333/`

Lá você vai ver coleções como:

- **Notícia**
+- **Edital**
 - **Página institucional**
 - **Unidade**
 - **Curso**

Crie algumas notícias/editais com `title`, `slug`, `date` etc.  
Depois disso, as rotas `/noticias` e `/editais` do site React vão mostrar esses conteúdos.

---

### Scripts npm importantes (resumo)

- **`npm run dev`**  
  Roda o **novo site** React/Vite (SPA com rotas e CMS).

- **`npm run dev -- --port 8080`**  
  Mesmo que acima, mas na porta 8080.

- **`npm run dev:mirror`**  
  Sobe um servidor simples servindo **somente o mirror estático** (`public/`).

- **`npm run build`**  
  Gera build de produção do site React em `dist/`.

- **`npm run mirror:site`**  
  Atualiza o mirror completo do site WordPress, baixando as páginas para `public/`.

- **`npm run mirror:home`**  
  Atualiza somente a home do mirror.

---

### Fluxo de deploy (Vercel)

O projeto já tem um `vercel.json` básico configurado para:

- Construir o projeto usando o Vite (`npm run build`).
- Redirecionar todas as rotas para `index.html` (SPA), garantindo que:
  - `/noticias/...`, `/editais/...` etc. funcionem direto na Vercel.

Fluxo geral:

1. Subir o repositório para o GitHub.
2. No painel da Vercel, criar um novo projeto conectado a esse repositório.
3. A Vercel detecta Vite automaticamente; se precisar:
   - Build command: `npm run build`
   - Output dir: `dist`
4. Definir as variáveis de ambiente do Sanity na Vercel:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`

---

### Guia rápido de git para o time

#### Clonar e rodar o projeto

```bash
git clone https://github.com/SEU_USUARIO/sequential-mirror.git
cd sequential-mirror
npm install
npm run dev
```

#### Ver estado do repositório

- `git status`

#### Atualizar sua cópia antes de começar algo novo

```bash
git checkout main
git pull
```

#### Criar uma branch para cada tarefa

```bash
git checkout -b feature/nome-da-tarefa
# faz as mudanças
git add .
git commit -m "descrição da mudança"
git push -u origin feature/nome-da-tarefa
```

Depois de fazer o `push`, abrir um **Pull Request** no GitHub da branch `feature/...` para `main`.

#### Após o PR ser aprovado e mesclado

```bash
git checkout main
git pull
# opcional: apagar a branch local
git branch -d feature/nome-da-tarefa
# opcional: apagar a branch remota
git push origin --delete feature/nome-da-tarefa
```

#### Boas práticas para colaboradores

1. Fazer **fork** do repositório (se não tiver acesso direto) ou clonar direto se já tiver permissão.
2. Criar sempre uma **branch nova** a partir da `main` para cada melhoria/bugfix.
3. Fazer **commits pequenos e com mensagem clara** (ex.: `ajusta rota de noticias`, `integra noticias com sanity`).
4. Abrir **Pull Request** e marcar alguém do time para revisão.
5. Evitar `git push` direto na `main` – priorizar sempre PRs.

