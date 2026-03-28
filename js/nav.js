/* ═══════════════════════════════════════════
   TR4NSFORM — SHARED NAVIGATION & WALLET
   ═══════════════════════════════════════════ */

// Navigation configurations per portal
const NAV_CONFIG = {
  b2c: [
    { label: 'Protocols', href: '/protocols.html' },
    { label: 'Builder', href: '/builder.html' },
    { label: 'Dashboard', href: '/dashboard.html' },
    { label: 'Consultation', href: '/consultation.html' },
    { label: 'Tracking', href: '/tracking.html' },
    { label: 'Membership', href: '/membership.html' },
    { label: 'Retreat', href: '/retreat.html' },
  ],
  partner: [
    { label: 'Dashboard', href: '/partner/dashboard.html' },
    { label: 'Stock', href: '/partner/stock.html' },
    { label: 'Orders', href: '/partner/orders.html' },
    { label: 'Reports', href: '/partner/reports.html' },
  ],
  admin: [
    { label: 'Clinical', href: '/admin/clinical.html' },
    { label: 'Prescriptions', href: '/admin/prescriptions.html' },
    { label: 'CRM', href: '/admin/crm.html' },
    { label: 'Finance', href: '/admin/finance.html' },
    { label: 'Inventory', href: '/admin/inventory.html' },
  ]
};

/**
 * Initialize navigation for a page
 * @param {string} portal - 'b2c', 'partner', or 'admin'
 */
function initNav(portal = 'b2c') {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  // Build nav links
  const nav = topbar.querySelector('.main-nav');
  if (nav) {
    const links = NAV_CONFIG[portal] || NAV_CONFIG.b2c;
    const currentPath = window.location.pathname;

    nav.innerHTML = links.map(link => {
      const isActive = currentPath.endsWith(link.href) ||
                       (link.href === '/protocols.html' && currentPath === '/') ||
                       (link.href === '/protocols.html' && currentPath.endsWith('/index.html'));
      return `<a class="nav-link${isActive ? ' active' : ''}" href="${link.href}">${link.label}</a>`;
    }).join('');
  }

  // Mobile toggle
  const toggle = topbar.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Wallet button
  const walletBtn = topbar.querySelector('.wallet-btn');
  if (walletBtn) {
    walletBtn.addEventListener('click', () => {
      const modal = document.getElementById('walletModal');
      if (modal) modal.classList.add('visible');
    });
  }
}

/** Close wallet modal */
function closeWalletModal() {
  const modal = document.getElementById('walletModal');
  if (modal) modal.classList.remove('visible');
}

/** Simulate wallet connection */
function connectWallet(type) {
  const walletBtn = document.querySelector('.wallet-btn');
  if (walletBtn) {
    walletBtn.classList.add('connected');
    walletBtn.innerHTML = `<span class="dot"></span>0x7a3B...f291`;
  }
  closeWalletModal();
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const portal = document.body.dataset.portal || 'b2c';
  initNav(portal);
});
