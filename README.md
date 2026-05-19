<div align="center">

<img src="https://fateeight.com.br/src/images/logos/favicon.png" alt="Fate Eight Tech" width="200"/>

# Fate Eight Tech

### *"Assim como 8 bits criam a base da informação, nós criamos a base do seu sucesso."*

[![Website](https://img.shields.io/badge/Site-fateeight.com.br-0A84FF?style=for-the-badge)](https://fateeight.com.br)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-(61)_99044--8973-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/556190448973?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento.)
[![Instagram](https://img.shields.io/badge/Instagram-@fateeighttech-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/fateeighttech)
[![Facebook](https://img.shields.io/badge/Facebook-fateeighttech-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=61582108484785)
[![YouTube](https://img.shields.io/badge/YouTube-@FateEightTech-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@FateEightTech)

</div>

Site institucional estático — **HTML, CSS e JavaScript** — com foco em performance, SEO local e conversão (Google Ads, formulário e WhatsApp).

</div>

---

## Quem somos

A **Fate Eight Tech** desenvolve sites, landing pages e gestão de tráfego pago para empresas que querem **leads qualificados** com mensuração clara — do Distrito Federal e remoto em todo o Brasil.

<div align="center">

| 50+ projetos | 94% clientes satisfeitos | 5+ anos de experiência | Atendimento 24/7 |
|:---:|:---:|:---:|:---:|

</div>

---

### Páginas em `servicos/`

Criação de site, manutenção, SEO, hospedagem, design UI/UX, Google Ads, Instagram/Facebook/TikTok Ads, Google Meu Negócio e gestão de mídias sociais.

### Páginas em `regiao/`

Brasília-DF, Taguatinga, Ceilândia, Asa Norte, Asa Sul, Águas Lindas-GO e outras áreas atendidas.

---

## Funcionalidades do site

- **Home one-page** com seções: hero, prova social, serviços, anúncio pago, sobre (teaser), portfólio, depoimentos (carrossel), FAQ, áreas atendidas e CTA de contato
- **Navbar com scroll spy** — destaque automático do item do menu conforme a seção visível (`#home`, `#servicos`, `#empresa`, etc.)
- **Menu mobile** acessível (`inert` no drawer fechado, `aria-expanded` no botão)
- **Formulário de contato** com reCAPTCHA, honeypot e envio via StaticForms
- **WhatsApp qualificado** com rastreamento de engajamento
- **Confirmação antes de abrir links externos** do portfólio
- **Imagens WebP** com fallback e lazy loading
- **Versão EN** em `/en/`
- **SEO:** meta tags, canonical, `sitemap.xml` e páginas dedicadas por serviço/região

---

## Portfólio (destaques)

| Projeto | Destaque |
|---------|----------|
| **Global Solução** | +150% vendas em 3 meses com Google Ads |
| **Xequemate Serviços** | +30% clientes em 3 meses (MPI + site) |
| **DX Dedetizadora** | +130% clientes em 3 meses com Google Ads |
| **Exemplar Desentupidora** | Site institucional 24h + SEO local |
| **Barão do Grão** | Site para café especial |
| **GMC — Gestão de Granja** | Sistema web de gestão operacional |
| **Confiança Desentupidora** | [Landing](https://lp-confiaca.vercel.app/) dedetização/desentupimento DF e GO |
| **Sete Services** | [Landing](https://lp-7services.vercel.app/) terceirização operacional B2B |
| **LP Luthieria** | [Repositório](https://github.com/fateeighttech/LP-luthieria) — landing para oficina |

---

## Serviços

### Desenvolvimento web

| Serviço | Descrição |
|---------|-----------|
| Criação de site profissional | Sites institucionais, landing pages e aplicações responsivas |
| Manutenção de site | Atualizações, correções, segurança e backups |
| Otimização SEO | Posicionamento orgânico e conteúdo orientado a busca |
| Hospedagem e domínio | SSL, backup e suporte |
| Design UI/UX | Interfaces claras e focadas em conversão |

### Marketing digital

| Serviço | Descrição |
|---------|-----------|
| Google Ads | Busca, Performance Max, Display e otimização contínua |
| Instagram e Facebook Ads | Segmentação e criativos alinhados à landing |
| TikTok Ads | Presença em vídeo curto |
| Google Meu Negócio | Visibilidade local |
| Gestão de mídias sociais | Curadoria e publicação estratégica |

---

## Tecnologias

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Ads](https://img.shields.io/badge/Google_Ads-4285F4?style=for-the-badge&logo=google-ads&logoColor=white)
![Meta Ads](https://img.shields.io/badge/Meta_Ads-0467DF?style=for-the-badge&logo=meta&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-47A248?style=for-the-badge&logo=google&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

</div>

Stack do site: HTML semântico, CSS (variáveis e layout responsivo), JavaScript vanilla (sem bundler). Integrações: Google Tag Manager, reCAPTCHA, StaticForms.

---

## Desenvolvimento local

Não há `package.json` nem etapa de build — basta servir os arquivos estáticos.

**Opção 1 — Python**

```bash
cd public_html
python -m http.server 8080
```

Abra `http://localhost:8080`

**Opção 2 — Node (npx)**

```bash
npx serve .
```

**Opção 3 — extensão Live Server** no VS Code/Cursor, com raiz em `public_html`.

> Links âncora (`#servicos`, `#empresa`) funcionam na `index.html`. Páginas em subpastas usam caminhos relativos (`../`) para assets e navegação.

---

## Contato

<div align="center">

| Canal | Link |
|:---:|:---:|
| WhatsApp | [(61) 99044-8973](https://wa.me/556190448973) |
| E-mail | fateeighttechcontato@gmail.com |
| Site | [fateeight.com.br](https://fateeight.com.br) |
| Instagram | [@fateeighttech](https://instagram.com/fateeighttech) |
| YouTube | [@FateEightTech](https://www.youtube.com/@FateEightTech) |

</div>

---

<div align="center">

**© 2026 Fate Eight Tech — Todos os direitos reservados.**

*Desenvolvemos o digital. Crescemos juntos.*

</div>
