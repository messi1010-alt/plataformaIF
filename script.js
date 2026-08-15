document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MENU HAMBÚRGUER E NAVEGAÇÃO
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (menuToggle && navMenu) {
    function toggleMenu() {
      const isOpen = navMenu.classList.contains('active');
      isOpen ? fecharMenu() : abrirMenu();
    }

    function abrirMenu() {
      menuToggle.classList.add('active');
      navMenu.classList.add('active');
      if (navOverlay) navOverlay.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function fecharMenu() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      if (navOverlay) navOverlay.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', fecharMenu);

    navMenu.addEventListener('click', (event) => {
      if (event.target.classList.contains('nav-link')) {
        fecharMenu();
      }
    });
  }

  // ==========================================
  // 2. LÓGICA DA TELA INICIAL (quiz.html)
  // ==========================================
  const formIdentificacao = document.getElementById("form-identificacao");
  const btnIrParaQuestoes = document.getElementById("btn-ir-para-questoes");

  function processarInicio(e) {
    if (e) e.preventDefault();
    
    const inputNome = document.getElementById("nome-aluno");
    let nome = inputNome ? inputNome.value.trim() : "";
    if (!nome) {
      nome = localStorage.getItem("nomeUsuario") || "";
    }

    if (!nome) {
      alert("Por favor, digite seu nome para iniciar!");
      if (inputNome) inputNome.focus();
      return;
    }

    localStorage.setItem("nomeUsuario", nome);

    const telaInicial = document.getElementById("tela-inicial");
    const telaTexto = document.getElementById("tela-texto");

    if (telaInicial) telaInicial.style.display = "none";
    if (telaTexto) telaTexto.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (formIdentificacao) {
    formIdentificacao.addEventListener("submit", processarInicio);
  }

  if (btnIrParaQuestoes) {
    btnIrParaQuestoes.addEventListener("click", () => {
      const telaTexto = document.getElementById("tela-texto");
      const telaQuiz = document.getElementById("tela-quiz");

      if (telaTexto) telaTexto.style.display = "none";
      if (telaQuiz) telaQuiz.style.display = "block";

      window.scrollTo({ top: 0, behavior: 'smooth' });
      carregarQuestao(0);
    });
  }

  // ==========================================
  // 3. QUIZ SURPRESA (BANCO DE QUESTÕES FOCADO NA COP30)
  // ==========================================
  const bancoQuestoes = [
    {
      materia: "Português",
      enunciado: "No trecho <span class='destaque-sublinhado'>\"A 30ª Conferência das Nações Unidas [...] constitui o ápice das negociações multilaterais\"</span>, o termo sublinhado possui a mesma significação de:",
      svg: null,
      opcoes: [
        "Ponto culminante / Declínio",
        "Ponto mais elevado / Vértice",
        "Início formal / Prelúdio",
        "Fase transitória / Impasse"
      ],
      correta: 1,
      explicacao: "'Ápice' refere-se ao topo, cume ou ponto mais elevado em uma escala ou processo."
    },
    {
      materia: "Matemática",
      enunciado: "Segundo o texto-base, projeta-se a presença de <strong class='enunciado-destaque'>40.000 participantes</strong> na COP30, sendo <strong class='enunciado-destaque'>7.000</strong> integrantes de comitivas diplomáticas e técnicos. Qual é a porcentagem correspondente ao público geral (não diplomático)?",
      svg: `<svg viewBox="0 0 400 100" style="width:100%; height:100px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="100" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <text x="20" y="30" fill="#10b981" font-weight="700" font-size="13">Divisão do Público da COP30</text>
              <text x="20" y="60" fill="#ffffff" font-size="12">• Total: 40.000 | Diplomáticos: 7.000</text>
              <text x="20" y="80" fill="#f59e0b" font-size="12">• Público geral: 33.000</text>
            </svg>`,
      opcoes: [
        "82,5%",
        "85,0%",
        "87,5%",
        "90,0%"
      ],
      correta: 0,
      explicacao: "Público geral = 40.000 - 7.000 = 33.000. Porcentagem = (33.000 / 40.000) * 100 = 82,5%."
    },
    {
      materia: "Português",
      enunciado: "Em <span class='destaque-sublinhado'>\"O evento exige do Brasil a demonstração prática de compromissos...\"</span>, a regência do verbo <strong class='enunciado-destaque'>\"exigir\"</strong> classifica-o sintaticamente como:",
      svg: null,
      opcoes: [
        "Verbo Intransitivo.",
        "Verbo Transitivo Direto.",
        "Verbo Transitivo Indireto.",
        "Verbo Transitivo Direto e Indireto."
      ],
      correta: 3,
      explicacao: "Quem exige, exige algo ('a demonstração...') de alguém ('do Brasil'). Trata-se de um verbo bitransitivo (VTD-I)."
    },
    {
      materia: "Matemática",
      enunciado: "O investimento total de R$ 7,3 bilhões contempla 38 intervenções urbanas. Se R$ 980 milhões foram destinados exclusivamente ao Parque da Cidade, qual o montante reservado para as demais 37 obras?",
      svg: null,
      opcoes: [
        "R$ 6,32 bilhões",
        "R$ 6,42 bilhões",
        "R$ 6,50 bilhões",
        "R$ 6,68 bilhões"
      ],
      correta: 0,
      explicacao: "R$ 7,3 bilhões = R$ 7.300 milhões. Subtraindo R$ 980 milhões do Parque da Cidade: 7.300 - 980 = R$ 6.320 milhões = R$ 6,32 bilhões."
    },
    {
      materia: "Português",
      enunciado: "Observe o trecho: <span class='destaque-sublinhado'>\"A Zona Azul — espaço restrito às deliberações soberanas [...] — e a Zona Verde...\"</span>. Os travessões foram empregados para:",
      svg: null,
      opcoes: [
        "Isolar uma fala direta de personagem diplomático.",
        "Delimitar um aposto explicativo sobre a Zona Azul.",
        "Indicar a mudança de interlocutor em um debate.",
        "Substituir vírgulas que isolam uma oração adjetiva restritiva."
      ],
      correta: 1,
      explicacao: "Os travessões destacam a definição/explicação do termo 'Zona Azul', funcionando como um aposto explicativo."
    },
    {
      materia: "Matemática",
      enunciado: "Para acomodar comitivas da COP30, construiu-se uma estrutura retangular temporária de <strong class='enunciado-destaque'>120 metros de comprimento por 50 metros de largura</strong>. Qual é o perímetro total e a área dessa estrutura, respectivamente?",
      svg: `<svg viewBox="0 0 400 110" style="width:100%; height:110px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="110" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <rect x="100" y="25" width="200" height="60" fill="none" stroke="#10b981" stroke-width="2"/>
              <text x="200" y="20" fill="#ffffff" font-size="11" text-anchor="middle">Comprimento: 120 m</text>
              <text x="310" y="60" fill="#ffffff" font-size="11">Largura: 50 m</text>
            </svg>`,
      opcoes: [
        "340 m e 6.000 m²",
        "340 m e 3.000 m²",
        "170 m e 6.000 m²",
        "240 m e 3.500 m²"
      ],
      correta: 0,
      explicacao: "Perímetro = 2*(120 + 50) = 2*170 = 340 metros. Área = 120 * 50 = 6.000 m²."
    },
    {
      materia: "Português",
      enunciado: "No trecho <span class='destaque-sublinhado'>\"destacando-se R$ 980 milhões alocados no Parque da Cidade\"</span>, a palavra 'alocados' pode ser substituída sem alterar o sentido do texto por:",
      svg: null,
      opcoes: [
        "Subtraídos",
        "Destinados",
        "Arrecadados",
        "Desviados"
      ],
      correta: 1,
      explicacao: "'Alocar' recursos significa destiná-los, distribuí-los ou atribuí-los a um fim específico."
    },
    {
      materia: "Matemática",
      enunciado: "Em uma simulação para o transporte na COP30, ônibus elétricos partem do centro de Belém em intervalos constantes de <strong class='enunciado-destaque'>12 minutos</strong>, enquanto barcos ecológicos partem a cada <strong class='enunciado-destaque'>20 minutos</strong>. Se ambos partiram juntos às 08h00, qual será o próximo horário de partida simultânea?",
      svg: null,
      opcoes: [
        "08h40",
        "09h00",
        "09h20",
        "09h40"
      ],
      correta: 1,
      explicacao: "Cálculo do MMC(12, 20): 12 = 2² * 3; 20 = 2² * 5. MMC = 2² * 3 * 5 = 60 minutos (1 hora). Horário: 08h00 + 1h = 09h00."
    },
    {
      materia: "Português",
      enunciado: "Na frase <span class='destaque-sublinhado'>\"É necessário que os países cumpram as metas climáticas estabelecidas\"</span>, a oração sublinhada exerce a função sintática de:",
      svg: null,
      opcoes: [
        "Objeto Direto",
        "Sujeito Oracional",
        "Predicativo do Sujeito",
        "Complemento Nominal"
      ],
      correta: 1,
      explicacao: "A estrutura equivale a 'Que os países cumpram as metas é necessário'. A oração funciona como sujeito da oração principal 'É necessário' (Oração Subordinada Substantiva Subjetiva)."
    },
    {
      materia: "Matemática",
      enunciado: "Um relatório aponta que o desmatamento ilegal na região caiu em uma Progressão Aritmética nos últimos 4 anos: <strong class='enunciado-destaque'>1.200 km², 1.050 km², 900 km²...</strong> Mantendo a tendência, qual será a área desmatada no 5º ano?",
      svg: null,
      opcoes: [
        "750 km²",
        "600 km²",
        "500 km²",
        "450 km²"
      ],
      correta: 1,
      explicacao: "Razão da P.A. (r) = 1.050 - 1.200 = -150. 4º termo = 900 - 150 = 750 km². 5º termo = 750 - 150 = 600 km²."
    },
    {
      materia: "Português",
      enunciado: "Assinale a alternativa que apresenta a correta acentuação gráfica e justificativa do vocábulo <strong class='enunciado-destaque'>\"ápice\"</strong>:",
      svg: null,
      opcoes: [
        "Oxítona terminada em vogal.",
        "Paroxítona terminada em 'e'.",
        "Proparoxítona, devendo todas ser acentuadas.",
        "Vocábulo monossílabo tônico."
      ],
      correta: 2,
      explicacao: "A sílaba tônica é a antepenúltima (á-pi-ce), classificando-a como proparoxítona. Todas as proparoxítonas recebem acento."
    },
    {
      materia: "Matemática",
      enunciado: "Uma delegação comprou 150 credenciais para seus congressistas. Ao pagar à vista, obteve um desconto de <strong class='enunciado-destaque'>15%</strong> no valor total de R$ 30.000,00. Qual foi o valor final economizado pelo grupo?",
      svg: null,
      opcoes: [
        "R$ 3.500,00",
        "R$ 4.000,00",
        "R$ 4.500,00",
        "R$ 5.000,00"
      ],
      correta: 2,
      explicacao: "Valor economizado = 15% de 30.000 = (15 / 100) * 30.000 = 15 * 300 = R$ 4.500,00."
    },
    {
      materia: "Português",
      enunciado: "Considere a oração: <span class='destaque-sublinhado'>\"Se o Brasil não descarbonizar sua matriz produtiva, sofrerá sanções econômicas.\"</span> A oração introduzida pela conjunção <strong class='enunciado-destaque'>\"Se\"</strong> expressa ideia de:",
      svg: null,
      opcoes: [
        "Concessão",
        "Causa",
        "Condição",
        "Consequência"
      ],
      correta: 2,
      explicacao: "A conjunção 'Se' estabelece uma hipótese/condição para que ocorra a consequência descrita na oração principal."
    },
    {
      materia: "Matemática",
      enunciado: "A probabilidade de um visitante sorteado aleatoriamente na Zona Verde da COP30 ser do estado do Pará é de <strong class='enunciado-destaque'>35%</strong>. Se em um determinado pavilhão há <strong class='enunciado-destaque'>240 pessoas</strong>, qual é a estimativa de paraenses nesse local?",
      svg: null,
      opcoes: [
        "72 pessoas",
        "84 pessoas",
        "96 pessoas",
        "108 pessoas"
      ],
      correta: 1,
      explicacao: "Estimativa = 35% de 240 = (35 / 100) * 240 = 0,35 * 240 = 84 pessoas."
    },
    {
      materia: "Português",
      enunciado: "Em <span class='destaque-sublinhado'>\"O combate incisivo ao desmatamento é urgente\"</span>, a expressão 'ao desmatamento' exerce a função sintática de:",
      svg: null,
      opcoes: [
        "Objeto Indireto",
        "Complemento Nominal",
        "Adjunto Adnominal",
        "Agente da Passiva"
      ],
      correta: 1,
      explicacao: "'Combate' é um substantivo abstrato que exige complemento preposicionado para completar seu sentido. O termo 'ao desmatamento' sofre a ação do combate, sendo complemento nominal."
    },
    {
      materia: "Matemática",
      enunciado: "Um reservatório de água potável no Parque da Cidade possui formato cilíndrico com raio da base r = 3 m e altura h = 10 m. Considerando π = 3,14, qual é o volume aproximado desse reservatório em m³?",
      svg: `<svg viewBox="0 0 400 110" style="width:100%; height:110px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="110" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <ellipse cx="200" cy="30" rx="50" ry="12" fill="none" stroke="#10b981" stroke-width="2"/>
              <ellipse cx="200" cy="85" rx="50" ry="12" fill="none" stroke="#10b981" stroke-width="2"/>
              <line x1="150" y1="30" x2="150" y2="85" stroke="#10b981" stroke-width="2"/>
              <line x1="250" y1="30" x2="250" y2="85" stroke="#10b981" stroke-width="2"/>
              <text x="270" y="60" fill="#ffffff" font-size="11">Altura = 10 m</text>
            </svg>`,
      opcoes: [
        "282,6 m³",
        "314,0 m³",
        "254,2 m³",
        "188,4 m³"
      ],
      correta: 0,
      explicacao: "Volume do cilindro = π * r² * h = 3,14 * (3)² * 10 = 3,14 * 9 * 10 = 282,6 m³."
    },
    {
      materia: "Português",
      enunciado: "Indique a alternativa que apresenta desvio de concordância verbal de acordo com a norma-padrão:",
      svg: null,
      opcoes: [
        "Mais de um diplomata discursou na abertura.",
        "Faz três anos que Belém se prepara para a conferência.",
        "Houveram muitos debates sobre a transição energética.",
        "Cerca de 40 mil pessoas visitarão a capital paraense."
      ],
      correta: 2,
      explicacao: "O verbo 'haver' no sentido de existir/ocorrer é impersonal e deve permanecer na 3ª pessoa do singular: 'Houve muitos debates'."
    },
    {
      materia: "Matemática",
      enunciado: "A pegada de carbono de um evento é calculada pela função <strong class='enunciado-destaque'>C(t) = 2t² - 12t + 25</strong>, onde C é a emissão em toneladas de CO₂ e t é o tempo em dias de evento. Em qual dia ocorre a menor taxa de emissão (mínimo da função)?",
      svg: null,
      opcoes: [
        "2º dia",
        "3º dia",
        "4º dia",
        "6º dia"
      ],
      correta: 1,
      explicacao: "O tempo de emissão mínima ocorre no X do vértice: Xv = -b / (2a) = -(-12) / (2 * 2) = 12 / 4 = 3º dia."
    },
    {
      materia: "Português",
      enunciado: "Assinale a opção em que a colocação pronominal segue rigorosamente o padrão culto:",
      svg: null,
      opcoes: [
        "Me disseram que os projetos da COP30 já começaram.",
        "Jamais esqueceremos-nos dos compromissos ambientais.",
        "Não se devem ignorar as propostas da sociedade civil.",
        "Os negociadores apresentaram-se, nos dando boas expectativas."
      ],
      correta: 2,
      explicacao: "O advérbio de negação 'Não' atrai obrigatoriamente o pronome oblíquo 'se' (próclise). Em A há próclise em início de frase; B tem ênclise após advérbio atrativo; D possui próclise inadequada após vírgula."
    },
    {
      materia: "Matemática",
      enunciado: "Um mapa oficial da COP30 utiliza a escala de <strong class='enunciado-destaque'>1 : 10.000</strong>. Se a distância entre o Parque da Cidade e a Zona Azul no mapa é de <strong class='enunciado-destaque'>8 cm</strong>, qual é a distância real em quilômetros?",
      svg: null,
      opcoes: [
        "0,8 km",
        "8,0 km",
        "80 km",
        "800 km"
      ],
      correta: 0,
      explicacao: "Distância real = 8 cm * 10.000 = 80.000 cm. Convertendo para metros: 80.000 / 100 = 800 m. Convertendo para quilômetros: 800 / 1.000 = 0,8 km."
    }
  ];

  // FUNÇÃO PARA EMBARALHAR AS OPÇÕES MANTENDO A CORRETA AJUSTADA
  function embaralharOpcoesBanco() {
    bancoQuestoes.forEach((q) => {
      const opcaoCorretaTexto = q.opcoes[q.correta];
      for (let i = q.opcoes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q.opcoes[i], q.opcoes[j]] = [q.opcoes[j], q.opcoes[i]];
      }
      q.correta = q.opcoes.indexOf(opcaoCorretaTexto);
    });
  }

  embaralharOpcoesBanco();

  let questaoAtual = 0;
  const respostasUsuario = {};

  const btnAnterior = document.getElementById('btn-anterior');
  const btnProximo = document.getElementById('btn-proximo');

  function carregarQuestao(index) {
    questaoAtual = index;
    const q = bancoQuestoes[index];

    const percProgresso = ((index + 1) / bancoQuestoes.length) * 100;
    const barraFill = document.getElementById('barra-progresso');
    if (barraFill) barraFill.style.width = `${percProgresso}%`;

    const materiaBadge = document.getElementById('quiz-materia');
    if (materiaBadge) materiaBadge.textContent = q.materia;

    const contadorQuestao = document.getElementById('quiz-contador-questao');
    if (contadorQuestao) contadorQuestao.textContent = `Questão ${index + 1} de ${bancoQuestoes.length}`;

    const enunciadoEl = document.getElementById('quiz-enunciado');
    if (enunciadoEl) enunciadoEl.innerHTML = `<span style="color: var(--ifrn-green-light); font-weight:800; margin-right:6px;">${index + 1}.</span> ${q.enunciado}`;

    const mathContainer = document.getElementById('quiz-math-container');
    if (mathContainer) {
      if (q.svg) {
        mathContainer.innerHTML = q.svg;
        mathContainer.style.display = 'block';
      } else {
        mathContainer.innerHTML = '';
        mathContainer.style.display = 'none';
      }
    }

    const opcoesContainer = document.getElementById('quiz-opcoes');
    const letras = ['A', 'B', 'C', 'D'];

    if (opcoesContainer) {
      opcoesContainer.innerHTML = '';
      q.opcoes.forEach((opcao, i) => {
        const div = document.createElement('label');
        div.className = `opcao-item ${respostasUsuario[index] === i ? 'selecionada' : ''}`;
        div.innerHTML = `
          <input type="radio" name="opcao-quiz" value="${i}" ${respostasUsuario[index] === i ? 'checked' : ''}>
          <span><strong>${letras[i]})</strong> ${opcao}</span>
        `;
        div.onclick = () => selecionarOpcao(i);
        opcoesContainer.appendChild(div);
      });
    }

    if (btnAnterior) btnAnterior.style.display = index === 0 ? 'none' : 'inline-block';
    if (btnProximo) btnProximo.textContent = index === bancoQuestoes.length - 1 ? 'Finalizar Quiz' : 'Próxima Questão →';
  }

  function selecionarOpcao(opcaoIndex) {
    respostasUsuario[questaoAtual] = opcaoIndex;
    carregarQuestao(questaoAtual);
  }

  if (btnAnterior) {
    btnAnterior.addEventListener('click', () => {
      if (questaoAtual > 0) carregarQuestao(questaoAtual - 1);
    });
  }

  if (btnProximo) {
    btnProximo.addEventListener('click', () => {
      if (questaoAtual < bancoQuestoes.length - 1) {
        carregarQuestao(questaoAtual + 1);
      } else {
        const respondidas = Object.keys(respostasUsuario).length;
        if (respondidas < bancoQuestoes.length) {
          if (!confirm(`Você respondeu ${respondidas} de ${bancoQuestoes.length} questões. Deseja finalizar mesmo assim?`)) {
            return;
          }
        }
        finalizarQuizCompleto();
      }
    });
  }

  // ==========================================
  // 4. CONSOLIDAÇÃO DOS RESULTADOS E CONDICIONAL DO CERTIFICADO
  // ==========================================
  function finalizarQuizCompleto() {
    const resultadoSimulado = JSON.parse(localStorage.getItem('resultadoSimulado')) || { total: 0, portugues: 0, matematica: 0 };
    const nomeUsuario = localStorage.getItem('nomeUsuario') || "Estudante";

    let acertosQuiz = 0;
    let errosQuiz = 0;
    let semRespostaQuiz = 0;

    bancoQuestoes.forEach((q, idx) => {
      const resp = respostasUsuario[idx];
      if (resp === undefined) {
        semRespostaQuiz++;
      } else if (resp === q.correta) {
        acertosQuiz++;
      } else {
        errosQuiz++;
      }
    });

    const totalSimuladoAcertos = resultadoSimulado.total || 0;
    const totalAcertosGeral = totalSimuladoAcertos + acertosQuiz;
    const totalErrosGeral = (40 - totalSimuladoAcertos) + errosQuiz;
    const percentualGeral = Math.round((totalAcertosGeral / 60) * 100);

    const telaQuiz = document.getElementById('tela-quiz');
    const telaResultados = document.getElementById('tela-resultados');
    if (telaQuiz) telaQuiz.style.display = 'none';
    if (telaResultados) telaResultados.style.display = 'block';

    const statAcertos = document.getElementById('stat-acertos');
    const statErros = document.getElementById('stat-erros');
    const statNres = document.getElementById('stat-nres');
    const statAproveitamento = document.getElementById('stat-aproveitamento');

    if (statAcertos) statAcertos.textContent = totalAcertosGeral;
    if (statErros) statErros.textContent = totalErrosGeral;
    if (statNres) statNres.textContent = semRespostaQuiz;
    if (statAproveitamento) statAproveitamento.textContent = `${percentualGeral}%`;

    salvarNoRanking(nomeUsuario, totalAcertosGeral, percentualGeral);
    exibirRanking();
    gerarGabaritoComentado();

    // REGRA DE CORTE DE 50% PARA O CERTIFICADO
    const certArea = document.getElementById('card-certificado-area');
    if (certArea) {
      if (percentualGeral >= 50) {
        certArea.innerHTML = `
          <h3 style="color: var(--ifrn-green-light); margin-bottom: 20px; text-align: center; font-size: 1.3rem;">Certificado Institucional de Conclusão</h3>
          <div class="cert-container" id="cert-svg-box"></div>
        `;
        gerarCertificadoRN(nomeUsuario, totalAcertosGeral, percentualGeral);
      } else {
        certArea.innerHTML = `
          <h3 style="color: var(--ifrn-red); margin-bottom: 12px; text-align: center; font-size: 1.3rem;">Certificado Indisponível</h3>
          <div class="feedback-box feedback-alerta">
            <h4 style="font-size: 1.1rem; margin-bottom: 8px; font-weight: 700;">Aproveitamento Abaixo de 50%</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Você obteve <strong>${percentualGeral}%</strong> de aproveitamento geral (${totalAcertosGeral} acertos de 60 questões). Para garantir a emissão do seu Certificado Oficial, é necessário atingir no mínimo <strong>50% de acertos</strong>.<br><br>
              💡 <em>Dica: Revise o gabarito comentado abaixo, reforce seus estudos nos pontos onde teve dúvidas e tente novamente!</em>
            </p>
          </div>
        `;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // 5. GABARITO COMENTADO
  // ==========================================
  function gerarGabaritoComentado() {
    const gabaritoLista = document.getElementById('gabarito-lista');
    if (!gabaritoLista) return;
    gabaritoLista.innerHTML = '';
    const letras = ['A', 'B', 'C', 'D'];

    bancoQuestoes.forEach((q, idx) => {
      const resp = respostasUsuario[idx];
      const acertou = resp === q.correta;
      const textoSuaResposta = resp !== undefined ? `${letras[resp]}) ${q.opcoes[resp]}` : 'Não respondida';

      const item = document.createElement('div');
      item.style.background = 'rgba(0,0,0,0.3)';
      item.style.borderLeft = acertou ? '4px solid var(--ifrn-green-light)' : '4px solid var(--ifrn-red)';
      item.style.padding = '16px';
      item.style.borderRadius = 'var(--radius-sm)';
      item.style.marginBottom = '14px';

      item.innerHTML = `
        <p style="margin: 0 0 8px 0; font-weight:700; color: var(--text-main); font-size: 0.98rem;">Questão ${idx + 1}. [${q.materia}] ${q.enunciado}</p>
        <p style="margin: 0 0 4px 0; font-size: 0.9rem; color: var(--text-muted);">Sua resposta: <span style="color:${acertou ? 'var(--ifrn-green-light)' : 'var(--ifrn-red)'}; font-weight:bold;">${textoSuaResposta}</span></p>
        ${!acertou ? `<p style="margin: 0 0 4px 0; font-size: 0.9rem; color: var(--text-muted);">Resposta correta: <span style="color: var(--ifrn-green-light); font-weight:bold;">${letras[q.correta]}) ${q.opcoes[q.correta]}</span></p>` : ''}
        <p style="font-size: 0.88rem; color: var(--text-dim); margin-top: 8px; line-height: 1.5;"><em>Explicação: ${q.explicacao}</em></p>
      `;
      gabaritoLista.appendChild(item);
    });
  }

  // ==========================================
  // 6. RANKING LOCAL
  // ==========================================
  function salvarNoRanking(nome, acertos, percentual) {
    let ranking = JSON.parse(localStorage.getItem("ranking_quiz") || "[]");
    const indexExistente = ranking.findIndex(r => r.nome.toLowerCase() === nome.toLowerCase());
    if (indexExistente !== -1) {
      if (percentual > ranking[indexExistente].percentual) {
        ranking[indexExistente] = { nome, acertos, percentual, data: new Date().toLocaleDateString("pt-BR") };
      }
    } else {
      ranking.push({ nome, acertos, percentual, data: new Date().toLocaleDateString("pt-BR") });
    }
    
    ranking.sort((a, b) => b.percentual - a.percentual || b.acertos - a.acertos);
    ranking = ranking.slice(0, 10);
    localStorage.setItem("ranking_quiz", JSON.stringify(ranking));
  }

  function exibirRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking_quiz") || "[]");
    const container = document.getElementById("tabela-ranking");
    if (!container) return;

    if (ranking.length === 0) {
      container.innerHTML = "<p style='text-align:center; color: var(--text-muted); padding: 12px;'>Nenhum registro no ranking ainda.</p>";
      return;
    }

    let html = "<ol style='margin: 0; padding-left: 20px;'>";
    ranking.forEach((item, index) => {
      const destaque = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🎖️";
      html += `<li style='margin-bottom: 12px; color: var(--text-main); font-size: 0.95rem;'>
        ${destaque} <strong>${item.nome}</strong> - <span style='color: var(--ifrn-green-light); font-weight: bold;'>${item.percentual}%</span> (${item.acertos}/60 acertos) <span style='font-size:0.78rem; color: var(--text-dim);'>- ${item.data}</span>
      </li>`;
    });
    html += "</ol>";
    container.innerHTML = html;
  }

  exibirRanking();

  // ==========================================
  // 7. GERADOR DE CERTIFICADO REFINADO
  // ==========================================
  function gerarCertificadoRN(nome, acertos, percentual) {
    const certContainer = document.getElementById('cert-svg-box');
    if (!certContainer) return;

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    certContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" style="width:100%; height:auto; font-family:'Plus Jakarta Sans', sans-serif;">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#C59B27" />
            <stop offset="30%" stop-color="#F3E5AB" />
            <stop offset="70%" stop-color="#DAA520" />
            <stop offset="100%" stop-color="#996515" />
          </linearGradient>

          <linearGradient id="ifrnGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#006B35" />
            <stop offset="100%" stop-color="#008542" />
          </linearGradient>

          <pattern id="lightPattern" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 30 M 0 0 L 30 30" fill="none" stroke="#F1F5F9" stroke-width="0.8"/>
          </pattern>
        </defs>

        <rect width="800" height="550" fill="#FFFFFF" rx="16"/>
        <rect width="800" height="550" fill="url(#lightPattern)" rx="16"/>

        <rect x="16" y="16" width="768" height="518" fill="none" stroke="url(#goldGrad)" stroke-width="3" rx="12"/>
        <rect x="24" y="24" width="752" height="502" fill="none" stroke="#008542" stroke-width="1.2" rx="10"/>

        <path d="M 24 45 L 45 24 M 24 55 L 55 24" stroke="url(#goldGrad)" stroke-width="2"/>
        <path d="M 776 45 L 755 24 M 776 55 L 745 24" stroke="url(#goldGrad)" stroke-width="2"/>
        <path d="M 24 505 L 45 526 M 24 495 L 55 526" stroke="url(#goldGrad)" stroke-width="2"/>
        <path d="M 776 505 L 755 526 M 776 495 L 745 526" stroke="url(#goldGrad)" stroke-width="2"/>

        <path d="M 24 24 L 776 24 L 776 60 L 24 60 Z" fill="url(#ifrnGreenGrad)"/>
        <rect x="24" y="60" width="752" height="3" fill="url(#goldGrad)"/>

        <g transform="translate(38, 28) scale(0.65)">
          <rect x="0" y="0" width="12" height="12" rx="1" fill="#C80510"/>
          <rect x="15" y="0" width="12" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="30" y="0" width="12" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="0" y="15" width="12" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="15" y="15" width="12" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="30" y="15" width="12" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="0" y="30" width="12" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="15" y="30" width="12" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="30" y="30" width="12" height="12" rx="1" fill="#FFFFFF"/>
        </g>

        <text x="410" y="46" fill="#FFFFFF" font-size="14" font-weight="800" text-anchor="middle" letter-spacing="3">
          INSTITUTO FEDERAL DO RIO GRANDE DO NORTE
        </text>

        <text x="400" y="112" fill="#0F172A" font-size="28" font-weight="900" text-anchor="middle" letter-spacing="1">
          CERTIFICADO DE EXCELÊNCIA
        </text>
        
        <text x="400" y="135" fill="#008542" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="2">
          EXAME DE SELEÇÃO IFRN • MARATONA INTEGRADA
        </text>

        <path d="M 280 148 L 380 148 M 420 148 L 520 148" stroke="url(#goldGrad)" stroke-width="2"/>
        <circle cx="400" cy="148" r="3.5" fill="#C59B27"/>

        <text x="400" y="190" fill="#475569" font-size="14" text-anchor="middle">
          Certificamos com honra que o(a) estudante
        </text>

        <text x="400" y="235" fill="#0F172A" font-size="26" font-weight="800" text-anchor="middle" letter-spacing="1">
          ${nome.toUpperCase()}
        </text>
        <line x1="200" y1="248" x2="600" y2="248" stroke="#CBD5E1" stroke-width="1.5"/>

        <text x="400" y="285" fill="#334155" font-size="14" text-anchor="middle">
          concluiu com êxito a Maratona Unificada do Simulado + Quiz Extra,
        </text>
        <text x="400" y="310" fill="#334155" font-size="14" text-anchor="middle">
          obtendo aproveitamento geral de <tspan font-weight="800" fill="#008542">${percentual}%</tspan> com o total de <tspan font-weight="800" fill="#996515">${acertos} acertos</tspan> de 60 questões.
        </text>

        <g transform="translate(140, 420)">
          <circle cx="0" cy="0" r="34" fill="url(#goldGrad)"/>
          <circle cx="0" cy="0" r="28" fill="#008542"/>
          <circle cx="0" cy="0" r="26" fill="none" stroke="url(#goldGrad)" stroke-width="1"/>
          <polygon points="0,-16 4.8,-4.8 17,-4.8 7.2,2.4 10.8,14.4 0,7.2 -10.8,14.4 -7.2,2.4 -17,-4.8 -4.8,-4.8" fill="url(#goldGrad)"/>
          <text x="0" y="46" fill="#64748B" font-size="9" font-weight="800" text-anchor="middle" letter-spacing="1">AUTÊNTICO</text>
        </g>

        <g transform="translate(380, 405)">
          <path d="M -35 15 Q -15 -10 5 10 T 35 0" fill="none" stroke="#334155" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="-70" y1="25" x2="70" y2="25" stroke="#94A3B8" stroke-width="1.2"/>
          <text x="0" y="40" fill="#0F172A" font-size="11" font-weight="700" text-anchor="middle">Coordenação de Seleção</text>
          <text x="0" y="53" fill="#64748B" font-size="10" text-anchor="middle">Comissão IFRN</text>
        </g>

        <g transform="translate(620, 400)">
          <path d="M -50 15 C -45 -15 -30 -5 -35 18 C -25 5 -10 -8 -5 12 C 5 -2 20 -5 25 15 M 10 22 C 25 10 35 8 45 20" fill="none" stroke="#008542" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="-70" y1="25" x2="70" y2="25" stroke="#94A3B8" stroke-width="1.2"/>
          <text x="0" y="40" fill="#0F172A" font-size="11" font-weight="800" font-style="italic" text-anchor="middle">Lionel Messi</text>
          <text x="0" y="53" fill="#996515" font-size="10" font-weight="700" text-anchor="middle">Criador da Plataforma</text>
        </g>

        <text x="400" y="502" fill="#94A3B8" font-size="11" text-anchor="middle">Emitido em: ${dataAtual}</text>
      </svg>
    `;
  }
});
