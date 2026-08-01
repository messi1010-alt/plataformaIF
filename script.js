document.addEventListener('DOMContentLoaded', () => {
  // 1. Mapeamento dos Elementos
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  // Garante que o menu existe na página antes de prosseguir
  if (!menuToggle || !navMenu) return;

  // 2. Funções de Controle do Menu
  function toggleMenu() {
    const isOpen = navMenu.classList.contains('active');
    
    if (isOpen) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  }

  function abrirMenu() {
    menuToggle.classList.add('active');
    navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');

    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Evita rolagem no fundo
  }

  function fecharMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');

    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restaura a rolagem normal
  }

  // 3. Atribuição de Eventos
  menuToggle.addEventListener('click', toggleMenu);

  if (navOverlay) {
    navOverlay.addEventListener('click', fecharMenu);
  }

  // Delegação de Eventos: Fecha o menu se qualquer link interno for clicado
  navMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav-link')) {
      fecharMenu();
    }
  });

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      fecharMenu();
    }
  });
});
