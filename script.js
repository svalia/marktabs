/* =============================================
   MARKTABS LANDING — script.js
   - Language switcher + IP auto-detect
   - Hero parallax on mousemove
   ============================================= */

// =============================================
// TRANSLATIONS
// =============================================
const T = {
  ru: {
    nav_features:  'Возможности',
    nav_how:       'Как работает',
    nav_faq:       'FAQ',
    nav_download:  'Скачать',
    hero_eyebrow_statement: '<span class="eyebrow-md">.md</span> стал рабочим форматом AI-эпохи',
    hero_eyebrow_detail:    'Нейронка генерирует его <strong>быстрее и дешевле</strong>, чем .doc или .pdf — и читает тоже',
    hero_title:    '.md-редактор<br/><em>для вайб-кодера</em>',
    hero_sub:      'Все .md файлы в одном окне — чтобы тратить мыслетопливо на работу, а не на окна',
    hero_cta:      'Скачать бесплатно',
    hero_meta:     'macOS 13+. Без подписки.',
    features_title:'Что ты получишь',
    f1_title:      'Все проекты рядом',
    f1_desc:       'Открытые файлы живут во вкладках, переключение одним кликом или Cmd+цифра',
    f2_title:      'Read mode по требованию',
    f2_desc:       'Документ от AI читается как документ, а не как исходник. Cmd+R туда-обратно',
    f3_title:      'Sidebar вместо Finder',
    f3_desc:       'Добавь рабочие папки один раз, дерево .md файлов всегда под рукой',
    f4_title:      'Не потеряешь ни байта',
    f4_desc:       'Точка на вкладке если не сохранено. Диалог перед закрытием. Вкладки восстанавливаются после перезапуска',
    f5_title:      'Видишь, что изменил агент',
    f5_desc:       'Строки, затронутые AI, подсвечиваются жёлтым. Принимаешь или редактируешь без сюрпризов',
    f6_title:      'Кидай файлы прямо в окно',
    f6_desc:       'Перетащи .md из Finder — откроется как новая вкладка. Можно кидать сразу несколько',
    f7_title:      'Чеклисты работают в Read mode',
    f7_desc:       'Ставишь галочки прямо в рендере без переключения в редактор. Статус сохраняется в файл',
    f8_title:      'Claude видит твои вкладки',
    f8_desc:       'Встроенный MCP-сервер: Claude Desktop и Claude Code получают доступ к открытым файлам напрямую',
    f9_title:      'iOS и iPad',
    f9_desc:       'Те же вкладки и Read mode на iPhone и iPad. Синхронизация через iCloud',
    f10_title:     'Split View',
    f10_desc:      'Два документа рядом: слева пишешь, справа видишь результат или другой файл',
    f11_title:     'Закреплённые вкладки',
    f11_desc:      'Правый клик — Закрепить. Вкладка сжимается до иконки и всегда остаётся слева',
    feat_soon:     'скоро',
    aha_title_h:   'Почувствуй за 30 секунд',
    aha_label:     'Открой все файлы проекта. Нажми Cmd+R.',
    aha_desc:      'Открой все .md файлы текущего проекта — все вкладки появятся в одном окне. Нажми <code>Cmd+R</code> на документе от AI — чистый текст без единого символа синтаксиса. Нажми снова — вернулся к правке.',
    aha_cta:       'Попробовать',
    demo_edit:     'Edit mode',
    demo_read:     'Read mode',
    rec_title:     'Узнаёшь себя?',
    rec_sub:       'Ты хочешь работать с AI-ассистентом предметно, а не вручную собирать контекст перед каждым разговором?',
    pain1:         'Пять проектов — пять окон. Cmd+Tab по кругу, пока не найдёшь нужное?',
    pain2:         'AI прислал документ — а в редакторе это стена со звёздочками, решётками и обратными кавычками?',
    pain3:         'Копируешь куски из старых документов в новый чат, потому что ассистент не знает, что ты уже решил неделю назад?',
    pain4:         'VS Code — для кода, Obsidian — целый vault, а просто открыть несколько .md — нечем?',
    how_title:     'Как это работает',
    step1_title:   'Открой файлы',
    step1_desc:    'Через File > Open или клик в sidebar — все появляются как вкладки в одном окне. Вместо множества окон с открытыми .md файлами — одно окно с удобной навигацией по вкладкам.',
    step2_title:   'Читай в чистом виде',
    step2_desc:    'Cmd+R — документ рендерится мгновенно: заголовки, таблицы, код, ссылки кликабельны. Читаешь как текст, не продираешься сквозь синтаксис.',
    step3_title:   'Правь без смены инструмента',
    step3_desc:    'Cmd+R снова — вернулся в edit mode. Cmd+S сохраняет в любом режиме. Всё в одном окне, ничего не теряешь.',
    out_title:     'К чему ты придёшь',
    out1:          'Не будешь тратить когнитивный ресурс на управление окнами — только на содержание документов',
    out2:          'Рабочий контекст под контролем, а не разбросан по пяти местам',
    out3:          'Перестанешь раздражаться каждый раз, когда AI присылает документ с синтаксисом',
    out4:          'Все открытые AI-проекты видны сразу — переключение за одно действие',
    out5:          'Накопленный контекст лежит в .md файлах, структурированно, рядом',
    faq_title:     'Есть сомнения?',
    faq1_q:        '"Ещё один редактор, буду разбираться неделю"',
    faq1_a:        'Установка занимает минуту. Нет аккаунта, нет vault, нет миграции. Перетащи файл, открой папку — всё.',
    faq2_q:        '"Бесплатно, без App Store — что-то не то"',
    faq2_a:        'Это целевое решение, не демо. Распространение через DMG с лендинга — быстрее и без ограничений App Store. Никакого облака, никаких данных на серверах.',
    faq3_q:        '"Разве VS Code не справляется?"',
    faq3_a:        'Справляется, но это инструмент для кода. Он не даёт читать документ в чистом виде, extensions для Markdown — сторонние, интерфейс заточен под разработку. MarkTabs — для документов. Нет лишнего.',
    comp_title:    'Почему не VS Code, Obsidian или TextEdit',
    comp1:         'Перегружен для документов: панели, extensions, developer-контекст. MarkTabs — только .md, только работа с текстом.',
    comp2:         'Vault-модель, синхронизация, плагины. Если нужна база знаний — Obsidian. Если нужно открыть несколько файлов и работать — MarkTabs.',
    comp3:         'Нет вкладок, нет sidebar, нет Markdown рендеринга. MarkTabs закрывает нишу, которую macOS оставила пустой.',
    dl_title:      'Готов попробовать?',
    dl_sub:        'Бесплатно. Нативный macOS. Без аккаунта.',
    dl_cta:        'Скачать MarkTabs',
    dl_meta:       'macOS 13 Ventura и выше · DMG · ~8 MB',
    footer_copy:   '© 2026 MarkTabs. Сделано на macOS, для macOS.',
  },
  en: {
    nav_features:  'Features',
    nav_how:       'How it works',
    nav_faq:       'FAQ',
    nav_download:  'Download',
    hero_eyebrow_statement: '<span class="eyebrow-md">.md</span> is the working format of the AI era',
    hero_eyebrow_detail:    'LLMs generate it <strong>faster and cheaper</strong> than .doc or .pdf — and read it the same way',
    hero_title:    'The editor<br/><em>for vibe coders</em>',
    hero_sub:      'All your .md files in one window — spend your brainpower on work, not on window management',
    hero_cta:      'Download free',
    hero_meta:     'macOS 13+. No subscription.',
    features_title:'What you get',
    f1_title:      'All projects at hand',
    f1_desc:       'Open files live in tabs, switch with one click or Cmd+number',
    f2_title:      'Read mode on demand',
    f2_desc:       'AI-generated docs read as clean text, not raw markup. Cmd+R back and forth',
    f3_title:      'Sidebar instead of Finder',
    f3_desc:       'Add your working folders once, the .md file tree is always right there',
    f4_title:      'Never lose a byte',
    f4_desc:       'Dot on the tab if unsaved. Dialog before closing. Tabs restore after restart',
    f5_title:      'See what the agent changed',
    f5_desc:       'Lines touched by AI are highlighted in yellow. Accept or edit — no surprises',
    f6_title:      'Drop files straight into the window',
    f6_desc:       'Drag .md from Finder — opens as a new tab. Drop several at once',
    f7_title:      'Checklists work in Read mode',
    f7_desc:       'Check boxes right in the rendered view — no switching to editor. Status saved to file',
    f8_title:      'Claude sees your tabs',
    f8_desc:       'Built-in MCP server: Claude Desktop and Claude Code access open files directly',
    f9_title:      'iOS and iPad',
    f9_desc:       'Same tabs and Read mode on iPhone and iPad. Sync via iCloud',
    f10_title:     'Split View',
    f10_desc:      'Two documents side by side: edit on the left, see the result or another file on the right',
    f11_title:     'Pinned tabs',
    f11_desc:      'Right-click — Pin. Tab shrinks to icon and always stays on the left',
    feat_soon:     'coming soon',
    aha_title_h:   'Feel it in 30 seconds',
    aha_label:     'Open all project files. Press Cmd+R.',
    aha_desc:      'Open all .md files for your current project — every tab appears in one window. Press <code>Cmd+R</code> on an AI document — clean text, zero syntax symbols. Press again — back to editing.',
    aha_cta:       'Try it',
    demo_edit:     'Edit mode',
    demo_read:     'Read mode',
    rec_title:     'Sound familiar?',
    rec_sub:       'You want to work with your AI assistant on substance, not spend time manually rebuilding context before every conversation?',
    pain1:         'Five projects — five windows. Cmd+Tab in circles until you find the right one?',
    pain2:         'AI sends you a document — and your editor shows a wall of asterisks, hashes, and backticks?',
    pain3:         'Copy-pasting chunks from old documents into a new chat because the assistant doesn\'t know what you decided last week?',
    pain4:         'VS Code is for code, Obsidian is a whole vault — and there\'s nothing just to open a few .md files?',
    how_title:     'How it works',
    step1_title:   'Open your files',
    step1_desc:    'Via File > Open or a click in the sidebar — everything appears as tabs in one window. Instead of a dozen open .md windows — one window with easy tab navigation.',
    step2_title:   'Read in clean view',
    step2_desc:    'Cmd+R — the document renders instantly: headings, tables, code, clickable links. You read as text, not wade through syntax.',
    step3_title:   'Edit without switching tools',
    step3_desc:    'Cmd+R again — back to edit mode. Cmd+S saves in either mode. Everything in one window, nothing lost.',
    out_title:     'Where you\'ll end up',
    out1:          'You\'ll stop spending cognitive load on window management — only on document content',
    out2:          'Your working context under control, not scattered across five places',
    out3:          'You\'ll stop getting irritated every time AI sends a document full of syntax',
    out4:          'All open AI projects visible at once — switch in one action',
    out5:          'Accumulated context lives in .md files, organized and accessible',
    faq_title:     'Have doubts?',
    faq1_q:        '"Yet another editor — will take a week to figure out"',
    faq1_a:        'Takes one minute to install. No account, no vault, no migration. Drag a file, open a folder — done.',
    faq2_q:        '"Free and no App Store — something feels off"',
    faq2_a:        'This is a deliberate choice, not a demo. DMG distribution is faster and free from App Store restrictions. No cloud, no data on servers.',
    faq3_q:        '"Doesn\'t VS Code handle this?"',
    faq3_a:        'It does, but it\'s a code tool. No clean document reading, Markdown extensions are third-party, the interface is built for development. MarkTabs is for documents. Nothing extra.',
    comp_title:    'Why not VS Code, Obsidian or TextEdit',
    comp1:         'Overbuilt for documents: panels, extensions, developer context. MarkTabs — just .md, just text work.',
    comp2:         'Vault model, sync, plugins. If you need a knowledge base — Obsidian. If you need to open a few files and work — MarkTabs.',
    comp3:         'No tabs, no sidebar, no Markdown rendering. MarkTabs fills the gap macOS left empty.',
    dl_title:      'Ready to try?',
    dl_sub:        'Free. Native macOS. No account.',
    dl_cta:        'Download MarkTabs',
    dl_meta:       'macOS 13 Ventura and above · DMG · ~8 MB',
    footer_copy:   '© 2026 MarkTabs. Built on macOS, for macOS.',
  }
};

// =============================================
// LANGUAGE DETECTION + SWITCHING
// =============================================
let currentLang = 'ru';

function applyLang(lang) {
  currentLang = lang;
  const dict = T[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!dict[key]) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = dict[key];
    } else {
      el.innerHTML = dict[key];
    }
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const ruLinks = document.getElementById('footer-links-ru');
  const enLinks = document.getElementById('footer-links-en');
  if (ruLinks) ruLinks.style.display = lang === 'ru' ? 'flex' : 'none';
  if (enLinks) enLinks.style.display = lang === 'en' ? 'flex' : 'none';

  try { localStorage.setItem('mt_lang', lang); } catch (_) {}
}

async function detectLang() {
  // Check localStorage first
  try {
    const saved = localStorage.getItem('mt_lang');
    if (saved === 'ru' || saved === 'en') { applyLang(saved); return; }
  } catch (_) {}

  // IP-based detection
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    applyLang(data.country_code === 'RU' ? 'ru' : 'en');
  } catch (_) {
    applyLang('ru'); // fallback
  }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

detectLang();

// =============================================
// PARALLAX ON HERO MOCKUP
// =============================================
const mockup = document.getElementById('mockup');

if (mockup) {
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;

  const MAX_X = 18;  // px
  const MAX_Y = 12;  // px
  const TILT_X = 4;  // deg
  const TILT_Y = 6;  // deg

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, targetX, 0.08);
    currentY = lerp(currentY, targetY, 0.08);

    const tiltY =  (currentX / MAX_X) * TILT_Y;
    const tiltX = -(currentY / MAX_Y) * TILT_X;

    mockup.style.transform =
      `translate(${currentX}px, ${currentY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    const diffX = Math.abs(targetX - currentX);
    const diffY = Math.abs(targetY - currentY);
    if (diffX > 0.05 || diffY > 0.05) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
    }
  }

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    targetX = ((e.clientX - cx) / cx) * MAX_X;
    targetY = ((e.clientY - cy) / cy) * MAX_Y;
    if (!rafId) rafId = requestAnimationFrame(animate);
  });

  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    if (!rafId) rafId = requestAnimationFrame(animate);
  });
}

// =============================================
// SCROLL REVEAL
// =============================================
const revealEls = document.querySelectorAll(
  '.feature-item, .pains-list li, .steps-ol li, .outcomes-ul li, .faq-item, .comp-row, .doc-section'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.04}s ease, transform 0.5s ${i * 0.04}s ease`;
  observer.observe(el);
});

// =============================================
// INTERACTIVE APP DEMO
// =============================================

const demoFolders = [
  {
    id: 'product-discovery', name: 'Product Discovery', open: true,
    files: [
      { id: 'interviews',  name: 'interview-synthesis.md' },
      { id: 'personas',    name: 'user-personas.md'       },
      { id: 'jtbd',        name: 'jobs-to-be-done.md'     },
    ]
  },
  {
    id: 'launch-prep', name: 'Launch Prep', open: false,
    files: [
      { id: 'checklist', name: 'launch-checklist.md' },
      { id: 'messaging', name: 'messaging.md'        },
    ]
  },
  {
    id: 'architecture', name: 'Architecture', open: false,
    files: [
      { id: 'sysdesign', name: 'system-design.md' },
    ]
  }
];

const demoFiles = {
  interviews: {
    name: 'interview-synthesis.md',
    raw: `# Interview Synthesis

## Key Insights

**5 из 7 пользователей** ежедневно работают с несколькими .md файлами.

- Большинство переключаются между 3–5 документами проекта
- Текущие инструменты: VS Code, Obsidian, TextEdit
- Главная боль: *"теряю контекст при переключении окон"*

## Цитаты

> "Я не заметил, когда Word перестал быть моим инструментом.
> Теперь всё само собой выходит в markdown."
> — Product Manager, Fintech

## Следующие шаги

1. Подтвердить частоту переключений через аналитику
2. Опросить 3 power user'а Obsidian
3. Составить карту customer journey`,
    html: `<h1>Interview Synthesis</h1>
<h2>Key Insights</h2>
<p><strong>5 из 7 пользователей</strong> ежедневно работают с несколькими .md файлами.</p>
<ul><li>Большинство переключаются между 3–5 документами проекта</li>
<li>Текущие инструменты: VS Code, Obsidian, TextEdit</li>
<li>Главная боль: <em>"теряю контекст при переключении окон"</em></li></ul>
<h2>Цитаты</h2>
<blockquote><p>"Я не заметил, когда Word перестал быть моим инструментом. Теперь всё само собой выходит в markdown."</p><p>— Product Manager, Fintech</p></blockquote>
<h2>Следующие шаги</h2>
<ol><li>Подтвердить частоту переключений через аналитику</li>
<li>Опросить 3 power user'а Obsidian</li>
<li>Составить карту customer journey</li></ol>`
  },

  personas: {
    name: 'user-personas.md',
    raw: `# User Personas

## Vibe Coder

**Роль:** PM / Аналитик / Исследователь
**Инструменты:** Claude, Cursor, Notion
**Workflow:** AI генерирует доки → ревью в редакторе → шипит

### Боли

- 5+ markdown-окон открыто одновременно
- Постоянно теряет место при переключении
- Read mode ломает рабочий ритм

## Power User

**Роль:** Technical writer / Основатель
**Инструменты:** Obsidian, VS Code

### Боли

- Obsidian слишком тяжёлый для отдельных файлов
- VS Code не предназначен для чтения`,
    html: `<h1>User Personas</h1>
<h2>Vibe Coder</h2>
<p><strong>Роль:</strong> PM / Аналитик / Исследователь<br><strong>Инструменты:</strong> Claude, Cursor, Notion<br><strong>Workflow:</strong> AI генерирует доки → ревью в редакторе → шипит</p>
<h3>Боли</h3>
<ul><li>5+ markdown-окон открыто одновременно</li>
<li>Постоянно теряет место при переключении</li>
<li>Read mode ломает рабочий ритм</li></ul>
<h2>Power User</h2>
<p><strong>Роль:</strong> Technical writer / Основатель<br><strong>Инструменты:</strong> Obsidian, VS Code</p>
<h3>Боли</h3>
<ul><li>Obsidian слишком тяжёлый для отдельных файлов</li>
<li>VS Code не предназначен для чтения</li></ul>`
  },

  jtbd: {
    name: 'jobs-to-be-done.md',
    raw: `# Jobs To Be Done

## Core Job

Когда работаю с несколькими AI-проектами одновременно — **хочу** переключаться между .md файлами за одно действие, **чтобы** тратить мыслетопливо на работу, а не на управление окнами.

## Micro Jobs

- Открыть все файлы проекта в одном окне
- Прочитать документ от AI без синтаксиса
- Найти нужный файл через sidebar без Finder
- Сохранить, не теряя режим просмотра

## Big Job

Выстроить систему работы с AI, чтобы накопленный контекст усиливал каждый разговор с ассистентом — и не терялся при смене инструмента.`,
    html: `<h1>Jobs To Be Done</h1>
<h2>Core Job</h2>
<p>Когда работаю с несколькими AI-проектами одновременно — <strong>хочу</strong> переключаться между .md файлами за одно действие, <strong>чтобы</strong> тратить мыслетопливо на работу, а не на управление окнами.</p>
<h2>Micro Jobs</h2>
<ul><li>Открыть все файлы проекта в одном окне</li>
<li>Прочитать документ от AI без синтаксиса</li>
<li>Найти нужный файл через sidebar без Finder</li>
<li>Сохранить, не теряя режим просмотра</li></ul>
<h2>Big Job</h2>
<p>Выстроить систему работы с AI, чтобы накопленный контекст усиливал каждый разговор с ассистентом — и не терялся при смене инструмента.</p>`
  },

  checklist: {
    name: 'launch-checklist.md',
    raw: `# Launch Checklist

## До запуска

- [x] Текст лендинга финализирован
- [x] Сертификат подписи приложения
- [ ] DMG упаковка и нотаризация
- [ ] Публикация на Product Hunt запланирована
- [ ] Письма бета-тестерам готовы

## День запуска

- [ ] Пост в X/Twitter в 12:00 МСК
- [ ] Рассылка по newsletter
- [ ] Мониторинг crash reports

## После запуска (48ч)

- [ ] Ответить на все комментарии PH
- [ ] Исправить P0 баги в тот же день
- [ ] Собрать первый фидбек пользователей`,
    html: `<h1>Launch Checklist</h1>
<h2>До запуска</h2>
<ul>
<li class="task-row task-done"><input type="checkbox" checked disabled> Текст лендинга финализирован</li>
<li class="task-row task-done"><input type="checkbox" checked disabled> Сертификат подписи приложения</li>
<li class="task-row"><input type="checkbox" disabled> DMG упаковка и нотаризация</li>
<li class="task-row"><input type="checkbox" disabled> Публикация на Product Hunt запланирована</li>
<li class="task-row"><input type="checkbox" disabled> Письма бета-тестерам готовы</li>
</ul>
<h2>День запуска</h2>
<ul>
<li class="task-row"><input type="checkbox" disabled> Пост в X/Twitter в 12:00 МСК</li>
<li class="task-row"><input type="checkbox" disabled> Рассылка по newsletter</li>
<li class="task-row"><input type="checkbox" disabled> Мониторинг crash reports</li>
</ul>
<h2>После запуска (48ч)</h2>
<ul>
<li class="task-row"><input type="checkbox" disabled> Ответить на все комментарии PH</li>
<li class="task-row"><input type="checkbox" disabled> Исправить P0 баги в тот же день</li>
<li class="task-row"><input type="checkbox" disabled> Собрать первый фидбек пользователей</li>
</ul>`
  },

  messaging: {
    name: 'messaging.md',
    raw: `# Messaging Framework

## Основной посыл

> Редактор для вайб-кодера.
> Все .md файлы в одном окне.

## Целевой сегмент

**Кто:** AI-first профессионал
**Когда:** Работает с 3+ .md файлами ежедневно
**Боль:** Окна разбросаны, контекст теряется

## Ключевые сообщения

1. Нативный macOS — без Electron, без тормозов
2. Бесплатно — без подписки, без регистрации
3. Один клик — переключение между проектами`,
    html: `<h1>Messaging Framework</h1>
<h2>Основной посыл</h2>
<blockquote><p>Редактор для вайб-кодера.<br>Все .md файлы в одном окне.</p></blockquote>
<h2>Целевой сегмент</h2>
<p><strong>Кто:</strong> AI-first профессионал<br><strong>Когда:</strong> Работает с 3+ .md файлами ежедневно<br><strong>Боль:</strong> Окна разбросаны, контекст теряется</p>
<h2>Ключевые сообщения</h2>
<ol><li>Нативный macOS — без Electron, без тормозов</li>
<li>Бесплатно — без подписки, без регистрации</li>
<li>Один клик — переключение между проектами</li></ol>`
  },

  sysdesign: {
    name: 'system-design.md',
    raw: `# System Design

## Архитектура

\`\`\`
App/
  Domain/Models/
  Services/
    FileSystem/
    Documents/
    Markdown/
  UI/
    MainWindow/
    Sidebar/
    Tabs/
    Editor/
\`\`\`

## Ключевые решения

- **NSOutlineView** для дерева папок
- **Custom tab bar** — не системные вкладки macOS
- **Down (cmark)** для рендеринга Markdown
- **NSFileCoordinator** для безопасных операций

## Ограничения MVP

- Только .md файлы в дереве папок
- Без синхронизации и облака
- Без системы плагинов`,
    html: `<h1>System Design</h1>
<h2>Архитектура</h2>
<pre><code>App/
  Domain/Models/
  Services/
    FileSystem/
    Documents/
    Markdown/
  UI/
    MainWindow/
    Sidebar/
    Tabs/
    Editor/</code></pre>
<h2>Ключевые решения</h2>
<ul><li><strong>NSOutlineView</strong> для дерева папок</li>
<li><strong>Custom tab bar</strong> — не системные вкладки macOS</li>
<li><strong>Down (cmark)</strong> для рендеринга Markdown</li>
<li><strong>NSFileCoordinator</strong> для безопасных операций</li></ul>
<h2>Ограничения MVP</h2>
<ul><li>Только .md файлы в дереве папок</li>
<li>Без синхронизации и облака</li>
<li>Без системы плагинов</li></ul>`
  }
};

// --- state ---
let demoMode = 'edit';
let demoOpenTabs = ['interviews'];
let demoActive = 'interviews';

function initDemo() {
  if (!document.getElementById('iapp')) return;
  renderDemoSidebar();
  renderDemoTabs();
  renderDemoContent();

  document.getElementById('cmdRBtn').addEventListener('click', toggleDemoMode);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
      e.preventDefault();
      toggleDemoMode();
    }
  });
}

function renderDemoSidebar() {
  const el = document.getElementById('iappSidebar');
  if (!el) return;
  el.innerHTML = `
    <div class="iapp-sidebar-hdr">
      <span>FOLDERS</span>
      <span class="iapp-sidebar-plus">+</span>
    </div>
    ${demoFolders.map(f => `
      <div class="iapp-folder ${f.open ? 'open' : ''}" id="folder-${f.id}">
        <div class="iapp-folder-hdr" onclick="demoToggleFolder('${f.id}')">
          <span class="iapp-folder-arrow">▶</span>
          <span style="font-size:12px;opacity:0.6">📁</span>
          <span>${f.name}</span>
        </div>
        <div class="iapp-folder-files">
          ${f.files.map(file => `
            <div class="iapp-file-item ${demoActive === file.id ? 'active' : ''}"
                 onclick="demoOpenFile('${file.id}')">
              <svg class="iapp-file-ico" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 0h6l3 3v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1" fill="none"/><path d="M8 0v3h3" stroke="currentColor" stroke-width="1" fill="none"/></svg>${file.name}
            </div>`).join('')}
        </div>
      </div>`).join('')}`;
}

function renderDemoTabs() {
  const el = document.getElementById('iappTabs');
  if (!el) return;
  el.innerHTML = demoOpenTabs.map(id => {
    const f = demoFiles[id];
    return `<div class="iapp-tab ${id === demoActive ? 'active' : ''}"
                 onclick="demoSwitchTab('${id}')">
      <svg class="iapp-file-ico" viewBox="0 0 12 14" fill="none"><path d="M2 0h6l3 3v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1" fill="none"/><path d="M8 0v3h3" stroke="currentColor" stroke-width="1" fill="none"/></svg>${f.name}<span class="iapp-tab-close" onclick="event.stopPropagation();demoCloseTab('${id}')">×</span>
    </div>`;
  }).join('');
}

function demoCloseTab(id) {
  const idx = demoOpenTabs.indexOf(id);
  if (idx === -1) return;
  demoOpenTabs.splice(idx, 1);
  if (demoOpenTabs.length === 0) {
    // reopen first file if all closed
    demoOpenTabs.push('interviews');
    demoActive = 'interviews';
  } else if (demoActive === id) {
    demoActive = demoOpenTabs[Math.max(0, idx - 1)];
  }
  renderDemoTabs();
  renderDemoSidebar();
  renderDemoContent();
}

function renderDemoContent() {
  const editEl = document.getElementById('iappEditContent');
  const readEl = document.getElementById('iappReadContent');
  const badge  = document.getElementById('modeBadge');
  if (!editEl || !readEl) return;

  const file = demoFiles[demoActive];
  editEl.innerHTML = synHighlight(file.raw);
  readEl.innerHTML  = file.html;

  if (demoMode === 'edit') {
    editEl.style.display = 'block';
    readEl.style.display  = 'none';
    badge.textContent = 'Edit';
  } else {
    editEl.style.display = 'none';
    readEl.style.display  = 'block';
    badge.textContent = 'Read';
  }
}

function demoToggleFolder(id) {
  const folder = demoFolders.find(f => f.id === id);
  if (folder) { folder.open = !folder.open; renderDemoSidebar(); }
}

function demoOpenFile(id) {
  if (!demoOpenTabs.includes(id)) demoOpenTabs.push(id);
  demoActive = id;
  renderDemoSidebar();
  renderDemoTabs();
  renderDemoContent();
}

function demoSwitchTab(id) {
  demoActive = id;
  renderDemoSidebar();
  renderDemoTabs();
  renderDemoContent();
}

function toggleDemoMode() {
  demoMode = demoMode === 'edit' ? 'read' : 'edit';
  const btn = document.getElementById('cmdRBtn');
  btn.classList.add('flash');
  setTimeout(() => btn.classList.remove('flash'), 220);
  renderDemoContent();
}

function synHighlight(raw) {
  return raw.split('\n').map(line => {
    const esc = line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    if (/^# /.test(line))    return `<span class="syn-h1">${esc}</span>`;
    if (/^## /.test(line))   return `<span class="syn-h2">${esc}</span>`;
    if (/^### /.test(line))  return `<span class="syn-h3">${esc}</span>`;
    if (/^> /.test(line))    return `<span class="syn-quote">${esc}</span>`;
    if (/^- \[x\]/.test(line)) return `<span class="syn-chk">${esc}</span>`;
    if (/^- \[ \]/.test(line) || /^- /.test(line)) return `<span class="syn-list">${esc}</span>`;
    if (/^\d+\./.test(line)) return `<span class="syn-list">${esc}</span>`;
    if (/^```/.test(line))   return `<span class="syn-code">${esc}</span>`;
    // inline
    let h = esc
      .replace(/\*\*(.+?)\*\*/g, '<span class="syn-bold">**$1**</span>')
      .replace(/\*([^*]+?)\*/g,  '<span class="syn-em">*$1*</span>')
      .replace(/`([^`]+?)`/g,   '<span class="syn-code">`$1`</span>');
    return `<span class="syn-plain">${h}</span>`;
  }).join('\n');
}

document.addEventListener('DOMContentLoaded', initDemo);

// also add translations keys
Object.assign(T.ru, {
  demo_title: 'Работа со всеми файлами проекта',
  demo_desc:  'Добавив папку проекта в избранное, все файлы доступны из сайдбара. Открывай нужные, переключайся одним кликом — все вкладки в одном окне.',
  demo_hint:  '— переключить режим просмотра',
});
Object.assign(T.en, {
  demo_title: 'All project files at your fingertips',
  demo_desc:  'Add a project folder to Favorites and all its files are in the sidebar. Open what you need, switch with one click — all tabs in one window.',
  demo_hint:  '— toggle view mode',
});
