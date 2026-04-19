/**
 * MarkTabs Landing - Analytics
 *
 * Единый dispatcher для всех провайдеров аналитики.
 * Подключить в <head> лендинга (после SDK-скриптов провайдеров):
 *
 *   <script src="analytics/landing-tracking.js"></script>
 *
 * Чтобы включить провайдер:
 *   1. Вставь нужный SDK-сниппет в <head> index.html (см. комментарии в index.html)
 *   2. Поставь enabled: true в блоке PROVIDERS ниже
 *   3. Вставь свой ключ/ID
 */

(function () {

    // =========================================================================
    // PROVIDERS CONFIG
    // =========================================================================

    var PROVIDERS = {
        amplitude: {
            enabled: true,
            apiKey: "ecb6e071badb2594265cc9e75c7c76fd"
        },
        yandexMetrica: {
            enabled: false,
            counterId: 0            // заменить на ID счётчика из Яндекс.Метрики (число)
        },
        googleAnalytics: {
            enabled: false,
            measurementId: "G-XXXXXXXXXX"   // заменить на Measurement ID из GA4
        }
    };

    // =========================================================================
    // DISPATCHER
    // =========================================================================

    /**
     * Отправляет событие во все включённые провайдеры.
     * platform: "landing" добавляется автоматически ко всем событиям.
     */
    function track(eventName, props) {
        var payload = Object.assign({ platform: "landing" }, props || {});

        // Amplitude
        if (PROVIDERS.amplitude.enabled && typeof amplitude !== "undefined") {
            amplitude.track(eventName, payload);
        }

        // Яндекс.Метрика
        // Документация: https://yandex.ru/support/metrica/objects/reachgoal.html
        if (PROVIDERS.yandexMetrica.enabled && typeof ym !== "undefined") {
            ym(PROVIDERS.yandexMetrica.counterId, "reachGoal", eventName, payload);
        }

        // Google Analytics 4
        // Документация: https://developers.google.com/analytics/devguides/collection/ga4/events
        if (PROVIDERS.googleAnalytics.enabled && typeof gtag !== "undefined") {
            gtag("event", eventName, payload);
        }
    }

    // =========================================================================
    // CONSTANTS
    // =========================================================================

    var UTM_PARAMS = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"];

    // =========================================================================
    // INIT
    // =========================================================================

    // Dynamically loads all enabled analytics providers after consent.
    // Called by cookie-consent.js. Never call before user consent.
    var _analyticsLoaded = false;
    window.loadAnalytics = function () {
        if (_analyticsLoaded) return;
        _analyticsLoaded = true;
        loadAmplitude();
        loadYandexMetrica();
        loadGoogleAnalytics();
    };

    function loadAmplitude() {
        if (!PROVIDERS.amplitude.enabled) return;
        if (typeof amplitude !== "undefined") { runAmplitude(); return; }
        var s = document.createElement("script");
        s.src = "https://cdn.amplitude.com/libs/analytics-browser-2.11.1-min.js.gz";
        s.onload = runAmplitude;
        document.head.appendChild(s);
    }

    function runAmplitude() {
        if (!PROVIDERS.amplitude.enabled) return;
        amplitude.init(PROVIDERS.amplitude.apiKey, null, {
            defaultTracking: { pageViews: false, sessions: false, formInteractions: false, fileDownloads: false }
        });
        var installId = getOrCreateInstallId();
        var utmParams = captureUtmParams();
        var identify = new amplitude.Identify();
        identify.set("install_id", installId);
        Object.keys(utmParams).forEach(function (k) { identify.set(k, utmParams[k]); });
        amplitude.identify(identify);
        trackPageView(utmParams);
    }

    function loadYandexMetrica() {
        if (!PROVIDERS.yandexMetrica.enabled || !PROVIDERS.yandexMetrica.counterId) return;
        if (typeof ym !== "undefined") return;
        var counterId = PROVIDERS.yandexMetrica.counterId;
        (function (m, e, t, r, i, k, a) {
            m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
            k = e.createElement(t); a = e.getElementsByTagName(t)[0];
            k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(counterId, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true });
    }

    function loadGoogleAnalytics() {
        if (!PROVIDERS.googleAnalytics.enabled || PROVIDERS.googleAnalytics.measurementId === "G-XXXXXXXXXX") return;
        if (typeof gtag !== "undefined") return;
        var id = PROVIDERS.googleAnalytics.measurementId;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        gtag("js", new Date());
        gtag("config", id);
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
        document.head.appendChild(s);
    }

    function init() {
        trackLanguageDetection();
        bindNav();
        bindHero();
        bindDemo();
        bindFeatureCards();
        bindFaq();
        bindDownloadSection();
        bindScrollSections();

        // Load analytics if consent was already given before this page load
        if (window.CookieConsent && window.CookieConsent.hasAnalytics()) {
            window.loadAnalytics();
        }
    }

    // Load analytics if consent is given during this page session (via banner)
    document.addEventListener("analytics:consent", function () {
        window.loadAnalytics();
    });

    // =========================================================================
    // HELPERS
    // =========================================================================

    function getOrCreateInstallId() {
        var key = "marktabs_install_id";
        var id = localStorage.getItem(key);
        if (!id) { id = generateUUID(); localStorage.setItem(key, id); }
        return id;
    }

    function generateUUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0;
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    }

    function captureUtmParams() {
        var params = {};
        var searchParams = new URLSearchParams(window.location.search);
        UTM_PARAMS.forEach(function (key) {
            var val = searchParams.get(key);
            if (val) params[key] = val;
        });
        if (Object.keys(params).length > 0) {
            localStorage.setItem("marktabs_utm", JSON.stringify(params));
        } else {
            var saved = localStorage.getItem("marktabs_utm");
            if (saved) { try { params = JSON.parse(saved); } catch (e) {} }
        }
        return params;
    }

    // =========================================================================
    // PAGE VIEW
    // =========================================================================

    function trackPageView(utmParams) {
        track("landing_page_view", Object.assign({
            referrer: document.referrer || "direct",
            language: localStorage.getItem("mt_lang") || "unknown"
        }, utmParams));
    }

    // =========================================================================
    // LANGUAGE DETECTION
    // =========================================================================

    function trackLanguageDetection() {
        // Manual language switcher clicks
        document.querySelectorAll(".lang-btn[data-lang]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                track("language_switched", { to: btn.getAttribute("data-lang"), method: "manual" });
            });
        });

        // IP-based auto-detection: script.js writes to localStorage("mt_lang")
        // We intercept that write via patching setItem (restored after first fire)
        var origSetItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = function (key, value) {
            origSetItem(key, value);
            if (key === "mt_lang") {
                track("language_detected", { lang: value, method: "ip_auto" });
                localStorage.setItem = origSetItem;
            }
        };
    }

    // =========================================================================
    // NAVIGATION
    // =========================================================================

    function bindNav() {
        var navLinks = [
            { selector: 'nav a[href="#features"]', label: "features" },
            { selector: 'nav a[href="#how"]',      label: "how_it_works" },
            { selector: 'nav a[href="#faq"]',       label: "faq" },
            { selector: 'nav a[href="#download"]',  label: "download" },
            { selector: ".nav-cta",                 label: "nav_cta" },
            { selector: ".logo",                    label: "logo" }
        ];
        navLinks.forEach(function (item) {
            document.querySelectorAll(item.selector).forEach(function (el) {
                el.addEventListener("click", function () {
                    track("nav_click", { target: item.label });
                });
            });
        });
    }

    // =========================================================================
    // HERO
    // =========================================================================

    function bindHero() {
        document.querySelectorAll(".hero .btn-primary, .hero-actions .btn-primary").forEach(function (btn) {
            btn.addEventListener("click", function () {
                track("hero_cta_click", { install_id: getOrCreateInstallId() });
            });
        });
    }

    // =========================================================================
    // DEMO SECTION
    // =========================================================================

    function bindDemo() {
        // Mode toggle button (Cmd+R)
        var cmdRBtn = document.getElementById("cmdRBtn");
        if (cmdRBtn) {
            cmdRBtn.addEventListener("click", function () {
                var badge = document.getElementById("modeBadge");
                var currentMode = badge ? badge.textContent.trim() : "unknown";
                track("demo_toggle_mode", { new_mode: currentMode, method: "click" });
            });
        }

        // File clicks in sidebar
        document.querySelectorAll(".iapp-file-item").forEach(function (el) {
            el.addEventListener("click", function () {
                track("demo_open_file", { file_name: el.textContent.trim() });
            });
        });

        // Folder clicks in sidebar
        document.querySelectorAll(".iapp-folder").forEach(function (el) {
            el.addEventListener("click", function () {
                track("demo_toggle_folder", { folder_name: el.textContent.trim().substring(0, 30) });
            });
        });

        // Tab clicks in demo tab bar
        document.addEventListener("click", function (e) {
            var tab = e.target.closest(".iapp-tab");
            if (tab && !e.target.closest(".iapp-tab-close")) {
                track("demo_switch_tab", { tab_name: tab.textContent.replace("x", "").trim() });
            }
        });

        // Tab close button
        document.addEventListener("click", function (e) {
            var closeBtn = e.target.closest(".iapp-tab-close");
            if (closeBtn) {
                var tab = closeBtn.closest(".iapp-tab");
                track("demo_close_tab", { tab_name: tab ? tab.textContent.replace("x", "").trim() : "unknown" });
            }
        });

        // Keyboard: Cmd+R / Ctrl+R inside demo
        document.addEventListener("keydown", function (e) {
            if ((e.metaKey || e.ctrlKey) && e.key === "r" && !e.shiftKey) {
                var iapp = document.getElementById("iapp");
                if (iapp) {
                    e.preventDefault();
                    track("demo_toggle_mode", { method: "keyboard" });
                }
            }
        });
    }

    // =========================================================================
    // FEATURE CARDS
    // =========================================================================

    function bindFeatureCards() {
        var featureNames = [
            "tabs", "read_mode", "sidebar", "autosave",
            "ai_agent", "drag_drop", "checkboxes", "mcp_agent",
            "ios_ipad", "split_view", "pin_tab"
        ];

        if (!("IntersectionObserver" in window)) return;

        document.querySelectorAll(".feature-item").forEach(function (el, index) {
            var name = featureNames[index] || ("feature_" + (index + 1));
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        track("feature_card_visible", { feature: name, index: index + 1 });
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(el);
        });
    }

    // =========================================================================
    // FAQ
    // =========================================================================

    function bindFaq() {
        document.querySelectorAll(".faq-item").forEach(function (el, index) {
            var summary = el.querySelector("summary");
            if (summary) {
                summary.addEventListener("click", function () {
                    var isOpening = !el.hasAttribute("open");
                    track("faq_toggle", {
                        index: index + 1,
                        question: summary.textContent.trim().substring(0, 60),
                        action: isOpening ? "open" : "close"
                    });
                });
            }
        });
    }

    // =========================================================================
    // DOWNLOAD SECTION
    // =========================================================================

    function bindDownloadSection() {
        var installId = getOrCreateInstallId();

        // Primary CTA in #download section + explicit data-marktabs-download buttons
        document.querySelectorAll("#download .btn-primary, [data-marktabs-download]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                track("download_click", { install_id: installId, source: "download_section" });
            });
        });

        // Any .dmg links as fallback
        document.querySelectorAll('a[href$=".dmg"]').forEach(function (el) {
            el.addEventListener("click", function () {
                track("download_click", { install_id: installId, source: "dmg_link", href: el.href });
            });
        });
    }

    // =========================================================================
    // SCROLL - SECTION VISIBILITY
    // =========================================================================

    function bindScrollSections() {
        if (!("IntersectionObserver" in window)) return;

        var sections = ["#features", "#how", "#faq", "#download", "#demo"];
        sections.forEach(function (sel) {
            var el = document.querySelector(sel);
            if (!el) return;
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        track("section_viewed", { section: sel.replace("#", "") });
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(el);
        });
    }

    // =========================================================================
    // RUN
    // =========================================================================

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
