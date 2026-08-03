document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MAPEAMENTO E CONTROLE DO MENU HAMBÚRGUER
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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        fecharMenu();
      }
    });
  }

  // ==========================================
  // 2. EVENT LISTENERS DOS BOTÕES DO QUIZ
  // ==========================================
  const btnIniciar = document.getElementById("btn-iniciar");
  const btnIrParaQuestoes = document.getElementById("btn-ir-para-questoes");
  const btnProximo = document.getElementById("btn-proximo");
  const btnAnterior = document.getElementById("btn-anterior");
  const btnReiniciar = document.getElementById("btn-reiniciar");

  if (btnIniciar) btnIniciar.addEventListener("click", mostrarTextoBase);
  if (btnIrParaQuestoes) btnIrParaQuestoes.addEventListener("click", iniciarSimulado);
  if (btnProximo) btnProximo.addEventListener("click", proximaQuestao);
  if (btnAnterior) btnAnterior.addEventListener("click", questaoAnterior);
  if (btnReiniciar) btnReiniciar.addEventListener("click", () => {
    document.getElementById("tela-resultados").style.display = "none";
    document.getElementById("tela-inicial").style.display = "block";
  });
});

// ==========================================
// BANCO DE QUESTÕES - REFORMULADO (20 QUESTÕES)
// ==========================================
const bancoQuestoes = [
  // --- MÓDULO 1: INTERPRETAÇÃO E CONHECIMENTOS GERAIS ---
  {
    modulo: 1,
    materia: "Português / Interpretação",
    enunciado: "No trecho 'A realização da Cúpula da Amazônia em Belém do Pará representa um marco estratégico para a diplomacia ambiental brasileira', qual é a função sintática e o sentido do termo em destaque em relação à cidade?",
    opcoes: [
      "Adjunto adnominal; expressa a localização geográfica do evento de forma restritiva.",
      "Complemento nominal; indica o agente responsável pela organização do evento.",
      "Aposto explicativo; generaliza a localização para outros estados da região Norte.",
      "Predicativo do sujeito; qualifica a ação diplomática realizada na Amazônia."
    ],
    correta: 0,
    explicacao: "'Em Belém do Pará' atua como locução adjetiva/adverbial de lugar com função restritiva, especificando onde a Cúpula ocorre."
  },
  {
    modulo: 1,
    materia: "Matemática",
    enunciado: "Para organizar os auditórios da Cúpula da Amazônia, a equipe planejou a distribuição de assentos na razão de 3 cadeiras VIP para cada 7 cadeiras comuns. Se o auditório principal tem capacidade total para 1.200 pessoas, quantas cadeiras são VIPs?",
    svg: `<svg viewBox="0 0 300 60" style="width:100%; max-width:300px; margin: 10px auto; display:block;">
      <rect x="10" y="15" width="80" height="30" rx="5" fill="#008542" />
      <text x="50" y="35" fill="#fff" font-size="12" text-anchor="middle">VIP (3x)</text>
      <rect x="100" y="15" width="190" height="30" rx="5" fill="#3b82f6" />
      <text x="195" y="35" fill="#fff" font-size="12" text-anchor="middle">Comum (7x)</text>
    </svg>`,
    opcoes: ["360 cadeiras", "420 cadeiras", "840 cadeiras", "250 cadeiras"],
    correta: 0,
    explicacao: "Total de partes = 3 + 7 = 10. Cada parte vale 1.200 / 10 = 120. Cadeiras VIP = 3 × 120 = 360."
  },
  {
    modulo: 1,
    materia: "Conhecimentos Gerais",
    enunciado: "Qual é o objetivo principal da criação da Organização do Tratado de Cooperação da Amazônia (OTCA), ressaltada nas conferências da Amazônia?",
    opcoes: [
      "Promover o desenvolvimento sustentável da Bacia Amazônica por meio da cooperação regional.",
      "Privatizar as reservas florestais para acelerar o crescimento econômico agrícola.",
      "Substituir os governos federais locais por uma administração internacional unificada.",
      "Restringir o acesso da população local aos recursos hídricos e florestais da região."
    ],
    correta: 0,
    explicacao: "A OTCA visa promover o desenvolvimento sustentável, a preservação ambiental e a inclusão social na Região Amazônica."
  },
  {
    modulo: 1,
    materia: "Português / Sintaxe",
    enunciado: "Considere a frase: 'Muitos representantes internacionais disseram que a preservação da floresta exige recursos financeiros contínuos.' A oração grifada exerce a função de:",
    opcoes: [
      "Oração subordinada substantiva objetiva direta.",
      "Oração subordinada adjetiva explicativa.",
      "Oração subordinada adverbial causal.",
      "Oração coordenada sindética aditiva."
    ],
    correta: 0,
    explicacao: "A oração funciona como objeto direto do verbo 'disseram' (Quem diz, diz algo)."
  },

  // --- MÓDULO 2: LOGÍSTICA E ESTATÍSTICA ---
  {
    modulo: 2,
    materia: "Matemática",
    enunciado: "Em uma pesquisa com 500 credenciados da COP30, o gráfico abaixo mostra a distribuição do meio de transporte utilizado para ir ao evento. Quantas pessoas utilizaram transporte público ou bicicleta?",
    svg: `<svg viewBox="0 0 300 120" style="width:100%; max-width:320px; margin: 10px auto; display:block; fill:#fff;">
      <rect x="20" y="20" width="120" height="20" fill="#10b981"/>
      <text x="150" y="35" font-size="12">Ônibus/BRT: 50%</text>
      <rect x="20" y="50" width="60" height="20" fill="#3b82f6"/>
      <text x="150" y="65" font-size="12">Táxi/App: 25%</text>
      <rect x="20" y="80" width="36" height="20" fill="#f59e0b"/>
      <text x="150" y="95" font-size="12">Bicicleta: 15%</text>
    </svg>`,
    opcoes: ["325 pessoas", "250 pessoas", "300 pessoas", "180 pessoas"],
    correta: 0,
    explicacao: "Ônibus/BRT (50%) + Bicicleta (15%) = 65%. 65% de 500 = 0,65 × 500 = 325 pessoas."
  },
  {
    modulo: 2,
    materia: "Português / Semântica",
    enunciado: "Na frase 'As metas climáticas eram ambiciosas, contudo a implementação dependia de consensos complexos', a palavra 'contudo' pode ser substituída sem alterar o sentido por:",
    opcoes: ["no entanto", "porquanto", "portanto", "visto que"],
    correta: 0,
    explicacao: "'Contudo' é uma conjunção adversativa, equivalente a 'no entanto', 'porém', 'todavia'."
  },
  {
    modulo: 2,
    materia: "Matemática",
    enunciado: "Uma frota de 12 veículos elétricos transporta uma delegação em 6 viagens diárias. Quantas viagens serão necessárias se a frota for reduzida para 8 veículos, mantendo a mesma capacidade individual?",
    opcoes: ["9 viagens", "4 viagens", "8 viagens", "10 viagens"],
    correta: 0,
    explicacao: "Regra de três simples inversamente proporcional: 12 veículos ---> 6 viagens; 8 veículos ---> x. 8x = 12 × 6 => 8x = 72 => x = 9 viagens."
  },
  {
    modulo: 2,
    materia: "Conhecimentos Gerais",
    enunciado: "Qual país europeu, além da Noruega, anunciou investimentos expressivos para o Fundo Amazônia durante as reuniões preparatórias para a COP30?",
    opcoes: ["Alemanha", "Itália", "Espanha", "Portugal"],
    correta: 0,
    explicacao: "A Alemanha é, historicamente junto com a Noruega, uma das principais doadoras do Fundo Amazônia."
  },

  // --- MÓDULO 3: GEOMETRIA E RECURSOS ---
  {
    modulo: 3,
    materia: "Matemática",
    enunciado: "Um pavilhão retangular para feiras ambientais precisa ter sua área coberta com placas de grama sintética. Observe as dimensões indicadas no diagrama abaixo. Qual é a área total desse pavilhão?",
    svg: `<svg viewBox="0 0 260 110" style="width:100%; max-width:260px; margin: 10px auto; display:block;">
      <rect x="20" y="15" width="220" height="80" fill="none" stroke="#10b981" stroke-width="2"/>
      <text x="130" y="10" fill="#fff" font-size="12" text-anchor="middle">Comprimento: 45 m</text>
      <text x="245" y="60" fill="#fff" font-size="12" text-anchor="start">Largura: 20 m</text>
    </svg>`,
    opcoes: ["900 m²", "65 m²", "130 m²", "450 m²"],
    correta: 0,
    explicacao: "A área do retângulo é calculada multiplicando-se o comprimento pela largura: A = 45 × 20 = 900 m²."
  },
  {
    modulo: 3,
    materia: "Português / Ortografia e Regência",
    enunciado: "Assinale a alternativa em que a regência verbal e o uso da crase estão corretos conforme a norma-padrão:",
    opcoes: [
      "A conferência deu início à sessão de debates sobre sustentabilidade às 14 horas.",
      "O delegado assistiu a apresentação do projeto sem fazer restrições a proposta.",
      "Eles visavam à alcançar resultados imediatos para a preservação ambiental.",
      "Entregamos o documento à pessoas interessadas no desenvolvimento local."
    ],
    correta: 0,
    explicacao: "'Deu início à' requer crase (a + a), e 'às 14 horas' indica horas exatas. Nas demais há erros de crase antes de verbo e palavras no plural."
  },
  {
    modulo: 3,
    materia: "Matemática",
    enunciado: "Para abastecer os estandes, um reservatório cúbico com 3 metros de aresta está completamente cheio de água potável. Sabendo que 1 m³ equivale a 1.000 litros, qual é o volume total em litros?",
    opcoes: ["27.000 L", "9.000 L", "3.000 L", "81.000 L"],
    correta: 0,
    explicacao: "Volume do cubo = a³ = 3 × 3 × 3 = 27 m³. Convertendo para litros: 27 × 1.000 = 27.000 litros."
  },
  {
    modulo: 3,
    materia: "Conhecimentos Gerais / Ecologia",
    enunciado: "O termo 'ponto de não retorno' (tipping point) da Amazônia refere-se a:",
    opcoes: [
      "O limite de desmatamento a partir do qual a floresta perde capacidade de se regenerar, convertendo-se em savana.",
      "A proibição definitiva da navegação comercial nos rios da Bacia Amazônica.",
      "O momento em que os recursos hídricos fluviais deixam de abastecer o Oceano Atlântico.",
      "A transição total do uso de energia fóssil para solar em capitais do Norte."
    ],
    correta: 0,
    explicacao: "Refere-se ao limiar de degradação ecológica onde a floresta tropical irreversivelmente se degrada."
  },

  // --- MÓDULO 4: FINANCEIRO E ANÁLISE DE DADOS ---
  {
    modulo: 4,
    materia: "Matemática",
    enunciado: "Um estande de artesanato regional vendeu R$ 15.000,00 durante o evento. Sabendo que 40% do valor foi destinado a custos operacionais, 35% ao pagamento dos artesãos e o restante foi lucro líquido, qual o valor do lucro?",
    svg: `<svg viewBox="0 0 280 40" style="width:100%; max-width:280px; margin: 10px auto; display:block;">
      <rect x="0" y="10" width="112" height="20" fill="#ef4444" />
      <rect x="112" y="10" width="98" height="20" fill="#f59e0b" />
      <rect x="210" y="10" width="70" height="20" fill="#10b981" />
      <text x="56" y="25" fill="#fff" font-size="10" text-anchor="middle">Custos (40%)</text>
      <text x="161" y="25" fill="#fff" font-size="10" text-anchor="middle">Artesãos (35%)</text>
      <text x="245" y="25" fill="#fff" font-size="10" text-anchor="middle">Lucro (?%)</text>
    </svg>`,
    opcoes: ["R$ 3.750,00", "R$ 5.250,00", "R$ 6.000,00", "R$ 4.500,00"],
    correta: 0,
    explicacao: "Porcentagem do lucro = 100% - (40% + 35%) = 25%. Lucro em reais = 25% de 15.000 = 0,25 × 15.000 = R$ 3.750,00."
  },
  {
    modulo: 4,
    materia: "Português / Coesão Textual",
    enunciado: "Qual dos pronomes destacados indica um uso anafórico correto no texto: 'Os pesquisadores apresentaram o relatório. **Estes** dados servirão para mitigar riscos.'",
    opcoes: [
      "Incorreto; o termo correto para retomar o termo citado imediatamente anterior seria 'estes' caso se refira a relatórios próximos, mas 'esses' para retomada coesiva padrão.",
      "Correto; 'estes' sempre refere-se a informações que ainda serão ditas no texto subsequente.",
      "Incorreto; deveria ser substituído por 'aqueles' pois refere-se à primeira pessoa do discurso.",
      "Correto; não há diferença entre 'estes', 'esses' e 'aqueles' na norma culta escrita."
    ],
    correta: 0,
    explicacao: "Na coesão textual, 'esses' retoma informações já mencionadas previamente (uso anafórico)."
  },
  {
    modulo: 4,
    materia: "Matemática",
    enunciado: "Uma verba de R$ 120.000,00 foi dividida proporcionalmente entre 3 projetos de reflorestamento A, B e C, cujas áreas medem respectivamente 2, 3 e 5 hectares. Quanto recebeu o projeto C?",
    opcoes: ["R$ 60.000,00", "R$ 36.000,00", "R$ 24.000,00", "R$ 50.000,00"],
    correta: 0,
    explicacao: "Soma das partes = 2 + 3 + 5 = 10. Valor por hectare = 120.000 / 10 = R$ 12.000. Projeto C (5 hectares) = 5 × 12.000 = R$ 60.000,00."
  },
  {
    modulo: 4,
    materia: "Conhecimentos Gerais / Legislação",
    enunciado: "O Fundo Florestas Tropicais para Sempre (TFFF), proposto em debates internacionais pelo Brasil, busca fundamentalmente:",
    opcoes: [
      "Remunerar países tropicais pela conservação de suas florestas em pé.",
      "Financiar a expansão de indústrias poluentes com tecnologia limpa.",
      "Substituir os acordos do Protocolo de Quioto por impostos sobre carbono de pessoas físicas.",
      "Cobrar tarifas alfandegárias de produtos agrícolas exportados pela América do Sul."
    ],
    correta: 0,
    explicacao: "A proposta visa criar um mecanismo internacional para remunerar a preservação de florestas tropicais."
  },

  // --- MÓDULO 5: REVISÃO E APLICAÇÕES PRÁTICAS ---
  {
    modulo: 5,
    materia: "Matemática",
    enunciado: "O gráfico a seguir indica o tempo gasto (em minutos) por 4 palestras consecutivas no evento. Qual foi a média de duração dessas palestras?",
    svg: `<svg viewBox="0 0 280 100" style="width:100%; max-width:280px; margin: 10px auto; display:block; fill:#fff;">
      <rect x="20" y="20" width="30" height="60" fill="#008542"/><text x="35" y="95" font-size="10" text-anchor="middle">P1: 60m</text>
      <rect x="80" y="35" width="30" height="45" fill="#008542"/><text x="95" y="95" font-size="10" text-anchor="middle">P2: 45m</text>
      <rect x="140" y="10" width="30" height="70" fill="#008542"/><text x="155" y="95" font-size="10" text-anchor="middle">P3: 70m</text>
      <rect x="200" y="40" width="30" height="40" fill="#008542"/><text x="215" y="95" font-size="10" text-anchor="middle">P4: 45m</text>
    </svg>`,
    opcoes: ["55 minutos", "50 minutos", "60 minutos", "52 minutos"],
    correta: 0,
    explicacao: "Soma das durações = 60 + 45 + 70 + 45 = 220 minutos. Média = 220 / 4 = 55 minutos."
  },
  {
    modulo: 5,
    materia: "Português / Figuras de Linguagem",
    enunciado: "Na frase 'A Amazônia pede socorro diante das altas temperaturas', identifica-se a figura de linguagem conhecida como:",
    opcoes: ["Personificação (ou Prosopopeia)", "Metonymia", "Hipérbole", "Antítese"],
    correta: 0,
    explicacao: "Atribui-se uma ação humana ('pedir socorro') a um elemento inanimado/geográfico (a floresta)."
  },
  {
    modulo: 5,
    materia: "Matemática",
    enunciado: "Em uma maquete do parque ecológico feita na escala 1:500, a pista de caminhada mede 12 cm. Qual é o comprimento real dessa pista em metros?",
    opcoes: ["60 metros", "600 metros", "6 metros", "120 metros"],
    correta: 0,
    explicacao: "Tamanho real = 12 cm × 500 = 6.000 cm. Convertendo cm para metros (dividindo por 100): 6.000 / 100 = 60 metros."
  },
  {
    modulo: 5,
    materia: "Conhecimentos Gerais / PROITEC",
    enunciado: "O programa PROITEC do IFRN tem como finalidade principal:",
    opcoes: [
      "Aprofundar a formação de estudantes de escolas públicas do RN para o ingresso nos cursos técnicos integrados.",
      "Oferecer bolsas de estudo internacionais de pós-graduação para professores.",
      "Financiar a infraestrutura de laboratórios de universidades privadas regionais.",
      "Promover vestibulares diretos para cursos superiores de graduação à distância."
    ],
    correta: 0,
    explicacao: "O PROITEC é um programa do IFRN voltado ao aperfeiçoamento da aprendizagem de alunos da rede pública de ensino do RN."
  }
];

// ==========================================
// VARIÁVEIS DE ESTADO E FLUXO DO QUIZ
// ==========================================
let questoesEmbaralhadas = [];
let indiceAtual = 0;
let tempoRestante = 60;
let timerInterval = null;
let respostasUsuario = {};

function mostrarTextoBase() {
  const nomeInput = document.getElementById("nome-aluno");
  const nome = nomeInput ? nomeInput.value.trim() : "";
  if (!nome) {
    alert("Por favor, digite seu nome antes de iniciar!");
    return;
  }
  clearInterval(timerInterval);
  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("tela-texto").style.display = "block";
  document.getElementById("tela-quiz").style.display = "none";
  document.getElementById("tela-resultados").style.display = "none";
}

function iniciarSimulado() {
  questoesEmbaralhadas = [...bancoQuestoes];
  indiceAtual = 0;
  respostasUsuario = {};
  
  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("tela-texto").style.display = "none";
  document.getElementById("tela-resultados").style.display = "none";
  document.getElementById("tela-quiz").style.display = "block";
  
  const totalDisplay = document.getElementById("total-questoes");
  if (totalDisplay) totalDisplay.textContent = questoesEmbaralhadas.length;

  carregarQuestao();
}

function iniciarCronometro() {
  clearInterval(timerInterval);
  tempoRestante = 60;
  atualizarDisplayTimer();

  const timerBox = document.getElementById("cronometro-box");
  if (timerBox) timerBox.classList.remove("alerta");

  timerInterval = setInterval(() => {
    tempoRestante--;
    atualizarDisplayTimer();

    if (tempoRestante <= 10 && timerBox) {
      timerBox.classList.add("alerta");
    }

    if (tempoRestante <= 0) {
      clearInterval(timerInterval);
      proximaQuestao();
    }
  }, 1000);
}

function atualizarDisplayTimer() {
  const minutos = String(Math.floor(tempoRestante / 60)).padStart(2, '0');
  const segundos = String(tempoRestante % 60).padStart(2, '0');
  const timerDisplay = document.getElementById("tempo-restante");
  if (timerDisplay) timerDisplay.textContent = `${minutos}:${segundos}`;
}

function carregarQuestao() {
  const q = questoesEmbaralhadas[indiceAtual];

  document.getElementById("modulo-tag").textContent = `Módulo ${q.modulo}/5`;
  document.getElementById("quiz-materia").textContent = q.materia;
  document.getElementById("quiz-enunciado").textContent = `${indiceAtual + 1}. ${q.enunciado}`;
  document.getElementById("questao-atual-num").textContent = `Questão ${indiceAtual + 1}`;

  const mathBox = document.getElementById("quiz-math-container");
  if (mathBox) {
    if (q.svg) {
      mathBox.innerHTML = q.svg;
      mathBox.style.display = "flex";
    } else {
      mathBox.innerHTML = "";
      mathBox.style.display = "none";
    }
  }

  const opcoesContainer = document.getElementById("quiz-opcoes");
  opcoesContainer.innerHTML = "";

  q.opcoes.forEach((opcao, idx) => {
    const label = document.createElement("label");
    label.className = "opcao-resposta";
    if (respostasUsuario[indiceAtual] === idx) {
      label.classList.add("selecionada");
    }

    label.innerHTML = `
      <input type="radio" name="resposta" value="${idx}" ${respostasUsuario[indiceAtual] === idx ? 'checked' : ''}>
      <span>${opcao}</span>
    `;

    label.addEventListener("click", () => {
      document.querySelectorAll(".opcao-resposta").forEach(el => el.classList.remove("selecionada"));
      label.classList.add("selecionada");
      respostasUsuario[indiceAtual] = idx;
    });

    opcoesContainer.appendChild(label);
  });

  const progresso = ((indiceAtual + 1) / questoesEmbaralhadas.length) * 100;
  const barraProgresso = document.getElementById("barra-progresso");
  if (barraProgresso) barraProgresso.style.width = `${progresso}%`;

  const btnAnterior = document.getElementById("btn-anterior");
  if (btnAnterior) btnAnterior.disabled = indiceAtual === 0;

  const btnProximo = document.getElementById("btn-proximo");
  if (btnProximo) {
    btnProximo.textContent = (indiceAtual === questoesEmbaralhadas.length - 1) ? "Finalizar Simulado" : "Próxima Questão";
  }

  iniciarCronometro();
}

function proximaQuestao() {
  if (indiceAtual < questoesEmbaralhadas.length - 1) {
    indiceAtual++;
    carregarQuestao();
  } else {
    clearInterval(timerInterval);
    finalizarSimulado();
  }
}

function questaoAnterior() {
  if (indiceAtual > 0) {
    indiceAtual--;
    carregarQuestao();
  }
}

// ==========================================
// RENDERIZAÇÃO DOS RESULTADOS, CERTIFICADO E RANKING
// ==========================================
function finalizarSimulado() {
  clearInterval(timerInterval);
  document.getElementById("tela-quiz").style.display = "none";
  document.getElementById("tela-resultados").style.display = "block";

  const nomeInput = document.getElementById("nome-aluno");
  const nomeAluno = nomeInput && nomeInput.value.trim() ? nomeInput.value.trim() : "Estudante";
  
  let acertos = 0;
  let erros = 0;
  let naoRespondidas = 0;

  questoesEmbaralhadas.forEach((q, idx) => {
    const resp = respostasUsuario[idx];
    if (resp === undefined) {
      naoRespondidas++;
    } else if (resp === q.correta) {
      acertos++;
    } else {
      erros++;
    }
  });

  const total = questoesEmbaralhadas.length;
  const percentual = Math.round((acertos / total) * 100);

  // Mensagem de Feedback
  const feedbackCaixa = document.getElementById("feedback-caixa");
  if (feedbackCaixa) {
    if (percentual >= 80) {
      feedbackCaixa.innerHTML = `<strong>Desempenho Excelente! (${percentual}%)</strong><br>Parabéns, ${nomeAluno}! Você demonstrou excelente domínio das disciplinas.`;
    } else if (percentual >= 60) {
      feedbackCaixa.innerHTML = `<strong>Bom Desempenho! (${percentual}%)</strong><br>Muito bem, ${nomeAluno}! Você conquistou o certificado de aproveitamento.`;
    } else {
      feedbackCaixa.innerHTML = `<strong>Atenção Necessária (${percentual}%)</strong><br>Sugerimos revisar as resoluções detalhadas abaixo e praticar novamente.`;
    }
  }

  // Cards Estatísticos
  const statsGrid = document.getElementById("estatisticas-grid");
  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="card" style="text-align: center; padding: 12px;">
        <h3 style="color: var(--ifrn-green-light, #10b981); margin: 0;">${acertos}</h3>
        <p style="margin: 0; font-size: 0.8rem;">Acertos</p>
      </div>
      <div class="card" style="text-align: center; padding: 12px;">
        <h3 style="color: var(--ifrn-red, #ef4444); margin: 0;">${erros}</h3>
        <p style="margin: 0; font-size: 0.8rem;">Incorretos</p>
      </div>
      <div class="card" style="text-align: center; padding: 12px;">
        <h3 style="color: var(--text-muted, #a3a3a3); margin: 0;">${naoRespondidas}</h3>
        <p style="margin: 0; font-size: 0.8rem;">Sem Responder</p>
      </div>
      <div class="card" style="text-align: center; padding: 12px;">
        <h3 style="color: #3b82f6; margin: 0;">${percentual}%</h3>
        <p style="margin: 0; font-size: 0.8rem;">Aproveitamento</p>
      </div>
    `;
  }

  salvarNoRanking(nomeAluno, acertos, percentual);
  exibirRanking();

  const secaoCertificado = document.getElementById("secao-certificado");
  if (secaoCertificado) {
    if (percentual >= 60) {
      secaoCertificado.style.display = "block";
      gerarCertificadoSVG(nomeAluno, percentual);
    } else {
      secaoCertificado.style.display = "none";
    }
  }

  // Gabarito Detalhado e Comentado
  const gabaritoLista = document.getElementById("gabarito-lista");
  if (gabaritoLista) {
    gabaritoLista.innerHTML = "";

    questoesEmbaralhadas.forEach((q, idx) => {
      const resp = respostasUsuario[idx];
      const acertou = resp === q.correta;
      const classeStatus = acertou ? "gabarito-correto" : "gabarito-incorreto";
      
      const respostaTexto = resp !== undefined ? q.opcoes[resp] : "Não respondida";
      const corretaTexto = q.opcoes[q.correta];

      const item = document.createElement("div");
      item.className = `gabarito-item ${classeStatus}`;
      item.innerHTML = `
        <p style="margin-bottom: 5px;"><strong>${idx + 1}. [${q.materia}]</strong> ${q.enunciado}</p>
        <p style="font-size: 0.9rem; margin-bottom: 3px;">Sua resposta: <span style="color: ${acertou ? 'var(--ifrn-green-light, #10b981)' : 'var(--ifrn-red, #ef4444)'};">${respostaTexto}</span></p>
        ${!acertou ? `<p style="font-size: 0.9rem; margin-bottom: 3px;">Resposta correta: <span style="color: var(--ifrn-green-light, #10b981);">${corretaTexto}</span></p>` : ''}
        <p style="font-size: 0.85rem; color: var(--text-muted, #a3a3a3); margin-top: 8px;"><em>Resolução / Explicação: ${q.explicacao}</em></p>
      `;
      gabaritoLista.appendChild(item);
    });
  }
}

function salvarNoRanking(nome, acertos, percentual) {
  let ranking = JSON.parse(localStorage.getItem("ranking_quiz") || "[]");
  ranking.push({ nome, acertos, percentual, data: new Date().toLocaleDateString("pt-BR") });
  ranking.sort((a, b) => b.percentual - a.percentual || b.acertos - a.acertos);
  ranking = ranking.slice(0, 5);
  localStorage.setItem("ranking_quiz", JSON.stringify(ranking));
}

function exibirRanking() {
  const ranking = JSON.parse(localStorage.getItem("ranking_quiz") || "[]");
  const container = document.getElementById("tabela-ranking");
  
  if (!container) return;

  if (ranking.length === 0) {
    container.innerHTML = "<p style='text-align:center; color: var(--text-muted, #a3a3a3);'>Nenhum registro no ranking ainda.</p>";
    return;
  }

  let html = "<ol style='margin: 0; padding-left: 20px;'>";
  ranking.forEach((item) => {
    html += `<li style='margin-bottom: 8px; font-size: 0.95rem; color: white;'>
      <strong>${item.nome}</strong> - <span style='color: var(--ifrn-green-light, #10b981); font-weight: bold;'>${item.percentual}%</span> (${item.acertos} acertos) <span style='font-size:0.75rem; color:var(--text-muted, #a3a3a3);'>- ${item.data}</span>
    </li>`;
  });
  html += "</ol>";
  container.innerHTML = html;
}

// ==========================================
// CERTIFICADO MELHORADO (FUNDO BRANCO + LOGO IF + ASSINATURA)
// ==========================================
function gerarCertificadoSVG(nome, percentual) {
  const container = document.getElementById("certificado-svg-wrapper");
  if (!container) return;

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  container.innerHTML = `
    <svg viewBox="0 0 800 550" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&amp;family=Plus+Jakarta+Sans:wght@400;600;800&amp;display=swap');
          .title-cert { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; fill: #008542; }
          .text-body { font-family: 'Plus Jakarta Sans', sans-serif; fill: #334155; }
          .signature-text { font-family: 'Dancing Script', cursive; font-size: 28px; fill: #0f172a; }
        </style>
      </defs>

      <rect x="0" y="0" width="800" height="550" fill="#ffffff" rx="12"/>

      <rect x="15" y="15" width="770" height="520" fill="none" stroke="#008542" stroke-width="4" rx="8"/>
      <rect x="22" y="22" width="756" height="506" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6,4"/>

      <path d="M 15 45 L 45 15 M 15 505 L 45 535 M 785 45 L 755 15 M 785 505 L 755 535" stroke="#008542" stroke-width="3"/>

      <circle cx="400" cy="275" r="160" fill="#008542" opacity="0.03"/>

      <g transform="translate(60, 45)">
        <rect x="0" y="0" width="12" height="12" fill="#c8102e" rx="2"/>
        <rect x="15" y="0" width="12" height="12" fill="#008542" rx="2"/>
        <rect x="30" y="0" width="12" height="12" fill="#008542" rx="2"/>
        <rect x="0" y="15" width="12" height="12" fill="#008542" rx="2"/>
        <rect x="15" y="15" width="12" height="12" fill="#008542" rx="2"/>
        <rect x="0" y="30" width="12" height="12" fill="#008542" rx="2"/>
        <rect x="15" y="30" width="12" height="12" fill="#008542" rx="2"/>
        <rect x="30" y="30" width="12" height="12" fill="#008542" rx="2"/>
        <rect x="0" y="45" width="12" height="12" fill="#008542" rx="2"/>
        <text x="50" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="16" fill="#008542">IFRN</text>
      </g>

      <text x="400" y="75" class="title-cert" font-size="24" text-anchor="middle" letter-spacing="1">CERTIFICADO DE APROVEITAMENTO</text>
      <text x="400" y="98" class="text-body" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">PROCESSO SELETIVO E PREPARATÓRIO PROITEC / IFRN</text>

      <line x1="150" y1="115" x2="650" y2="115" stroke="#e2e8f0" stroke-width="2"/>

      <text x="400" y="165" class="text-body" font-size="15" text-anchor="middle">Certificamos para os devidos fins que</text>
      <text x="400" y="215" class="title-cert" font-size="28" fill="#0f172a" text-anchor="middle">${nome}</text>
      <line x1="220" y1="230" x2="580" y2="230" stroke="#008542" stroke-width="1.5"/>

      <text x="400" y="275" class="text-body" font-size="14" text-anchor="middle">concluiu com êxito o Simulado Preparatório das disciplinas de</text>
      <text x="400" y="298" class="text-body" font-size="14" font-weight="bold" fill="#008542" text-anchor="middle">Língua Portuguesa, Matemática e Conhecimentos Gerais</text>
      <text x="400" y="335" class="text-body" font-size="14" text-anchor="middle">obtendo um rendimento geral de <tspan font-weight="800" fill="#008542" font-size="16">${percentual}%</tspan> de aproveitamento.</text>

      <g transform="translate(130, 390)">
        <circle cx="30" cy="30" r="28" fill="#008542" opacity="0.1"/>
        <circle cx="30" cy="30" r="22" fill="none" stroke="#008542" stroke-width="2"/>
        <path d="M 20 30 L 27 37 L 42 20" fill="none" stroke="#008542" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <g transform="translate(520, 380)">
        <text x="110" y="25" class="signature-text" text-anchor="middle">Lionel Messi</text>
        <line x1="10" y1="35" x2="210" y2="35" stroke="#94a3b8" stroke-width="1"/>
        <text x="110" y="50" class="text-body" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">Lionel Messi</text>
        <text x="110" y="63" class="text-body" font-size="10" fill="#94a3b8" text-anchor="middle">Criador da Plataforma Educacional</text>
      </g>

      <text x="230" y="420" class="text-body" font-size="11" fill="#64748b">Data de Emissão: ${dataHoje}</text>
      <text x="230" y="435" class="text-body" font-size="10" fill="#94a3b8">Código de Autenticação: PRO-IFRN-${Math.floor(100000 + Math.random() * 900000)}</text>
    </svg>
  `;
}
