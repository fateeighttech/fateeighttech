/**
 * Google Tag Manager (opcional) + gtag (Google Ads) após window.load e no idle.
 * Reduz TBT e conflito com LCP no mobile. Defina window.FE_SITE_ANALYTICS na home
 * com gtm: 'GTM-XXXX' para ativar o GTM; demais páginas usam só o adsId padrão.
 */
(function () {
    'use strict';

    var cfg = window.FE_SITE_ANALYTICS || {};
    var adsId = cfg.adsId || 'AW-17673039996';
    var gtmId = cfg.gtm || '';

    function install() {
        window.dataLayer = window.dataLayer || [];

        if (gtmId) {
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0];
                var j = d.createElement(s);
                var dl = l !== 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', gtmId);
        }

        var gs = document.createElement('script');
        gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + adsId;
        gs.async = true;
        gs.onload = function () {
            function gtag() {
                window.dataLayer.push(arguments);
            }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', adsId);
        };
        document.head.appendChild(gs);
    }

    function schedule() {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(install, { timeout: 4000 });
        } else {
            setTimeout(install, 0);
        }
    }

    if (document.readyState === 'complete') {
        schedule();
    } else {
        window.addEventListener('load', schedule);
    }
})();
