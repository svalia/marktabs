(function () {

    var CONSENT_VERSION = 1;
    var STORAGE_KEY = 'cookieConsent';

    // =========================================================================
    // I18N
    // =========================================================================

    var lang = 'ru';
    try { lang = localStorage.getItem('mt_lang') || 'ru'; } catch (e) {}

    var T = {
        ru: {
            banner_text:   'Мы используем аналитические cookie, чтобы улучшать сайт. Необходимые cookie работают всегда.',
            manage:        'Настроить',
            essential_only:'Только необходимые',
            accept_all:    'Принять все',
            modal_title:   'Настройки cookie',
            ess_title:     'Необходимые cookie',
            ess_desc:      'Нужны для работы сайта: запоминают выбор языка и состояние ваших согласий. Без них сайт не будет функционировать корректно.',
            ess_always:    'Всегда включено',
            ana_title:     'Аналитические cookie',
            ana_desc:      'Помогают нам понять, как посетители используют сайт. Используем Яндекс.Метрику, Google Analytics и Amplitude. Собираются обезличенные данные: страницы, время на сайте, технические характеристики устройства.',
            save_prefs:    'Сохранить настройки',
        },
        en: {
            banner_text:   'We use analytics cookies to understand how you use the website. Essential cookies are always active.',
            manage:        'Manage',
            essential_only:'Essential only',
            accept_all:    'Accept all',
            modal_title:   'Cookie settings',
            ess_title:     'Essential cookies',
            ess_desc:      'Required for the Website to function: remember your language and consent choices. Without them the site will not function correctly.',
            ess_always:    'Always on',
            ana_title:     'Analytics cookies',
            ana_desc:      'Help us understand how visitors use the Website. We use Google Analytics, Amplitude, and Yandex Metrica. Anonymized data only: pages visited, time on site, device characteristics.',
            save_prefs:    'Save preferences',
        }
    };

    function t(key) { return (T[lang] || T.ru)[key] || key; }

    // =========================================================================
    // STORAGE
    // =========================================================================

    function getConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var obj = JSON.parse(raw);
            if (obj.version !== CONSENT_VERSION) return null;
            return obj;
        } catch (e) { return null; }
    }

    function setConsent(choice) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                version: CONSENT_VERSION,
                choice: choice,
                timestamp: new Date().toISOString()
            }));
        } catch (e) {}
    }

    function hasAnalytics() {
        var c = getConsent();
        return !!(c && (c.choice === 'analytics' || c.choice === 'all'));
    }

    // =========================================================================
    // PUBLIC API
    // =========================================================================

    window.CookieConsent = {
        hasAnalytics: hasAnalytics,
        openSettings: function () {
            if (document.readyState !== 'loading') showModal();
            else document.addEventListener('DOMContentLoaded', showModal);
        }
    };

    // =========================================================================
    // INIT
    // =========================================================================

    var existing = getConsent();
    if (existing) {
        if (hasAnalytics()) {
            document.addEventListener('DOMContentLoaded', function () {
                if (typeof window.loadAnalytics === 'function') window.loadAnalytics();
            });
        }
        return;
    }

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }
    ready(showBanner);

    // =========================================================================
    // ACTIONS
    // =========================================================================

    function acceptChoice(choice) {
        setConsent(choice);
        hideBanner();
        hideModal();
        if (choice === 'all' || choice === 'analytics') {
            document.dispatchEvent(new Event('analytics:consent'));
        }
    }

    // =========================================================================
    // BANNER
    // =========================================================================

    function showBanner() {
        if (document.getElementById('cookie-banner')) return;
        var el = document.createElement('div');
        el.id = 'cookie-banner';
        el.className = 'ck-banner';
        el.innerHTML =
            '<div class="ck-banner-inner">' +
                '<p class="ck-banner-text">' + t('banner_text') + '</p>' +
                '<div class="ck-banner-actions">' +
                    '<button class="ck-btn ck-ghost" id="ck-manage">' + t('manage') + '</button>' +
                    '<button class="ck-btn ck-secondary" id="ck-essential">' + t('essential_only') + '</button>' +
                    '<button class="ck-btn ck-primary" id="ck-accept">' + t('accept_all') + '</button>' +
                '</div>' +
                '<button class="ck-close" id="ck-close" aria-label="close">\xd7</button>' +
            '</div>';
        document.body.appendChild(el);

        el.querySelector('#ck-manage').addEventListener('click', function () { hideBanner(); showModal(); });
        el.querySelector('#ck-essential').addEventListener('click', function () { acceptChoice('essential'); });
        el.querySelector('#ck-accept').addEventListener('click', function () { acceptChoice('all'); });
        el.querySelector('#ck-close').addEventListener('click', function () { acceptChoice('essential'); });
    }

    function hideBanner() {
        var el = document.getElementById('cookie-banner');
        if (el) el.remove();
    }

    // =========================================================================
    // MODAL
    // =========================================================================

    function showModal() {
        if (!document.getElementById('cookie-modal')) buildModal();
        document.getElementById('cookie-modal').style.display = 'flex';
    }

    function hideModal() {
        var el = document.getElementById('cookie-modal');
        if (el) el.style.display = 'none';
    }

    function buildModal() {
        var el = document.createElement('div');
        el.id = 'cookie-modal';
        el.className = 'ck-overlay';
        el.style.display = 'none';
        el.innerHTML =
            '<div class="ck-modal" role="dialog" aria-modal="true">' +
                '<div class="ck-modal-hdr">' +
                    '<h2 class="ck-modal-title">' + t('modal_title') + '</h2>' +
                    '<button class="ck-close" id="ck-modal-close" aria-label="close">\xd7</button>' +
                '</div>' +
                '<div class="ck-modal-body">' +
                    '<div class="ck-category">' +
                        '<div class="ck-cat-hdr">' +
                            '<div class="ck-cat-info">' +
                                '<h3>' + t('ess_title') + '</h3>' +
                                '<p>' + t('ess_desc') + '</p>' +
                            '</div>' +
                            '<span class="ck-always-on">' + t('ess_always') + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="ck-category">' +
                        '<div class="ck-cat-hdr">' +
                            '<div class="ck-cat-info">' +
                                '<h3>' + t('ana_title') + '</h3>' +
                                '<p>' + t('ana_desc') + '</p>' +
                            '</div>' +
                            '<label class="ck-toggle">' +
                                '<input type="checkbox" id="ck-analytics-toggle">' +
                                '<span class="ck-toggle-track"><span class="ck-toggle-thumb"></span></span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="ck-modal-ftr">' +
                    '<button class="ck-btn ck-secondary" id="ck-save">' + t('save_prefs') + '</button>' +
                    '<button class="ck-btn ck-primary" id="ck-modal-accept">' + t('accept_all') + '</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(el);

        el.querySelector('#ck-modal-close').addEventListener('click', hideModal);
        el.querySelector('#ck-modal-accept').addEventListener('click', function () { acceptChoice('all'); });
        el.querySelector('#ck-save').addEventListener('click', function () {
            var checked = el.querySelector('#ck-analytics-toggle').checked;
            acceptChoice(checked ? 'analytics' : 'essential');
        });
        el.addEventListener('click', function (e) { if (e.target === el) hideModal(); });
    }

})();
