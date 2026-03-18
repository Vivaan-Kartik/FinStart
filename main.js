/* ═══════════════════════════════════════════════
   FINSTART — CORE JAVASCRIPT
   Auth, Navigation, Animations, Utilities
═══════════════════════════════════════════════ */

// ── CONFIG — SWAP THESE WITH YOUR REAL VALUES ──
const CONFIG = {
  STRIPE_KEY:       'pk_live_YOUR_STRIPE_KEY_HERE',
  MAILCHIMP_URL:    'https://YOUR_MAILCHIMP_URL_HERE',
  YOUTUBE_CHANNEL:  'https://www.youtube.com/@YOUR_CHANNEL_HERE',
  GUMROAD_BASE:     'https://YOUR_GUMROAD_HANDLE.gumroad.com',
  PRODUCTS: {
    calculator:     'https://YOUR_GUMROAD_HANDLE.gumroad.com/l/YOUR_CALCULATOR_LINK',
    budget:         'https://YOUR_GUMROAD_HANDLE.gumroad.com/l/YOUR_BUDGET_LINK',
    etf:            'https://YOUR_GUMROAD_HANDLE.gumroad.com/l/YOUR_ETF_LINK',
    bundle:         'https://YOUR_GUMROAD_HANDLE.gumroad.com/l/YOUR_BUNDLE_LINK',
    abitur:         'https://YOUR_GUMROAD_HANDLE.gumroad.com/l/YOUR_ABITUR_LINK',
    report:         'https://YOUR_GUMROAD_HANDLE.gumroad.com/l/YOUR_REPORT_LINK',
  }
};

// ── SIMPLE AUTH STATE ──
const Auth = {
  user: null,
  isPremium: false,

  init() {
    const saved = localStorage.getItem('finstart_user');
    if (saved) {
      try {
        this.user = JSON.parse(saved);
        this.isPremium = this.user.premium || false;
      } catch(e) {}
    }
    this.updateNav();
  },

  login(email, name) {
    this.user = { email, name, premium: false, joinedAt: Date.now() };
    localStorage.setItem('finstart_user', JSON.stringify(this.user));
    this.updateNav();
    return this.user;
  },

  logout() {
    this.user = null;
    this.isPremium = false;
    localStorage.removeItem('finstart_user');
    this.updateNav();
  },

  isLoggedIn() { return !!this.user; },

  updateNav() {
    const loginBtn  = document.getElementById('nav-login-btn');
    const signupBtn = document.getElementById('nav-signup-btn');
    const userMenu  = document.getElementById('nav-user-menu');
    const userName  = document.getElementById('nav-user-name');

    if (this.isLoggedIn()) {
      if (loginBtn)  loginBtn.style.display  = 'none';
      if (signupBtn) signupBtn.style.display = 'none';
      if (userMenu)  userMenu.style.display  = 'flex';
      if (userName)  userName.textContent    = this.user.name || this.user.email.split('@')[0];
    } else {
      if (loginBtn)  loginBtn.style.display  = '';
      if (signupBtn) signupBtn.style.display = '';
      if (userMenu)  userMenu.style.display  = 'none';
    }
    this.updatePaywalls();
  },

  updatePaywalls() {
    document.querySelectorAll('.paywall-blur').forEach(el => {
      if (this.isPremium) {
        el.classList.remove('locked');
      } else {
        el.classList.add('locked');
      }
    });
  }
};

// ── MODAL SYSTEM ──
const Modal = {
  show(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  hide(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
    document.body.style.overflow = '';
  },
  hideAll() {
    document.querySelectorAll('.modal-overlay').forEach(el => {
      el.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
};

// ── SCROLL ANIMATIONS ──
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── NAV SCROLL ──
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ── SHARED NAV HTML ──
function renderNav(activePage = '') {
  return `
<nav id="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark">📈</div>
      Fin<span>Start</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" class="${activePage==='home'?'active':''}">Home</a></li>
      <li><a href="learn.html" class="${activePage==='learn'?'active':''}">Learn</a></li>
      <li><a href="articles.html" class="${activePage==='articles'?'active':''}">Articles</a></li>
      <li><a href="quiz.html" class="${activePage==='quiz'?'active':''}">Investor Profile</a></li>
      <li><a href="products.html" class="${activePage==='products'?'active':''}">Products</a></li>
      <li><a href="premium.html" class="${activePage==='premium'?'active':''}">Premium</a></li>
    </ul>
    <div class="nav-actions">
      <button id="nav-login-btn" class="nav-user-btn" onclick="Modal.show('login-modal')">Log In</button>
      <a id="nav-signup-btn" href="#" class="btn btn-gold" style="padding:9px 20px;font-size:13px;" onclick="Modal.show('signup-modal');return false;">Sign Up Free</a>
      <div id="nav-user-menu" style="display:none;align-items:center;gap:12px;">
        <span style="font-size:13px;color:rgba(255,255,255,0.7);">Hi, <strong id="nav-user-name" style="color:var(--gold-bright)"></strong></span>
        <button class="nav-user-btn" onclick="Auth.logout()">Log Out</button>
      </div>
    </div>
  </div>
</nav>`;
}

// ── SHARED MODALS HTML ──
function renderModals() {
  return `
<!-- LOGIN MODAL -->
<div class="modal-overlay" id="login-modal" onclick="if(event.target===this)Modal.hideAll()">
  <div class="modal">
    <button class="modal-close" onclick="Modal.hideAll()">✕</button>
    <h2>Welcome back</h2>
    <p class="sub">Log in to access your investor profile and saved content.</p>
    <div class="form-field">
      <label>Email Address</label>
      <input type="email" id="login-email" placeholder="you@example.com">
    </div>
    <div class="form-field">
      <label>Password</label>
      <input type="password" id="login-password" placeholder="••••••••">
    </div>
    <button class="form-btn" onclick="handleLogin()">Log In</button>
    <div class="modal-divider">or</div>
    <div class="modal-switch">
      Don't have an account? <a onclick="Modal.hide('login-modal');Modal.show('signup-modal')">Sign up free</a>
    </div>
    <p id="login-msg" style="font-size:13px;color:#e74c3c;margin-top:12px;display:none;"></p>
  </div>
</div>

<!-- SIGNUP MODAL -->
<div class="modal-overlay" id="signup-modal" onclick="if(event.target===this)Modal.hideAll()">
  <div class="modal">
    <button class="modal-close" onclick="Modal.hideAll()">✕</button>
    <h2>Join FinStart</h2>
    <p class="sub">Free financial education, built for young Germans.</p>
    <div class="form-field">
      <label>Your Name</label>
      <input type="text" id="signup-name" placeholder="Max Mustermann">
    </div>
    <div class="form-field">
      <label>Email Address</label>
      <input type="email" id="signup-email" placeholder="you@example.com">
    </div>
    <div class="form-field">
      <label>Password</label>
      <input type="password" id="signup-password" placeholder="Choose a password">
    </div>
    <div style="margin-bottom:16px;">
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:12px;color:var(--text-muted);line-height:1.5;">
        <input type="checkbox" id="signup-consent" style="margin-top:3px;flex-shrink:0;">
        I accept that my information will be used to create an account and send me educational content. I can unsubscribe at any time.
      </label>
    </div>
    <button class="form-btn" onclick="handleSignup()">Create Free Account</button>
    <div class="modal-switch">
      Already have an account? <a onclick="Modal.hide('signup-modal');Modal.show('login-modal')">Log in</a>
    </div>
    <p id="signup-msg" style="font-size:13px;color:#e74c3c;margin-top:12px;display:none;"></p>
  </div>
</div>`;
}

// ── SHARED TICKER HTML ──
function renderTicker() {
  const items = ['ETF Investing','Compound Interest','MSCI World','Depot Under 18','Budget Tracking','Sparplan','Financial Independence','Index Funds','Diversification','Long-Term Wealth'];
  const doubled = [...items, ...items];
  return `
<div class="ticker">
  <div class="ticker-track">
    ${doubled.map(i => `<span class="ticker-item">${i}</span><span class="ticker-sep">◆</span>`).join('')}
  </div>
</div>`;
}

// ── SHARED FOOTER HTML ──
function renderFooter() {
  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo">
          <div class="nav-logo-mark">📈</div>
          Fin<span>Start</span>
        </a>
        <p>Free financial education for young people in Germany. Built by a 16-year-old student who noticed the gap and decided to fill it.</p>
      </div>
      <div class="footer-col">
        <h5>Learn</h5>
        <ul>
          <li><a href="articles.html">All Articles</a></li>
          <li><a href="learn.html#foundations">Foundations</a></li>
          <li><a href="learn.html#markets">Market Literacy</a></li>
          <li><a href="learn.html#analysis">Company Analysis</a></li>
          <li><a href="learn.html#mindset">Mindset</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Tools</h5>
        <ul>
          <li><a href="quiz.html">Investor Profile Quiz</a></li>
          <li><a href="index.html#calculator">Calculator</a></li>
          <li><a href="products.html">Digital Products</a></li>
          <li><a href="premium.html">Premium</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>FinStart</h5>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="${CONFIG.YOUTUBE_CHANNEL}" target="_blank">YouTube Channel</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
          <li><a href="mailto:hello@finstart.de">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-disclaimer">
        <strong>Disclaimer:</strong> All content on FinStart is for educational and informational purposes only and does not constitute financial advice. FinStart is not a licensed financial advisor or investment service. Nothing on this platform should be construed as a recommendation to buy, sell, or hold any financial instrument. Always conduct your own research and consult a qualified financial professional before making investment decisions. Past performance of any investment does not guarantee future results.
      </p>
      <p class="footer-copy">© 2025 FinStart. All rights reserved.</p>
    </div>
  </div>
</footer>`;
}

// ── AUTH HANDLERS ──
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const pass  = document.getElementById('login-password').value;
  const msg   = document.getElementById('login-msg');

  if (!email || !pass) {
    msg.textContent = 'Please fill in all fields.';
    msg.style.display = 'block';
    return;
  }

  // Simulate login — connect to real backend here
  Auth.login(email, email.split('@')[0]);
  Modal.hideAll();
  showToast('Welcome back! 👋');
}

function handleSignup() {
  const name    = document.getElementById('signup-name').value;
  const email   = document.getElementById('signup-email').value;
  const pass    = document.getElementById('signup-password').value;
  const consent = document.getElementById('signup-consent').checked;
  const msg     = document.getElementById('signup-msg');

  if (!name || !email || !pass) {
    msg.textContent = 'Please fill in all fields.';
    msg.style.display = 'block'; return;
  }
  if (!consent) {
    msg.textContent = 'Please accept the terms to continue.';
    msg.style.display = 'block'; return;
  }

  Auth.login(email, name);
  Modal.hideAll();
  showToast('Welcome to FinStart! 🎉 Your free account is ready.');

  // Connect Mailchimp here
  // fetch(CONFIG.MAILCHIMP_URL, { method: 'POST', body: JSON.stringify({ email, name }) })
}

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(80px);
      background:var(--navy); color:white; padding:14px 24px; border-radius:50px;
      font-size:14px; font-weight:500; z-index:3000; transition:transform 0.3s;
      border:1px solid rgba(184,135,58,0.3); white-space:nowrap;
      box-shadow: 0 8px 24px rgba(12,30,53,0.3);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; }, 50);
  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(80px)'; }, 3500);
}

// ── CALCULATOR ENGINE ──
function calcResult(start, monthly, ratePercent, years) {
  const r = ratePercent / 100;
  const lump = start * Math.pow(1 + r, years);
  const contrib = r === 0
    ? monthly * 12 * years
    : monthly * 12 * ((Math.pow(1 + r, years) - 1) / r);
  const total    = lump + contrib;
  const invested = start + monthly * 12 * years;
  const interest = Math.max(0, total - invested);
  return { total, invested, interest };
}

function fmtEur(n) {
  return '€' + Math.round(n).toLocaleString('de-DE');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
  initReveal();
  initNavScroll();
});
