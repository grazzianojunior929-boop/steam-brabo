# Steam Brabo 👑

> De player, pra player.

Site da **Steam Brabo**: página única, responsiva (feita primeiro pro celular), com os planos **Brabo Max**, **Brabo Premium** e **Brabo Ultra Plus+** e todos os botões levando direto pro WhatsApp com mensagem pronta.

**Site no ar:** https://grazzianojunior929-boop.github.io/steam-brabo/

## Destaques técnicos

- **HTML, CSS e JavaScript puros**, sem framework nem etapa de build: o site inteiro é um `index.html`, pensado primeiro para o celular.
- **Avaliações de clientes com back-end serverless:** um Google Apps Script (`apps-script-avaliacoes.gs`) recebe e entrega as avaliações, guardadas numa planilha Google. O dono modera pela própria planilha.
- **Formulário protegido:** campo-isca contra robôs, bloqueio de injeção de fórmulas na planilha, validação de tamanho e formato, e trava (`LockService`) contra gravações simultâneas.
- **Foto de perfil comprimida no navegador** (canvas → JPEG pequeno) antes do envio.
- **Desempenho e acessibilidade:** imagens com carregamento preguiçoso, animações disparadas com `IntersectionObserver` e respeito a `prefers-reduced-motion`.
- **Hospedagem gratuita** no GitHub Pages.

**Tecnologias:** HTML5 · CSS3 · JavaScript · Google Apps Script · Google Sheets · GitHub Pages

## Estrutura

```
steam-brabo/
├── index.html          → o site inteiro (HTML + CSS + JavaScript)
├── README.md           → este arquivo
└── assets/
    ├── favicon-*.png   → ícone da aba em vários tamanhos
    ├── favicon.ico
    └── banner-steam-brabo.jpg → banner oficial da marca
```

## Como editar

Quase tudo se muda no objeto `CONFIG`, no fim do `index.html`:

| O que mudar | Onde |
|---|---|
| Número do WhatsApp | `whatsapp: "5563992427507"` (55 + DDD + número) |
| Planos (nome, texto, imagem, mensagem) | `fileiras[0].itens` |
| Banner | `banner.imagens` (vazio = banner animado) |

### Usar o banner oficial no topo

```js
banner: {
  imagens: [
    { src: "assets/banner-steam-brabo.jpg", alt: "Steam Brabo" }
  ],
  intervalo: 5000
},
```

## Publicar grátis com GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Selecione a branch **main** e a pasta **/ (root)** e clique em **Save**.
4. Em 1 a 2 minutos o site fica no ar em `https://SEU-USUARIO.github.io/steam-brabo/`.

## WhatsApp

Se o navegador bloquear a nova aba, o site abre uma janela de contato com
"Abrir WhatsApp", "Abrir no app", "Copiar número" e "Copiar link".
Hospedado no GitHub Pages, o WhatsApp abre direto.

---
Steam é marca registrada da Valve Corporation. A Steam Brabo não é afiliada à Valve.
