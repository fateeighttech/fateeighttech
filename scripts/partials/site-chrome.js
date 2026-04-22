'use strict';

/**
 * Rodapé, banner de cookies e flutuantes iguais à index.html,
 * com caminhos corretos a partir de servicos/ ou regiao/.
 */

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * @param {'servicos'|'regiao'} section
 */
function createPathHelpers(section) {
    const isServicosDir = section === 'servicos';
    return {
        section,
        asset: function (relativeFromRoot) {
            return '../' + relativeFromRoot.replace(/^\//, '');
        },
        index: '../index.html',
        indexHash: function (id) {
            return '../index.html#' + id;
        },
        serviceFile: function (filename) {
            return isServicosDir ? filename : '../servicos/' + filename;
        },
        contato: '../contato.html',
        sobre: '../sobre.html',
        termos: '../termos.html',
        privacidade: '../privacidade.html',
        enHome: '../en/index.html'
    };
}

function siteFooter(paths) {
    const img = paths.asset('src/images/logos/logo-32x32.png');
    const wa =
        'https://wa.me/556190448973?text=Olá%2C%20gostaria%20de%20fazer%20um%20orçamento.';
    return `<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <div class="footer-logo">
                    <img src="${img}" alt="Fate Eight Tech" class="footer-logo-img" width="50" height="50" loading="lazy">
                    <h3>Fate<span>Eight</span> Tech</h3>
                </div>
                <p>Assim como 8 bits criam a base da informação, nós criamos a base do seu sucesso.</p>
                <div class="footer-social">
                    <a href="${wa}" class="js-wa-qualified" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://instagram.com/fateeighttech" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/@FateEightTech" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.facebook.com/profile.php?id=61582108484785" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="https://github.com/fateeighttech" target="_blank" aria-label="Github"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="footer-section">
                <h4>Serviços</h4>
                <ul>
                    <li><a href="${paths.serviceFile('criacao-de-site-profissional.html')}">Criação de Site</a></li>
                    <li><a href="${paths.serviceFile('google-ads.html')}">Google Ads</a></li>
                    <li><a href="${paths.serviceFile('otimizacao-seo.html')}">SEO</a></li>
                    <li><a href="${paths.indexHash('anuncio-pago')}">Anúncio Pago</a></li>
                    <li><a href="${paths.serviceFile('gestao-de-midias-sociais.html')}">Gestão de Mídias</a></li>
                    <li><a href="${paths.serviceFile('google-meu-negocio.html')}">Google Meu Negócio</a></li>
                    <li><a href="${paths.contato}">Orçamento</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Empresa</h4>
                <ul>
                    <li><a href="${paths.indexHash('home')}">Home</a></li>
                    <li><a href="${paths.indexHash('servicos')}">Serviços</a></li>
                    <li><a href="${paths.sobre}">Sobre</a></li>
                    <li><a href="${paths.indexHash('portfolio')}">Portfólio</a></li>
                    <li><a href="${paths.contato}">Contato</a></li>
                    <li><a href="${wa}" class="js-wa-qualified" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Contato</h4>
                <ul>
                    <li><i class="fab fa-whatsapp"></i> (61) 9 9044-8973</li>
                    <li><i class="fab fa-instagram"></i> @fateeighttech</li>
                    <li><i class="fab fa-youtube"></i> @FateEightTech</li>
                    <li><i class="fab fa-facebook"></i> @fateeighttech</li>
                    <li><i class="fab fa-github"></i> fateeighttech</li>
                    <li><i class="fas fa-clock"></i> Atendimento 24/7</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span id="currentYear">2026</span> Fate Eight Tech. Todos os direitos reservados.</p>
            <div class="footer-links">
                <a href="${paths.termos}">Termos de Serviço</a>
                <span>|</span>
                <a href="${paths.privacidade}">Política de Privacidade</a>
            </div>
        </div>
    </div>
</footer>`;
}

function siteCookieBanner() {
    return `<div id="cookie-banner">
    <span>Este site usa cookies do Google para fornecer serviços e analisar o tráfego.
        <a href="https://policies.google.com/technologies/cookies?hl=pt-BR" target="_blank" rel="noopener noreferrer">Saiba mais.</a>
    </span>
    <a id="cookie-accept">Ok, entendi.</a>
</div>`;
}

function siteFloatingWidgets() {
    const wa =
        'https://wa.me/556190448973?text=Olá%2C%20gostaria%20de%20fazer%20um%20orçamento.';
    return `<a href="${wa}" class="whatsapp-float js-wa-qualified" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp com confirmação">
    <i class="fab fa-whatsapp"></i>
</a>
<button type="button" class="scroll-to-top" aria-label="Voltar ao topo">
    <i class="fas fa-arrow-up"></i>
</button>`;
}

module.exports = {
    escapeHtml,
    createPathHelpers,
    siteFooter,
    siteCookieBanner,
    siteFloatingWidgets
};
