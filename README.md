# FinStart Website — Setup Guide

## Files Included
```
finstart/
├── index.html          ← Homepage (hero, calculator, articles preview, YouTube section)
├── learn.html          ← Full educational modules A–D + vocabulary
├── articles.html       ← Articles index
├── quiz.html           ← Investor profile quiz (8 questions + result)
├── products.html       ← All 6 products + broker affiliates
├── premium.html        ← Premium page + Stripe checkout
├── about.html          ← About / founder story
├── privacy.html        ← GDPR-compliant privacy policy
├── terms.html          ← Terms of service
├── css/main.css        ← All styles
├── js/main.js          ← All JavaScript (auth, calculator, modals)
└── articles/
    ├── etf-guide.html
    ├── compound-interest.html
    ├── depot-under-18.html
    ├── msci-world.html
    └── saving-vs-investing.html
```

---

## STEP 1 — Your 5-Minute Setup

Open `js/main.js` and update the CONFIG block at the top:

```javascript
const CONFIG = {
  STRIPE_KEY:      'pk_live_YOUR_STRIPE_KEY_HERE',         // ← Your Stripe publishable key
  MAILCHIMP_URL:   'https://YOUR_MAILCHIMP_URL_HERE',      // ← Your Mailchimp signup URL
  YOUTUBE_CHANNEL: 'https://www.youtube.com/@YourChannel', // ← Your YouTube channel URL
  GUMROAD_BASE:    'https://yourhandle.gumroad.com',        // ← Your Gumroad base URL
  PRODUCTS: {
    calculator: 'https://yourhandle.gumroad.com/l/XXXX',  // ← Compound Interest Calculator link
    budget:     'https://yourhandle.gumroad.com/l/XXXX',  // ← Budget Tracker link
    etf:        'https://yourhandle.gumroad.com/l/XXXX',  // ← ETF Comparison Sheet link
    bundle:     'https://yourhandle.gumroad.com/l/XXXX',  // ← Starter Kit Bundle link
    abitur:     'https://yourhandle.gumroad.com/l/XXXX',  // ← Abitur Study Kit link
    report:     'https://yourhandle.gumroad.com/l/XXXX',  // ← Monthly Report link
  }
};
```

Also update in `premium.html` (search for "YOUR_STRIPE_PAYMENT_LINK"):
```javascript
window.open('https://buy.stripe.com/YOUR_STRIPE_PAYMENT_LINK', '_blank');
```

Also update YouTube link in `index.html` (search for "YOUR_YOUTUBE_CHANNEL_LINK"):
```html
href="YOUR_YOUTUBE_CHANNEL_LINK"
```


## What You Do NOT Need to Change

Everything else is already complete:
- ✅ All 5 articles written in full
- ✅ All educational modules (A–D, 24 topics)
- ✅ Complete investor profile quiz with profile generation
- ✅ Working investment calculator with sliders
- ✅ All 6 product pages
- ✅ Premium page with news preview
- ✅ About page with your story
- ✅ Privacy policy (GDPR-compliant, with minor data controller note)
- ✅ Terms of service (with educational disclaimer throughout)
- ✅ Email login/signup modals (connects to Mailchimp)
- ✅ Full navigation, ticker, footer
- ✅ Mobile responsive
- ✅ Scroll animations throughout

---

## Future Updates

**Add more articles:** Copy any article file (e.g. `articles/etf-guide.html`), change the content, and link it from `articles.html`.

**Add YouTube videos:** Update the YouTube section in `index.html` to embed your actual latest video using an iframe.

**Go live backend:** The current auth stores sessions in localStorage — fine for MVP. When you want a real database, consider Supabase (free tier) with a simple Node.js backend on Render.

**Branding:** All colours are CSS variables in `css/main.css` — change `--navy`, `--gold`, `--gold-bright` to rebrand instantly.
