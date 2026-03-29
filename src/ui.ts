import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js";
import { questions, teamProfiles, type TeamProfile, getPhaseRecommendations, getDimensionInsights } from "./data";
import { calculateResults, type AssessmentResult } from "./scoring";

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

const app = document.getElementById("app")!;

function render() {
  switch (state.screen) {
    case "welcome":
      renderWelcome();
      break;
    case "profile":
      renderProfileSelector();
      break;
    case "question":
      renderQuestion();
      break;
    case "results":
      renderResults();
      break;
  }
  window.scrollTo({ top: 0 });
}

// --- Welcome Screen ---

function renderWelcome() {
  app.innerHTML = `
    <div class="fade-in min-h-dvh flex flex-col">
      <header class="px-6 py-5">
        <div class="text-sm font-semibold tracking-wide text-brand-deep uppercase">NexaEdge</div>
      </header>

      <main class="flex-1 flex items-center justify-center px-6">
        <div class="max-w-2xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light text-brand-deep text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            Diagnóstico gratuito · 5 minutos
          </div>
          <h1 class="font-display text-4xl md:text-5xl font-bold text-brand-navy leading-tight mb-5">
            Qual o nível de<br/>
            <span class="text-brand-deep">fluência em IA</span><br/>
            da sua equipe?
          </h1>
          <p class="text-lg text-brand-muted max-w-lg mx-auto mb-10">
            Responda 14 perguntas sobre como sua equipe usa IA no dia a dia e receba um diagnóstico personalizado com recomendações práticas.
          </p>
          <button id="btn-start" class="inline-flex items-center gap-2 px-8 py-4 bg-brand-deep text-white font-semibold rounded-lg hover:bg-brand-navy transition-colors text-lg cursor-pointer">
            Começar diagnóstico
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
          <p class="text-sm text-brand-muted mt-4">Sem cadastro. Resultado imediato.</p>
        </div>
      </main>

      <footer class="px-6 py-4 text-center text-xs text-brand-muted">
        Baseado no framework Fluência em IA — pesquisa de Mollick, Ng, BCG, Prosci e McKinsey adaptada para PMEs brasileiras.
      </footer>
    </div>
  `;

  document.getElementById("btn-start")!.addEventListener("click", () => {
    state.screen = "profile";
    render();
  });
}

// --- Profile Selector ---

function renderProfileSelector() {
  app.innerHTML = `
    <div class="fade-in min-h-dvh flex flex-col">
      ${renderHeader()}

      <main class="flex-1 flex items-center justify-center px-6 py-12">
        <div class="max-w-xl mx-auto w-full">
          <p class="text-sm font-medium text-brand-deep mb-2 uppercase tracking-wide">Passo 1 de 2</p>
          <h2 class="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-2">Qual o perfil da equipe?</h2>
          <p class="text-brand-muted mb-8">Escolha o que melhor descreve o time que será avaliado.</p>

          <div class="space-y-3" id="profile-options">
            ${teamProfiles
              .map(
                (p) => `
              <button data-profile="${p.id}" class="option-card w-full text-left border-2 border-gray-200 rounded-xl px-5 py-4 cursor-pointer bg-white">
                <div class="font-semibold text-brand-slate">${p.label}</div>
                <div class="text-sm text-brand-muted mt-0.5">${p.description}</div>
              </button>
            `
              )
              .join("")}
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

// --- Question Screen ---

function renderQuestion() {
  const q = questions[state.currentQuestion];
  const total = questions.length;
  const progress = ((state.currentQuestion) / total) * 100;
  const selectedValue = state.answers[q.id];

  app.innerHTML = `
    <div class="fade-in min-h-dvh flex flex-col">
      ${renderHeader()}

      <!-- Progress bar -->
      <div class="px-6">
        <div class="max-w-2xl mx-auto">
          <div class="flex items-center justify-between text-xs text-brand-muted mb-2">
            <span>${q.dimensionLabel}</span>
            <span>${state.currentQuestion + 1} de ${total}</span>
          </div>
          <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div class="progress-fill h-full bg-brand-cyan rounded-full" style="width: ${progress}%"></div>
          </div>
        </div>
      </div>

      <main class="flex-1 flex items-center justify-center px-6 py-8">
        <div class="max-w-2xl mx-auto w-full">
          <h2 class="font-display text-xl md:text-2xl font-bold text-brand-navy mb-6 leading-snug">${q.text}</h2>

          <div class="space-y-2.5" id="question-options">
            ${q.options
              .map(
                (opt, i) => `
              <button data-value="${opt.value}" class="option-card w-full text-left border-2 ${selectedValue === opt.value ? "selected border-brand-deep bg-brand-light" : "border-gray-200 bg-white"} rounded-xl px-5 py-3.5 cursor-pointer">
                <div class="flex items-start gap-3">
                  <span class="flex-shrink-0 w-7 h-7 rounded-full border-2 ${selectedValue === opt.value ? "border-brand-deep bg-brand-deep text-white" : "border-gray-300 text-gray-400"} flex items-center justify-center text-xs font-semibold mt-0.5">${i}</span>
                  <span class="text-sm md:text-base ${selectedValue === opt.value ? "text-brand-navy font-medium" : "text-brand-slate"}">${opt.label}</span>
                </div>
              </button>
            `
              )
              .join("")}
          </div>

          <div class="flex items-center justify-between mt-8">
            <button id="btn-back" class="text-sm text-brand-muted hover:text-brand-slate transition-colors cursor-pointer ${state.currentQuestion === 0 ? "invisible" : ""}">
              <svg class="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
              Voltar
            </button>
            <div></div>
          </div>
        </div>
      </main>
    </div>
  `;

  document.querySelectorAll("[data-value]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = parseInt(btn.getAttribute("data-value")!, 10);
      state.answers[q.id] = value;

      // Short delay for visual feedback then advance
      btn.classList.add("selected");
      setTimeout(() => {
        if (state.currentQuestion < total - 1) {
          state.currentQuestion++;
          render();
        } else {
          state.screen = "results";
          render();
        }
      }, 200);
    });
  });

  document.getElementById("btn-back")?.addEventListener("click", () => {
    if (state.currentQuestion > 0) {
      state.currentQuestion--;
      render();
    } else {
      state.screen = "profile";
      render();
    }
  });
}

// --- Results Screen ---

function renderResults() {
  const result = calculateResults(state.answers, state.profile!);
  const recommendations = getPhaseRecommendations(result.fluencyLevel.level, result.profile);

  const levelColors = ["#EF4444", "#F59E0B", "#F59E0B", "#2B99E3", "#05629F"];
  const levelColor = levelColors[result.fluencyLevel.level];

  app.innerHTML = `
    <div class="fade-in min-h-dvh flex flex-col">
      ${renderHeader()}

      <main class="flex-1 px-6 py-8 md:py-12">
        <div class="max-w-3xl mx-auto">

          <!-- Level Badge -->
          <div class="text-center mb-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style="background: ${levelColor}15; color: ${levelColor}">
              ${result.fluencyLevel.label}
            </div>
            <h1 class="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-3">
              Sua equipe é <span style="color: ${levelColor}">${result.fluencyLevel.name}</span>
            </h1>
            <p class="text-brand-muted max-w-lg mx-auto">${result.fluencyLevel.description}</p>
          </div>

          <!-- Score + Radar Chart -->
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="font-display font-semibold text-brand-navy mb-1">Score geral</h3>
              <div class="flex items-end gap-2 mb-4">
                <span class="text-5xl font-bold" style="color: ${levelColor}">${result.overallScore.toFixed(1)}</span>
                <span class="text-brand-muted text-lg mb-1">/ 4.0</span>
              </div>
              <div class="space-y-2.5">
                ${result.dimensionScores
                  .map(
                    (d) => `
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-brand-slate">${d.label}</span>
                      <span class="font-medium text-brand-navy">${d.score.toFixed(1)}</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full rounded-full bg-brand-cyan" style="width: ${(d.score / 4) * 100}%"></div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>

            <div class="bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
              <div class="chart-container w-full">
                <canvas id="radar-chart"></canvas>
              </div>
            </div>
          </div>

          <!-- Phase Recommendation -->
          <div class="bg-brand-light border border-brand-cyan/20 rounded-2xl p-6 md:p-8 mb-8">
            <div class="flex items-start gap-3 mb-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-brand-deep flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
              <div>
                <h3 class="font-display font-semibold text-brand-navy text-lg">Próxima fase: ${result.fluencyLevel.phase}</h3>
                <p class="text-brand-muted text-sm mt-1">${result.fluencyLevel.phaseDescription}</p>
              </div>
            </div>
            <div class="ml-13">
              <h4 class="font-semibold text-brand-slate text-sm mb-3 uppercase tracking-wide">Recomendações práticas</h4>
              <ul class="space-y-2">
                ${recommendations
                  .map(
                    (r) => `
                  <li class="flex items-start gap-2 text-sm text-brand-slate">
                    <svg class="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ${r}
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          </div>

          <!-- Dimension Insights -->
          <div class="mb-12">
            <h3 class="font-display font-semibold text-brand-navy text-lg mb-4">Análise por dimensão</h3>
            <div class="grid gap-3">
              ${result.dimensionScores
                .map((d) => {
                  const insight = getDimensionInsights(d.id, d.score);
                  return `
                    <div class="border border-gray-200 rounded-xl p-4">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-semibold text-brand-slate text-sm">${d.label}</h4>
                        <span class="text-sm font-medium text-brand-deep">${d.score.toFixed(1)} / 4.0</span>
                      </div>
                      <p class="text-sm text-brand-muted">${insight}</p>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>

          ${renderNewsletter()}

          <!-- Restart -->
          <div class="text-center mt-8 pb-8">
            <button id="btn-restart" class="text-sm text-brand-muted hover:text-brand-slate transition-colors cursor-pointer">
              Refazer diagnóstico
            </button>
          </div>
        </div>
      </main>
    </div>
  `;

  renderRadarChart(result);

  document.getElementById("btn-restart")?.addEventListener("click", () => {
    state.screen = "welcome";
    state.profile = null;
    state.currentQuestion = 0;
    state.answers = {};
    render();
  });

  setupNewsletter();
}

// --- Radar Chart ---

function renderRadarChart(result: AssessmentResult) {
  const canvas = document.getElementById("radar-chart") as HTMLCanvasElement | null;
  if (!canvas) return;

  new Chart(canvas, {
    type: "radar",
    data: {
      labels: result.dimensionScores.map((d) => {
            // Wrap long labels into two lines for radar chart readability
            const parts = d.label.split(" & ");
            return parts.length > 1 ? parts : d.label;
          }),
      datasets: [
        {
          data: result.dimensionScores.map((d) => d.score),
          backgroundColor: "rgba(43, 153, 227, 0.15)",
          borderColor: "#2B99E3",
          borderWidth: 2,
          pointBackgroundColor: "#05629F",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.r.toFixed(1)} / 4.0`,
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 4,
          ticks: {
            stepSize: 1,
            display: false,
          },
          grid: {
            color: "rgba(148, 163, 184, 0.2)",
          },
          angleLines: {
            color: "rgba(148, 163, 184, 0.2)",
          },
          pointLabels: {
            font: {
              family: "Inter",
              size: 11,
            },
            color: "#1E293B",
          },
        },
      },
    },
  });
}

// --- Newsletter CTA ---

function renderNewsletter(): string {
  return `
    <div class="bg-brand-navy rounded-2xl p-6 md:p-8 text-white">
      <div class="max-w-lg mx-auto text-center">
        <h3 class="font-display font-bold text-xl mb-2">Receba conteúdo sobre fluência em IA</h3>
        <p class="text-white/70 text-sm mb-6">Estratégias práticas para times que querem sair do nível experimental. Sem spam, sem enrolação.</p>
        <form id="newsletter-form" class="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            id="newsletter-email"
            placeholder="seu@email.com"
            required
            class="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-brand-cyan"
          />
          <button type="submit" class="px-6 py-3 bg-brand-cyan text-white font-semibold rounded-lg hover:bg-brand-deep transition-colors text-sm whitespace-nowrap cursor-pointer">
            Quero receber
          </button>
        </form>
        <p id="newsletter-success" class="text-brand-cyan text-sm mt-3 hidden">Inscrito com sucesso! Fique de olho no email.</p>
        <p id="newsletter-error" class="text-red-400 text-sm mt-3 hidden"></p>
      </div>
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

    // For now, store in localStorage and show success
    // TODO: Replace with real newsletter API (ConvertKit, Mailchimp, etc.)
    const subscribers = JSON.parse(localStorage.getItem("nexaedge-newsletter") || "[]");
    subscribers.push({ email, date: new Date().toISOString(), source: "fluencia-ia-assessment" });
    localStorage.setItem("nexaedge-newsletter", JSON.stringify(subscribers));

    form.classList.add("hidden");
    document.getElementById("newsletter-success")?.classList.remove("hidden");
  });
}

// --- Shared Components ---

function renderHeader(): string {
  return `
    <header class="px-6 py-5 flex items-center justify-between">
      <div class="text-sm font-semibold tracking-wide text-brand-deep uppercase">NexaEdge</div>
      <div class="text-xs text-brand-muted">Diagnóstico de Fluência em IA</div>
    </header>
  `;
}

// --- Init ---

export function init() {
  render();
}
