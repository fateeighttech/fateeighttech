'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const P = '../';

const shell = (inner, title, desc, canonicalPath, h1, isRegional) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow">
<meta name="description" content="${desc.replace(/"/g, '&quot;')}">
<link rel="canonical" href="https://fateeight.com.br/${canonicalPath}">
<title>${title.replace(/</g, '')}</title>
<link rel="icon" href="${P}src/images/logos/favicon.png" type="image/png">
<link rel="stylesheet" href="${P}src/css/style.css">
<link rel="stylesheet" href="${P}src/css/pages-landing.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='all'">
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17673039996"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','AW-17673039996');
</script>
</head>
<body>
<a href="#main" class="skip-link">Pular para o conteúdo</a>
<header class="header scrolled"><nav class="navbar"><div class="container"><div class="nav-wrapper">
<div class="logo">
<img src="${P}src/images/logos/logo-32x32.png" alt="" width="50" height="50" loading="eager" class="logo-img">
<a href="${P}index.html" style="text-decoration:none;color:inherit"><span class="logo-text">Fate<span>Eight</span> Tech</span></a>
</div>
<button type="button" class="mobile-menu-toggle" aria-label="Abrir menu"><span></span><span></span><span></span></button>
<ul class="nav-menu">
<li><a href="${P}index.html#home" class="nav-link">Home</a></li>
<li><a href="${P}index.html#servicos" class="nav-link">Serviços</a></li>
<li><a href="${P}index.html#portfolio" class="nav-link">Portfólio</a></li>
<li><a href="${P}sobre.html" class="nav-link">Sobre</a></li>
<li><a href="${P}contato.html" class="nav-link">Contato</a></li>
<li><a href="${P}en/index.html" class="nav-link" lang="en" hreflang="en">EN</a></li>
</ul>
</div></div></nav></header>
<section class="page-hero"><div class="container"><h1>${h1}</h1>
<p class="lead-page">${inner.lead}</p></div></section>
<main id="main" class="content-page"><div class="container prose">
${inner.body}
<section aria-labelledby="faq-${inner.faqId}"><h2 id="faq-${inner.faqId}">Perguntas frequentes</h2>
<div class="faq-list" style="max-width:100%">
${inner.faqs.map(f => `<div class="faq-item"><div class="faq-question"><h4>${f.q}</h4><i class="fas fa-chevron-down"></i></div><div class="faq-answer"><p>${f.a}</p></div></div>`).join('\n')}
</div></section>
<div class="service-page-cta">
<a href="${P}contato.html" class="btn btn-primary">Pedir orçamento</a>
<a href="https://wa.me/556190448973?text=Olá%2C%20gostaria%20de%20fazer%20um%20orçamento." class="btn btn-whatsapp js-wa-qualified" target="_blank" rel="noopener noreferrer">WhatsApp qualificado</a>
</div>
</div></main>
<footer class="footer"><div class="container"><div class="footer-bottom" style="border:none;padding-top:24px;">
<p>&copy; <span id="currentYear">2026</span> Fate Eight Tech.</p>
<div class="footer-links"><a href="${P}termos.html">Termos</a><span>|</span><a href="${P}privacidade.html">Privacidade</a><span>|</span><a href="${P}index.html">Home</a></div>
</div></div></footer>
<div id="cookie-banner"><span>Cookies conforme uso de medição e formulários.</span><a href="#" id="cookie-accept">Ok</a></div>
<script src="${P}src/js/main.js" defer></script>
</body></html>`;

const faqDefaults = [
    { q: 'Como solicito orçamento?', a: 'Pelo formulário em contato.html ou pelo WhatsApp após confirmar na janela de segurança.' },
    { q: 'Atendem apenas Brasília?', a: 'Estamos na região do DF e também atendemos projetos remotamente em todo o Brasil.' },
    { q: 'Trabalham com Google Ads e landing page junto?', a: 'Sim — alinhamos mensagem do anúncio à página para melhor Quality Score e conversões.' }
];

function writeService(file, data) {
    const inner = {
        lead: data.lead,
        body: data.paras.map(p => `<p>${p}</p>`).join('\n'),
        faqs: data.faqs || faqDefaults,
        faqId: file.replace(/\W/g, '')
    };
    fs.mkdirSync(path.dirname(path.join(root, 'servicos', file)), { recursive: true });
    fs.writeFileSync(path.join(root, 'servicos', file), shell(inner, data.title, data.desc, `servicos/${file}`, data.h1, false), 'utf8');
}

function writeRegiao(file, data) {
    const inner = {
        lead: data.lead,
        body: data.paras.map(p => `<p>${p}</p>`).join('\n'),
        faqs: data.faqs || [
            { q: `Vocês atendem ${data.h1.replace(/<[^>]+>/g, '')}?`, a: data.localFaq },
            ...faqDefaults.slice(1)
        ],
        faqId: file.replace(/\W/g, '')
    };
    fs.mkdirSync(path.join(root, 'regiao'), { recursive: true });
    fs.writeFileSync(path.join(root, 'regiao', file), shell(inner, data.title, data.desc, `regiao/${file}`, data.h1, true), 'utf8');
}

const services = [
    {
        file: 'criacao-de-site-profissional.html',
        title: 'Criação de Site Profissional | Fate Eight Tech',
        desc: 'Sites institucionais e landing pages rápidas, SEO técnico e UX para converter visitantes em leads.',
        h1: 'Criação de site profissional',
        lead: 'Projetamos sites e landings pensados para Google Ads e SEO — performance, acessibilidade e rastreamento.',
        paras: [
            'Desenvolvemos institucionais, one-page e estruturas mais complexas com código enxuto e imagens otimizadas.',
            'Integrações com tag de conversão, formulários anti-spam e meta tags para compartilhamento social.'
        ]
    },
    {
        file: 'manutencao-de-site.html',
        title: 'Manutenção de Site | Fate Eight Tech',
        desc: 'Atualização de conteúdo, segurança, backup e correções para seu site sempre no ar.',
        h1: 'Manutenção de site',
        lead: 'Pacotes sob medida para atualizar textos, imagens, plugins e garantir disponibilidade.',
        paras: [
            'Ideal para empresas que já têm site mas precisam de suporte técnico recorrente.',
            'Alterações solicitadas passam por fluxo rápido de orçamento e execução.'
        ]
    },
    {
        file: 'otimizacao-seo.html',
        title: 'Otimização SEO | Fate Eight Tech',
        desc: 'SEO técnico e conteúdo estratégico para melhorar relevância orgânica e atrair demanda qualificada.',
        h1: 'Otimização SEO',
        lead: 'Auditoria, palavras-chave, estrutura de dados e Core Web Vitals.',
        paras: [
            'Trabalhamos alinhamento entre intenção de busca e páginas de destino.',
            'SEO local combinado com Google Meu Negócio quando faz sentido para o negócio.'
        ]
    },
    {
        file: 'hospedagem-e-dominio.html',
        title: 'Hospedagem e Domínio | Fate Eight Tech',
        desc: 'Registro de domínio, hospedagem estável com SSL e backups para seu projeto.',
        h1: 'Hospedagem e domínio',
        lead: 'Ambientes seguros com HTTPS, backups e monitoramento.',
        paras: ['Registramos e renovamos domínios; configuramos DNS e e-mails quando necessário.', 'Opções conforme volume de tráfego e tipo de site.']
    },
    {
        file: 'gestao-de-midias-sociais.html',
        title: 'Gestão de Mídias Sociais | Fate Eight Tech',
        desc: 'Planejamento de posts, criativos e acompanhamento para marcas que precisam consistência.',
        h1: 'Gestão de mídias sociais',
        lead: 'Calendário editorial e desempenho por publicação.',
        paras: ['Alinhamos tom de voz e criativos aos objetivos de marca e campanhas pagas.', 'Relatórios simples para decisão rápida.']
    },
    {
        file: 'google-meu-negocio.html',
        title: 'Google Meu Negócio | Fate Eight Tech',
        desc: 'Otimização da ficha no Google: categorias, fotos, perguntas e avaliações.',
        h1: 'Google Meu Negócio',
        lead: 'Melhore visibilidade em mapas e buscas locais.',
        paras: ['Cadastro, verificação e otimização contínua.', 'Combina bem com SEO local e anúncios geo segmentados.']
    },
    {
        file: 'design-ui-ux.html',
        title: 'Design UI & UX | Fate Eight Tech',
        desc: 'Interfaces claras e fluxos pensados para conversão em mobile e desktop.',
        h1: 'Design UI & UX',
        lead: 'Wireframes, biblioteca visual e prototipação focada em usabilidade.',
        paras: ['Protótipos antes do desenvolvimento para validar fluxo.', 'Contraste e acessibilidade básica fazem parte do processo.']
    },
    {
        file: 'google-ads.html',
        title: 'Google Ads — Campanhas de Busca e Performance | Fate Eight Tech',
        desc: 'Gestão de campanhas Google Ads com foco em conversões, público-alvo e landing alinhadas.',
        h1: 'Google Ads',
        lead: 'Campanhas de Performance Max, Busca e Display sob medida para seu funil.',
        paras: ['Configuração de tags de conversão e audiências.', 'Otimização semanal com foco em CPA/ROAS conforme meta.']
    },
    {
        file: 'instagram-ads.html',
        title: 'Instagram Ads | Fate Eight Tech',
        desc: 'Campanhas no Instagram com segmentação Meta e criativos alinhados à página de destino.',
        h1: 'Instagram Ads',
        lead: 'Alcance e conversão no ecossistema Meta.',
        paras: ['Integração com pixel/conversões API quando aplicável.', 'Testes de criativo e público para reduzir CAC.']
    },
    {
        file: 'facebook-ads.html',
        title: 'Facebook Ads | Fate Eight Tech',
        desc: 'Anúncios no Facebook com estratégia de funil e mensuração correta.',
        h1: 'Facebook Ads',
        lead: 'Segmentação detalhada e campanhas de remarketing.',
        paras: ['Alinhamos oferta da campanha ao conteúdo da landing.', 'Relatórios periódicos com métricas acionáveis.']
    },
    {
        file: 'tiktok-ads.html',
        title: 'TikTok Ads | Fate Eight Tech',
        desc: 'Campanhas no TikTok para marcas que buscam alcance em formato vídeo vertical.',
        h1: 'TikTok Ads',
        lead: 'Estratégia criativa e orçamento conforme objetivo de conversão ou reconhecimento.',
        paras: ['Indicado para produtos com apelo visual e público jovem.', 'Integração com eventos de conversão quando disponível.']
    }
];

const regioes = [
    {
        file: 'brasilia-df.html',
        title: 'Marketing Digital e Sites em Brasília (DF) | Fate Eight Tech',
        desc: 'Sites, Google Ads e SEO para empresas na capital federal.',
        h1: 'Brasília e Distrito Federal',
        lead: 'Atendimento na capital com foco em empresas locais e projetos institucionais.',
        paras: ['Escopo para campanhas segmentadas ao DF e landing pages geo personalizadas.', 'Ideal para negócios que buscam leads na região administrativa.'],
        localFaq: 'Sim — atendemos empresas e prestadores na capital e entorno.'
    },
    {
        file: 'asa-norte.html',
        title: 'Marketing Digital na Asa Norte | Fate Eight Tech',
        desc: 'Sites e anúncios para negócios na Asa Norte, Brasília.',
        h1: 'Asa Norte — Brasília',
        lead: 'SEO local e Google Ads direcionados ao público da AN.',
        paras: ['Conteúdo e palavras-chave pensados para buscas na região.', 'Combinamos Google Meu Negócio quando há endereço físico.'],
        localFaq: 'Sim — páginas e campanhas podem ser focadas na Asa Norte.'
    },
    {
        file: 'asa-sul.html',
        title: 'Marketing Digital na Asa Sul | Fate Eight Tech',
        desc: 'Performance digital para empresas na Asa Sul, Brasília.',
        h1: 'Asa Sul — Brasília',
        lead: 'Projetos web e mídia paga com mensagem regionalizada.',
        paras: ['Landing pages com prova social e CTA claros.', 'Segmentação geográfica fina nas campanhas.'],
        localFaq: 'Sim, atuamos com escopo regional para a Asa Sul.'
    },
    {
        file: 'taguatinga.html',
        title: 'Sites e Google Ads em Taguatinga | Fate Eight Tech',
        desc: 'Presença digital para comércio e serviços em Taguatinga e redondezas.',
        h1: 'Taguatinga e região',
        lead: 'Alcance cliente local com anúncios e SEO em Taguatinga.',
        paras: ['Campanhas de busca local e extenções de local no Google Ads.', 'Páginas otimizadas para mobile.'],
        localFaq: 'Sim — inclusive para negócios na cidade satélite e entorno próximo.'
    },
    {
        file: 'ceilandia.html',
        title: 'Marketing Digital em Ceilândia | Fate Eight Tech',
        desc: 'SEO local e tráfego pago para Ceilândia e região.',
        h1: 'Ceilândia — DF',
        lead: 'Soluções para aumentar chamadas e formulários na região.',
        paras: ['Anúncios no mapa e remarketing conforme perfil.', 'Sites rápidos para bom desempenho em 4G.'],
        localFaq: 'Sim — estratégias específicas para Ceilândia.'
    },
    {
        file: 'aguas-lindas-go.html',
        title: 'Sites e Ads em Águas Lindas (GO) | Fate Eight Tech',
        desc: 'Atendimento ao entorno do DF em Águas Lindas de Goiás.',
        h1: 'Águas Lindas (GO)',
        lead: 'Empresas da região metropolitana e entorno.',
        paras: ['Escopo regional no conteúdo e palavras-chave locais.', 'Campanhas com raio geográfico ajustável.'],
        localFaq: 'Sim — atendemos projetos com foco em Águas Lindas e região.'
    }
];

services.forEach(s => writeService(s.file, s));
regioes.forEach(r => writeRegiao(r.file, r));

console.log('Generated servicos/*.html and regiao/*.html');
