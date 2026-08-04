if (typeof CONFIG !== 'undefined' && CONFIG.colors) {
      const r = document.documentElement.style;
      Object.entries(CONFIG.colors).forEach(([k, v]) => r.setProperty('--' + k, v));
    }

    function applyConfig() {
      if (typeof CONFIG === 'undefined') return;
      const C = CONFIG;
      const set = (id, attr, val) => { const el = document.getElementById(id); if (el) el[attr] = val; };
      const setMeta = (sel, val) => { const el = document.querySelector(sel); if (el) el.setAttribute('content', val); };

      document.title = C.siteTitle;
      setMeta('meta[name="description"]', C.siteDesc);
      set('meta-canonical', 'href', C.siteUrl);
      setMeta('meta[property="og:url"]', C.siteUrl);
      setMeta('meta[property="og:title"]', C.siteTitle);
      setMeta('meta[property="og:description"]', C.siteDesc);
      setMeta('meta[property="og:image"]', C.siteUrl + '/assets/og-preview.png');
      if (C.twitterHandle) {
        setMeta('meta[name="twitter:site"]', C.twitterHandle);
        setMeta('meta[name="twitter:creator"]', C.twitterHandle);
      }
      setMeta('meta[name="twitter:title"]', C.siteTitle);
      setMeta('meta[name="twitter:description"]', C.siteDesc);

      const jld = document.getElementById('jsonld-person');
      if (jld) {
        const schema = JSON.parse(jld.textContent);
        schema.name = C.name;
        schema.url = C.siteUrl;
        schema.email = C.email;
        schema.image = C.siteUrl + '/assets/photo.jpg';
        schema.description = C.siteDesc;
        schema.jobTitle = C.tagline;
        schema.sameAs = [C.linkedin, C.github, C.blog].filter(Boolean);
        if (schema.worksFor && C.company) {
          schema.worksFor.name = C.company;
          if (C.companyUrl) schema.worksFor.url = C.companyUrl;
        }
        schema.address.addressLocality = (C.locationFull || '').split(',')[0];
        schema.address.addressCountry = C.country;
        jld.textContent = JSON.stringify(schema, null, 2);
      }

      const y = document.getElementById('year');
      if (y) y.textContent = String(new Date().getFullYear());

      // Google Analytics Injection
      if (C.googleAnalyticsId) {
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${C.googleAnalyticsId}`;
        document.head.appendChild(gtagScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', C.googleAnalyticsId);
      }
    }
    applyConfig();

    function renderPageSections() {
      if (!CONFIG.pageSections) return;
      const main = document.getElementById('main-content');
      if (!main) return;
      
      main.innerHTML = CONFIG.pageSections.map(s => {
        let inner = '';
        if (s.tmpl) {
          const t = document.getElementById(s.tmpl);
          if (t) inner = t.innerHTML;
        } else {
          inner = `<div id="${s.containerId}" class="${s.containerClass}"></div>`;
          if (s.extraHtml) inner += s.extraHtml;
        }
        
        return `<section id="${s.id}" class="sec" aria-labelledby="${s.id}-heading" ${s.bg ? `style="background:${s.bg}"` : ''}>
    <div class="sec-head">
      <span class="sn" aria-hidden="true">${s.num}</span>
      <h2 class="st" id="${s.id}-heading">${s.title}</h2>
      <div class="sl" aria-hidden="true"></div>
    </div>
    ${inner}
  </section>`;
      }).join('');
    }

    function renderSection(containerId, dataArray, mappingFn) {
      const el = document.getElementById(containerId);
      if (!el || !dataArray) return;
      el.innerHTML = dataArray.map(mappingFn).join('');
    }

    function renderHeroTags() {
      const el = document.getElementById('hero-tags');
      if (!el || !CONFIG.heroTags) return;
      el.innerHTML = CONFIG.heroTags.map(t => `<span class="htag">${t}</span>`).join('');
    }

    function renderHeroDesc() {
      const el = document.getElementById('hero-desc');
      if (!el || !CONFIG.heroDesc) return;
      el.innerHTML = CONFIG.heroDesc;
    }

    function renderHeroStats() {
      const el = document.getElementById('hero-stats');
      if (!el || !CONFIG.stats) return;
      el.innerHTML = Object.values(CONFIG.stats).map(s =>
        `<div class="hstat"><div class="n">${s.value.replace(/[+%]/g, m => `<span class="sup">${m}</span>`)}</div><div class="l">${s.label}</div></div>`
      ).join('');
    }

    function renderNavLinks() {
      if (!CONFIG.navLinks) return;
      const dNav = document.getElementById('desktop-nav');
      if (dNav) dNav.innerHTML = CONFIG.navLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('');
      
      const mNav = document.getElementById('mob-nav-links');
      if (mNav) mNav.innerHTML = CONFIG.navLinks.map(l => `<a class="mob-link" href="${l.href}">${l.label}</a>`).join('');
    }

    function renderAiChips() {
      if (!CONFIG.aiChips) return;
      const askChips = document.getElementById('ask-chips');
      if (askChips) askChips.innerHTML = CONFIG.aiChips.map(c => 
        `<button class="chip" data-ai-query="${c.replace(/"/g, '&quot;')}">${c}</button>`
      ).join('');
    }

    function renderBootSequence() {
      const bootSeq = document.getElementById('boot-sequence');
      if (bootSeq && CONFIG.bootSequence) {
        bootSeq.innerHTML = CONFIG.bootSequence.map((item, i) => 
          `<div class="bl" id="b${i}">${item}</div>`
        ).join('');
      }

      document.querySelectorAll('.bl').forEach((b, i) => setTimeout(() => b.classList.add('s'), 180 + i * 230));
      let p = 0; const bf = document.getElementById('bfill');
      if (!bf) return;
      const bi = setInterval(() => {
        p = Math.min(100, p + Math.random() * 13 + 5); bf.style.width = p + '%';
        if (p >= 100) { clearInterval(bi); setTimeout(() => document.getElementById('boot').classList.add('done'), 360); }
      }, 105);
    }

    function renderTicker() {
      const el = document.getElementById('ticker-inner');
      if (!el || !CONFIG.ticker) return;
      const items = CONFIG.ticker.map(t => {
        const parts = t.split('◆');
        if (parts.length === 2) return `<span class="t-item">${parts[0].trim()} <span class="t-sep">◆</span> ${parts[1].trim()}</span>`;
        return `<span class="t-item">${t}</span>`;
      }).join('');
      el.innerHTML = items + items;
    }

    function renderServices() {
      renderSection('persona-grid', CONFIG.services, (s, i) => {
        const delay = i > 0 ? ` d${Math.min(i, 5)}` : '';
        const isExternal = s.ctaExternal || s.ctaLink.startsWith('http');
        const target = isExternal ? ' target="_blank" rel="noopener"' : '';
        return `<article class="pcard ${s.cardClass} reveal${delay}" role="listitem">
        <span class="p-icon" aria-hidden="true">${s.icon}</span>
        <div class="p-who">${s.audience}</div>
        <h3 class="p-ttl">${s.title}</h3>
        <p class="p-desc">${s.desc}</p>
        <ul class="p-offers" aria-label="Services offered">
          ${s.offers.map(o => `<li>${o}</li>`).join('')}
        </ul>
        <a href="${s.ctaLink}" class="p-cta"${target}>${s.ctaText}</a>
      </article>`;
      });
    }

    function renderTerminalHints() {
      const el = document.getElementById('term-cmds');
      if (!el || !CONFIG.terminalHints) return;
      el.innerHTML = CONFIG.terminalHints.map(cmd => `<button class="th-cmd" data-term-cmd="${cmd}">${cmd}</button>`).join('');
    }

    function projectCardFeatured(p, badgeClass, linkTarget, linkClass) {
      return `<article class="proj${p.cardClass ? ' ' + p.cardClass : ''} pfeat reveal" aria-label="${p.name} project">
        <div class="pfeat-body">
          <div class="ptyp">${p.type}</div>
          <h3 class="pname">${p.name} <span class="sbadge ${badgeClass}">${p.statusLabel}</span></h3>
          <p class="pdesc" style="margin:12px 0 16px">${p.desc}</p>
          <div class="ptags">${(p.tags || []).map(t => `<span class="ptag">${t}</span>`).join('')}</div>
          <a href="${p.link}" target="${linkTarget}" rel="noopener" class="plink${linkClass}" style="margin-top:20px">${p.linkText}</a>
        </div>
        <div class="pvis" aria-hidden="true"><div class="hexgrid"></div></div>
      </article>`;
    }

    function projectCardCandle(p, delay, badgeClass, linkTarget, linkClass) {
      return `<article class="proj${p.cardClass ? ' ' + p.cardClass : ''} reveal${delay}" aria-label="${p.name} project">
        <div class="amrutya-inner">
          <div class="amrutya-content">
            <div class="ptyp">${p.type}</div>
            <h3 class="pname">${p.name} <span class="sbadge ${badgeClass}">${p.statusLabel}</span></h3>
            <p class="pdesc">${p.desc}</p>
            <div class="ptags">${(p.tags || []).map(t => `<span class="ptag">${t}</span>`).join('')}</div>
            <a href="${p.link}" target="${linkTarget}" rel="noopener" class="plink${linkClass}">${p.linkText}</a>
          </div>
          <div class="amrutya-vis" aria-hidden="true">
            <div class="candle-mini">
              <div class="cm-flame"></div>
              <div class="cm-wick"></div>
              <div class="cm-body"><span class="cm-lbl">AE</span></div>
              <div class="cm-glow"></div>
            </div>
            <span class="cm-name">Amrutya Essence™</span>
          </div>
        </div>
      </article>`;
    }

    function projectCardTerminal(p, delay, badgeClass, linkTarget, linkClass) {
      return `<article class="proj${p.cardClass ? ' ' + p.cardClass : ''} reveal${delay}" aria-label="${p.name} project">
        <div class="ptyp">${p.type}</div>
        <h3 class="pname">${p.name} <span class="sbadge ${badgeClass}">${p.statusLabel}</span></h3>
        <div class="port-terminal" aria-hidden="true">
          <span class="pt-line"><span class="pt-prompt">$</span> <span class="pt-cmd">wrangler pages deploy .</span></span>
          <span class="pt-line"><span class="pt-prompt">$</span> <span class="pt-cmd"># project: iankitkumar-in</span></span>
          <span class="pt-line pt-out">✓ <span class="pt-ok">Live on iankitkumar.in</span></span>
          <span class="pt-cursor">█</span>
        </div>
        <p class="pdesc">${p.desc}</p>
        <div class="ptags">${(p.tags || []).map(t => `<span class="ptag">${t}</span>`).join('')}</div>
        <a href="${p.link}" target="${linkTarget}" rel="noopener" class="plink${linkClass}">${p.linkText}</a>
      </article>`;
    }

    function projectCardDefault(p, delay, badgeClass, linkTarget, linkClass) {
      return `<article class="proj${p.cardClass ? ' ' + p.cardClass : ''} reveal${delay}" aria-label="${p.name} project">
      <div class="ptyp">${p.type}</div>
      <h3 class="pname">${p.name} <span class="sbadge ${badgeClass}">${p.statusLabel}</span></h3>
      <p class="pdesc">${p.desc}</p>
      <div class="ptags">${(p.tags || []).map(t => `<span class="ptag">${t}</span>`).join('')}</div>
      <a href="${p.link}" target="${linkTarget}" rel="noopener" class="plink${linkClass}">${p.linkText}</a>
    </article>`;
    }

    function initHexgrids() {
      document.querySelectorAll('.hexgrid').forEach(hg => {
        if (hg._hexInterval) clearInterval(hg._hexInterval);
        hg.innerHTML = '';
        for (let i = 0; i < 36; i++) { const c = document.createElement('div'); c.className = 'hcell'; hg.appendChild(c); }
        const cells = [...hg.querySelectorAll('.hcell')]; let sp = 0;
        hg._hexInterval = setInterval(() => {
          cells.forEach(c => c.classList.remove('on', 'err'));
          for (let i = 0; i < Math.floor(Math.random() * 5) + 2; i++)cells[(sp + Math.floor(Math.random() * 10)) % 36].classList.add('on');
          if (Math.random() > .72) cells[Math.floor(Math.random() * 36)].classList.add('err');
          sp = (sp + 3) % 36;
        }, 300);
      });
    }

    function renderProjects() {
      const TEMPLATES = { featured: projectCardFeatured, candle: projectCardCandle, terminal: projectCardTerminal };
      renderSection('projects-grid', CONFIG.projects, (p, i) => {
        const delays = ['', 'd1', 'd2', 'd3', 'd4', 'd5'];
        const delay = i > 0 ? ` ${delays[Math.min(i, 5)]}` : '';
        const badgeClass = p.status === 'live' ? 'live' : p.status === 'dev' ? 'dev' : 'tm';
        const linkTarget = p.link.startsWith('http') ? '_blank' : '_self';
        const linkClass = p.linkStyle && p.linkStyle !== 'default' ? ` ${p.linkStyle}` : '';

        const templateFn = TEMPLATES[p.template];
        if (templateFn) return p.template === 'featured' ? templateFn(p, badgeClass, linkTarget, linkClass) : templateFn(p, delay, badgeClass, linkTarget, linkClass);
        return projectCardDefault(p, delay, badgeClass, linkTarget, linkClass);
      });

      initHexgrids();

      const cur = document.querySelector('.pt-cursor');
      if (cur) setInterval(() => cur.style.opacity = cur.style.opacity === '0' ? '1' : '0', 600);
    }

    function renderAbout() {
      const body = document.getElementById('about-body');
      if (body && CONFIG.bio) {
        body.innerHTML = CONFIG.bio.map(p => `<p>${p}</p>`).join('');
      }
      const awards = document.getElementById('about-awards');
      if (awards && CONFIG.awardChips) {
        awards.innerHTML = CONFIG.awardChips.map(a =>
          `<span class="aw-chip${a.hot ? ' hot' : ''}">${a.text}</span>`
        ).join('');
      }
      const stats = document.getElementById('about-stats');
      if (stats && CONFIG.aboutStats) {
        stats.innerHTML = CONFIG.aboutStats.map(s =>
          `<div class="stat-cell"><div class="stat-n">${s.value.replace(/[+%]/g, m => `<sup>${m}</sup>`)}</div><div class="stat-l">${s.label}</div></div>`
        ).join('');
      }
      
      renderSection('about-sidecards', CONFIG.aboutCards, (c, i) => `
        <div class="sc reveal d${i + 3}">
          <div class="sc-lbl">${c.label}</div>
          <div class="sc-ttl">${c.title}</div>
          <div class="sc-desc">${c.desc}</div>
          <span class="sc-tag">${c.tag}</span>
        </div>`);

      const intl = document.getElementById('intl-targets');
      if (intl && CONFIG.relocationTargets) {
        intl.innerHTML = CONFIG.relocationTargets.map(t =>
          `<span class="sc-tag intl-tag">${t.flag} ${t.country}</span>`
        ).join('');
      }
    }

    function renderCerts() {
      renderSection('certs-grid', CONFIG.certifications, (c, i) => {
        const delay = i > 0 ? ` d${i > 5 ? 5 : i}` : '';
        return `
      <div class="cert ${c.type} reveal${delay}" itemscope itemtype="https://schema.org/EducationalOccupationalCredential">
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-name" itemprop="name">${c.name}</div>
        <div class="cert-date">${c.date}${c.active ? ' — <span class="live">● Active</span>' : ''}</div>
      </div>`;
      });
      
      renderSection('awards-row', CONFIG.awards, (a, i) => {
        const delay = i > 0 ? ` d${i}` : '';
        return `
      <div class="aw-card reveal${delay}">
        <span class="aw-icon" aria-hidden="true">${a.icon}</span>
        <div class="aw-name">${a.name}</div>
        <div class="aw-by">${a.by}<br>${a.note}</div>
      </div>`;
      });
    }

    function renderExperience() {
      renderSection('timeline', CONFIG.experience, (e, i) => {
        const delay = i > 0 ? ` d${i}` : '';
        return `
    <div class="tl-item${e.current ? ' cur' : ''} reveal${delay}" itemscope itemtype="https://schema.org/OrganizationRole">
      <div class="tl-date">
        <strong>${e.current ? 'Current' : e.period}</strong>
        ${e.period}<br>${e.duration}<br><br>${e.location}
      </div>
      <div>
        <div class="tl-co" itemprop="roleName">${e.company}</div>
        <h3 class="tl-role" itemprop="hasOccupation">${e.role}</h3>
        <div class="tl-sub">${e.sub}</div>
        <ul class="tl-ul">
          ${(e.bullets || []).map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="tl-tags">
          ${(e.tags || []).map(t => `<span class="ttag">${t}</span>`).join('')}
        </div>
      </div>
    </div>`;
      });
    }

    function renderContact() {
      const el = document.getElementById('contact-links');
      if (!el || !CONFIG) return;
      const C = CONFIG;
      el.innerHTML = `
    <a href="mailto:${C.email}" class="clink">
      <span class="cl-lbl">Email</span>
      <span class="cl-val">${C.email}</span>
      <span class="cl-arr">→</span>
    </a>
    <a href="${C.resumeUrl || './assets/resume.pdf'}" download class="clink" style="border-color:rgba(79,142,247,.15)">
      <span class="cl-lbl">Lebenslauf / CV</span>
      <span class="cl-val">Ankit_Kumar_CV.pdf</span>
      <span class="cl-arr" style="color:var(--blue)">→</span>
    </a>
    <a href="${C.linkedin}" target="_blank" rel="noopener" class="clink">
      <span class="cl-lbl">LinkedIn</span>
      <span class="cl-val">${C.name} — ${C.company || 'DevOps'}</span>
      <span class="cl-arr">→</span>
    </a>
    <a href="${C.github}" target="_blank" rel="noopener" class="clink">
      <span class="cl-lbl">GitHub</span>
      <span class="cl-val">@${C.handle}</span>
      <span class="cl-arr">→</span>
    </a>
    <a href="${C.blog}" target="_blank" rel="noopener" class="clink" style="border-color:rgba(184,255,38,.15)">
      <span class="cl-lbl">Blog</span>
      <span class="cl-val">blog.iankitkumar.in</span>
      <span class="cl-arr" style="color:var(--lime)">→</span>
    </a>`;

      const intlAvail = document.getElementById('intl-avail');
      if (intlAvail && CONFIG.relocationTargets) {
        intlAvail.innerHTML = CONFIG.relocationTargets.map(t =>
          `<span class="av-t intl">${t.flag} ${t.country}</span>`
        ).join('');
      }
    }

    renderNavLinks();
    renderTicker();
    renderPageSections();
    renderServices();
    renderTerminalHints();
    renderHeroTags();
    renderHeroDesc();
    renderHeroStats();
    renderProjects();
    renderAbout();
    renderCerts();
    renderExperience();
    renderContact();
    renderAiChips();
    renderBootSequence();

    const CR = document.getElementById('cr'), CD = document.getElementById('cd');
    let mx = -99, my = -99, rx = -99, ry = -99;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function l() { rx += (mx - rx) * .12; ry += (my - ry) * .12; CR.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`; CD.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`; requestAnimationFrame(l); })();
    function bindHover(sel, cls) {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add(cls));
        el.addEventListener('mouseleave', () => document.body.classList.remove(cls));
      });
    }
    setTimeout(() => {
      bindHover('a,button,.proj,.pcard,.clink,.chip,.cert,.aw-card,.mob-link', 'ch');
    }, 200);

    function toggleMobNav() {
      const btn = document.getElementById('mob-btn');
      const mnav = document.getElementById('mob-nav');
      const open = mnav.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    function closeMobNav() {
      const btn = document.getElementById('mob-btn');
      const mnav = document.getElementById('mob-nav');
      mnav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', () => {
      document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
      if (scrollY > 80 && document.getElementById('mob-nav')?.classList.contains('open')) closeMobNav();
    });

    function navScrollTo(id) {
      const el = document.getElementById(id);
      if (!el) return;
      const navH = document.getElementById('nav')?.offsetHeight || 60;
      const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (a) {
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        navScrollTo(id);
        if (document.getElementById('mob-nav')?.classList.contains('open')) closeMobNav();
        return;
      }
      
      if (e.target.closest('#btn-hire-nav')) {
        navScrollTo('contact');
        if (document.getElementById('mob-nav')?.classList.contains('open')) closeMobNav();
        return;
      }

      const thCmd = e.target.closest('.th-cmd');
      if (thCmd && thCmd.dataset.termCmd) {
        if (typeof openTermWith === 'function') openTermWith(thCmd.dataset.termCmd);
        return;
      }
      
      if (e.target.closest('#csend')) {
        if (typeof sendAI === 'function') sendAI();
        return;
      }
      
      const chip = e.target.closest('.chip');
      if (chip && chip.dataset.aiQuery) {
        if (typeof sendAI === 'function') sendAI(chip.dataset.aiQuery);
        return;
      }
    });

    const ro = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); }
    }), { threshold: .08 });
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
    }, 100);

    const termEl = document.getElementById('term'), tout = document.getElementById('tout'), tinput = document.getElementById('tinput');
    let th = [], hi = -1;
    const C = typeof CONFIG !== 'undefined' ? CONFIG : {};
    const CMDS = {
      help: `<span class="l">╔══════════════════════════════════════╗</span>
<span class="l">║   ankit@ops — Commands               ║</span>
<span class="l">╚══════════════════════════════════════╝</span>

<span class="w">ABOUT:</span>       <span class="d">whoami · skills · stack · certs · awards · stats</span>
<span class="w">ROLES:</span>       <span class="a">hire</span> · <span class="b">experience</span> · <span class="l">splunk</span>
<span class="w">PROJECTS:</span>    <span class="d">portfolio · blog · ids · nids</span>
<span class="w">NAVIGATE:</span>    <span class="d">open [services|work|about|certs|exp|contact]</span>
<span class="w">OTHER:</span>       <span class="d">cv · blog · template · clear · exit</span>`,
      whoami: `<span class="w">${C.name || 'Ankit Kumar'}</span> / ${C.pronouns || 'He/Him'} / ${C.handle || 'i-ankitkumar'}
<span class="d">Role:      </span><span class="w">${C.tagline || 'DevOps & Cloud Infrastructure Engineer'}</span>
<span class="d">Company:   </span><span class="l">${C.company || 'Wolters Kluwer'}</span>
<span class="d">Location:  </span>${C.location || 'Mumbai — targeting Germany'}
<span class="d">Experience:</span><span class="l"> ${C.stats?.years?.value || '4+'} years</span>
<span class="d">LinkedIn:  </span><span class="l">${C.linkedin || ''}</span>`,
      hire: `<span class="a">══ Hiring Ankit ══</span>
<span class="l">DevOps Engineer · SRE · Cloud Infrastructure · Platform</span>
<span class="d">Target: 🇩🇪 Germany (also open to NL / EU)</span>
<span class="d">EU Blue Card eligible · German A1 · English C1</span>
<span class="w">→ Email:</span>  <span class="a">${C.email || 'mail@iankitkumar.in'}</span>
<span class="w">→ CV:</span>     <span class="a">${C.resumeUrl || './assets/resume.pdf'}</span>`,
      experience: `<span class="b">══ Experience ══</span>
<span class="w">Wolters Kluwer</span> <span class="d">— IT Infra & Ops (DevOps & Cloud) · Apr 2024–present</span>
<span class="w">Wolters Kluwer</span> <span class="d">— Associate IT Infra & Ops · Aug 2022–Mar 2024</span>
<span class="w">Colgate GBS</span>     <span class="d">— Executive Associate · Aug 2021–Jul 2022</span>
<span class="d">Type </span><span class="l">open exp</span><span class="d"> to jump to the timeline.</span>`,
      skills: `<span class="w">Skills</span>
<span class="b">Cloud:  </span><span class="d">Azure · Splunk · Entra ID · Key Vault · CyberArk</span>
<span class="l">DevOps: </span><span class="d">Terraform · Azure DevOps · GitHub Actions · Docker</span>
<span class="w">Auto:   </span><span class="d">Python · PowerShell · Bash · runbooks</span>
<span class="g">Ops:    </span><span class="d">RHEL · incidents · Grafana · SCCM/MECM · Tanium · SOC2</span>`,
      stack: null,
      splunk: `<span class="w">Splunk — multi-site ops</span>
<span class="d">Led multi-site cluster migration · WK ARC certification</span>
<span class="d">HA / DR with RPO/RTO · dashboards for finance + SOC2</span>
<span class="d">Azure dev/test cluster · Entra ID SSO</span>`,
      stats: `<span class="w">Career Numbers</span>
<span class="l">4+</span>     <span class="d">years enterprise ops</span>
<span class="l">35%</span>    <span class="d">BAU reduction at Wolters Kluwer</span>
<span class="l">70%</span>    <span class="d">manual effort cut via runbooks</span>
<span class="l">20K+</span>   <span class="d">Windows endpoints at Colgate</span>
<span class="l">99.9%+</span> <span class="d">availability focus on P1/P2</span>`,
      certs: `<span class="w">Certifications</span>
<span class="l">[Active]</span> <span class="d">Terraform Associate — </span><span class="b">HashiCorp</span>
<span class="l">[Active]</span> <span class="d">AZ-104 Azure Administrator — </span><span class="b">Microsoft</span>
<span class="l">[Active]</span> <span class="d">RHCSA — </span><span class="b">Red Hat</span>
<span class="g">[Prog]</span>   <span class="d">AZ-400 — </span><span class="b">Microsoft</span>
<span class="d">Also: AZ-900 · AI-900</span>`,
      awards: `<span class="w">Recognition</span>
<span class="g">⭐  Star Performer</span>     <span class="d">Wolters Kluwer · Q1 2023</span>
<span class="g">✅  WK ARC</span>             <span class="d">Splunk multi-site migration</span>`,
      portfolio: `<span class="w">iankitkumar.in</span>
<span class="l">Status: ● Live · Cloudflare Pages</span>
<span class="d">Portfolio + DNS + Email Routing + sibling blog.</span>
<span class="l">→ github.com/i-ankitkumar/iankitkumar.in</span>`,
      blog: `<span class="w">blog.iankitkumar.in</span>
<span class="l">Status: ● Live</span>
<span class="d">Astro + Brutal theme. Cloud / DevOps learning notes.</span>
<span class="l">→ https://blog.iankitkumar.in</span>`,
      ids: `<span class="w">IDS using MLP + GridSearchCV</span>
<span class="l">→ github.com/i-ankitkumar/IDS_using_MLP-GridSearchCV</span>`,
      nids: `<span class="w">NIDS using ML and DL</span>
<span class="l">→ github.com/i-ankitkumar/NIDS_using_MLandDL</span>`,
      cv: `<span class="w">Lebenslauf / CV</span>
<span class="l">→ ${C.resumeUrl || './assets/resume.pdf'}</span>
<span class="d">Opening download...</span>`,
      template: `<span class="w">Site template credit</span>
<span class="d">Based on Operator Portfolio (MIT) by LucidAkshay.</span>
<span class="l">→ ${C.templateRepo || 'https://github.com/LucidAkshay/operator-portfolio'}</span>`,
      clear: '__clear__', exit: '__exit__'
    };
    CMDS.stack = CMDS.skills;

    function openTerm() {
      termEl.classList.add('open');
      if (!tout.innerHTML.trim()) {
        addTLine(`<span class="l">ankit@ops</span>\n<span class="d">Type </span><span class="l">help</span><span class="d"> to see all commands. </span><span class="l">Esc</span><span class="d"> or </span><span class="l">Ctrl+\`</span><span class="d"> to close.\n</span>`);
      }
      setTimeout(() => tinput.focus(), 80);
    }
    function closeTerm() { termEl.classList.remove('open') }
    function escapeHTML(s) { const d = document.createElement('div'); d.appendChild(document.createTextNode(s)); return d.innerHTML; }
    function addTLine(h) { tout.innerHTML += h + '\n'; termEl.querySelector('.tbody').scrollTop = 99999; }
    function openTermWith(cmd) {
      openTerm();
      setTimeout(() => {
        addTLine(`<span class="d">ankit@ops:~$</span> <span class="w">${escapeHTML(cmd)}</span>`);
        const r = CMDS[cmd];
        if (r) addTLine(r);
        else addTLine(`<span class="a">command not found: ${escapeHTML(cmd)}</span>`);
        if (cmd === 'cv' || cmd === 'resume') window.open(C.resumeUrl || './assets/resume.pdf', '_blank');
        if (cmd === 'blog') window.open(C.blog || 'https://blog.iankitkumar.in', '_blank');
      }, 120);
    }

    tinput.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') { hi = Math.min(hi + 1, th.length - 1); tinput.value = th[hi] || ''; return; }
      if (e.key === 'ArrowDown') { hi = Math.max(hi - 1, -1); tinput.value = hi === -1 ? '' : th[hi]; return; }
      if (e.key !== 'Enter') return;
      const raw = tinput.value.trim(); if (!raw) return;
      const parts = raw.toLowerCase().split(/\s+/);
      const cmd = parts[0]; const arg = parts[1];
      th.unshift(raw); hi = -1;
      addTLine(`<span class="d">ankit@ops:~$</span> <span class="w">${escapeHTML(raw)}</span>`);
      tinput.value = '';
      if (cmd === 'exit') { closeTerm(); return; }
      if (cmd === 'clear') { tout.innerHTML = ''; return; }
      if (cmd === 'open' && arg) {
        const map = { services: 'services', help: 'services', work: 'work', about: 'about', certs: 'certs', exp: 'exp', experience: 'exp', contact: 'contact' };
        const target = map[arg];
        if (target) { closeTerm(); setTimeout(() => navScrollTo(target), 300); addTLine(`<span class="l">→ navigating to ${escapeHTML(arg)}</span>`); return; }
        else { addTLine(`<span class="a">unknown section: ${escapeHTML(arg)}</span>\n<span class="d">options: services work about certs exp contact</span>`); return; }
      }
      if (cmd === 'cv' || cmd === 'resume') {
        addTLine(CMDS.cv);
        window.open(C.resumeUrl || './assets/resume.pdf', '_blank');
        return;
      }
      if (cmd === 'blog') {
        addTLine(CMDS.blog);
        window.open(C.blog || 'https://blog.iankitkumar.in', '_blank');
        return;
      }
      const r = CMDS[cmd];
      if (r) addTLine(r);
      else addTLine(`<span class="a">command not found: ${escapeHTML(cmd)}</span>\n<span class="d">Type </span><span class="l">help</span><span class="d"> to see available commands.</span>`);
    });

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') { e.preventDefault(); termEl.classList.contains('open') ? closeTerm() : openTerm(); }
      if (e.key === 'Escape') {
        if (termEl.classList.contains('open')) closeTerm();
        closeMobNav();
      }
    });

    const cmsgs = document.getElementById('cmsgs'), cin = document.getElementById('cin'), csend = document.getElementById('csend');
    let chatHist = [];
    function addMsg(role, text) {
      if (!cmsgs) return;
      const m = document.createElement('div'); m.className = 'cmsg ' + role;
      const lbl = document.createElement('span'); lbl.className = 'cmsg-lbl'; lbl.textContent = role === 'ai' ? 'AI' : 'You';
      const c = document.createElement('div'); c.className = 'cmsg-c'; c.textContent = text;
      m.appendChild(lbl); m.appendChild(c); cmsgs.appendChild(m); cmsgs.scrollTop = 99999;
      c.setAttribute('aria-label', role === 'ai' ? 'AI response: ' + text : 'Your message: ' + text);
    }
    function showTyping() {
      if (!cmsgs) return;
      const t = document.createElement('div'); t.className = 'cmsg ai'; t.id = 'typing';
      const lbl = document.createElement('span'); lbl.className = 'cmsg-lbl'; lbl.textContent = 'AI';
      const c = document.createElement('div'); c.className = 'cmsg-c';
      c.innerHTML = '<div class="typing" aria-label="Thinking"><div class="tdot"></div><div class="tdot"></div><div class="tdot"></div></div>';
      t.appendChild(lbl); t.appendChild(c); cmsgs.appendChild(t); cmsgs.scrollTop = 99999;
    }
    function hideTyping() { const t = document.getElementById('typing'); if (t) t.remove(); }
    async function sendAI(preset) {
      if (!cin || !csend) return;
      const q = preset || cin.value.trim(); if (!q) return;
      cin.value = ''; csend.disabled = true;
      addMsg('user', q); chatHist.push({ role: 'user', content: q }); showTyping();
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: chatHist.slice(-8) })
        });
        const data = await res.json();
        const ans = data.answer || data.error || 'Something went wrong — please try again.';
        chatHist.push({ role: 'assistant', content: ans });
        hideTyping(); addMsg('ai', ans);
      } catch (err) {
        hideTyping(); addMsg('ai', 'AI chat is not enabled on this host. Email mail@iankitkumar.in instead.');
      }
      csend.disabled = false;
    }
    if (cin) cin.addEventListener('keydown', e => { if (e.key === 'Enter') sendAI(); });