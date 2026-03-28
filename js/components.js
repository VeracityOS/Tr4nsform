/* ═══════════════════════════════════════════
   TR4NSFORM — SHARED INTERACTIVE COMPONENTS
   ═══════════════════════════════════════════ */

/** Toggle chip selection */
function toggleChip(el) {
  el.classList.toggle('selected');
}

/** Toggle consent checkbox */
function toggleConsent(el) {
  el.classList.toggle('accepted');
  const check = el.querySelector('.consent-check');
  if (check) check.textContent = el.classList.contains('accepted') ? '✓' : '';
}

/** Select payment method */
function selectPay(el) {
  document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

/** Tab switching */
function switchTab(tabEl, groupId) {
  const group = tabEl.closest('.tab-bar');
  if (group) {
    group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');
  }
  // Show corresponding panel
  const targetId = tabEl.dataset.tab;
  if (targetId) {
    const container = document.getElementById(groupId || 'tabContent');
    if (container) {
      container.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
      const target = container.querySelector(`[data-panel="${targetId}"]`);
      if (target) target.style.display = 'block';
    }
  }
}

/** Generate a fake reference number */
function generateRef(prefix = 'TR4') {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  return `${prefix}-${year}-${num}`;
}

/** Format currency */
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/** Truncate wallet address */
function truncateAddress(addr) {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

/** Animate a progress bar fill */
function animateProgress(el, targetPercent, duration = 1500) {
  let start = null;
  const initial = parseFloat(el.style.width) || 0;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const current = initial + (targetPercent - initial) * progress;
    el.style.width = `${current}%`;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/** Simple toast notification */
function showToast(message, type = 'bio') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 80px; right: 24px;
    padding: 14px 24px;
    background: var(--void-raised);
    border: 1px solid var(--${type});
    border-radius: var(--r);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    z-index: 300;
    animation: fadeUp 0.3s ease;
    box-shadow: 0 0 30px rgba(0,0,0,0.3);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
