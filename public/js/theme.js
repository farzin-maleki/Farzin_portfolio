// Apply the saved preference before the page paints.
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') preference = saved;
  } catch { /* The theme still works when browser storage is unavailable. */ }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const button = document.getElementById('themeToggle');
    if (!button) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} mode`);
    button.title = `Switch to ${next} mode`;
    button.querySelector('i').className = `fa-solid fa-${next === 'light' ? 'sun' : 'moon'}`;
    button.querySelector('span').textContent = `${next === 'light' ? 'Light' : 'Dark'} mode`;
  }

  const preferredTheme = () => preference || (systemTheme.matches ? 'dark' : 'light');
  applyTheme(preferredTheme());
  systemTheme.addEventListener('change', () => {
    if (!preference) applyTheme(preferredTheme());
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== 'theme' && event.key !== null) return;
    preference = ['dark', 'light'].includes(event.newValue) ? event.newValue : null;
    applyTheme(preferredTheme());
  });
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(preferredTheme());
    document.getElementById('themeToggle')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(preference);
      try { localStorage.setItem('theme', preference); } catch { /* Optional persistence. */ }
    });
  });
})();
