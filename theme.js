// theme.js — يضيف زر التبديل ويخزن وضع المستخدم في localStorage
(function(){
  function applyTheme(theme){
    if(theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
  }

  function getPreferred(){
    const saved = localStorage.getItem('theme');
    if(saved) return saved;
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return mq ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function(){
    const current = getPreferred();
    applyTheme(current);

    // زر يُضاف أو يُستخدم إن وُجد
    let btn = document.getElementById('themeToggle');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'themeToggle';
      btn.className = 'theme-toggle-btn';
      document.body.appendChild(btn);
    }

    function updateButtonLabel(){
      const theme = document.documentElement.getAttribute('data-theme');
      if(theme === 'dark') btn.textContent = '☀️ الوضع الفاتح';
      else btn.textContent = '🌙 الوضع الداكن';
    }

    btn.addEventListener('click', function(){
      const theme = document.documentElement.getAttribute('data-theme');
      const next = theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
      updateButtonLabel();
    });

    updateButtonLabel();
  });
})();
