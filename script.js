document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. CONTROLE DO MODAL DE DISCIPLINAS (INDEX.HTML E PÁGINAS COM MODAL)
  // ==========================================================================
  const modal = document.getElementById('modalDisciplinas');
  const btnFecharModal = document.getElementById('btnFecharModal');
  const btnHeroComecar = document.getElementById('btnHeroComecar');
  const btnNavPraticar = document.getElementById('btnNavPraticar');
  const opcaoBtns = document.querySelectorAll('.opcao-btn');
  let elementoFocadoAntesDoModal = null;

  function abrirModal() {
    if (!modal) return;
    elementoFocadoAntesDoModal = document.activeElement;
    modal.classList.add('ativo');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (btnFecharModal) btnFecharModal.focus();
  }

  function fecharModal() {
    if (!modal) return;
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (elementoFocadoAntesDoModal) elementoFocadoAntesDoModal.focus();
  }

  if (btnHeroComecar) {
    btnHeroComecar.addEventListener('click', abrirModal);
  }

  if (btnNavPraticar) {
    btnNavPraticar.addEventListener('click', (e) => {
      e.preventDefault();
      fecharMenuMobile(); // Garante que o menu mobile feche ao abrir o modal
      abrirModal();
    });
  }

  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', fecharModal);
  }

  opcaoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fecharModal();
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      fecharModal();
    }
  });

  // ==========================================================================
  // 2. CONTROLE DO MENU HAMBÚRGUER MOBILE (TODAS AS PÁGINAS)
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  function alternarMenuMobile() {
    if (!menuToggle) return;
    const isOpen = menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    if (navMenu) navMenu.classList.toggle('active', isOpen);
    if (navOverlay) navOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function fecharMenuMobile() {
    if (menuToggle) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (navMenu) navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', alternarMenuMobile);
  if (navOverlay) navOverlay.addEventListener('click', fecharMenuMobile);

  navLinks.forEach(link => {
    if (link.id !== 'btnNavPraticar') {
      link.addEventListener('click', fecharMenuMobile);
    }
  });

  // ==========================================================================
  // 3. ACESSIBILIDADE GLOBAL (TECLA ESCAPE E FOCUS TRAP NO MODAL)
  // ==========================================================================
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      fecharModal();
      fecharMenuMobile();
    }

    // Focus Trap dentro do Modal quando ativo
    if (event.key === 'Tab' && modal && modal.classList.contains('ativo')) {
      const elementosFocaveis = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (elementosFocaveis.length === 0) return;

      const primeiroElem = elementosFocaveis[0];
      const ultimoElem = elementosFocaveis[elementosFocaveis.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === primeiroElem) {
          ultimoElem.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === ultimoElem) {
          primeiroElem.focus();
          event.preventDefault();
        }
      }
    }
  });

  // ==========================================================================
  // 4. DESTAQUE AUTOMÁTICO DO LINK ATIVO NA NAVBAR
  // ==========================================================================
  const paginaAtual = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === paginaAtual) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ==========================================================================
  // 5. CONTROLE EXCLUSIVO DE ACORDEÕES (FECHA OS OUTROS AO ABRIR UM NOVO)
  // ==========================================================================
  const acordeoes = document.querySelectorAll('details.accordion-item');
  acordeoes.forEach((acordeaoAtual) => {
    acordeaoAtual.addEventListener('toggle', () => {
      if (acordeaoAtual.open) {
        acordeoes.forEach((outroAcordeao) => {
          if (outroAcordeao !== acordeaoAtual && outroAcordeao.open) {
            outroAcordeao.removeAttribute('open');
          }
        });
      }
    });
  });

  // ==========================================================================
  // 6. SIMULADOR DE REDAÇÃO (EXECUTADO APENAS NA PÁGINA REDAÇÃO.HTML)
  // ==========================================================================
  const textarea = document.getElementById('textoRedacao');
  if (!textarea) return;

  const btnIniciar = document.getElementById('btnIniciarTempo');
  const cronometroEl = document.getElementById('cronometro');
  const inputTitulo = document.getElementById('tituloRedacao');
  const contadorLinhasEl = document.getElementById('contadorLinhas');
  const contadorPalavrasEl = document.getElementById('contadorPalavras');
  const alertaEl = document.getElementById('alertaLinhas');
  const btnSalvar = document.getElementById('btnSalvarRedacao');
  const btnImprimir = document.getElementById('btnImprimirFolha');
  const btnLimpar = document.getElementById('btnLimparCampos');
  const btnLimparTudo = document.getElementById('btnLimparTudo');
  const listaHistoricoEl = document.getElementById('listaHistorico');

  const btnSortearTema = document.getElementById('btnSortearTema');
  const temaTituloEl = document.getElementById('temaTitulo');
  const temaMotivadorEl = document.getElementById('temaMotivador');
  const temaComandoEl = document.getElementById('temaComando');

  let tempoTotal = 80 * 60; // 1h 20min
  let intervalo = null;
  let emExecucao = false;
  const CHAVE_STORAGE = 'redacoes_ifrn_salvas';

  // Banco de Temas Estilo Banca IFRN
  const temasIFRN = [
    {
      titulo: 'Os impactos da inteligência artificial na formação crítica dos jovens brasileiros',
      motivador: 'Texto de Apoio: O uso crescente de ferramentas generativas nas escolas facilita o acesso à informação, mas levanta debates sobre plágio, dependência tecnológica e perda da autonomia intelectual.',
      comando: 'Comando: Redija um Artigo de Opinião (20 a 30 linhas) defendendo seu ponto de vista. Dê um título e assine exclusivamente como: Um Estudante Consciente.'
    },
    {
      titulo: 'A crise climática e a responsabilidade cidadã na preservação dos biomas potiguares',
      motivador: 'Texto de Apoio: O avanço da desertificação no semiárido nordestino e o descarte irregular de resíduos urbanos ameaçam a biodiversidade da Caatinga e a qualidade de vida das futuras gerações.',
      comando: 'Comando: Escreva um Artigo de Opinião (20 a 30 linhas) posicionando-se sobre o papel do Estado e da sociedade. Assine apenas como: Um Cidadão Atento.'
    },
    {
      titulo: 'Desafios da inclusão digital e o combate à desinformação no Brasil contemporâneo',
      motivador: 'Texto de Apoio: Embora o acesso à internet tenha crescido, milhões de brasileiros ainda carecem de letramento digital para identificar notícias falsas e discursos de ódio nas redes sociais.',
      comando: 'Comando: Produza um Artigo de Opinião (20 a 30 linhas) com título obrigatório. Ao final, assine estritamente como: Um Leitor Crítico.'
    },
    {
      titulo: 'A importância da valorização da educação pública e tecnológica para o desenvolvimento social',
      motivador: 'Texto de Apoio: Institutos Federais transformam realidades locais ao integrar ensino médio, técnico e pesquisa científica, promovendo mobilidade social e cidadania.',
      comando: 'Comando: Elabore um Artigo de Opinião (20 a 30 linhas) defendendo sua tese. Inclua título e assine apenas como: Um Jovem Brasileiro.'
    },
    {
      titulo: 'Cultura do cancelamento e os limites da liberdade de expressão no ambiente virtual',
      motivador: 'Texto de Apoio: O julgamento sumário nas redes sociais tem substituído o diálogo democrático por linchamentos virtuais, afetando a saúde mental e a convivência social.',
      comando: 'Comando: Escreva um Artigo de Opinião (20 a 30 linhas) sobre o tema. Crie um título criativo e assine como: Um Observador Social.'
    }
  ];

  if (btnSortearTema) {
    btnSortearTema.addEventListener('click', () => {
      const sorteado = temasIFRN[Math.floor(Math.random() * temasIFRN.length)];
      temaTituloEl.textContent = sorteado.titulo;
      temaMotivadorEl.textContent = sorteado.motivador;
      temaComandoEl.textContent = sorteado.comando;
    });
  }

  // Bloqueio Anti-Colagem
  function bloquearAcao(e) {
    e.preventDefault();
    e.stopPropagation();
    alert('O recurso de colar/arrastar texto foi desativado para simular as condições reais da prova.');
    return false;
  }

  ['paste', 'drop', 'contextmenu'].forEach(evento => {
    textarea.addEventListener(evento, bloquearAcao);
    if (inputTitulo) inputTitulo.addEventListener(evento, bloquearAcao);
  });

  textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) {
      bloquearAcao(e);
    }
  });

  // Cronômetro
  function formatarTempo(segundos) {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function atualizarCronometro() {
    if (tempoTotal <= 0) {
      clearInterval(intervalo);
      cronometroEl.textContent = '00:00:00';
      textarea.disabled = true;
      if (inputTitulo) inputTitulo.disabled = true;
      alertaEl.className = 'alerta-status erro';
      alertaEl.innerHTML = '<strong>Tempo esgotado!</strong> O tempo limite de 1h20min foi atingido.';
      btnIniciar.disabled = true;
      btnIniciar.textContent = 'Tempo Esgotado';
      btnIniciar.classList.remove('ativo');
      emExecucao = false;
      return;
    }
    tempoTotal--;
    cronometroEl.textContent = formatarTempo(tempoTotal);
  }

  if (btnIniciar) {
    btnIniciar.addEventListener('click', () => {
      if (!emExecucao) {
        intervalo = setInterval(atualizarCronometro, 1000);
        emExecucao = true;
        if (inputTitulo) {
          inputTitulo.disabled = false;
          inputTitulo.focus();
        }
        textarea.disabled = false;
        btnIniciar.textContent = 'Pausar Tempo';
        btnIniciar.classList.add('ativo');
      } else {
        clearInterval(intervalo);
        emExecucao = false;
        if (inputTitulo) inputTitulo.disabled = true;
        textarea.disabled = true;
        btnIniciar.textContent = 'Continuar Tempo';
        btnIniciar.classList.remove('ativo');
      }
    });
  }

  // Contadores e Quebra de Linhas
  function quebrarEmLinhas(titulo, texto) {
    const linhas = [];
    if (titulo && titulo.trim() !== '') {
      linhas.push({ texto: titulo.trim(), isTitulo: true });
    }
    const paragrafos = texto.split('\n');
    paragrafos.forEach(p => {
      if (p.length === 0) {
        linhas.push({ texto: '', isTitulo: false });
      } else {
        for (let i = 0; i < p.length; i += 65) {
          linhas.push({ texto: p.substring(i, i + 65), isTitulo: false });
        }
      }
    });
    return linhas;
  }

  function atualizarContadores() {
    const texto = textarea.value;
    const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
    contadorPalavrasEl.textContent = palavras;

    const linhasCalculadas = texto.length === 0 ? [] : quebrarEmLinhas('', texto);
    const totalLinhas = linhasCalculadas.length;
    contadorLinhasEl.textContent = `${totalLinhas} / 30`;

    if (totalLinhas === 0) {
      alertaEl.className = 'alerta-status info';
      alertaEl.innerHTML = 'Digite seu texto. O ideal para o IFRN é manter-se entre <strong>20 e 30 linhas</strong>.';
    } else if (totalLinhas < 20) {
      alertaEl.className = 'alerta-status alerta';
      alertaEl.innerHTML = `Sua redação está com aproximadamente <strong>${totalLinhas} linhas</strong>. O mínimo recomendado é de 20 linhas.`;
    } else if (totalLinhas <= 30) {
      alertaEl.className = 'alerta-status sucesso';
      alertaEl.innerHTML = `Excelente! Seu texto tem aproximadamente <strong>${totalLinhas} linhas</strong>, dentro do limite exigido (20 a 30 linhas).`;
    } else {
      alertaEl.className = 'alerta-status erro';
      alertaEl.innerHTML = `Atenção: Seu texto ultrapassou a estimativa de 30 linhas (atualmente <strong>${totalLinhas} linhas</strong>).`;
    }
  }

  textarea.addEventListener('input', atualizarContadores);

  // Impressão / PDF em Folha Pautada
  if (btnImprimir) {
    btnImprimir.addEventListener('click', () => {
      const titulo = inputTitulo ? inputTitulo.value.trim() : '';
      const texto = textarea.value.trim();

      if (!texto) {
        alert('Escreva sua redação antes de gerar a folha pautada.');
        return;
      }

      const printTemaEl = document.getElementById('printTema');
      if (printTemaEl && temaTituloEl) {
        printTemaEl.textContent = 'Tema: ' + temaTituloEl.textContent;
      }

      const container = document.getElementById('linhasPautadasContainer');
      const linhasTexto = quebrarEmLinhas(titulo, textarea.value);
      const totalPautas = Math.max(30, linhasTexto.length);

      let htmlLinhas = '';
      for (let i = 0; i < totalPautas; i++) {
        const num = String(i + 1).padStart(2, '0');
        const item = linhasTexto[i];
        const conteudo = item ? escapeHtml(item.texto) : '';
        const classeTitulo = item && item.isTitulo ? 'titulo-print' : '';
        htmlLinhas += `
          <div class="linha-pautada">
            <span class="numero-linha">${num}</span>
            <span class="conteudo-linha ${classeTitulo}">${conteudo}</span>
          </div>
        `;
      }

      container.innerHTML = htmlLinhas;
      window.print();
    });
  }

  // Persistência em LocalStorage
  function buscarRedacoes() {
    return JSON.parse(localStorage.getItem(CHAVE_STORAGE) || '[]');
  }

  function renderizarHistorico() {
    if (!listaHistoricoEl) return;
    const redacoes = buscarRedacoes();
    if (redacoes.length === 0) {
      listaHistoricoEl.innerHTML = `<p style="color: var(--text-dim); text-align: center; font-size: 0.95rem; padding: 20px 0;">Nenhuma redação salva no seu navegador até o momento.</p>`;
      return;
    }

    listaHistoricoEl.innerHTML = redacoes.map((item, index) => `
      <div class="card-redacao-salva">
        <div class="card-top">
          <span class="card-titulo">${escapeHtml(item.titulo)}</span>
          <span class="card-data">Data: ${item.data} às ${item.hora}</span>
        </div>
        <div class="card-texto">${escapeHtml(item.texto)}</div>
        <div class="card-detalhes">
          <span>Linhas: <strong>${item.linhas}</strong> | Palavras: <strong>${item.palavras}</strong></span>
          <div style="display: flex; gap: 8px;">
            <button class="btn-acao btn-salvar" style="padding: 6px 12px; font-size: 0.8rem;" onclick="carregarRedacao(${index})">Editar</button>
            <button class="btn-excluir-item" onclick="excluirRedacao(${index})">Excluir</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
      const texto = textarea.value.trim();
      const titulo = (inputTitulo && inputTitulo.value.trim()) || 'Sem Título';

      if (!texto) {
        alert('Sua redação está vazia! Digite algum conteúdo antes de salvar.');
        return;
      }

      const agora = new Date();
      const novaRedacao = {
        titulo: titulo,
        texto: texto,
        linhas: contadorLinhasEl.textContent,
        palavras: contadorPalavrasEl.textContent,
        data: agora.toLocaleDateString('pt-BR'),
        hora: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      const historico = buscarRedacoes();
      historico.unshift(novaRedacao);
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(historico));

      alert('Redação salva no histórico do navegador com sucesso!');
      renderizarHistorico();
    });
  }

  window.carregarRedacao = function (index) {
    const historico = buscarRedacoes();
    const item = historico[index];
    if (confirm(`Deseja carregar "${item.titulo}" no editor? O texto atual será substituído.`)) {
      if (inputTitulo) {
        inputTitulo.disabled = false;
        inputTitulo.value = item.titulo === 'Sem Título' ? '' : item.titulo;
      }
      textarea.disabled = false;
      textarea.value = item.texto;
      atualizarContadores();
      textarea.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      if (confirm('Deseja mesmo limpar a área de texto? O texto não salvo será perdido.')) {
        textarea.value = '';
        if (inputTitulo) inputTitulo.value = '';
        atualizarContadores();
      }
    });
  }

  if (btnLimparTudo) {
    btnLimparTudo.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja apagar TODO o seu histórico de redações salvas?')) {
        localStorage.removeItem(CHAVE_STORAGE);
        renderizarHistorico();
      }
    });
  }

  window.excluirRedacao = function (index) {
    if (confirm('Deseja remover esta redação do histórico?')) {
      const historico = buscarRedacoes();
      historico.splice(index, 1);
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(historico));
      renderizarHistorico();
    }
  };

  function escapeHtml(texto) {
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderizarHistorico();
});