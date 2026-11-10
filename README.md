# Aroma & Grão — Projeto Final de Desenvolvimento de Interfaces

Site de uma cafeteria de especialidade fictícia, desenvolvido em **HTML, CSS e JavaScript puros**, com foco em acessibilidade (WCAG), usabilidade (heurísticas de Nielsen) e psicologia das cores.

**Autor:** Arthur Souza Mendes · **RA:** 22600960 · **Disciplina:** Desenvolvimento de Interfaces 2/2026 (CEUB) · **Prof.:** Dr. Felipe Batista da Silva

- Repositório: https://github.com/Souzaxasm/Aroma-Gr-o
- Site publicado: https://souzaxasm.github.io/Aroma-Gr-o/

## Recursos
- **Cabeçalho fixo e navegação** — Logotipo, menu com âncoras para cada seção, botões de tema e de acessibilidade. Inclui link “Pular para o conteúdo”.
- **Seção de abertura (hero)** — Título de impacto, texto de apoio, dois botões de ação e ilustração vetorial de uma xícara.
- **Cartões do cardápio** — Quatro cartões com ilustração, etiqueta, descrição e preço (Espresso, Cappuccino, V60 e Cold brew).
- **Abas de pesquisa** — Três abas (Origem, Torra, Sustentabilidade) e um campo de busca que filtra os cartões de todas as abas e abre a aba com resultados.
- **Carrossel de imagens** — Três slides com legenda, setas, indicadores, rotação automática e botão de pausa; funciona também com as setas do teclado.
- **Cartões explicativos** — Quatro cartões numerados com o passo a passo do preparo do café em casa.
- **Formulário de contato** — Campos nome, e-mail, assunto e mensagem, com validação em JavaScript e mensagens de erro associadas aos campos.
- **Página de login** — Tela separada (login.html) com e-mail, senha, opção “mostrar senha” e validação.
- **Modo escuro/claro** — Botão no cabeçalho e no painel de acessibilidade; respeita a preferência do sistema e guarda a escolha.
- **Painel de acessibilidade** — Aumentar e diminuir fonte (80% a 150%), modo escuro, alto contraste e restaurar padrão.
- **Rodapé** — Três colunas (sobre, horários, links) e nota de direitos autorais.

## Estrutura de pastas
```
Aroma-Gr-o/
├── index.html      # página principal
├── login.html      # página de login
├── css/style.css   # estilos, variáveis de cor e temas
├── js/main.js      # tema, acessibilidade, abas, busca, carrossel, formulários
└── README.md
```

## Paleta de cores
| Nome | Claro | Escuro | Uso |
|---|---|---|---|
| Café Torrado | `#6F4E37` | `#E0A96D` | Cor primária: botões, títulos, links, logotipo |
| Creme | `#FFF8F0` | `#1A1210` | Fundo da página (cor dominante) |
| Cartão Areia | `#F3E6D6` | `#2A1D18` | Fundo de cartões, seções alternadas e rodapé |
| Verde Folha | `#2F5D50` | `#8FC9B4` | Cor de apoio: etiquetas, destaques, sustentabilidade |
| Espresso | `#2B1B12` | `#F5EBDD` | Texto principal |
| Cacau Suave | `#5A4636` | `#CDBBA7` | Texto secundário e legendas |
| Borda Areia | `#D8C3AA` | `#4A372E` | Bordas de cartões, campos e divisores |
| Foco Azul | `#0B57D0` | `#8AB4F8` | Anel de foco do teclado (cor de contraste neutra à marca) |

## Contraste (WCAG)
| Modo | Par | Texto | Fundo | Razão |
|---|---|---|---|---|
| Claro | Texto principal sobre fundo | `#2B1B12` | `#FFF8F0` | 15,72:1 |
| Claro | Texto secundário sobre fundo | `#5A4636` | `#FFF8F0` | 8,43:1 |
| Claro | Texto do botão (branco sobre marrom) | `#FFFFFF` | `#6F4E37` | 7,44:1 |
| Claro | Títulos/links marrons sobre fundo | `#6F4E37` | `#FFF8F0` | 7,07:1 |
| Claro | Verde de apoio sobre fundo | `#2F5D50` | `#FFF8F0` | 7,11:1 |
| Claro | Texto principal sobre cartão | `#2B1B12` | `#F3E6D6` | 13,48:1 |
| Claro | Texto branco sobre verde | `#FFFFFF` | `#2F5D50` | 7,49:1 |
| Escuro | Texto principal sobre fundo | `#F5EBDD` | `#1A1210` | 15,65:1 |
| Escuro | Texto secundário sobre fundo | `#CDBBA7` | `#1A1210` | 9,90:1 |
| Escuro | Texto do botão (escuro sobre caramelo) | `#1A1210` | `#E0A96D` | 8,85:1 |
| Escuro | Títulos/links caramelo sobre fundo | `#E0A96D` | `#1A1210` | 8,85:1 |
| Escuro | Texto principal sobre cartão | `#F5EBDD` | `#2A1D18` | 13,83:1 |
| Escuro | Verde claro sobre fundo | `#8FC9B4` | `#1A1210` | 9,83:1 |

Todos os pares atingem o nível AAA para texto normal (7:1).

## Passo a passo da construção
### 1. Planejar a ideia
- Escolhi uma cafeteria de especialidade fictícia (Aroma & Grão) porque o tema permite uma paleta calorosa e muito conteúdo visual.
- Listei os requisitos da atividade: cartões, abas de pesquisa, contato com formulário, carrossel, imagens, cartões explicativos, modo escuro/claro, rodapé, login e painel de acessibilidade.

### 2. Definir a paleta e testar o contraste
- Escolhi as cores a partir da psicologia das cores (marrom, verde e caramelo).
- Calculei a razão de contraste de cada par de cores com a fórmula da WCAG e ajustei até passar de 7:1.
- Criei as variáveis CSS (--bg, --text, --primary...) para os modos claro, escuro e alto contraste.

### 3. Criar a estrutura HTML semântica
- Usei header, nav, main, section, article, figure e footer.
- Coloquei lang="pt-BR", o link “Pular para o conteúdo” e uma hierarquia de títulos (h1 → h2 → h3).

### 4. Escrever o CSS
- Reset simples (box-sizing), tipografia com Georgia nos títulos e Segoe UI no texto.
- Layout com CSS Grid (cartões com auto-fit) e Flexbox (cabeçalho, abas, rodapé).
- Estados :hover e :focus-visible, media query para celular e prefers-reduced-motion.

### 5. Programar o JavaScript
- Tema, tamanho de fonte e alto contraste, salvos no localStorage.
- Abas com ARIA e navegação por setas; busca que ignora acentos.
- Carrossel com setas, indicadores, rotação automática e pausa.
- Validação dos formulários de contato e de login com mensagens acessíveis.

### 6. Testar
- Abrir o site em 1280 px e em 390 px e conferir que não há rolagem horizontal.
- Navegar só com o teclado (Tab, Shift+Tab, Enter, Esc e setas).
- Rodar o Lighthouse (aba Accessibility) e o WAVE e corrigir os avisos.
- Conferir os contrastes no WebAIM Contrast Checker.

### 7. Versionar no GitHub
- Criei o repositório no GitHub e enviei o projeto em commits separados, um por etapa:
```bash
git clone https://github.com/Souzaxasm/Aroma-Gr-o.git
```
```bash
git add index.html css/ && git commit -m "v1.0: estrutura HTML e CSS base"
```
```bash
git add js/ && git commit -m "v1.1: tema, acessibilidade, abas, carrossel e formulários"
```
```bash
git add login.html && git commit -m "v1.2: página de login"
```
```bash
git push origin main
```

### 8. Publicar no GitHub Pages
- No repositório: Settings → Pages → Branch main, pasta /(root) → Save.
- Aguardar a publicação e acessar https://souzaxasm.github.io/Aroma-Gr-o/

## Como rodar localmente
Basta abrir `index.html` no navegador. Não há dependências nem etapa de build.
