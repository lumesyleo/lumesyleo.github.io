// ========== 颜色工具 ==========
function colorToRgba(color, alpha) {
  if (!color) return `rgba(135, 206, 235, ${alpha})`;
  // rgba(...)
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/, `${alpha})`);
  }
  // rgb(...)
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  // #hex
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
}
// ========== 深色模式切换 ==========
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ========== 移动端折叠菜单 ==========
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuToggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

// ========== 渲染移动端项目卡片 ==========
function renderMobileProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((p, i) => {
    const imgUrl = p.image || p.img || p.cover || '';
    const hasImage = typeof imgUrl === 'string' && imgUrl.trim() !== '';

    const colorKey = p.color;
    let indicatorClass = 'card-corner-indicator';
    let indicatorStyle = '';

    if (colorKey && PROJECT_COLOR_MAP[colorKey]) {
      indicatorStyle = `background: ${PROJECT_COLOR_MAP[colorKey]}; border: none;`;
    } else {
      indicatorClass += ' fallback';
    }

    const mediaHTML = hasImage
      ? `<img src="${imgUrl}" alt="${p.name}" loading="lazy"
            onerror="this.style.display='none'; this.parentElement.classList.add('img-empty');">`
      : `<span class="project-noimg-mobile"></span>`;

    return `
      <article class="project-card">
        <div class="project-index">${String(i + 1).padStart(2, '0')}</div>
        <div class="project-img ${hasImage ? '' : 'img-empty'}">${mediaHTML}</div>
        <div class="project-info">
          <h3 class="project-name">${p.name}</h3>
          <p class="project-desc">${p.desc}</p>
          <a href="${p.link}" target="_blank" rel="external nofollow noreferrer" class="project-link rightangle">${p.linkText}</a>
        </div>
        <div class="${indicatorClass}" style="${indicatorStyle}"></div>
      </article>
    `;
  }).join('');
}
renderMobileProjects();

// ========== Hero 标题 ==========
const heroTitle = document.getElementById('hero-title');
const text = heroTitle.textContent;
heroTitle.innerHTML = '';
[...text].forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = char === ' ' ? '\u00A0' : char;
  span.style.animationDelay = `${0.1 + i * 0.05}s`;
  heroTitle.appendChild(span);
});

// ========== 乱码组件 ==========
class ScrambleText {
  constructor(el, opts = {}) {
    this.el = el;
    this.original = el.textContent;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    this.duration = opts.duration || 2500;
    this.interval = opts.interval || 80;
    this.timer = null;
  }
  start() {
    let elapsed = 0;
    this.el.style.opacity = 1;
    this.timer = setInterval(() => {
      let temp = '';
      for (let i = 0; i < this.original.length; i++) {
        temp += this.chars[Math.floor(Math.random() * this.chars.length)];
      }
      this.el.textContent = temp;
      elapsed += this.interval;
      if (elapsed >= this.duration) {
        clearInterval(this.timer);
        this.el.textContent = this.original;
      }
    }, this.interval);
  }
}

document.querySelectorAll('.glitch-target').forEach(el => {
  const scrambler = new ScrambleText(el, { duration: 1200, interval: 100 });
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      scrambler.start();
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(el);
});

// ========== 滚动淡入动画 ==========
const animElements = document.querySelectorAll('.section-title, .about-text p, .project-card');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
animElements.forEach(el => animObserver.observe(el));

// ========== 导航高亮跟随 ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) link.classList.add('active');
  });
}, { passive: true });

// ========== 桌面端 Projects ==========
(function initDesktopProjects() {
  const timeline = document.getElementById('project-timeline');
  const viewport = document.getElementById('project-viewport');
  const heroTitle = document.getElementById('project-hero-title');
  let activeIndex = 0;

  function renderTimeline() {
    timeline.innerHTML = projects.map((p, i) => {
      const color = PROJECT_COLOR_MAP[p.color];
      let styleAttr = '';
      if (color) {
        const bg   = colorToRgba(color, 0.10);  // hover 透明背景
        const grad = colorToRgba(color, 0.28);  // active 渐变起点
        styleAttr = `style="--project-color: ${color}; --project-color-bg: ${bg}; --project-color-gradient: ${grad};"`;
      }
      return `
        <button class="timeline-item ${i === activeIndex ? 'active' : ''}" data-index="${i}" ${styleAttr}>
          <div class="timeline-line"></div>
          <div class="timeline-content">
            <div class="timeline-title">${p.name}</div>
            <div class="timeline-sub">${p.subtitle}</div>
          </div>
        </button>
      `;
    }).join('');

    timeline.querySelectorAll('.timeline-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        if (idx !== activeIndex) switchProject(idx);
      });
    });
  }

  function renderProject(index) {
    const p = projects[index];
    const hasImage = p.image && p.image.trim() !== '';
    
    let html = '';
    if (p.scheme === 1) {
      html = `
        <div class="project-scheme-1">
          <div class="scheme1-bg ${hasImage ? '' : 'no-image'}" ${hasImage ? `style="background-image:url('${p.image}')"` : ''}></div>
          <div class="scheme1-vignette"></div>
          <div class="scheme1-fade"></div>
          <div class="scheme1-info">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <a href="${p.link}" target="_blank" rel="external nofollow noreferrer" class="rightangle">${p.linkText}</a>
          </div>
        </div>
      `;
    } else {
      html = `
        <div class="project-scheme-2">
          <div class="scheme2-media">
            ${hasImage 
              ? `<img src="${p.image}" alt="${p.name}">` 
              : `<div class="scheme2-placeholder">[ NO IMAGE DATA ]</div>`
            }
          </div>
          <div class="scheme2-info">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <a href="${p.link}" target="_blank" class="rightangle">${p.linkText}</a>
          </div>
        </div>
      `;
    }
    viewport.innerHTML = html;
  }

  function switchProject(index) {
    activeIndex = index;
    
    timeline.querySelectorAll('.timeline-item').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    
    heroTitle.textContent = projects[index].name;
    
    viewport.classList.add('is-switching');
    
    setTimeout(() => {
      renderProject(index);
      requestAnimationFrame(() => {
        viewport.classList.remove('is-switching');
      });
    }, 400);
  }

  let isDown = false;
  let startY;
  let scrollTop;

  timeline.addEventListener('mousedown', (e) => {
    isDown = true;
    timeline.style.cursor = 'grabbing';
    startY = e.pageY - timeline.offsetTop;
    scrollTop = timeline.scrollTop;
  });

  timeline.addEventListener('mouseleave', () => {
    isDown = false;
    timeline.style.cursor = 'grab';
  });

  timeline.addEventListener('mouseup', () => {
    isDown = false;
    timeline.style.cursor = 'grab';
  });

  timeline.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - timeline.offsetTop;
    const walk = (y - startY) * 2;
    timeline.scrollTop = scrollTop - walk;
  });

  renderTimeline();
  renderProject(0);
})();