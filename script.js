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
  // 3. QUIZ SURPRESA (BANCO DE QUESTÕES)
  // ==========================================
  const bancoQuestoes = [
    {
      materia: "Português",
      enunciado: "No trecho <span class='destaque-sublinhado'>\"Embora a meta de neutralidade de carbono seja ambiciosa\"</span>, sua viabilidade depende do comprometimento das nações desenvolvidas. A oração em destaque exprime uma relação sintático-semântica de:",
      svg: `<svg viewBox="0 0 400 100" style="width:100%; height:100px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="100" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <text x="20" y="32" fill="#10b981" font-weight="700" font-size="13">Análise Sintático-Discursiva</text>
              <line x1="20" y1="42" x2="380" y2="42" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5"/>
              <text x="20" y="68" fill="#f59e0b" font-size="12" font-weight="600">[Oração Subordinada Adverbial]</text>
              <text x="210" y="68" fill="#ffffff" font-size="12">→ [Oração Principal]</text>
            </svg>`,
      opcoes: [
        "A) Causa, pois aponta o motivo direto de a meta ser considerada ambiciosa.",
        "B) Concessão, pois introduz um fato contrário que não impede a oração principal.",
        "C) Condição, visto que impõe uma premissa obrigatória para a viabilidade.",
        "D) Consequência, por indicar o resultado inevitável das metas estipuladas."
      ],
      correta: 1,
      explicacao: "A conjunção subordinativa 'Embora' introduz uma oração subordinada adverbial concessiva, indicando um obstáculo que não é suficiente para anular a oração principal."
    },
    {
      materia: "Matemática",
      enunciado: "Um complexo eólico na Região Nordeste possui capacidade nominal de <strong class='enunciado-destaque'>150 MW</strong>. Devido às oscilações dos ventos, opera com fator de capacidade de <strong class='enunciado-destaque'>40%</strong>. Sabendo que uma residência consome em média <strong class='enunciado-destaque'>200 kWh/mês</strong>, quantas residências esse complexo consegue abastecer continuadamente ao longo de um mês de 30 dias?",
      svg: `<svg viewBox="0 0 400 100" style="width:100%; height:100px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="100" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <text x="20" y="30" fill="#10b981" font-weight="700" font-size="13">Dados Operacionais do Complexo</text>
              <text x="20" y="60" fill="#ffffff" font-size="12">• Capacidade Nominal: 150 MW</text>
              <text x="20" y="80" fill="#ffffff" font-size="12">• Fator de Carga: 40% | Consumo Médio: 200 kWh/mês</text>
            </svg>`,
      opcoes: [
        "A) 180.000 residências",
        "B) 216.000 residências",
        "C) 360.000 residências",
        "D) 540.000 residências"
      ],
      correta: 1,
      explicacao: "Potência real = 150 MW × 0,40 = 60 MW = 60.000 kW. Em 30 dias (720h), a energia gerada é 60.000 kW × 720 h = 43.200.000 kWh. Dividindo pelo consumo (200 kWh): 43.200.000 / 200 = 216.000 residências."
    },
    {
      materia: "Português",
      enunciado: "Considere a oração: <span class='destaque-sublinhado'>\"Atribui-se aos debates climáticos da COP30 papel decisivo no redirecionamento de investimentos ecológicos\"</span>. Quanto à sintaxe e concordância, assinale a afirmação correta:",
      svg: null,
      opcoes: [
        "A) O termo 'papel decisivo' exerce a função de sujeito paciente, e o verbo 'Atribui-se' está corretamente no singular.",
        "B) 'aos debates climáticos' é o sujeito sintático da oração, determinando a flexão do verbo.",
        "C) A partícula 'se' funciona como índice de indeterminação do sujeito, exigindo verbo na 3ª pessoa.",
        "D) Há erro de regência verbal, pois o verbo atribuir exige obrigatoriamente a preposição 'em'."
      ],
      correta: 0,
      explicacao: "Na voz passiva sintética com a partícula 'se', o termo 'papel decisivo' é o sujeito paciente no singular ('Papel decisivo é atribuído...'), exigindo a concordância do verbo no singular."
    },
    {
      materia: "Matemática",
      enunciado: "Para abastecer uma instalação da COP30, construiu-se um reservatório cilíndrico reto com <strong class='enunciado-destaque'>6 metros de diâmetro interno</strong> e <strong class='enunciado-destaque'>5 metros de altura</strong>. Se o volume de água retido corresponde a <strong class='enunciado-destaque'>80%</strong> da sua capacidade máxima, qual é a quantidade de água acumulada em m³? (Adote π = 3,14)",
      svg: `<svg viewBox="0 0 400 110" style="width:100%; height:110px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="110" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <ellipse cx="80" cy="30" rx="35" ry="10" fill="none" stroke="#10b981" stroke-width="2"/>
              <line x1="45" y1="30" x2="45" y2="85" stroke="#10b981" stroke-width="2"/>
              <line x1="115" y1="30" x2="115" y2="85" stroke="#10b981" stroke-width="2"/>
              <ellipse cx="80" cy="85" rx="35" ry="10" fill="none" stroke="#10b981" stroke-width="2"/>
              <text x="145" y="48" fill="#ffffff" font-size="12">Diâmetro = 6 m</text>
              <text x="145" y="72" fill="#ffffff" font-size="12">Altura = 5 m</text>
            </svg>`,
      opcoes: [
        "A) 113,04 m³",
        "B) 141,30 m³",
        "C) 176,62 m³",
        "D) 226,08 m³"
      ],
      correta: 0,
      explicacao: "Diâmetro = 6 m → Raio = 3 m. Volume total = π · r² · h = 3,14 × (3²) × 5 = 141,3 m³. Volume com 80% ocupado = 141,3 × 0,80 = 113,04 m³."
    },
    {
      materia: "Português",
      enunciado: "Assinale a opção em que o emprego do sinal indicativo de crase atende <strong class='enunciado-destaque'>RIGOROSAMENTE</strong> à norma-padrão da língua portuguesa:",
      svg: null,
      opcoes: [
        "A) A comissão dirigiu-se à uma sala reservada para dar início à votação das propostas.",
        "B) Os representantes compareceram à reuniões bilaterais para debater à respeito das metas.",
        "C) O relatório faz referência à matriz energética brasileira e recomenda adesão à medidas severas.",
        "D) As propostas relativas à preservação amazônica foram submetidas à appreciation dos conferencistas."
      ],
      correta: 3,
      explicacao: "Em 'relativas à preservação' (a + a = à) e 'submetidas à apreciação' (a + a = à), ocorre fusão da preposição com o artigo feminino singular."
    },
    {
      materia: "Matemática",
      enunciado: "Um estudo sobre o desmatamento projetou que a área destruída em uma reserva diminui a uma taxa constante a cada ano. Em 2020 foram desmatados <strong class='enunciado-destaque'>1.200 km²</strong> e, em 2024, esse valor caiu para <strong class='enunciado-destaque'>720 km²</strong>. Mantendo essa Progressão Aritmética, em qual ano o desmatamento atingirá exatamente <strong class='enunciado-destaque'>ZERO</strong>?",
      svg: null,
      opcoes: [
        "A) 2028",
        "B) 2030",
        "C) 2032",
        "D) 2034"
      ],
      correta: 1,
      explicacao: "Período de 4 anos (2020 a 2024): Redução total = 1.200 - 720 = 480 km². Redução anual (razão) = 480 / 4 = 120 km²/ano. Para zerar a taxa inicial de 1.200 km²: 1.200 / 120 = 10 anos. Ano final: 2020 + 10 = 2030."
    },
    {
      materia: "Português",
      enunciado: "No excerto <span class='destaque-sublinhado'>\"O avanço tecnológico, cujos impactos ambientais foram amplamente debatidos, exige responsabilidade socioambiental\"</span>, a oração isolada por vírgulas possui classificação sintática de:",
      svg: null,
      opcoes: [
        "A) Oração subordinada adjetiva explicativa.",
        "B) Oração subordinada adjetiva restritiva.",
        "C) Oração subordinada substantiva apositiva.",
        "D) Oração coordenada sindética explicativa."
      ],
      correta: 0,
      explicacao: "Orações introduzidas por pronomes relativos ('cujos') e devidamente isoladas por vírgulas são classificadas como orações subordinadas adjetivas explicativas."
    },
    {
      materia: "Matemática",
      enunciado: "Um drone de monitoramento mapeia uma reserva florestal de formato triangular cujos lados medem <strong class='enunciado-destaque'>13 km</strong>, <strong class='enunciado-destaque'>14 km</strong> e <strong class='enunciado-destaque'>15 km</strong>. Qual é a área dessa região de cobertura em km²?",
      svg: `<svg viewBox="0 0 400 110" style="width:100%; height:110px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="110" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <polygon points="60,90 180,25 340,90" fill="none" stroke="#10b981" stroke-width="2"/>
              <text x="100" y="50" fill="#94a3b8" font-size="11">13 km</text>
              <text x="260" y="50" fill="#94a3b8" font-size="11">15 km</text>
              <text x="180" y="102" fill="#94a3b8" font-size="11">14 km</text>
            </svg>`,
      opcoes: [
        "A) 72 km²",
        "B) 84 km²",
        "C) 90 km²",
        "D) 96 km²"
      ],
      correta: 1,
      explicacao: "Utilizando a Fórmula de Heron: Perímetro = 13 + 14 + 15 = 42 km → Semiperímetro (p) = 21 km. Área = √(21 × (21-13) × (21-14) × (21-15)) = √(21 × 8 × 7 × 6) = √7056 = 84 km²."
    },
    {
      materia: "Português",
      enunciado: "Indique a alternativa em que a regência nominal e verbal atende integralmente às exigências do padrão culto:",
      svg: null,
      opcoes: [
        "A) As ONGs ambientais que o estudante simpatiza preferem trabalhar do que apenas debater.",
        "B) As ONGs ambientais com que o estudante simpatiza preferem trabalhar a apenas debater.",
        "C) As ONGs ambientais em que o estudante simpatiza preferem mais trabalhar do que apenas debater.",
        "D) As ONGs ambientais de que o estudante simpatiza preferem antes trabalhar que apenas debater."
      ],
      correta: 1,
      explicacao: "Quem 'simpatiza', simpatiza 'com' (com que). O verbo 'preferir' exige a preposição 'a' e rejeita intensificadores como 'mais' ou 'do que'."
    },
    {
      materia: "Matemática",
      enunciado: "Um reservatório sustentável em formato cúbico possui capacidade total de <strong class='enunciado-destaque'>64.000 litros</strong>. Qual é a medida aproximada da diagonal interna desse reservatório em metros? (Considere 1 m³ = 1.000 L e √3 ≈ 1,73)",
      svg: null,
      opcoes: [
        "A) 4,00 m",
        "B) 5,66 m",
        "C) 6,92 m",
        "D) 8,00 m"
      ],
      correta: 2,
      explicacao: "64.000 L = 64 m³. Volume do cubo V = a³ → a³ = 64 → a = 4 metros. A diagonal interna do cubo é dada por d = a√3 = 4 × 1,73 = 6,92 metros."
    },
    {
      materia: "Português",
      enunciado: "Assinale a alternativa em que a concordância nominal apresenta uma incorreção sintática:",
      svg: null,
      opcoes: [
        "A) Seguem anexas ao relatório as planilhas de metas de redução de emissões.",
        "B) É necessário atenção permanente durante o processamento dos dados climáticos.",
        "C) A deputada mesmo apresentou as propostas para a preservação ambiental.",
        "D) Bastantes pesquisadores apresentaram pareceres bastante plausíveis sobre o clima."
      ],
      correta: 1,
      explicacao: "Sem determinante antes do substantivo, a expressão 'É necessário' permanece invariável. Porém, em contexto formal com foco no substantivo ou com especificação, exige flexão: 'É necessária a atenção' ou 'É necessária atenção'."
    },
    {
      materia: "Matemática",
      enunciado: "Dois sensores ecológicos transmitem dados periodicamente: o sensor A a cada <strong class='enunciado-destaque'>18 minutos</strong> e o B a cada <strong class='enunciado-destaque'>24 minutos</strong>. Se ambos transmitiram simultaneamente às <strong class='enunciado-destaque'>08h00</strong>, a que horas voltarão a emitir sinais juntos pela primeira vez?",
      svg: null,
      opcoes: [
        "A) 08h42",
        "B) 09h12",
        "C) 09h24",
        "D) 10h00"
      ],
      correta: 1,
      explicacao: "Cálculo do MMC(18, 24): 18 = 2 · 3² | 24 = 2³ · 3 → MMC = 2³ · 3² = 72 minutos. 72 min = 1h12min. Somando ao horário inicial (08h00): 09h12."
    },
    {
      materia: "Português",
      enunciado: "Na frase <span class='destaque-sublinhado'>\"Não só os governos locais aprovaram as diretrizes ecológicas, mas também as entidades internacionais as ratificaram\"</span>, a estrutura em destaque estabelece sentido de:",
      svg: null,
      opcoes: [
        "A) Adição e ênfase de ideias.",
        "B) Oposição e contraste sintático.",
        "C) Alternância e exclusão mútua.",
        "D) Causa e consequência proporcional."
      ],
      correta: 0,
      explicacao: "A locução correlativa 'Não só... mas também' conecta orações coordenadas sindéticas aditivas, enfatizando a união de fatos."
    },
    {
      materia: "Matemática",
      enunciado: "Na planta de um projeto arquitetônico desenhada na escala de <strong class='enunciado-destaque'>1:250</strong>, um auditório retangular possui <strong class='enunciado-destaque'>12 cm</strong> de comprimento e <strong class='enunciado-destaque'>8 cm</strong> de largura. Qual é a área real desse auditório em m²?",
      svg: null,
      opcoes: [
        "A) 600 m²",
        "B) 2.400 m²",
        "C) 6.000 m²",
        "D) 24.000 m²"
      ],
      correta: 0,
      explicacao: "Comprimento real = 12 cm × 250 = 3.000 cm = 30 m. Largura real = 8 cm × 250 = 2.000 cm = 20 m. Área real = 30 m × 20 m = 600 m²."
    },
    {
      materia: "Português",
      enunciado: "Assinale a opção em que os sinais de pontuação isolam corretamente um <strong class='enunciado-destaque'>APOSTO EXPLICATIVO</strong>:",
      svg: null,
      opcoes: [
        "A) Belém, capital do Pará, sediará debates fundamentais para o futuro do planeta.",
        "B) Os delegados, que chegaram cedo, ocuparam o auditório principal.",
        "C) Se houver consenso, os tratados ambientais serão assinados amanhã.",
        "D) Jovens, lideranças e cientistas participaram ativamente do simpósio."
      ],
      correta: 0,
      explicacao: "'Capital do Pará' explica e identifica o substantivo próprio 'Belém', desempenhando a função sintática de aposto explicativo isolado por vírgulas."
    },
    {
      materia: "Matemática",
      enunciado: "Um capital de <strong class='enunciado-destaque'>R$ 20.000,00</strong> foi aplicado do sistema de juros compostos a uma taxa de <strong class='enunciado-destaque'>10% ao ano</strong>. Qual será o montante total acumulado ao final de 2 anos?",
      svg: null,
      opcoes: [
        "A) R$ 22.000,00",
        "B) R$ 24.000,00",
        "C) R$ 24.200,00",
        "D) R$ 25.400,00"
      ],
      correta: 2,
      explicacao: "Fórmula dos Juros Compostos: M = C(1 + i)^t → M = 20.000 × (1,10)² = 20.000 × 1,21 = R$ 24.200,00."
    },
    {
      materia: "Português",
      enunciado: "Identifique a opção em que ocorre <strong class='enunciado-destaque'>ERRO DE COLOCAÇÃO PRONOMINAL</strong> segundo a norma culta:",
      svg: null,
      opcoes: [
        "A) Nunca se falou tanto em sustentabilidade global quanto na última década.",
        "B) Os acadêmicos tinham manifestado-se contra a redução das áreas de preservação.",
        "C) Caso se aprovem as propostas, haverá investimento em energia limpa.",
        "D) Dir-se-ia que as negociações atingiram um ponto crucial."
      ],
      correta: 1,
      explicacao: "Com verbos no particípio em tempos compostos ('tinha manifestado'), não se aceita a ênclise ao particípio. A forma correta é 'tinham-se manifestado' ou 'se tinham manifestado'."
    },
    {
      materia: "Matemática",
      enunciado: "A probabilidade de um painel solar apresentar falha técnica é de <strong class='enunciado-destaque'>5%</strong>. Ao instalar um conjunto de 3 painéis independentes, qual é a probabilidade aproximada de que <strong class='enunciado-destaque'>PELO MENOS UM</strong> apresente defeito?",
      svg: null,
      opcoes: [
        "A) 14,26%",
        "B) 15,00%",
        "C) 85,74%",
        "D) 95,00%"
      ],
      correta: 0,
      explicacao: "P(pelo menos 1 com defeito) = 1 - P(nenhum com defeito). Probabilidade de não falhar = 0,95. P(3 sem falha) = (0,95)³ ≈ 0,8574 (85,74%). Logo, P = 1 - 0,8574 = 0,1426 (14,26%)."
    },
    {
      materia: "Português",
      enunciado: "De acordo com o Acordo Ortográfico vigente, marque a opção inteiramente correta referente ao emprego do hífen:",
      svg: null,
      opcoes: [
        "A) Para-raios, eco-sistema, micro-ondas, autoestrada.",
        "B) Para-raios, ecossistema, micro-ondas, autoestrada.",
        "C) Pararaios, ecossistema, microondas, auto-estrada.",
        "D) Para-raios, eco-sistema, microondas, autoestrada."
      ],
      correta: 1,
      explicacao: "'Para-raios' exige hífen por ser composto por verbo + substantivo. 'Ecossistema' junta sem hífen (prefixo 'eco' + s junta duplicando o s). 'Micro-ondas' mantém hífen por encontros de vogais iguais. 'Autoestrada' aglutina sem hífen por vogais diferentes."
    },
    {
      materia: "Matemática",
      enunciado: "O custo operacional de purificação de água é modelado pela função quadrática <strong class='enunciado-destaque'>C(x) = x² - 12x + 45</strong>, na qual C é o custo em milhares de reais e x representa os milhares de litros purificados. Qual valor de x proporciona o custo <strong class='enunciado-destaque'>MÍNIMO</strong>?",
      svg: `<svg viewBox="0 0 400 100" style="width:100%; height:100px; font-family:'Plus Jakarta Sans', sans-serif;">
              <rect width="400" height="100" rx="8" fill="#0d1913" stroke="rgba(255,255,255,0.08)"/>
              <path d="M 60 20 Q 200 110 340 20" fill="none" stroke="#10b981" stroke-width="2"/>
              <circle cx="200" cy="65" r="4" fill="#f59e0b"/>
              <text x="215" y="70" fill="#ffffff" font-size="11">Vértice da Função C(x)</text>
            </svg>`,
      opcoes: [
        "A) 6.000 litros",
        "B) 9.000 litros",
        "C) 12.000 litros",
        "D) 45.000 litros"
      ],
      correta: 0,
      explicacao: "O ponto mínimo é dado pela coordenada do vértice Xv = -b / (2a) = -(-12) / (2 × 1) = 6. Como x representa milhares de litros, x = 6 equivale a 6.000 litros."
    }
  ];

  let questaoAtual = 0;
  const respostasUsuario = {};

  const btnAnterior = document.getElementById('btn-anterior');
  const btnProximo = document.getElementById('btn-proximo');

  function carregarQuestao(index) {
    questaoAtual = index;
    const q = bancoQuestoes[index];

    // Atualiza Barra de Progresso
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
    if (opcoesContainer) {
      opcoesContainer.innerHTML = '';
      q.opcoes.forEach((opcao, i) => {
        const div = document.createElement('label');
        div.className = `opcao-item ${respostasUsuario[index] === i ? 'selecionada' : ''}`;
        div.innerHTML = `
          <input type="radio" name="opcao-quiz" value="${i}" ${respostasUsuario[index] === i ? 'checked' : ''}>
          <span>${opcao}</span>
        `;
        div.onclick = () => selecionarOpcao(i);
        opcoesContainer.appendChild(div);
      });
    }

    // Botões de Navegação
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
  // 4. CONSOLIDAÇÃO DOS RESULTADOS
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
    gerarCertificadoRN(nomeUsuario, totalAcertosGeral, percentualGeral);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // 5. GABARITO COMENTADO
  // ==========================================
  function gerarGabaritoComentado() {
    const gabaritoLista = document.getElementById('gabarito-lista');
    if (!gabaritoLista) return;
    gabaritoLista.innerHTML = '';

    bancoQuestoes.forEach((q, idx) => {
      const resp = respostasUsuario[idx];
      const acertou = resp === q.correta;
      const textoSuaResposta = resp !== undefined ? q.opcoes[resp] : 'Não respondida';

      const item = document.createElement('div');
      item.style.background = 'rgba(0,0,0,0.3)';
      item.style.borderLeft = acertou ? '4px solid var(--ifrn-green-light)' : '4px solid var(--ifrn-red)';
      item.style.padding = '16px';
      item.style.borderRadius = 'var(--radius-sm)';
      item.style.marginBottom = '14px';

      item.innerHTML = `
        <p style="margin: 0 0 8px 0; font-weight:700; color: var(--text-main); font-size: 0.98rem;">Questão ${idx + 1}. [${q.materia}] ${q.enunciado}</p>
        <p style="margin: 0 0 4px 0; font-size: 0.9rem; color: var(--text-muted);">Sua resposta: <span style="color:${acertou ? 'var(--ifrn-green-light)' : 'var(--ifrn-red)'}; font-weight:bold;">${textoSuaResposta}</span></p>
        ${!acertou ? `<p style="margin: 0 0 4px 0; font-size: 0.9rem; color: var(--text-muted);">Resposta correta: <span style="color: var(--ifrn-green-light); font-weight:bold;">${q.opcoes[q.correta]}</span></p>` : ''}
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
