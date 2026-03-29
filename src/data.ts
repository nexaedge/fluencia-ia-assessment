export type TeamProfile = "dev" | "data" | "operations";

export interface Option {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  dimension: string;
  dimensionLabel: string;
  text: string;
  options: Option[];
}

export interface FluencyLevel {
  level: number;
  name: string;
  label: string;
  description: string;
  phase: string;
  phaseDescription: string;
}

export const teamProfiles: { id: TeamProfile; label: string; description: string }[] = [
  {
    id: "dev",
    label: "Desenvolvimento",
    description: "Times de engenharia de software, produto e QA",
  },
  {
    id: "data",
    label: "Dados",
    description: "Cientistas de dados, analistas, engenheiros de dados e BI",
  },
  {
    id: "operations",
    label: "Operações",
    description: "Times operacionais, financeiro, CS, administrativo",
  },
];

export const dimensions = [
  { id: "uso", label: "Uso Atual" },
  { id: "lideranca", label: "Liderança & Cultura" },
  { id: "processos", label: "Processos & Workflows" },
  { id: "dados", label: "Dados & Infraestrutura" },
  { id: "documentacao", label: "Documentação & Conhecimento" },
  { id: "metricas", label: "Métricas & Resultados" },
] as const;

export const questions: Question[] = [
  // --- Uso Atual ---
  {
    id: "uso-1",
    dimension: "uso",
    dimensionLabel: "Uso Atual",
    text: "Qual o nível de uso de IA generativa (ChatGPT, Copilot, Claude, etc.) no dia a dia da equipe?",
    options: [
      { label: "Ninguém usa no trabalho", value: 0 },
      { label: "Algumas pessoas usam por conta própria, sem compartilhar", value: 1 },
      { label: "A equipe já testou ferramentas, mas não virou rotina", value: 2 },
      { label: "Uso regular — faz parte do trabalho de boa parte do time", value: 3 },
      { label: "IA está integrada nos fluxos e todos sabem quando usar (e quando não usar)", value: 4 },
    ],
  },
  {
    id: "uso-2",
    dimension: "uso",
    dimensionLabel: "Uso Atual",
    text: "A equipe sabe distinguir em quais tarefas a IA ajuda bem e em quais ela falha?",
    options: [
      { label: "Não temos experiência suficiente para saber", value: 0 },
      { label: "Algumas pessoas têm intuição, mas nada documentado", value: 1 },
      { label: "Já tivemos experiências boas e ruins, mas sem mapeamento", value: 2 },
      { label: "Temos uma noção clara das tarefas onde IA entrega valor", value: 3 },
      { label: "Mapeamos ativamente a fronteira: onde funciona, onde não funciona, e revisamos periodicamente", value: 4 },
    ],
  },
  {
    id: "uso-3",
    dimension: "uso",
    dimensionLabel: "Uso Atual",
    text: "Como a equipe aprendeu a usar ferramentas de IA?",
    options: [
      { label: "Não aprendeu — ninguém usa", value: 0 },
      { label: "Cada um aprendeu sozinho, por curiosidade", value: 1 },
      { label: "Fizemos um workshop ou treinamento pontual", value: 2 },
      { label: "Aprendemos praticando juntos em problemas reais do trabalho", value: 3 },
      { label: "Temos prática contínua, sessões de troca e atualização quando surgem novas ferramentas", value: 4 },
    ],
  },

  // --- Liderança & Cultura ---
  {
    id: "lideranca-1",
    dimension: "lideranca",
    dimensionLabel: "Liderança & Cultura",
    text: "A liderança da equipe (gestor, tech lead, coordenador) usa IA no próprio trabalho?",
    options: [
      { label: "Não usa e não demonstra interesse", value: 0 },
      { label: "Demonstra interesse, mas não usa na prática", value: 1 },
      { label: "Usa ocasionalmente, mas não compartilha com o time", value: 2 },
      { label: "Usa regularmente e incentiva o time a experimentar", value: 3 },
      { label: "Usa diariamente, compartilha aprendizados e lidera pelo exemplo", value: 4 },
    ],
  },
  {
    id: "lideranca-2",
    dimension: "lideranca",
    dimensionLabel: "Liderança & Cultura",
    text: "Existe uma política ou diretriz sobre uso de IA na empresa?",
    options: [
      { label: "Não existe nenhuma diretriz — tema nem foi discutido", value: 0 },
      { label: "Uso é implicitamente tolerado, mas sem diretrizes formais", value: 1 },
      { label: "Existem regras informais ou orientações verbais", value: 2 },
      { label: "Temos uma política clara sobre o que pode e não pode ser feito com IA", value: 3 },
      { label: "Política documentada, revisada periodicamente, com espaço para experimentação segura", value: 4 },
    ],
  },
  {
    id: "lideranca-3",
    dimension: "lideranca",
    dimensionLabel: "Liderança & Cultura",
    text: "Existe alguém na equipe que atua como 'campeão de IA' — uma pessoa curiosa que puxa o tema?",
    options: [
      { label: "Não, ninguém se interessa particularmente", value: 0 },
      { label: "Talvez uma pessoa, mas sem reconhecimento ou espaço", value: 1 },
      { label: "Sim, mas essa pessoa atua sozinha sem apoio formal", value: 2 },
      { label: "Sim, e a liderança apoia e dá espaço para essa pessoa", value: 3 },
      { label: "Sim, com papel reconhecido de multiplicador e suporte da organização", value: 4 },
    ],
  },

  // --- Processos & Workflows ---
  {
    id: "processos-1",
    dimension: "processos",
    dimensionLabel: "Processos & Workflows",
    text: "Os fluxos de trabalho da equipe foram adaptados para incorporar IA?",
    options: [
      { label: "Não — os processos são os mesmos de antes", value: 0 },
      { label: "Algumas pessoas usam IA dentro do processo existente, por iniciativa própria", value: 1 },
      { label: "Já discutimos adaptações, mas não implementamos", value: 2 },
      { label: "Alguns fluxos foram redesenhados para incluir IA", value: 3 },
      { label: "Os principais fluxos de trabalho foram repensados com IA como parte integral", value: 4 },
    ],
  },
  {
    id: "processos-2",
    dimension: "processos",
    dimensionLabel: "Processos & Workflows",
    text: "A equipe tem ferramentas de IA configuradas e acessíveis no ambiente de trabalho?",
    options: [
      { label: "Não temos acesso a nenhuma ferramenta de IA", value: 0 },
      { label: "Algumas pessoas usam ferramentas gratuitas com contas pessoais", value: 1 },
      { label: "A empresa disponibiliza ferramentas, mas sem configuração específica", value: 2 },
      { label: "Temos ferramentas configuradas para o contexto do time", value: 3 },
      { label: "Ferramentas integradas no stack, com contexto do projeto e acesso a dados relevantes", value: 4 },
    ],
  },

  // --- Dados & Infraestrutura ---
  {
    id: "dados-1",
    dimension: "dados",
    dimensionLabel: "Dados & Infraestrutura",
    text: "Os dados que a equipe precisa estão acessíveis para uso com ferramentas de IA?",
    options: [
      { label: "Dados estão em sistemas isolados ou inacessíveis", value: 0 },
      { label: "Alguns dados estão acessíveis, mas de forma manual (exportar, copiar, colar)", value: 1 },
      { label: "Dados principais estão disponíveis, mas sem estrutura para uso com IA", value: 2 },
      { label: "Dados organizados e acessíveis — podemos alimentar ferramentas de IA com contexto relevante", value: 3 },
      { label: "Dados estruturados, documentados e integrados com ferramentas de IA automaticamente", value: 4 },
    ],
  },
  {
    id: "dados-2",
    dimension: "dados",
    dimensionLabel: "Dados & Infraestrutura",
    text: "Existem preocupações de segurança ou privacidade que limitam o uso de IA?",
    options: [
      { label: "Não sabemos — o tema não foi discutido", value: 0 },
      { label: "Existem preocupações, mas sem diretrizes claras do que pode ou não ser usado", value: 1 },
      { label: "Temos noção dos riscos, mas falta uma política formal", value: 2 },
      { label: "Temos diretrizes claras sobre quais dados podem ser usados com IA", value: 3 },
      { label: "Política de segurança documentada, com classificação de dados e regras de uso definidas", value: 4 },
    ],
  },

  // --- Documentação & Conhecimento ---
  {
    id: "documentacao-1",
    dimension: "documentacao",
    dimensionLabel: "Documentação & Conhecimento",
    text: "A equipe documenta o que funciona e o que não funciona ao usar IA?",
    options: [
      { label: "Não — cada um faz do seu jeito", value: 0 },
      { label: "Algumas pessoas anotam para si, mas não compartilham", value: 1 },
      { label: "Compartilhamos dicas informalmente (Slack, conversa)", value: 2 },
      { label: "Temos um repositório de prompts ou guia de uso documentado", value: 3 },
      { label: "Mantemos um 'grimório' vivo: catálogo de prompts, casos de uso, fronteira mapeada, atualizado regularmente", value: 4 },
    ],
  },
  {
    id: "documentacao-2",
    dimension: "documentacao",
    dimensionLabel: "Documentação & Conhecimento",
    text: "O contexto do trabalho da equipe (processos, regras de negócio, convenções) está documentado de forma que IA possa acessar?",
    options: [
      { label: "Não temos documentação — o conhecimento está na cabeça das pessoas", value: 0 },
      { label: "Documentação existe, mas está desatualizada ou espalhada", value: 1 },
      { label: "Temos documentação razoável, mas não pensada para consumo por IA", value: 2 },
      { label: "Documentação estruturada que pode ser usada como contexto em ferramentas de IA", value: 3 },
      { label: "Documentação mantida como 'contexto vivo' — atualizada e integrada ao fluxo de IA do time", value: 4 },
    ],
  },

  // --- Métricas & Resultados ---
  {
    id: "metricas-1",
    dimension: "metricas",
    dimensionLabel: "Métricas & Resultados",
    text: "A equipe mede o impacto do uso de IA no trabalho?",
    options: [
      { label: "Não medimos nada relacionado a IA", value: 0 },
      { label: "Temos percepções informais ('parece que ficou mais rápido')", value: 1 },
      { label: "Já tentamos medir, mas sem métricas definidas", value: 2 },
      { label: "Temos métricas claras de antes/depois em alguns processos", value: 3 },
      { label: "Medimos continuamente: frequência de uso, produtividade, qualidade — e usamos os dados para melhorar", value: 4 },
    ],
  },
  {
    id: "metricas-2",
    dimension: "metricas",
    dimensionLabel: "Métricas & Resultados",
    text: "A equipe consegue demonstrar ROI ou valor concreto do uso de IA para a liderança?",
    options: [
      { label: "Não — não temos dados para isso", value: 0 },
      { label: "Temos histórias pontuais, mas sem números", value: 1 },
      { label: "Sabemos que ajuda, mas não quantificamos", value: 2 },
      { label: "Conseguimos mostrar ganhos concretos em ao menos um processo", value: 3 },
      { label: "Temos um caso documentado com métricas de antes/depois que usamos para justificar investimento", value: 4 },
    ],
  },
];

export const fluencyLevels: FluencyLevel[] = [
  {
    level: 0,
    name: "Ausente",
    label: "Nível 0 — Ausente",
    description: "Sua equipe ainda não começou a usar IA no trabalho. O tema pode até estar no radar, mas ninguém colocou a mão na massa ainda.",
    phase: "MAPEAR",
    phaseDescription: "O primeiro passo é um diagnóstico rápido: entender onde vocês estão, identificar um problema concreto que IA pode resolver, e encontrar a pessoa curiosa do time que vai puxar o experimento.",
  },
  {
    level: 1,
    name: "Clandestino",
    label: "Nível 1 — Clandestino",
    description: "Algumas pessoas da equipe já usam IA por conta própria — provavelmente no celular, sem contar para ninguém. Existe uso, mas é invisível e inconsistente.",
    phase: "MAPEAR",
    phaseDescription: "Vocês precisam tornar o uso visível e seguro. O diagnóstico vai mapear quem já usa, o que funciona, e selecionar o primeiro problema real para atacar com IA de forma estruturada.",
  },
  {
    level: 2,
    name: "Experimental",
    label: "Nível 2 — Experimental",
    description: "A equipe já testou ferramentas de IA, mas o uso não pegou. Faltou estrutura, acompanhamento ou um resultado concreto que gerasse desejo de continuar.",
    phase: "DEMONSTRAR",
    phaseDescription: "Vocês precisam de um 'momento aha': alguém resolver um problema real da equipe usando IA, gerando um resultado tangível. Isso transforma curiosidade em desejo de praticar.",
  },
  {
    level: 3,
    name: "Praticante",
    label: "Nível 3 — Praticante",
    description: "A equipe usa IA regularmente com algum processo definido. Já existem resultados visíveis e o time sabe onde IA ajuda. O desafio agora é consolidar.",
    phase: "IMERGIR → ENRAIZAR",
    phaseDescription: "Hora de aprofundar a prática: construir o 'grimório' da equipe, medir resultados formalmente e garantir que os hábitos se sustentem sem depender de uma pessoa só.",
  },
  {
    level: 4,
    name: "Fluente",
    label: "Nível 4 — Fluente",
    description: "IA está integrada no fluxo de trabalho da equipe. O time sabe onde usar e onde não usar, tem documentação viva, mede resultados e atualiza práticas continuamente.",
    phase: "ENRAIZAR",
    phaseDescription: "Sua equipe já atingiu fluência. O foco agora é sustentar, revisar a fronteira quando novos modelos surgem, e multiplicar o conhecimento para outros times da empresa.",
  },
];

export function getPhaseRecommendations(level: number, _profile: TeamProfile): string[] {
  if (level <= 1) {
    return [
      "Faça um diagnóstico rápido do time (não da empresa toda) — mapeie ferramentas, processos e dados acessíveis",
      "Identifique o 'campeão natural': a pessoa curiosa que já testou IA por conta própria",
      "Escolha UM problema concreto: dado acessível, resultado mensurável, baixo risco",
      "Não comece pelo problema mais estratégico — comece pelo mais viável",
    ];
  }
  if (level === 2) {
    return [
      "Resolva um problema real da equipe usando IA — mostre o resultado, não a ferramenta",
      "O objetivo é gerar desejo genuíno de experimentar, não convencer com slides",
      "Feche com compromisso concreto: data, escopo e acesso aos dados para o próximo passo",
      "Evite mostrar muitas possibilidades — foque em um resultado tangível e imediato",
    ];
  }
  if (level === 3) {
    return [
      "Estruture sessões de prática em par: consultor + membro do time resolvendo problemas reais juntos",
      "Construa o 'grimório' da equipe: catálogo de prompts, contexto documentado, fronteira mapeada",
      "Meça antes/depois com métricas concretas do seu contexto",
      "Garanta que cada pessoa do time complete ao menos 3 tarefas reais com IA sem supervisão",
    ];
  }
  return [
    "Formalize a medição de resultados e compare com o baseline",
    "Consolide hábitos em rituais do time (retrospectivas, atualizações de grimório)",
    "Revise a fronteira periodicamente — o que não funcionava há 3 meses pode funcionar agora",
    "Planeje a expansão: use o caso de sucesso documentado para multiplicar para outros times",
  ];
}

export function getDimensionInsights(dimension: string, score: number): string {
  const insights: Record<string, Record<string, string>> = {
    uso: {
      low: "Seu time ainda não incorporou IA no dia a dia. O primeiro passo é criar um espaço seguro para experimentação com problemas reais — não workshops teóricos.",
      mid: "Uso existe, mas é inconsistente. Falta estrutura e acompanhamento para transformar experimentação em hábito.",
      high: "Bom nível de uso. O desafio agora é mapear a fronteira com precisão e manter o time atualizado conforme novas ferramentas surgem.",
    },
    lideranca: {
      low: "Sem liderança engajada, a adoção morre. O líder não precisa ser expert, mas precisa usar IA no próprio trabalho e dar espaço para o time experimentar.",
      mid: "A liderança apoia, mas falta liderar pelo exemplo. Quando o gestor usa e compartilha, o time ganha permissão implícita para experimentar.",
      high: "Liderança engajada é seu maior ativo. Mantenha o momentum com revisões periódicas e suporte ao campeão do time.",
    },
    processos: {
      low: "IA não é só uma ferramenta que se joga por cima do processo atual. Os fluxos de trabalho precisam ser repensados para capturar valor real.",
      mid: "Já há consciência, mas falta execução. Escolha um fluxo específico, redesenhe-o com IA, teste por 2 semanas e meça o resultado.",
      high: "Processos adaptados são um diferencial competitivo. Documente o que funciona para que o conhecimento não se perca.",
    },
    dados: {
      low: "Sem acesso a dados relevantes, IA vira brinquedo genérico. Priorize tornar os dados do time acessíveis e seguros para uso com ferramentas de IA.",
      mid: "Dados acessíveis mas sem estrutura limitam o potencial. Invista em organização e governança mínima antes de escalar o uso.",
      high: "Boa infraestrutura de dados. Foque em integração direta com ferramentas de IA para eliminar fricção manual.",
    },
    documentacao: {
      low: "Conhecimento tácito é o maior gargalo. Se está na cabeça das pessoas, IA não pode acessar. Comece documentando o contexto mais crítico do time.",
      mid: "Documentação existe mas não está otimizada para IA. Transforme guias internos em 'contexto vivo' que alimenta as ferramentas do time.",
      high: "O 'grimório' do time é um ativo valioso. Mantenha-o atualizado e revise quando novos modelos ou ferramentas surgem.",
    },
    metricas: {
      low: "Sem métricas, o uso de IA depende de fé. Defina um baseline simples antes de qualquer iniciativa — depois meça o depois.",
      mid: "Percepções existem, mas faltam números. Escolha 2-3 métricas claras e comece a medir consistentemente.",
      high: "Métricas consolidadas permitem justificar investimento e escalar. Use os dados para identificar onde expandir o uso de IA.",
    },
  };

  const dim = insights[dimension];
  if (!dim) return "";
  if (score < 1.5) return dim.low;
  if (score < 3) return dim.mid;
  return dim.high;
}
