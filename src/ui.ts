import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js";
import { questions, teamProfiles, dimensions, dimensionResources, type TeamProfile, getPhaseRecommendations } from "./data";
import { calculateResults, type AssessmentResult, type DimensionScore } from "./scoring";

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

type Screen = "welcome" | "profile" | "question" | "results";

interface AppState {
  screen: Screen;
  profile: TeamProfile | null;
  currentQuestion: number;
  answers: Record<string, number>;
}

const state: AppState = {
  screen: "welcome",
  profile: null,
  currentQuestion: 0,
  answers: {},
};

let miniChart: Chart | null = null;
const app = document.getElementById("app")!;

// Level colors (visible on dark background)
const levelColors = ["#F87171", "#FBBF24", "#FDE047", "#38BDF8", "#34D399"];

function render() {
  if (miniChart) { miniChart.destroy(); miniChart = null; }
  switch (state.screen) {
    case "welcome": renderWelcome(); break;
    case "profile": renderProfileSelector(); break;
    case "question": renderQuestion(); break;
    case "results": renderResults(); break;
  }
}

const logoUrl = new URL("/nexaedge-logo.svg", import.meta.url).href;

function renderLogo(light = true): string {
  return `<img src="${logoUrl}" alt="NexaEdge" class="h-6 md:h-7 ${light ? "logo-light" : ""}" />`;
}

function dimIcon(svgPath: string, cls = "w-5 h-5"): string {
  return `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">${svgPath}</svg>`;
}

// ─── Welcome ───

function renderWelcome() {
  app.innerHTML = `
    <div class="ambient-glow"></div>
    <div class="relative z-10 min-h-dvh flex flex-col">
      <header class="px-6 py-6 fade-in">${renderLogo()}</header>

      <main class="flex-1 flex items-center justify-center px-6">
        <div class="max-w-2xl mx-auto text-center">
          <div class="fade-in stagger-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-text-secondary text-sm font-mono mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            Diagnóstico gratuito · 2 min
          </div>

          <h1 class="fade-in stagger-2 font-display text-4xl md:text-6xl font-bold text-text-primary leading-[1.1] mb-6 tracking-tight">
            Qual o nível de<br/>
            <span class="text-accent italic">fluência em IA</span><br/>
            da sua equipe?
          </h1>

          <p class="fade-in stagger-3 text-lg md:text-xl text-text-secondary max-w-md mx-auto mb-12 font-light leading-relaxed">
            6 perguntas. Resultado imediato com diagnóstico personalizado e recursos práticos.
          </p>

          <button id="btn-start" class="fade-in stagger-4 cta-btn inline-flex items-center gap-3 px-10 py-4 bg-accent text-white font-semibold rounded-xl text-lg cursor-pointer">
            Começar diagnóstico
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>

          <p class="fade-in stagger-5 text-sm text-text-muted mt-6 font-mono">Sem cadastro · Sem email · Resultado na hora</p>
        </div>
      </main>

      <footer class="px-6 py-5">
        <div class="divider mb-5"></div>
        <p class="text-center text-xs text-text-muted">
          Baseado em pesquisa de Mollick, Ng, BCG, Prosci e McKinsey — adaptado para PMEs brasileiras.
        </p>
      </footer>
    </div>
  `;

  document.getElementById("btn-start")!.addEventListener("click", () => {
    state.screen = "profile";
    render();
  });
}

// ─── Profile Selector ───

function renderProfileSelector() {
  app.innerHTML = `
    <div class="ambient-glow"></div>
    <div class="relative z-10 min-h-dvh flex flex-col">
      <header class="px-6 py-6 fade-in">${renderLogo()}</header>

      <main class="flex-1 flex items-center justify-center px-6 py-12">
        <div class="max-w-md mx-auto w-full">
          <p class="fade-in stagger-1 text-sm font-mono text-accent mb-3 tracking-wide uppercase">Antes de começar</p>
          <h2 class="fade-in stagger-2 font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">Qual o perfil da equipe?</h2>
          <p class="fade-in stagger-3 text-text-secondary mb-10 text-sm">Escolha o que melhor descreve o time avaliado.</p>

          <div class="space-y-3" id="profile-options">
            ${teamProfiles.map((p, i) => `
              <button data-profile="${p.id}" class="fade-in stagger-${i + 3} level-card w-full text-left px-5 py-4 flex items-center gap-4">
                <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-accent-dim border border-border-glow text-accent flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">${p.icon}</svg>
                </div>
                <div>
                  <div class="font-semibold text-text-primary">${p.label}</div>
                  <div class="text-sm text-text-muted">${p.description}</div>
                </div>
              </button>
            `).join("")}
          </div>
        </div>
      </main>
    </div>
  `;

  document.querySelectorAll("[data-profile]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.profile = btn.getAttribute("data-profile") as TeamProfile;
      state.screen = "question";
      state.currentQuestion = 0;
      render();
    });
  });
}

// ─── Question Screen ───

function renderQuestion() {
  const q = questions[state.currentQuestion];
  const total = questions.length;
  const selectedValue = state.answers[q.id];

  app.innerHTML = `
    <div class="ambient-glow"></div>
    <div class="relative z-10 min-h-dvh flex flex-col">
      <header class="px-6 py-4 flex items-center justify-between border-b border-border">
        ${renderLogo()}
        <div class="w-16 h-16 md:w-20 md:h-20 radar-glow">
          <canvas id="mini-radar"></canvas>
        </div>
      </header>

      <!-- Progress -->
      <div class="px-6 py-4">
        <div class="max-w-lg mx-auto flex items-center gap-1">
          ${Array.from({ length: total }, (_, i) => {
            const answered = state.answers[questions[i].id] !== undefined;
            const current = i === state.currentQuestion;
            const dotClasses = current
              ? "progress-dot active w-3 h-3 rounded-full bg-accent"
              : answered
                ? "progress-dot w-2.5 h-2.5 rounded-full bg-accent/60"
                : "progress-dot w-2.5 h-2.5 rounded-full bg-border";
            const lineClass = i < total - 1
              ? `progress-line ${answered ? "filled" : ""}`
              : "";
            return `<div class="${dotClasses}"></div>${lineClass ? `<div class="${lineClass}"></div>` : ""}`;
          }).join("")}
        </div>
      </div>

      <main class="flex-1 flex items-center justify-center px-6 py-4">
        <div class="max-w-lg mx-auto w-full">
          <!-- Dimension badge -->
          <div class="fade-in flex items-center gap-2.5 mb-5">
            <div class="w-8 h-8 rounded-lg bg-accent-dim border border-border-glow text-accent flex items-center justify-center">
              ${dimIcon(q.icon, "w-4 h-4")}
            </div>
            <span class="text-sm font-mono text-accent tracking-wide">${q.dimensionLabel}</span>
            <span class="text-xs text-text-muted font-mono ml-auto">${state.currentQuestion + 1}/${total}</span>
          </div>

          <h2 class="fade-in stagger-1 font-display text-xl md:text-2xl font-bold text-text-primary mb-7 leading-snug">${q.text}</h2>

          <div class="space-y-2" id="question-options">
            ${q.options.map((opt, i) => {
              const isSelected = selectedValue === opt.level;
              return `
                <button data-level="${opt.level}" class="fade-in stagger-${i + 1} level-card w-full text-left px-4 py-3.5 ${isSelected ? "selected" : ""}">
                  <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 w-2 h-8 rounded-full" style="background: ${opt.color}; opacity: ${isSelected ? 1 : 0.5}"></div>
                    <div class="flex-1 min-w-0">
                      <span class="font-semibold text-sm ${isSelected ? "text-accent" : "text-text-primary"}">${opt.label}</span>
                      <span class="text-sm ${isSelected ? "text-text-secondary" : "text-text-muted"}"> — ${opt.description}</span>
                    </div>
                  </div>
                </button>
              `;
            }).join("")}
          </div>

          <div class="flex items-center justify-between mt-8">
            <button id="btn-back" class="text-sm text-text-muted hover:text-text-secondary transition-colors cursor-pointer flex items-center gap-1 ${state.currentQuestion === 0 ? "invisible" : ""}">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
              Voltar
            </button>
            <div></div>
          </div>
        </div>
      </main>
    </div>
  `;

  renderMiniRadar();

  document.querySelectorAll("[data-level]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = parseInt(btn.getAttribute("data-level")!, 10);
      state.answers[q.id] = level;

      document.querySelectorAll("[data-level]").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      setTimeout(() => {
        if (state.currentQuestion < total - 1) state.currentQuestion++;
        else state.screen = "results";
        render();
      }, 250);
    });
  });

  document.getElementById("btn-back")?.addEventListener("click", () => {
    if (state.currentQuestion > 0) state.currentQuestion--;
    else state.screen = "profile";
    render();
  });
}

// ─── Mini Radar ───

function renderMiniRadar() {
  const canvas = document.getElementById("mini-radar") as HTMLCanvasElement | null;
  if (!canvas) return;

  const scores = dimensions.map((d) => state.answers[d.id] ?? 0);

  miniChart = new Chart(canvas, {
    type: "radar",
    data: {
      labels: dimensions.map(() => ""),
      datasets: [{
        data: scores,
        backgroundColor: "rgba(43, 153, 227, 0.15)",
        borderColor: "rgba(43, 153, 227, 0.6)",
        borderWidth: 1.5,
        pointBackgroundColor: "#2B99E3",
        pointRadius: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 300 },
      plugins: { tooltip: { enabled: false } },
      scales: {
        r: {
          min: 0, max: 4,
          ticks: { display: false },
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          angleLines: { color: "rgba(255, 255, 255, 0.05)" },
          pointLabels: { display: false },
        },
      },
    },
  });
}

// ─── Results ───

function renderResults() {
  const result = calculateResults(state.answers, state.profile!);
  const recommendations = getPhaseRecommendations(result.fluencyLevel.level);
  const levelColor = levelColors[result.fluencyLevel.level];

  const shareUrl = buildShareUrl();
  const shareText = `Minha equipe é ${result.fluencyLevel.name} em fluência de IA (${result.overallScore.toFixed(1)}/4.0). Faça o diagnóstico gratuito:`;

  app.innerHTML = `
    <div class="ambient-glow"></div>
    <div class="relative z-10 min-h-dvh flex flex-col">
      <header class="px-6 py-5 flex items-center justify-between fade-in">
        ${renderLogo()}
        <button id="btn-share-top" class="text-sm text-accent font-medium flex items-center gap-1.5 cursor-pointer hover:text-text-primary transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
          Compartilhar
        </button>
      </header>

      <main class="flex-1 px-6 py-6 md:py-10">
        <div class="max-w-3xl mx-auto">

          <!-- Level Hero -->
          <div class="text-center mb-12 fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-mono mb-5" style="border-color: ${levelColor}40; color: ${levelColor}; background: ${levelColor}10">
              ${result.fluencyLevel.label}
            </div>
            <h1 class="font-display text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
              Sua equipe é <span class="italic" style="color: ${levelColor}">${result.fluencyLevel.name}</span>
            </h1>
            <p class="text-text-secondary max-w-lg mx-auto leading-relaxed">${result.fluencyLevel.description}</p>
          </div>

          <!-- Score + Radar -->
          <div class="grid md:grid-cols-2 gap-6 mb-12 fade-in stagger-1">
            <div class="glass p-6">
              <h3 class="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">Score geral</h3>
              <div class="flex items-end gap-2 mb-6">
                <span class="text-6xl font-display font-bold" style="color: ${levelColor}">${result.overallScore.toFixed(1)}</span>
                <span class="text-text-muted text-xl mb-2 font-light">/ 4.0</span>
              </div>
              <div class="space-y-3">
                ${result.dimensionScores.map((d) => `
                  <div>
                    <div class="flex justify-between text-sm mb-1.5">
                      <span class="text-text-secondary">${d.label}</span>
                      <span class="font-mono text-text-primary">${d.score}</span>
                    </div>
                    <div class="score-bar-track">
                      <div class="score-bar-fill" style="width: ${(d.score / 4) * 100}%; background: ${levelColors[d.score]}"></div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="glass p-6 flex items-center justify-center">
              <div class="chart-container w-full radar-glow">
                <canvas id="radar-chart"></canvas>
              </div>
            </div>
          </div>

          <!-- Phase Recommendation -->
          <div class="glass-glow p-6 md:p-8 mb-10 fade-in stagger-2">
            <div class="flex items-start gap-4 mb-5">
              <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <div>
                <h3 class="font-display font-bold text-text-primary text-lg">Próxima fase: ${result.fluencyLevel.phase}</h3>
                <p class="text-text-secondary text-sm mt-1 leading-relaxed">${result.fluencyLevel.phaseDescription}</p>
              </div>
            </div>
            <div class="divider my-5"></div>
            <p class="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">Recomendações práticas</p>
            <ul class="space-y-3">
              ${recommendations.map((r) => `
                <li class="flex items-start gap-3 text-sm text-text-secondary">
                  <svg class="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>${r}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          <!-- Dimension insights -->
          <h3 class="font-mono text-xs uppercase tracking-wider text-text-muted mb-5 fade-in stagger-3">Diagnóstico por dimensão</h3>
          <div class="space-y-4 mb-12">
            ${result.dimensionScores.map((d, i) => renderDimensionCard(d, i)).join("")}
          </div>

          <!-- Share -->
          <div class="glass p-6 mb-8 fade-in stagger-4">
            <h3 class="font-display font-bold text-text-primary text-center mb-2">Compartilhe com seu time</h3>
            <p class="text-sm text-text-muted text-center mb-6">Encaminhe o diagnóstico para colegas ou liderança</p>
            <div class="flex flex-wrap justify-center gap-3" id="share-buttons">
              <a href="https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}" target="_blank" rel="noopener" class="share-btn inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-medium">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener" class="share-btn inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-xl text-sm font-medium">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="mailto:?subject=${encodeURIComponent("Diagnóstico de Fluência em IA")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}" class="share-btn inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border text-text-primary rounded-xl text-sm font-medium">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                Email
              </a>
              <button id="btn-copy-link" class="share-btn inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border text-text-primary rounded-xl text-sm font-medium cursor-pointer">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.25" /></svg>
                Copiar link
              </button>
            </div>
          </div>

          <!-- Newsletter -->
          ${renderNewsletter()}

          <div class="text-center mt-10 pb-10">
            <button id="btn-restart" class="text-sm text-text-muted hover:text-accent transition-colors cursor-pointer font-mono">
              ← Refazer diagnóstico
            </button>
          </div>
        </div>
      </main>
    </div>
  `;

  renderRadarChart(result);
  setupShareButtons(shareUrl);
  setupNewsletter();

  document.getElementById("btn-restart")?.addEventListener("click", () => {
    state.screen = "welcome";
    state.profile = null;
    state.currentQuestion = 0;
    state.answers = {};
    render();
  });
}

// ─── Dimension Card ───

function renderDimensionCard(d: DimensionScore, index: number): string {
  const res = dimensionResources[d.id];
  if (!res) return "";

  const tier = d.score < 1.5 ? "low" : d.score < 3 ? "mid" : "high";
  const data = res[tier];
  const color = levelColors[d.score];

  const typeIcons: Record<string, string> = {
    article: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V6.375c0-.621.504-1.125 1.125-1.125h3.375" />',
    video: '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />',
    guide: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />',
    tool: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.658 5.659a2.25 2.25 0 01-3.182-3.182l5.659-5.658m0 0a6.002 6.002 0 018.439-2.474c.256.165.497.35.719.557" />',
  };

  return `
    <div class="glass overflow-hidden fade-in" style="animation-delay: ${0.05 * index}s">
      <!-- Header -->
      <div class="px-5 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 rounded-full" style="background: ${color}"></div>
          <h4 class="font-semibold text-text-primary">${d.label}</h4>
        </div>
        <span class="text-sm font-mono" style="color: ${color}">${d.score}/4</span>
      </div>

      <div class="divider"></div>

      <!-- Insight -->
      <div class="px-5 py-4">
        <p class="text-sm text-text-secondary leading-relaxed">${data.insight}</p>
      </div>

      <!-- Resources -->
      ${data.resources.length > 0 ? `
        <div class="divider"></div>
        <div class="px-5 py-4">
          <p class="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">Leitura recomendada</p>
          <div class="space-y-2">
            ${data.resources.map((r) => `
              <a href="${r.url}" target="_blank" rel="noopener" class="resource-card block px-3.5 py-3 no-underline">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-7 h-7 rounded-lg bg-accent-dim text-accent flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">${typeIcons[r.type] || typeIcons.article}</svg>
                  </div>
                  <div class="min-w-0">
                    <div class="text-sm font-medium text-text-primary">${r.title}</div>
                    <div class="text-xs text-text-muted mt-0.5">${r.description}</div>
                  </div>
                </div>
              </a>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

// ─── Radar Chart (results) ───

function renderRadarChart(result: AssessmentResult) {
  const canvas = document.getElementById("radar-chart") as HTMLCanvasElement | null;
  if (!canvas) return;

  new Chart(canvas, {
    type: "radar",
    data: {
      labels: result.dimensionScores.map((d) => {
        const parts = d.label.split(" & ");
        return parts.length > 1 ? parts : d.label;
      }),
      datasets: [{
        data: result.dimensionScores.map((d) => d.score),
        backgroundColor: "rgba(43, 153, 227, 0.1)",
        borderColor: "rgba(43, 153, 227, 0.7)",
        borderWidth: 2,
        pointBackgroundColor: "#2B99E3",
        pointBorderColor: "rgba(43, 153, 227, 0.3)",
        pointBorderWidth: 4,
        pointRadius: 5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        tooltip: {
          backgroundColor: "rgba(11, 17, 32, 0.9)",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          titleColor: "#F1F5F9",
          bodyColor: "#94A3B8",
          callbacks: { label: (ctx) => `${ctx.parsed.r} / 4` },
        },
      },
      scales: {
        r: {
          min: 0, max: 4,
          ticks: { stepSize: 1, display: false },
          grid: { color: "rgba(255, 255, 255, 0.06)" },
          angleLines: { color: "rgba(255, 255, 255, 0.06)" },
          pointLabels: {
            font: { family: "Outfit", size: 11 },
            color: "#94A3B8",
          },
        },
      },
    },
  });
}

// ─── Share ───

function buildShareUrl(): string {
  return window.location.origin + window.location.pathname;
}

function setupShareButtons(shareUrl: string) {
  document.getElementById("btn-copy-link")?.addEventListener("click", () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      const btn = document.getElementById("btn-copy-link");
      if (btn) {
        btn.innerHTML = `<svg class="w-4 h-4 text-[#34D399]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg> Copiado!`;
        setTimeout(() => {
          btn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.25" /></svg> Copiar link`;
        }, 2000);
      }
    });
  });

  document.getElementById("btn-share-top")?.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({ title: "Diagnóstico de Fluência em IA", text: "Descubra o nível de fluência em IA da sua equipe", url: shareUrl }).catch(() => {});
    } else {
      document.getElementById("share-buttons")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ─── Newsletter ───

function renderNewsletter(): string {
  return `
    <div class="glass-glow p-6 md:p-8 text-center fade-in stagger-5">
      <h3 class="font-display font-bold text-xl text-text-primary mb-2">Receba conteúdo sobre fluência em IA</h3>
      <p class="text-text-muted text-sm mb-6">Estratégias práticas para times que querem sair do experimental. Sem spam.</p>
      <form id="newsletter-form" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input type="email" id="newsletter-email" placeholder="seu@email.com" required
          class="flex-1 px-4 py-3 rounded-xl bg-surface border border-border text-text-primary text-sm font-sans" />
        <button type="submit" class="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-brand-deep transition-colors text-sm whitespace-nowrap cursor-pointer">
          Quero receber
        </button>
      </form>
      <p id="newsletter-success" class="text-accent text-sm mt-4 hidden">Inscrito com sucesso!</p>
    </div>
  `;
}

function setupNewsletter() {
  const form = document.getElementById("newsletter-form") as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = (document.getElementById("newsletter-email") as HTMLInputElement).value;
    if (!email) return;

    const subscribers = JSON.parse(localStorage.getItem("nexaedge-newsletter") || "[]");
    subscribers.push({ email, date: new Date().toISOString(), source: "fluencia-ia-assessment" });
    localStorage.setItem("nexaedge-newsletter", JSON.stringify(subscribers));

    form.classList.add("hidden");
    document.getElementById("newsletter-success")?.classList.remove("hidden");
  });
}

// ─── Init ───

export function init() {
  render();
}
