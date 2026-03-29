export type TeamProfile = "dev" | "data" | "operations";

export interface LevelOption {
  level: number;
  label: string;
  description: string;
  color: string;
}

export interface Question {
  id: string;
  dimension: string;
  dimensionLabel: string;
  icon: string; // SVG path
  text: string;
  options: LevelOption[];
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  type: "article" | "video" | "guide" | "tool";
}

export interface DimensionResources {
  low: { insight: string; resources: Resource[] };
  mid: { insight: string; resources: Resource[] };
  high: { insight: string; resources: Resource[] };
}

export interface FluencyLevel {
  level: number;
  name: string;
  label: string;
  description: string;
  phase: string;
  phaseDescription: string;
}

export const teamProfiles: { id: TeamProfile; label: string; icon: string; description: string }[] = [
  {
    id: "dev",
    label: "Desenvolvimento",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />',
    description: "Engenharia de software, produto e QA",
  },
  {
    id: "data",
    label: "Dados",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />',
    description: "Cientistas de dados, analistas e BI",
  },
  {
    id: "operations",
    label: "Operações",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />',
    description: "Operações, financeiro, CS, administrativo",
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

// Dimension icons (Heroicons outline, 24x24 viewBox)
export const dimensionIcons: Record<string, string> = {
  uso: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />',
  lideranca: '<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />',
  processos: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />',
  dados: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />',
  documentacao: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />',
  metricas: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />',
};

// Level colors from red (0) to blue (4)
const levelColors = ["#EF4444", "#F59E0B", "#EAB308", "#2B99E3", "#05629F"];

export const questions: Question[] = [
  {
    id: "uso",
    dimension: "uso",
    dimensionLabel: "Uso Atual",
    icon: dimensionIcons.uso,
    text: "Como sua equipe usa IA generativa hoje?",
    options: [
      { level: 0, label: "Ninguém usa", description: "IA não faz parte do trabalho", color: levelColors[0] },
      { level: 1, label: "Uso escondido", description: "Algumas pessoas usam por conta, sem compartilhar", color: levelColors[1] },
      { level: 2, label: "Já testamos", description: "Experimentamos ferramentas, mas não virou rotina", color: levelColors[2] },
      { level: 3, label: "Uso regular", description: "Boa parte do time usa IA no trabalho", color: levelColors[3] },
      { level: 4, label: "Integrado", description: "IA está nos fluxos — sabemos onde usar e onde não", color: levelColors[4] },
    ],
  },
  {
    id: "lideranca",
    dimension: "lideranca",
    dimensionLabel: "Liderança & Cultura",
    icon: dimensionIcons.lideranca,
    text: "Como a liderança se posiciona sobre IA?",
    options: [
      { level: 0, label: "Ausente", description: "Não usa e não demonstra interesse", color: levelColors[0] },
      { level: 1, label: "Curioso", description: "Demonstra interesse, mas não pratica", color: levelColors[1] },
      { level: 2, label: "Tolera", description: "Permite uso, mas sem diretrizes ou incentivo", color: levelColors[2] },
      { level: 3, label: "Incentiva", description: "Usa IA e encoraja o time a experimentar", color: levelColors[3] },
      { level: 4, label: "Lidera", description: "Usa diariamente, compartilha e dá exemplo", color: levelColors[4] },
    ],
  },
  {
    id: "processos",
    dimension: "processos",
    dimensionLabel: "Processos & Workflows",
    icon: dimensionIcons.processos,
    text: "Os fluxos de trabalho foram adaptados para IA?",
    options: [
      { level: 0, label: "Intocados", description: "Processos são exatamente como antes", color: levelColors[0] },
      { level: 1, label: "Improvisado", description: "Algumas pessoas usam IA dentro do processo, por conta", color: levelColors[1] },
      { level: 2, label: "Em discussão", description: "Já pensamos em adaptar, mas não implementamos", color: levelColors[2] },
      { level: 3, label: "Adaptados", description: "Alguns fluxos foram redesenhados com IA", color: levelColors[3] },
      { level: 4, label: "Repensados", description: "Fluxos principais foram reimaginados com IA integrada", color: levelColors[4] },
    ],
  },
  {
    id: "dados",
    dimension: "dados",
    dimensionLabel: "Dados & Infraestrutura",
    icon: dimensionIcons.dados,
    text: "Os dados da equipe estão prontos para uso com IA?",
    options: [
      { level: 0, label: "Inacessíveis", description: "Dados em sistemas isolados ou indisponíveis", color: levelColors[0] },
      { level: 1, label: "Manual", description: "Acesso existe, mas exige exportar e copiar/colar", color: levelColors[1] },
      { level: 2, label: "Disponíveis", description: "Dados acessíveis, mas sem estrutura para IA", color: levelColors[2] },
      { level: 3, label: "Organizados", description: "Dados estruturados que alimentam ferramentas de IA", color: levelColors[3] },
      { level: 4, label: "Integrados", description: "Dados documentados e conectados automaticamente", color: levelColors[4] },
    ],
  },
  {
    id: "documentacao",
    dimension: "documentacao",
    dimensionLabel: "Documentação & Conhecimento",
    icon: dimensionIcons.documentacao,
    text: "A equipe documenta como usa IA?",
    options: [
      { level: 0, label: "Nada", description: "Cada um faz do seu jeito, sem compartilhar", color: levelColors[0] },
      { level: 1, label: "Pessoal", description: "Algumas pessoas anotam para si, mas não compartilham", color: levelColors[1] },
      { level: 2, label: "Informal", description: "Dicas trocadas no Slack ou em conversas", color: levelColors[2] },
      { level: 3, label: "Documentado", description: "Existe um guia ou catálogo de prompts do time", color: levelColors[3] },
      { level: 4, label: "Grimório vivo", description: "Catálogo atualizado com fronteira mapeada e revisada", color: levelColors[4] },
    ],
  },
  {
    id: "metricas",
    dimension: "metricas",
    dimensionLabel: "Métricas & Resultados",
    icon: dimensionIcons.metricas,
    text: "A equipe mede o impacto do uso de IA?",
    options: [
      { level: 0, label: "Sem métricas", description: "Não medimos nada relacionado a IA", color: levelColors[0] },
      { level: 1, label: "Percepção", description: "Sensação de que ajuda, mas sem números", color: levelColors[1] },
      { level: 2, label: "Tentativas", description: "Já tentamos medir, mas sem consistência", color: levelColors[2] },
      { level: 3, label: "Medindo", description: "Métricas de antes/depois em alguns processos", color: levelColors[3] },
      { level: 4, label: "Otimizando", description: "Medição contínua que guia onde expandir o uso", color: levelColors[4] },
    ],
  },
];

export const fluencyLevels: FluencyLevel[] = [
  {
    level: 0,
    name: "Ausente",
    label: "Nível 0 — Ausente",
    description: "Sua equipe ainda não começou a usar IA no trabalho. O tema pode estar no radar, mas ninguém colocou a mão na massa.",
    phase: "MAPEAR",
    phaseDescription: "O primeiro passo é um diagnóstico rápido: entender onde vocês estão, identificar um problema concreto que IA pode resolver, e encontrar a pessoa curiosa do time que vai puxar o experimento.",
  },
  {
    level: 1,
    name: "Clandestino",
    label: "Nível 1 — Clandestino",
    description: "Algumas pessoas já usam IA por conta própria — provavelmente sem compartilhar. Existe uso, mas é invisível e inconsistente.",
    phase: "MAPEAR",
    phaseDescription: "Vocês precisam tornar o uso visível e seguro. Mapeie quem já usa, o que funciona, e selecione o primeiro problema real para atacar com IA de forma estruturada.",
  },
  {
    level: 2,
    name: "Experimental",
    label: "Nível 2 — Experimental",
    description: "A equipe já testou ferramentas de IA, mas o uso não pegou. Faltou estrutura, acompanhamento ou um resultado concreto que gerasse desejo de continuar.",
    phase: "DEMONSTRAR",
    phaseDescription: "Vocês precisam de um 'momento aha': alguém resolver um problema real usando IA, gerando um resultado tangível que transforma curiosidade em desejo de praticar.",
  },
  {
    level: 3,
    name: "Praticante",
    label: "Nível 3 — Praticante",
    description: "A equipe usa IA regularmente com algum processo definido. Já existem resultados visíveis. O desafio agora é consolidar e medir.",
    phase: "IMERGIR → ENRAIZAR",
    phaseDescription: "Hora de aprofundar: construir o 'grimório' da equipe, medir resultados formalmente e garantir que os hábitos se sustentem sem depender de uma pessoa só.",
  },
  {
    level: 4,
    name: "Fluente",
    label: "Nível 4 — Fluente",
    description: "IA está integrada no fluxo de trabalho. O time sabe onde usar e onde não usar, documenta, mede e atualiza práticas continuamente.",
    phase: "ENRAIZAR",
    phaseDescription: "Sua equipe já atingiu fluência. O foco é sustentar, revisar a fronteira quando novos modelos surgem, e multiplicar para outros times.",
  },
];

export function getPhaseRecommendations(level: number): string[] {
  if (level <= 1) {
    return [
      "Faça um diagnóstico rápido do time — mapeie ferramentas, processos e dados acessíveis",
      "Identifique o 'campeão natural': a pessoa curiosa que já testou IA por conta",
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
      "Estruture sessões de prática: consultor + membro do time resolvendo problemas juntos",
      "Construa o 'grimório': catálogo de prompts, contexto documentado, fronteira mapeada",
      "Meça antes/depois com métricas concretas do seu contexto",
      "Garanta que cada pessoa complete ao menos 3 tarefas reais com IA sem supervisão",
    ];
  }
  return [
    "Formalize a medição de resultados e compare com o baseline",
    "Consolide hábitos em rituais do time (retrospectivas, atualizações de grimório)",
    "Revise a fronteira periodicamente — o que não funcionava há 3 meses pode funcionar agora",
    "Use o caso de sucesso documentado para multiplicar para outros times",
  ];
}

// --- Per-dimension resources ---

export const dimensionResources: Record<string, DimensionResources> = {
  uso: {
    low: {
      insight: "Seu time ainda não incorporou IA no dia a dia. O primeiro passo é criar um espaço seguro para experimentação com problemas reais — não workshops teóricos.",
      resources: [
        {
          title: "Cointeligência — Ethan Mollick (livro em pt-BR)",
          description: "O livro que define como pensar sobre IA como parceira, não ferramenta. Traduzido pela Intrínseca em 2025.",
          url: "https://www.amazon.com.br/Cointelig%C3%AAncia-vida-trabalho-com-IA-ebook/dp/B0F3XTMRX9",
          type: "article",
        },
        {
          title: "Como preparar sua equipe para IA — Exame",
          description: "Guia prático: como educar colaboradores, dissipar mitos e treinar equipes para adoção de IA.",
          url: "https://exame.com/carreira/guia-de-carreira/como-preparar-sua-equipe-para-incorporar-a-inteligencia-artificial-no-trabalho/",
          type: "guide",
        },
        {
          title: "Guia prático: IA no trabalho — Roberto Dias Duarte",
          description: "Guia completo de um consultor brasileiro sobre adaptação ao uso de IA no ambiente de trabalho.",
          url: "https://www.robertodiasduarte.com.br/inteligencia-artificial-no-trabalho-guia-completo-para-se-adaptar/",
          type: "guide",
        },
      ],
    },
    mid: {
      insight: "Uso existe, mas é inconsistente. Falta estrutura e acompanhamento para transformar experimentação em hábito.",
      resources: [
        {
          title: "A fronteira irregular da IA — Impacta",
          description: "IA melhora desempenho em 40% dentro da fronteira, mas causa declínio de 23% fora. Entenda por quê.",
          url: "https://www.impacta.biz/newsletter-52-na-fronteira-irregular-da-ia-o-que-aprendemos-sobre-produtividade-e-limites-da-tecnologia/",
          type: "article",
        },
        {
          title: "Apenas 26% das empresas extraem valor da IA — Exame/BCG",
          description: "98% usam IA, mas poucos geram valor real. O estudo BCG mostra o que diferencia quem consegue.",
          url: "https://exame.com/inteligencia-artificial/pesquisa-do-bcg-indica-que-apenas-26-das-empresas-conseguem-extrair-valor-da-ia/",
          type: "article",
        },
      ],
    },
    high: {
      insight: "Bom nível de uso. O desafio agora é mapear a fronteira com precisão e manter o time atualizado conforme novas ferramentas surgem.",
      resources: [
        {
          title: "Biblioteca de prompts — Inner AI",
          description: "250+ prompts otimizados para o mercado brasileiro, organizados por área com boas práticas de PromptOps.",
          url: "https://blog.innerai.com/accessibility-and-ease-of-use-biblioteca-de-prompts-brasileiros/",
          type: "tool",
        },
        {
          title: "IA realmente aumenta a produtividade? — Exame",
          description: "Pesquisa de Mollick: IA melhora produtividade, mas pode prejudicar aprendizado quando usada sem pensamento crítico.",
          url: "https://exame.com/carreira/a-ia-realmente-aumenta-a-produtividade-esses-pesquisadores-chegaram-a-uma-conclusao-surpreendente/",
          type: "article",
        },
      ],
    },
  },
  lideranca: {
    low: {
      insight: "Sem liderança engajada, a adoção morre. O líder não precisa ser expert, mas precisa usar IA no próprio trabalho e dar espaço pro time experimentar.",
      resources: [
        {
          title: "Liderança na era da IA — FDC",
          description: "O papel do líder como integrador entre tecnologia e talento, pela Fundação Dom Cabral.",
          url: "https://posead.fdc.org.br/blog/lideranca-ia",
          type: "article",
        },
        {
          title: "Shadow AI: todo mundo usa, ninguém admite",
          description: "66% das empresas brasileiras reconhecem uso não autorizado de IA. Como tornar isso visível e seguro.",
          url: "https://www.alura.com.br/empresas/artigos/shadow-ai",
          type: "article",
        },
        {
          title: "IA na prática: ensinamentos de Andrew Ng",
          description: "Resumo em português dos passos de transformação com IA: pilotos primeiro, treinar líderes, identificar casos de uso.",
          url: "https://businessaifuture.com/inteligencia-artificial-na-pratica-aplicando-os-ensinamentos-de-andrew-ng/",
          type: "guide",
        },
      ],
    },
    mid: {
      insight: "A liderança apoia, mas falta liderar pelo exemplo. Quando o gestor usa e compartilha, o time ganha permissão implícita para experimentar.",
      resources: [
        {
          title: "5 iniciativas de IA que líderes devem buscar agora — EY Brasil",
          description: "Guia prático com cinco ações concretas para lideranças que querem sair do discurso e ir pra prática.",
          url: "https://www.ey.com/pt_br/insights/ai/five-generative-ai-initiatives-leaders-should-pursue-now",
          type: "guide",
        },
        {
          title: "Liderança e IA: harmonizando inteligência humana e artificial — Exame",
          description: "Como líderes devem equilibrar inovação tecnológica com gestão humanizada.",
          url: "https://exame.com/lideres-extraordinarios/lideranca/lideranca-na-era-da-ia-como-harmonizar-inteligencia-humana-e-artificial-na-vanguarda-da-inovacao/",
          type: "article",
        },
      ],
    },
    high: {
      insight: "Liderança engajada é seu maior ativo. Mantenha o momentum com revisões periódicas e suporte ao campeão do time.",
      resources: [
        {
          title: "Como a IA poderá empoderar qualquer negócio — Andrew Ng (TED, legendas pt)",
          description: "TED Talk com legendas em português sobre como IA pode empoderar qualquer negócio, não só big tech.",
          url: "https://www.ted.com/talks/andrew_ng_how_ai_could_empower_any_business?language=pt",
          type: "video",
        },
      ],
    },
  },
  processos: {
    low: {
      insight: "IA não é uma ferramenta que se joga por cima do processo atual. Os fluxos precisam ser repensados para capturar valor real.",
      resources: [
        {
          title: "5 fluxos otimizados com IA — Microsoft Brasil",
          description: "Exemplos concretos de workflows otimizados por IA em contexto empresarial brasileiro.",
          url: "https://news.microsoft.com/pt-br/5-fluxos-de-trabalho-que-podem-ser-otimizados-com-uso-da-ia/",
          type: "guide",
        },
        {
          title: "IA para processos e precificação por resultados",
          description: "A IA exige redesenhar o fluxo inteiro, não apenas otimizar etapas isoladas. Análise do Bret Taylor.",
          url: "https://www.robertodiasduarte.com.br/bret-taylor-ia-para-processos-e-precificacao-por-resultados/",
          type: "article",
        },
      ],
    },
    mid: {
      insight: "Já há consciência, mas falta execução. Escolha um fluxo específico, redesenhe-o com IA, teste por 2 semanas e meça.",
      resources: [
        {
          title: "Workflow Redesign: novas estruturas organizacionais",
          description: "Redesenho de estruturas organizacionais e requisitos profissionais na era da IA.",
          url: "https://medium.com/renova-inova/workflow-redesign-as-novas-estruturas-organizacionais-e-os-requisitos-profissionais-para-e62da9f92a86",
          type: "article",
        },
      ],
    },
    high: {
      insight: "Processos adaptados são um diferencial competitivo. Documente o que funciona para que o conhecimento não se perca.",
      resources: [
        {
          title: "Como medir o ROI de projetos de IA — FCamara",
          description: "As quatro dimensões de ROI em IA: eficiência operacional, redução de custos, receita e mitigação de riscos.",
          url: "https://fcamara.com/blog/como-medir-roi-projetos-ia/",
          type: "guide",
        },
      ],
    },
  },
  dados: {
    low: {
      insight: "Sem acesso a dados relevantes, IA vira brinquedo genérico. Priorize tornar os dados do time acessíveis e seguros para uso com ferramentas de IA.",
      resources: [
        {
          title: "Qualidade de dados: o papel em projetos de IA — CERTI",
          description: "O gargalo não é o modelo, é a qualidade dos dados. Artigo técnico da fundação CERTI sobre dados para IA.",
          url: "https://certi.org.br/blog/o-papel-da-qualidade-de-dados-em-projetos-de-ia-na-industria/",
          type: "article",
        },
        {
          title: "LGPD e uso de IA nas empresas — Macher Tecnologia",
          description: "Guia prático: como criar políticas de uso de IA em conformidade com a LGPD, incluindo governança e riscos.",
          url: "https://www.machertecnologia.com.br/lgpd-politica-de-uso-de-inteligencia-artificial/",
          type: "guide",
        },
      ],
    },
    mid: {
      insight: "Dados acessíveis mas sem estrutura limitam o potencial. Invista em organização e governança mínima antes de escalar.",
      resources: [
        {
          title: "Preparação de dados para IA: guia completo — Loomi",
          description: "Conectividade, temperatura e qualidade de dados para projetos de IA. Guia brasileiro completo.",
          url: "https://loomi.digital/en/conte%C3%BAdos/preparacao-de-dados-para-ia",
          type: "guide",
        },
        {
          title: "AI Readiness e segurança de datasets — DataEX",
          description: "AI Readiness com foco em segurança e responsabilidade no design de datasets para IA.",
          url: "https://www.dataex.com.br/ai-readiness-e-seguranca-de-datasets-responsabilidade-no-design-de-datasets-para-ia/",
          type: "article",
        },
      ],
    },
    high: {
      insight: "Boa infraestrutura de dados. Foque em integração direta com ferramentas de IA para eliminar fricção manual.",
      resources: [
        {
          title: "Introdução ao Claude — Documentação oficial em pt-BR",
          description: "Documentação oficial da Anthropic em português. Como conectar seus dados a modelos de linguagem.",
          url: "https://docs.anthropic.com/pt/docs/intro-to-claude",
          type: "guide",
        },
      ],
    },
  },
  documentacao: {
    low: {
      insight: "Conhecimento tácito é o maior gargalo. Se está na cabeça das pessoas, IA não pode acessar. Comece documentando o contexto mais crítico.",
      resources: [
        {
          title: "Biblioteca de prompts brasileiros — Inner AI",
          description: "250+ prompts organizados por área (marketing, jurídico, acadêmico) com versionamento e boas práticas.",
          url: "https://blog.innerai.com/accessibility-and-ease-of-use-biblioteca-de-prompts-brasileiros/",
          type: "tool",
        },
        {
          title: "TJSC publica biblioteca de prompts institucional",
          description: "Exemplo real: Tribunal de Justiça de SC criou e publicou sua biblioteca de prompts para uso interno.",
          url: "https://www.tjsc.jus.br/web/imprensa/-/tjsc-disponibiliza-biblioteca-de-prompts-para-simplificar-uso-de-ia-nos-processos",
          type: "article",
        },
      ],
    },
    mid: {
      insight: "Documentação existe mas não está otimizada para IA. Transforme guias internos em 'contexto vivo' que alimenta as ferramentas.",
      resources: [
        {
          title: "Biblioteca de prompts colaborativa — Adapta",
          description: "Biblioteca colaborativa de prompts em português para diferentes contextos profissionais.",
          url: "https://adapta.org/biblioteca-de-prompts-para-ia",
          type: "tool",
        },
      ],
    },
    high: {
      insight: "O 'grimório' do time é um ativo valioso. Mantenha-o atualizado e revise quando novos modelos surgem.",
      resources: [
        {
          title: "Engenharia de prompts acessível — Inner AI",
          description: "Boas práticas de PromptOps: como versionar, organizar e atualizar sua biblioteca de prompts.",
          url: "https://blog.innerai.com/accessibility-and-ease-of-use-biblioteca-de-prompts-brasileiros/",
          type: "guide",
        },
      ],
    },
  },
  metricas: {
    low: {
      insight: "Sem métricas, o uso de IA depende de fé. Defina um baseline simples antes de qualquer iniciativa — depois meça o depois.",
      resources: [
        {
          title: "Impacto da IA no lucro das empresas — estudo BCG",
          description: "Ganhos de 30-40% de produtividade para juniores e 20-30% para seniores. Mas só se você medir.",
          url: "https://netrin.com.br/blog/estudo-global-mostra-o-impacto-da-inteligencia-artificial-no-lucro-das-empresas/",
          type: "article",
        },
        {
          title: "Como medir o ROI de projetos de IA — FCamara",
          description: "Framework prático: eficiência operacional, redução de custos, aumento de receita e mitigação de riscos.",
          url: "https://fcamara.com/blog/como-medir-roi-projetos-ia/",
          type: "guide",
        },
      ],
    },
    mid: {
      insight: "Percepções existem, mas faltam números. Escolha 2-3 métricas claras e comece a medir consistentemente.",
      resources: [
        {
          title: "Como medir o uso de IA e gerar resultados reais — StackX",
          description: "Framework com métricas de adoção, produtividade, qualidade, impacto financeiro e satisfação.",
          url: "https://www.stackx.com.br/post/como-medir-o-uso-de-ia-na-sua-empresa-e-gerar-resultados-reais",
          type: "guide",
        },
      ],
    },
    high: {
      insight: "Métricas consolidadas permitem justificar investimento e escalar. Use os dados para identificar onde expandir.",
      resources: [
        {
          title: "Do hype ao ROI: investimento em IA corporativa",
          description: "Como sair do hype e medir resultados reais. ROI documentado é o melhor argumento para escalar.",
          url: "https://www.robertodiasduarte.com.br/investimento-em-ia-corporativa-do-hype-ao-roi/",
          type: "article",
        },
      ],
    },
  },
};
