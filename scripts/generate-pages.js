'use strict';

/**
 * Gera páginas estáticas em servicos/*.html e regiao/*.html.
 * Execução (na raiz do site): node scripts/generate-pages.js
 *
 * Partial compartilhado: scripts/partials/site-chrome.js
 */

const fs = require('fs');
const path = require('path');
const chrome = require('./partials/site-chrome');

const root = path.join(__dirname, '..');
const ASSET_PREFIX = '../';

const faqDefaults = [
    {
        q: 'Como solicito orçamento?',
        a: 'Pelo formulário em contato.html ou pelo WhatsApp após confirmar na janela de segurança.'
    },
    {
        q: 'Atendem apenas Brasília?',
        a: 'Estamos na região do DF e também atendemos projetos remotamente em todo o Brasil.'
    },
    {
        q: 'Trabalham com Google Ads e landing page junto?',
        a: 'Sim — alinhamos mensagem do anúncio à página para melhor Quality Score e conversões.'
    }
];

function renderHead(meta) {
    const titleEsc = meta.title.replace(/</g, '');
    const descEsc = meta.desc.replace(/"/g, '&quot;');
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow">
<meta name="description" content="${descEsc}">
<link rel="canonical" href="https://fateeight.com.br/${meta.canonicalPath}">
<title>${titleEsc}</title>
<link rel="icon" href="${ASSET_PREFIX}src/images/logos/favicon.png" type="image/png">
<link rel="stylesheet" href="${ASSET_PREFIX}src/css/style.css">
<link rel="stylesheet" href="${ASSET_PREFIX}src/css/pages-landing.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17673039996"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','AW-17673039996');
</script>
</head>`;
}

function renderHeader(paths) {
    const logo = paths.asset('src/images/logos/logo-32x32.png');
    return `
<body>
<a href="#main" class="skip-link">Pular para o conteúdo</a>
<header class="header scrolled"><nav class="navbar"><div class="container"><div class="nav-wrapper">
<div class="logo">
<img src="${logo}" alt="" width="50" height="50" loading="eager" class="logo-img">
<a href="${paths.index}" style="text-decoration:none;color:inherit"><span class="logo-text">Fate<span>Eight</span> Tech</span></a>
</div>
<button type="button" class="mobile-menu-toggle" aria-label="Abrir menu"><span></span><span></span><span></span></button>
<ul class="nav-menu">
<li><a href="${paths.index}#home" class="nav-link">Home</a></li>
<li><a href="${paths.index}#servicos" class="nav-link active">Serviços</a></li>
<li><a href="${paths.index}#portfolio" class="nav-link">Portfólio</a></li>
<li><a href="${paths.sobre}" class="nav-link">Sobre</a></li>
<li><a href="${paths.contato}" class="nav-link">Contato</a></li>
<li><a href="${paths.enHome}" class="nav-link" lang="en" hreflang="en">EN</a></li>
</ul>
</div></div></nav></header>`;
}

function renderHero(h1, lead) {
    return `<section class="page-hero"><div class="container"><h1>${chrome.escapeHtml(h1)}</h1>
<p class="lead-page">${chrome.escapeHtml(lead)}</p></div></section>`;
}

function renderProseBody(data, faqId) {
    const paras = (data.paras || []).map(function (p) {
        return '<p>' + chrome.escapeHtml(p) + '</p>';
    }).join('\n');

    let highlightsBlock = '';
    if (data.highlights && data.highlights.length) {
        const ht = chrome.escapeHtml(data.highlightsTitle || 'O que você pode esperar');
        const lis = data.highlights.map(function (item) {
            return '<li>' + chrome.escapeHtml(item) + '</li>';
        }).join('\n');
        highlightsBlock =
            '<section class="service-block" aria-labelledby="hl-' +
            faqId +
            '"><h2 id="hl-' +
            faqId +
            '">' +
            ht +
            '</h2><ul class="service-checklist">\n' +
            lis +
            '\n</ul></section>';
    }

    return paras + '\n' + highlightsBlock;
}

function renderFaqSection(faqs, faqId) {
    const items = faqs
        .map(function (f) {
            return (
                '<div class="faq-item"><div class="faq-question"><h4>' +
                chrome.escapeHtml(f.q) +
                '</h4><i class="fas fa-chevron-down"></i></div><div class="faq-answer"><p>' +
                chrome.escapeHtml(f.a) +
                '</p></div></div>'
            );
        })
        .join('\n');

    return (
        '<section aria-labelledby="faq-' +
        faqId +
        '"><h2 id="faq-' +
        faqId +
        '">Perguntas frequentes</h2>\n' +
        '<div class="faq-list" style="max-width:100%">\n' +
        items +
        '\n</div></section>'
    );
}

function renderCta() {
    return `<div class="service-page-cta">
<a href="${ASSET_PREFIX}contato.html" class="btn btn-primary">Pedir orçamento</a>
<a href="https://wa.me/556190448973?text=Olá%2C%20gostaria%20de%20fazer%20um%20orçamento." class="btn btn-whatsapp js-wa-qualified" target="_blank" rel="noopener noreferrer">WhatsApp qualificado</a>
</div>`;
}

function buildHtml(meta, paths, data, faqId, faqs) {
    const prose = renderProseBody(data, faqId);
    const faqHtml = renderFaqSection(faqs, faqId);

    return (
        renderHead(meta) +
        renderHeader(paths) +
        renderHero(meta.h1, meta.lead) +
        '<main id="main" class="content-page"><div class="container prose">\n' +
        prose +
        '\n' +
        faqHtml +
        '\n' +
        renderCta() +
        '\n</div></main>\n' +
        chrome.siteFooter(paths) +
        '\n' +
        chrome.siteCookieBanner() +
        '\n' +
        chrome.siteFloatingWidgets() +
        `\n<script src="${ASSET_PREFIX}src/js/main.js" defer></script>\n</body>\n</html>`
    );
}

function writeService(file, data) {
    const paths = chrome.createPathHelpers('servicos');
    const faqId = file.replace(/\W/g, '');
    const faqs = data.faqs || faqDefaults;
    const meta = {
        title: data.title,
        desc: data.desc,
        canonicalPath: 'servicos/' + file,
        h1: data.h1,
        lead: data.lead
    };
    fs.mkdirSync(path.dirname(path.join(root, 'servicos', file)), { recursive: true });
    fs.writeFileSync(path.join(root, 'servicos', file), buildHtml(meta, paths, data, faqId, faqs), 'utf8');
}

function writeRegiao(file, data) {
    const paths = chrome.createPathHelpers('regiao');
    const faqId = file.replace(/\W/g, '');
    const faqs =
        data.faqs ||
        [
            {
                q: 'Vocês atendem ' + data.h1.replace(/<[^>]+>/g, '') + '?',
                a: data.localFaq
            },
            faqDefaults[1],
            faqDefaults[2]
        ];
    const meta = {
        title: data.title,
        desc: data.desc,
        canonicalPath: 'regiao/' + file,
        h1: data.h1,
        lead: data.lead
    };
    fs.mkdirSync(path.join(root, 'regiao'), { recursive: true });
    fs.writeFileSync(path.join(root, 'regiao', file), buildHtml(meta, paths, data, faqId, faqs), 'utf8');
}

const services = [
    {
        file: 'criacao-de-site-profissional.html',
        title: 'Criação de Site Profissional | Fate Eight Tech',
        desc: 'Sites institucionais e landing pages rápidas, SEO técnico e UX para converter visitantes em leads.',
        h1: 'Criação de site profissional',
        lead: 'Projetamos sites e landings pensados para Google Ads e SEO — performance, acessibilidade e rastreamento confiável.',
        paras: [
            'Desenvolvemos páginas institucionais, one-page e estruturas maiores com HTML/CSS enxutos, imagens em formatos modernos e carregamento previsível em mobile.',
            'Cada projeto nasce alinhado ao objetivo de negócio: formulários com honeypot e verificação, meta tags para redes sociais e instruções claras para tag de conversão no Google Ads.'
        ],
        highlightsTitle: 'Entregas típicas',
        highlights: [
            'Wireframe ou mapa de seções antes de codar, para validar hierarquia e CTAs.',
            'Semáticas HTML5, contraste legível e responsividade testada em breakpoints comuns.',
            'Integração com GA4/tag de conversão e formulário com proteção anti-spam.',
            'Checklist de go-live: SSL, sitemap, performance básica e revisão de indexação.'
        ]
    },
    {
        file: 'manutencao-de-site.html',
        title: 'Manutenção de Site | Fate Eight Tech',
        desc: 'Atualização de conteúdo, segurança, backup e correções para seu site sempre no ar.',
        h1: 'Manutenção de site',
        lead: 'Pacotes sob medida para atualizar textos, imagens, código e garantir disponibilidade.',
        paras: [
            'Ideal para empresas que já têm site e precisam de suporte técnico recorrente sem contratar um time interno.',
            'Solicitações passam por orçamento rápido e fila priorizada — de pequenas alterações de copy até ajustes de layout e integrações.'
        ],
        highlightsTitle: 'O que pode entrar no escopo',
        highlights: [
            'Atualização de conteúdo, banners e páginas de campanha sazonal.',
            'Correções de bugs, links quebrados e compatibilidade com navegadores atuais.',
            'Rotinas de backup e orientação de segurança (senhas, HTTPS, atualizações).',
            'Suporte pontual para eventos de tráfego pago (landing de oferta, UTM).'
        ]
    },
    {
        file: 'otimizacao-seo.html',
        title: 'Otimização SEO | Fate Eight Tech',
        desc: 'SEO técnico e conteúdo estratégico para melhorar relevância orgânica e atrair demanda qualificada.',
        h1: 'Otimização SEO',
        lead: 'Auditoria, intenção de busca, dados estruturados e performance para resultados duradouros.',
        paras: [
            'Trabalhamos alinhamento entre intenção de busca e páginas de destino: títulos, headings e snippets que comunicam valor no SERP.',
            'SEO local e Google Meu Negócio podem entrar no plano quando o negócio depende de proximidade ou região.'
        ],
        highlightsTitle: 'Frentes que costumamos atuar',
        highlights: [
            'SEO técnico: rastreamento, indexação, Core Web Vitals e erros em Search Console.',
            'Pesquisa de termos e mapa de conteúdo por intenção (informacional x transacional).',
            'Dados estruturados quando aplicável (organização, FAQ, breadcrumbs).',
            'Integração com campanhas pagas para testar mensagens e refinar páginas orgânicas.'
        ]
    },
    {
        file: 'hospedagem-e-dominio.html',
        title: 'Hospedagem e Domínio | Fate Eight Tech',
        desc: 'Registro de domínio, hospedagem estável com SSL e backups para seu projeto.',
        h1: 'Hospedagem e domínio',
        lead: 'Ambientes com HTTPS, backups e DNS configurados para seu caso de uso.',
        paras: [
            'Registramos ou transferimos domínios e configuramos DNS (site, e-mail, subdomínios) com documentação clara.',
            'Hospedagem dimensionada conforme tráfego, tipo de site e necessidade de staging para testes antes do deploy.'
        ],
        highlightsTitle: 'Benefícios operacionais',
        highlights: [
            'Certificados SSL e renovação acompanhada.',
            'Backups periódicos e plano de restauração acordado.',
            'Monitoramento básico de disponibilidade e orientação em incidentes.',
            'Migração entre provedores com checklist para minimizar downtime.'
        ]
    },
    {
        file: 'gestao-de-midias-sociais.html',
        title: 'Gestão de Mídias Sociais | Fate Eight Tech',
        desc: 'Planejamento de posts, criativos e acompanhamento para marcas que precisam consistência.',
        h1: 'Gestão de mídias sociais',
        lead: 'Calendário editorial, criativos e leitura de desempenho por publicação.',
        paras: [
            'Alinhamos tom de voz e formatos aos objetivos de marca e às campanhas pagas que estiverem no ar.',
            'Relatórios enxutos focam no que importa para decisão: alcance útil, engajamento e encaminhamentos para site ou WhatsApp.'
        ],
        highlightsTitle: 'Como organizamos o trabalho',
        highlights: [
            'Linha editorial e batch de posts com antecedência negociada.',
            'Adaptação de criativos para feed, stories e anúncios quando combinado.',
            'Moderação leve de comentários e FAQs alinhadas ao time comercial.',
            'Sincronização com lançamentos de produto e sazonalidade.'
        ]
    },
    {
        file: 'google-meu-negocio.html',
        title: 'Google Meu Negócio | Fate Eight Tech',
        desc: 'Otimização da ficha no Google: categorias, fotos, perguntas e avaliações.',
        h1: 'Google Meu Negócio',
        lead: 'Melhore visibilidade em Mapas e buscas locais com ficha completa e consistente.',
        paras: [
            'Cuidamos de cadastro, verificação e campos que influenciam ranqueamento local: categorias, área de atendimento e horários.',
            'Estratégia de avaliações e perguntas frequentes alinhada ao posicionamento do negócio.'
        ],
        highlightsTitle: 'Pontos de atenção',
        highlights: [
            'Fotos e vídeos com foco em produtos, time e ambiente quando aplicável.',
            'Posts na ficha para promoções e novidades.',
            'Coerência NAP (nome, endereço, telefone) entre site e diretórios.',
            'Conexão com anúncios geolocalizados e SEO local no site.'
        ]
    },
    {
        file: 'design-ui-ux.html',
        title: 'Design UI & UX | Fate Eight Tech',
        desc: 'Interfaces claras e fluxos pensados para conversão em mobile e desktop.',
        h1: 'Design UI & UX',
        lead: 'Wireframes, biblioteca visual e protótipos focados em clareza e conversão.',
        paras: [
            'Antes do desenvolvimento, validamos fluxos e hierarquia visual para reduzir retrabalho no código.',
            'Contraste, foco em leitura e estados de componente fazem parte do pacote para evitar interfaces “bonitas mas inúteis”.'
        ],
        highlightsTitle: 'Etapas do processo',
        highlights: [
            'Descoberta rápida: público, objetivo da página e métrica de sucesso.',
            'Wireframe e revisão conjunta antes de alta fidelidade.',
            'Handoff com tokens de cor, tipografia e componentes para o front.',
            'Checklist de acessibilidade básica (foco, contraste, textos alternativos).'
        ]
    },
    {
        file: 'google-ads.html',
        title: 'Google Ads — Campanhas de Busca e Performance | Fate Eight Tech',
        desc: 'Gestão de campanhas Google Ads com foco em conversões, público-alvo e landing alinhadas.',
        h1: 'Google Ads',
        lead: 'Campanhas de Performance Max, Busca e Display com mensuração confiável e otimização contínua.',
        paras: [
            'Montamos estrutura de conta, públicos, criativos e extensões alinhadas à oferta — com rastreamento de conversões e valores quando aplicável.',
            'Revisões periódicas focam em termos negativos, leilão, criativos e páginas de destino para manter CPA/ROAS dentro da meta combinada.'
        ],
        highlightsTitle: 'Gestão que entregamos',
        highlights: [
            'Configuração ou auditoria de tags de conversão e GA4.',
            'Search, Performance Max e campanhas de rede de exibição conforme estratégia.',
            'Testes A/B de anúncios e ajuste de landing com sugestões acionáveis.',
            'Relatórios com narrativa — não só captura de tela do painel.'
        ]
    },
    {
        file: 'instagram-ads.html',
        title: 'Instagram Ads | Fate Eight Tech',
        desc: 'Campanhas no Instagram com segmentação Meta e criativos alinhados à página de destino.',
        h1: 'Instagram Ads',
        lead: 'Alcance e conversão no ecossistema Meta com criativo e público em evolução.',
        paras: [
            'Integração com pixel ou API de conversões quando o funil passa pelo site ou lead gen.',
            'Iteramos criativos (formato vertical, carrossel, vídeo curto) e públicos salvos ou semelhantes conforme performance.'
        ],
        highlightsTitle: 'Em foco',
        highlights: [
            'Hierarquia de campanha alinhada ao objetivo (tráfego, conversão, engajamento).',
            'Biblioteca de criativos com variações para testes contínuos.',
            'Sincronização de mensagem com landing e formulário.',
            'Análise de custo por resultado e escala quando o criativo sustenta.'
        ]
    },
    {
        file: 'facebook-ads.html',
        title: 'Facebook Ads | Fate Eight Tech',
        desc: 'Anúncios no Facebook com estratégia de funil e mensuração correta.',
        h1: 'Facebook Ads',
        lead: 'Segmentação detalhada, criativos testáveis e remarketing para recuperar interesse.',
        paras: [
            'Alinhamos promessa do anúncio ao conteúdo da página para reduzir rejeição e melhorar qualidade do lead.',
            'Funis de awareness, consideração e conversão com orçamentos e públicos dimensionados por etapa.'
        ],
        highlightsTitle: 'Benefícios',
        highlights: [
            'Remarketing para quem visitou o site ou interagiu no Instagram/Facebook.',
            'Testes de público interest-based e lookalike quando há volume de dados.',
            'Relatórios em linguagem de negócio: custo por lead, CPL meta e próximos testes.',
            'Coordenação com Google Ads quando o cliente usa multi-canal.'
        ]
    },
    {
        file: 'tiktok-ads.html',
        title: 'TikTok Ads | Fate Eight Tech',
        desc: 'Campanhas no TikTok para marcas que buscam alcance em formato vídeo vertical.',
        h1: 'TikTok Ads',
        lead: 'Estratégia criativa e orçamento conforme objetivo — reconhecimento ou conversão.',
        paras: [
            'Indicado para produtos com apelo visual e público que consome vídeo vertical nativo.',
            'Integramos eventos de conversão quando há pixel/app e meta clara de custo por aquisição.'
        ],
        highlightsTitle: 'Abordagem',
        highlights: [
            'Hooks nos primeiros segundos e variações de criativo por mensagem.',
            'Segmentação por interesses e comportamentos compatíveis com o produto.',
            'Alinhamento com landing rápida em mobile.',
            'Aprendizado contínuo com cortes novos semanalmente quando o canal escala.'
        ]
    }
];

const regioes = [
    {
        file: 'brasilia-df.html',
        title: 'Marketing Digital e Sites em Brasília (DF) | Fate Eight Tech',
        desc: 'Sites, Google Ads e SEO para empresas na capital federal.',
        h1: 'Brasília e Distrito Federal',
        lead: 'Atendimento na capital com foco em empresas locais e projetos institucionais.',
        paras: [
            'Campanhas podem ser segmentadas ao DF e combinadas com páginas de destino que reforçam autoridade regional.',
            'Para negócios com endereço físico, integramos Google Meu Negócio e SEO local ao plano.'
        ],
        highlightsTitle: 'Por que focar na região',
        highlights: [
            'Segmentação geográfica fina no Google Ads.',
            'Conteúdo com termos que a comunidade realmente busca.',
            'Alinhamento de CTAs para ligação, WhatsApp ou formulário.',
            'Mesma stack de medição usada em projetos nacionais — sem improviso.'
        ],
        localFaq: 'Sim — atendemos empresas e prestadores na capital e entorno.'
    },
    {
        file: 'asa-norte.html',
        title: 'Marketing Digital na Asa Norte | Fate Eight Tech',
        desc: 'Sites e anúncios para negócios na Asa Norte, Brasília.',
        h1: 'Asa Norte — Brasília',
        lead: 'SEO local e Google Ads direcionados ao público da AN.',
        paras: [
            'Palavras-chave e mensagens podem refletir a dinâmica da região e os serviços mais buscados por quem mora ou trabalha na Asa Norte.',
            'Combinamos Google Meu Negócio quando há loja ou ponto de atendimento.'
        ],
        highlightsTitle: 'Em prática',
        highlights: [
            'Páginas com prova social e referência geográfica natural.',
            'Campanhas com raio ou presença em regiões adjacentes quando fizer sentido.',
            'Criativos que conversam com o perfil da região.',
            'Relatórios focados em lead e custo por contato.'
        ],
        localFaq: 'Sim — páginas e campanhas podem ser focadas na Asa Norte.'
    },
    {
        file: 'asa-sul.html',
        title: 'Marketing Digital na Asa Sul | Fate Eight Tech',
        desc: 'Performance digital para empresas na Asa Sul, Brasília.',
        h1: 'Asa Sul — Brasília',
        lead: 'Projetos web e mídia paga com mensagem regionalizada.',
        paras: [
            'Landing pages com prova social e CTAs claros ajudam a converter cliques em contatos qualificados.',
            'Segmentação geográfica refinada nas campanhas reduz desperdício de orçamento.'
        ],
        highlightsTitle: 'Destaques',
        highlights: [
            'Copy alinhada ao público da Asa Sul sem parecer genérica.',
            'Remarketing para quem já demonstrou interesse na região.',
            'Integração com WhatsApp qualificado do site.',
            'Iteração mensal de anúncios e páginas conforme dados.'
        ],
        localFaq: 'Sim, atuamos com escopo regional para a Asa Sul.'
    },
    {
        file: 'taguatinga.html',
        title: 'Sites e Google Ads em Taguatinga | Fate Eight Tech',
        desc: 'Presença digital para comércio e serviços em Taguatinga e redondezas.',
        h1: 'Taguatinga e região',
        lead: 'Alcance cliente local com anúncios e páginas pensadas para mobile.',
        paras: [
            'Campanhas de busca local e extensões de local no Google Ads quando há endereço verificado.',
            'Sites rápidos em 4G melhoram taxa de conversão em dispositivos móveis.'
        ],
        highlightsTitle: 'Foco local',
        highlights: [
            'Termos que incluem bairros e referências próximas.',
            'Horários de anúncio alinhados ao funcionamento do negócio.',
            'Páginas leves com telefone e mapa em destaque.',
            'Relatório simples: quantos contatos vieram de qual campanha.'
        ],
        localFaq: 'Sim — inclusive para negócios na cidade satélite e entorno próximo.'
    },
    {
        file: 'ceilandia.html',
        title: 'Marketing Digital em Ceilândia | Fate Eight Tech',
        desc: 'SEO local e tráfego pago para Ceilândia e região.',
        h1: 'Ceilândia — DF',
        lead: 'Soluções para aumentar chamadas e formulários qualificados na região.',
        paras: [
            'Anúncios no mapa e remarketing ajudam a captar quem já demonstrou interesse.',
            'Performance em mobile é prioridade — a maior parte dos acessos regionais vem do celular.'
        ],
        highlightsTitle: 'Linha de trabalho',
        highlights: [
            'Segmentação por raio e intenção de busca local.',
            'Páginas com depoimentos e selos de confiança.',
            'Integração com formulário seguro do site.',
            'Otimização contínua com base em conversões, não só em cliques.'
        ],
        localFaq: 'Sim — estratégias específicas para Ceilândia.'
    },
    {
        file: 'aguas-lindas-go.html',
        title: 'Sites e Ads em Águas Lindas (GO) | Fate Eight Tech',
        desc: 'Atendimento ao entorno do DF em Águas Lindas de Goiás.',
        h1: 'Águas Lindas (GO)',
        lead: 'Empresas da região metropolitana e entorno que precisam escalar pedidos online.',
        paras: [
            'Conteúdo e palavras-chave podem espelhar como as pessoas buscam serviços entre Águas Lindas e Brasília.',
            'Campanhas usam raio geográfico ajustável conforme área de entrega ou atendimento.'
        ],
        highlightsTitle: 'Benefícios',
        highlights: [
            'Coerência entre anúncio e página para não desperdiçar clique.',
            'Google Meu Negócio quando há endereço na cidade.',
            'Suporte remoto com mesmos padrões de qualidade do DF.',
            'Escalabilidade quando o negócio cresce para outras cidades.'
        ],
        localFaq: 'Sim — atendemos projetos com foco em Águas Lindas e região.'
    }
];

services.forEach(function (s) {
    writeService(s.file, s);
});
regioes.forEach(function (r) {
    writeRegiao(r.file, r);
});

console.log('Generated servicos/*.html and regiao/*.html');
