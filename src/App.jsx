import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, CircleHelp, Cpu, GitBranch, ShieldAlert, Sparkles, WalletCards } from "lucide-react";
import {
  aaDiagram,
  architectureOptions,
  codeExamples,
  contractDiagram,
  decisionRows,
  depositDeepDive,
  dsfRecommendations,
  dsfScenarios,
  faqItems,
  flowModes,
  heroStats,
  meaningCards,
  navItems,
  problemComparison,
  riskCards,
  signatureFields,
  simulatorConfig,
  simulatorResults,
  withdrawDeepDive
} from "./data";
import {
  ActionHeader,
  AnimatedReveal,
  Badge,
  Card,
  DiagramRow,
  KpiPill,
  MiniChip,
  Section,
  SectionLink,
  StatBar,
  StepList
} from "./components";

function App() {
  const [scenarioKind, setScenarioKind] = useState("deposit");
  const [flowKind, setFlowKind] = useState("deposit");
  const [flowMode, setFlowMode] = useState("gasless");
  const [activeArch, setActiveArch] = useState("permit2");
  const [faqOpen, setFaqOpen] = useState(0);
  const [sim, setSim] = useState({
    action: "deposit",
    asset: "USDC",
    architecture: "permit + relayer",
    sponsor: "protocol pays",
    userType: "new user"
  });

  const simulatorKey = `${sim.action}|${sim.asset}|${sim.architecture}|${sim.sponsor}|${sim.userType}`;
  const simulatorResult =
    simulatorResults[simulatorKey] ||
    {
      signs:
        sim.architecture === "standard"
          ? sim.action === "deposit"
            ? "Approve + deposit transaction"
            : "Withdrawal transaction"
          : sim.architecture === "ERC-4337"
            ? "UserOperation из smart account"
            : sim.action === "deposit"
              ? "Deposit intent с amount, receiver, minLpOut, nonce, deadline"
              : "Withdraw intent с shares, tokenOut, minAmountOut, nonce, deadline",
      payer:
        sim.sponsor === "first tx only"
          ? "Спонсирование только для онбординга"
          : sim.sponsor === "paymaster pays"
            ? "Депозит paymaster"
            : sim.sponsor === "relayer pays"
              ? "Кошелек relayer"
              : "Treasury протокола",
      txCount: sim.architecture === "standard" && sim.action === "deposit" ? 2 : 1,
      popups: sim.architecture === "standard" && sim.action === "deposit" ? 2 : 1,
      contracts:
        sim.architecture === "standard"
          ? "Без изменений"
          : sim.architecture === "ERC-2771"
            ? "Поддержка trusted forwarder recipient"
            : sim.architecture === "ERC-4337"
              ? "Маршрутизация, совместимая со smart account"
              : "Executor / router с валидацией signature",
      backend:
        sim.architecture === "standard"
          ? "Не требуется"
          : sim.architecture === "ERC-4337"
            ? "Bundler + paymaster policy"
            : "Relayer + sponsor policy service",
      recommendation:
        sim.architecture === "standard"
          ? "Слабый вариант для DSF UX"
          : sim.action === "withdraw" && sim.architecture === "custom intent"
            ? "Рекомендуется"
            : sim.action === "deposit" && sim.architecture === "permit + relayer"
              ? "Рекомендуется"
              : "Рабочий вариант с компромиссами",
      risks:
        sim.architecture === "standard"
          ? "Зависимость от ETH, лишний friction"
          : sim.architecture === "ERC-4337"
            ? "Сложная инфраструктура, paymaster abuse"
            : "Replay, устаревшие параметры, sponsor abuse",
      difficulty:
        sim.architecture === "standard"
          ? "Низкая"
          : sim.architecture === "ERC-4337"
            ? "Высокая"
            : sim.architecture === "ERC-2771"
              ? "Средняя"
              : "Средняя",
      score:
        sim.architecture === "standard"
          ? 34
          : sim.architecture === "permit + relayer"
            ? 89
            : sim.architecture === "custom intent"
              ? 87
              : sim.architecture === "ERC-2771"
                ? 80
                : 83
    };

  const activeArchitecture = useMemo(
    () => architectureOptions.find((option) => option.id === activeArch) || architectureOptions[0],
    [activeArch]
  );

  return (
    <div className="min-h-screen bg-[#06111c] text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(45,212,191,0.14),transparent_18%),radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.18),transparent_30%),linear-gradient(180deg,#04070d_0%,#07121f_50%,#06111c_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06111c]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <a href="#top" className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 font-display text-lg font-semibold text-cyan-200">DSF</div>
            <div>
              <div className="font-display text-sm font-semibold text-white">Gasless LP Demo</div>
              <div className="text-xs text-slate-400">DeFi-онбординг, депозиты и выводы</div>
            </div>
          </a>
          <nav className="hidden flex-wrap gap-2 lg:flex">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-300/30 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 md:px-6 md:py-8">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-5 py-6 md:px-8 md:py-10">
          <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-[radial-gradient(circle_at_30%_40%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_60%_55%,rgba(59,130,246,0.26),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(10,20,40,0.2),transparent_70%)] lg:block" />
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative z-10">
              <Badge>Интерактивный архитектурный explainer для DSF-style LP vaults</Badge>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold tracking-tight text-white md:text-7xl">
                Gasless-депозиты и выводы для DeFi LP-токенов
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Интерактивное объяснение того, как для DSF-подобного протокола можно реализовать gasless UX для депозита
                стейблкоинов, mint LP, withdraw, redeem и approve-less flow без backend-зависимости на реальный блокчейн.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <HeroButton href="#ux-flow">Посмотреть UX flow</HeroButton>
                <HeroButton href="#architectures">Разобрать архитектуру</HeroButton>
                <HeroButton href="#matrix">Сравнить варианты реализации</HeroButton>
                <HeroButton href="#simulator">Симулятор DSF gasless flow</HeroButton>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <AnimatedReveal key={stat.label} delay={index * 0.08}>
                    <KpiPill {...stat} />
                  </AnimatedReveal>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 rounded-[28px] border border-cyan-400/20 bg-slate-950/70 p-5"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">Карта протокола</p>
              <div className="mt-5 space-y-3">
                <ProtocolBlock title="Кошелек пользователя" icon={<WalletCards className="h-5 w-5 text-cyan-300" />} subtitle="подписывает permit, deposit intent или withdraw intent" />
                <ProtocolBlock title="Frontend demo-app" icon={<Sparkles className="h-5 w-5 text-cyan-300" />} subtitle="собирает typed data и UX-слой объяснения" />
                <ProtocolBlock title="Relayer / paymaster policy" icon={<Cpu className="h-5 w-5 text-cyan-300" />} subtitle="решает, кого и когда спонсировать" />
                <ProtocolBlock title="DSF executor / forwarder" icon={<GitBranch className="h-5 w-5 text-cyan-300" />} subtitle="проверяет подписи и маршрутизирует deposit / withdraw" />
                <ProtocolBlock title="Vault + LP token core" icon={<Check className="h-5 w-5 text-cyan-300" />} subtitle="минтит LP при депозите и сжигает LP при выводе" />
              </div>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Самый реалистичный MVP</span>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">Permit2 + relayer + executor</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Самый сильный быстрый выигрыш для DSF: убрать отдельный approve для депозитов стейблкоинов, спонсировать
                  первый депозит и добавить signature-based withdraw path для пользователей без ETH.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Section
          id="problem"
          kicker="Почему это важно"
          title="Почему обычный DeFi UX плохой для LP deposit / withdraw"
          subtitle="Этот блок приземлен на DSF-модель: депозит стейблкоинов -> mint LP и burn LP -> вывод стейблкоинов."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {["deposit", "withdraw"].map((kind) => (
              <Card key={kind}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{kind === "deposit" ? "Сценарий депозита" : "Сценарий вывода"}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {kind === "deposit" ? "стейблкоин -> DSF LP" : "DSF LP -> стейблкоин"}
                    </p>
                  </div>
                  <Badge>{kind === "deposit" ? "Путь mint" : "Путь burn"}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-3 text-sm font-medium text-rose-200">Обычный DeFi UX</p>
                    <StepList steps={problemComparison[kind].standard} accent="pink" />
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-medium text-cyan-200">Gasless UX для DSF</p>
                    <StepList steps={problemComparison[kind].gasless} accent="cyan" />
                  </div>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-4">
                  {[
                    "нужен ETH для gas",
                    "approve friction",
                    "лишние окна кошелька",
                    "высокий onboarding drop-off"
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-black/20 p-3 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="meaning"
          kicker="Что значит gasless"
          title="Что значит gasless именно для DSF LP tokens"
          subtitle="Здесь важно разделить gasless, approve-less и sponsored execution. Это не магия и не одно и то же."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {meaningCards.map((item, index) => (
              <AnimatedReveal key={item.title} delay={index * 0.06}>
                <Card className="h-full">
                  <ActionHeader icon={index === 0 ? "pay" : index === 1 ? "wallet" : index === 2 ? "arch" : "sponsor"} title={item.title} description={item.body} />
                </Card>
              </AnimatedReveal>
            ))}
          </div>
        </Section>

        <Section
          id="scenarios"
          kicker="Сценарии DSF"
          title="DSF-специфичные сценарии для LP vault протокола"
          subtitle="Каждый сценарий показывает, что именно подписывает пользователь, что делает контракт и кто берет gas на себя."
        >
          <div className="mb-5 flex flex-wrap gap-2">
            {dsfScenarios.map((item) => (
              <button
                key={item.id}
                onClick={() => setScenarioKind(item.id)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  scenarioKind === item.id ? "border-cyan-300/30 bg-cyan-400/12 text-white" : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          {dsfScenarios
            .filter((item) => item.id === scenarioKind)
            .map((item) => (
              <div key={item.id} className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <Card>
                  <h3 className="font-display text-2xl text-white">{item.title}</h3>
                  <p className="mt-3 max-w-3xl text-slate-300">{item.hook}</p>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <SpecBox title="Что подписывает пользователь" value={item.signs} />
                    <SpecBox title="Что делает контракт" value={item.contract} />
                    <SpecBox title="Кто платит gas" value={item.gas} />
                    <SpecBox title="Главные риски" value={item.risks} />
                  </div>
                </Card>
                <Card>
                  <div className="space-y-4">
                    <StatBar label="UX эффект" value={scoreForLabel(item.ux)} />
                    <StatBar label="Сложность backend" value={scoreForLabel(item.backend, true)} />
                    <StatBar label="Сложность смарт-контрактов" value={scoreForLabel(item.contracts, true)} />
                  </div>
                  <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-400/10 p-4 text-sm leading-7 text-slate-200">
                    Для DSF наибольшая продуктовая ценность обычно в двух местах: <strong>first deposit</strong> и <strong>withdraw without ETH</strong>.
                    Именно там gasless меняет реальный drop-off и удержание.
                  </div>
                </Card>
              </div>
            ))}
        </Section>

        <Section
          id="architectures"
          kicker="Архитектурные варианты"
          title="Сравнение архитектур для DSF gasless deposit / withdraw"
          subtitle="Не все подходы одинаково хороши для LP mint / burn. Ниже можно переключать варианты и видеть их реальные компромиссы."
        >
          <div className="grid gap-4 xl:grid-cols-[0.48fr_0.52fr]">
            <div className="grid gap-3">
              {architectureOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveArch(option.id)}
                  className={`rounded-[24px] border p-4 text-left transition ${
                    activeArch === option.id
                      ? "border-cyan-300/30 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{option.name}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{option.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{option.fit}</p>
                    </div>
                    <MiniChip active={activeArch === option.id}>{option.dsfFit}</MiniChip>
                  </div>
                </button>
              ))}
            </div>
            <Card>
              <ActionHeader icon="arch" title={activeArchitecture.title} description={activeArchitecture.fit} />
              <div className="mt-6 grid gap-5">
                <div>
                  <p className="mb-3 text-sm font-medium text-cyan-200">Поток</p>
                  <StepList steps={activeArchitecture.flow} accent="cyan" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-3 text-sm font-medium text-emerald-200">Плюсы</p>
                    <ul className="space-y-2 text-sm leading-6 text-slate-300">
                      {activeArchitecture.pros.map((pro) => (
                        <li key={pro} className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 px-4 py-3">
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-medium text-amber-200">Компромиссы</p>
                    <ul className="space-y-2 text-sm leading-6 text-slate-300">
                      {activeArchitecture.cons.map((con) => (
                        <li key={con} className="rounded-2xl border border-amber-400/10 bg-amber-400/5 px-4 py-3">
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        <Section
          id="ux-flow"
          kicker="Интерактивный UX flow"
          title="Ключевой демонстрационный блок: Standard DeFi UX vs Gasless DSF UX"
          subtitle="Переключайте scenario и mode, чтобы увидеть, сколько действий остается на стороне пользователя."
        >
          <div className="mb-5 flex flex-wrap gap-2">
            {["deposit", "withdraw"].map((kind) => (
              <button
                key={kind}
                onClick={() => setFlowKind(kind)}
                className={`rounded-full border px-4 py-2 text-sm ${flowKind === kind ? "border-cyan-300/30 bg-cyan-400/12 text-white" : "border-white/10 bg-white/[0.03] text-slate-400"}`}
              >
                {kind === "deposit" ? "Депозит" : "Вывод"}
              </button>
            ))}
            {["standard", "gasless"].map((mode) => (
              <button
                key={mode}
                onClick={() => setFlowMode(mode)}
                className={`rounded-full border px-4 py-2 text-sm ${flowMode === mode ? "border-fuchsia-300/30 bg-fuchsia-400/12 text-white" : "border-white/10 bg-white/[0.03] text-slate-400"}`}
              >
                {mode === "standard" ? "Обычный DeFi UX" : "Gasless DSF UX"}
              </button>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
            <Card>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {flowKind === "deposit" ? "Сценарий депозита" : "Сценарий вывода"} / {flowMode === "standard" ? "standard" : "gasless"}
              </p>
              <div className="mt-4">
                <StepList steps={flowModes[flowKind][flowMode].steps} accent={flowMode === "standard" ? "pink" : "cyan"} />
              </div>
            </Card>
            <Card>
              <div className="grid gap-3 text-sm text-slate-300">
                <MetricRow label="Нужен ли ETH" value={flowModes[flowKind][flowMode].eth ? "Да" : "Нет"} />
                <MetricRow label="Окна кошелька" value={flowModes[flowKind][flowMode].popups} />
                <MetricRow label="Что подписывается" value={flowModes[flowKind][flowMode].signed} />
                <MetricRow label="Кто платит gas" value={flowModes[flowKind][flowMode].gas} />
                <MetricRow label="Вероятность drop-off" value={flowModes[flowKind][flowMode].dropoff} />
              </div>
              <div className="mt-6">
                <StatBar label="UX score" value={flowModes[flowKind][flowMode].score} />
              </div>
            </Card>
          </div>
        </Section>

        <Section
          id="deposit-tech"
          kicker="Технический разбор"
          title="Технический разбор: gasless deposit для DSF LP"
          subtitle="Deposit в LP vault почти всегда упирается в approve friction и в требования держать ETH. Здесь показаны два наиболее практичных варианта."
        >
          <div className="grid gap-4 xl:grid-cols-[0.58fr_0.42fr]">
            <div className="grid gap-4">
              {depositDeepDive.map((variant, index) => (
                <AnimatedReveal key={variant.title} delay={index * 0.07}>
                  <Card>
                    <ActionHeader icon={index === 0 ? "wallet" : "arch"} title={variant.title} description="Концептуальный путь исполнения DSF deposit" />
                    <div className="mt-5">
                      <StepList steps={variant.bullets} accent="amber" />
                    </div>
                  </Card>
                </AnimatedReveal>
              ))}
            </div>
            <Card>
              <h3 className="text-xl font-semibold text-white">Что обязательно должно быть в подписи</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {signatureFields.map((field) => (
                  <MiniChip key={field} active>
                    {field}
                  </MiniChip>
                ))}
              </div>
              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <p><strong>nonce</strong> нужен, чтобы одну и ту же подпись нельзя было исполнить второй раз.</p>
                <p><strong>deadline</strong> нужен, чтобы старая подпись не жила бесконечно.</p>
                <p><strong>minLpOut</strong> нужен как slippage protection, иначе relayer или сеть могут провести deposit по уже невыгодным условиям.</p>
                <p><strong>chainId + domain</strong> нужны против cross-domain replay.</p>
              </div>
            </Card>
          </div>
        </Section>

        <Section
          id="withdraw-tech"
          kicker="Механика вывода"
          title="Технический разбор: gasless withdraw для DSF LP"
          subtitle="Для LP-протокола gasless withdraw часто даже важнее депозита, потому что пользователь хочет выйти из позиции даже с нулевым ETH."
        >
          <div className="grid gap-4 xl:grid-cols-[0.55fr_0.45fr]">
            <div className="grid gap-4">
              {withdrawDeepDive.map((variant, index) => (
                <Card key={variant.title}>
                    <ActionHeader icon={index === 0 ? "burn" : "secure"} title={variant.title} description="Путь DSF withdraw и поверхность риска" />
                  <div className="mt-5">
                    <StepList steps={variant.bullets} accent="cyan" />
                  </div>
                </Card>
              ))}
            </div>
            <Card>
              <h3 className="text-xl font-semibold text-white">Критические риски вывода</h3>
              <div className="mt-4 grid gap-3">
                {[
                  "stale quotes и устаревший minAmountOut",
                  "replay старого withdraw intent",
                  "неоднозначность partial fill vs exact fill",
                  "поверхность злоупотребления trusted executor",
                  "front-running, если в сообщении нет slippage protection",
                  "необходимость pause / cancellation path"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-rose-400/10 bg-rose-400/5 p-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        <Section
          id="contracts"
          kicker="Контрактная архитектура"
          title="Контрактная архитектура для DSF"
          subtitle="Две ключевые схемы: DSF executor layer и ERC-4337 smart account path."
        >
          <div className="grid gap-4">
            <Card>
              <h3 className="mb-4 text-xl font-semibold text-white">Путь Executor / Router для DSF LP</h3>
              <DiagramRow items={contractDiagram} />
            </Card>
            <Card>
              <h3 className="mb-4 text-xl font-semibold text-white">Путь ERC-4337</h3>
              <DiagramRow items={aaDiagram} />
            </Card>
          </div>
        </Section>

        <Section
          id="code"
          kicker="Мини-примеры кода"
          title="Короткие демонстрационные примеры кода"
          subtitle="Это не production-ready implementation, а обучающие сниппеты, которые показывают реалистичную форму DSF gasless logic."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            {codeExamples.map((example) => (
              <Card key={example.title} className="overflow-hidden">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">Учебный сниппет</p>
                  </div>
                  <Badge>Solidity / EIP-712</Badge>
                </div>
                <pre className="overflow-x-auto rounded-2xl border border-white/8 bg-black/30 p-4 text-sm leading-6 text-slate-200">
                  <code>{example.code}</code>
                </pre>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="recommended"
          kicker="Рекомендуемый путь для DSF"
          title="Короткий и ясный вывод: какой путь для DSF наиболее реалистичен первым"
          subtitle="Этот блок отвечает на главный практический вопрос проекта: как именно начать внедрение gasless deposit / withdraw для LP architecture."
        >
          <div className="grid gap-4 xl:grid-cols-[0.45fr_0.55fr]">
            <Card className="h-fit">
              <h3 className="text-2xl font-semibold text-white">Рекомендация для MVP</h3>
              <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                <p><strong>Проще всего внедрить первым:</strong> permit or Permit2 + relayer + отдельный DSF executor для deposit.</p>
                <p><strong>Максимальный UX-эффект быстрее всего:</strong> убрать отдельный approve при депозите и спонсировать first deposit.</p>
                <p><strong>Что требует изменения core contracts:</strong> ERC-2771 recipient support, smart account-aware flows, или более чистые vault hooks для executor-based withdraw.</p>
                <p><strong>Что можно вынести в отдельный слой:</strong> relayer policy, sponsor budget control, typed data signing, signature verification executor.</p>
                <p><strong>Наиболее реалистичный MVP для DSF LP:</strong> approve-less stablecoin deposit + sponsored first deposit + signed withdraw executor for users without ETH.</p>
              </div>
              <div className="mt-6">
                <SectionLink href="#simulator">Перейти к симулятору DSF flow</SectionLink>
              </div>
            </Card>
            <div className="grid gap-4">
              {dsfRecommendations.map((phase) => (
                <Card key={phase.phase}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">{phase.phase}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{phase.title}</h3>
                    </div>
                    <Badge>Дорожная карта</Badge>
                  </div>
                  <div className="mt-4">
                    <StepList steps={phase.bullets} accent="cyan" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="risks"
          kicker="Безопасность и компромиссы"
          title="Security / risks / trade-offs"
          subtitle="В gasless DSF flow главная сложность не только в UX, но и в точном контроле того, что именно пользователь разрешил сделать."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {riskCards.map((risk) => (
              <Card key={risk} className="h-full">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-rose-300" />
                  <div>
                    <h3 className="text-base font-semibold text-white">{risk}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      In DSF LP flows this risk becomes material whenever deposit / withdraw messages are too broad or replayable.
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="mt-4">
            <h3 className="text-xl font-semibold text-white">Что должно быть подписано для безопасного DSF deposit / withdraw</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {signatureFields.map((field) => (
                <Badge key={field}>{field}</Badge>
              ))}
            </div>
          </Card>
        </Section>

        <Section
          id="matrix"
          kicker="Матрица решений"
          title="Интерактивная матрица выбора"
          subtitle="Use case -> best architecture -> complexity -> UX quality -> DSF fit."
        >
          <div className="overflow-hidden rounded-[28px] border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/[0.04] text-slate-300">
                  <tr>
                    {["Сценарий", "Лучшая архитектура", "Сложность SC", "Сложность backend", "Качество UX", "Сложность безопасности", "DSF fit"].map((head) => (
                      <th key={head} className="px-4 py-4 font-medium">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6 bg-black/10 text-slate-200">
                  {decisionRows.map((row) => (
                    <tr key={row[0]} className="transition hover:bg-white/[0.03]">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-4 align-top">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section
          id="simulator"
          kicker="Интерактивный симулятор"
          title="Gasless simulator для DSF"
          subtitle="Выберите действие, актив, архитектуру, режим sponsorship и тип пользователя. Симулятор покажет, что подписывает пользователь и какие компоненты реально нужны."
        >
          <div className="grid gap-4 xl:grid-cols-[0.42fr_0.58fr]">
            <Card>
              <div className="grid gap-4">
                <SelectBlock label="Действие" value={sim.action} onChange={(value) => setSim((prev) => ({ ...prev, action: value }))} options={simulatorConfig.actions} />
                <SelectBlock label="Актив" value={sim.asset} onChange={(value) => setSim((prev) => ({ ...prev, asset: value }))} options={simulatorConfig.assets} />
                <SelectBlock label="Архитектура" value={sim.architecture} onChange={(value) => setSim((prev) => ({ ...prev, architecture: value }))} options={simulatorConfig.architectures} />
                <SelectBlock label="Режим sponsorship" value={sim.sponsor} onChange={(value) => setSim((prev) => ({ ...prev, sponsor: value }))} options={simulatorConfig.sponsors} />
                <SelectBlock label="Тип пользователя" value={sim.userType} onChange={(value) => setSim((prev) => ({ ...prev, userType: value }))} options={simulatorConfig.userTypes} />
              </div>
            </Card>
            <Card>
              <div className="grid gap-3 text-sm text-slate-300">
                <MetricRow label="Что подписывает пользователь" value={simulatorResult.signs} />
                <MetricRow label="Кто платит gas" value={simulatorResult.payer} />
                <MetricRow label="Количество транзакций" value={simulatorResult.txCount} />
                <MetricRow label="Окна кошелька" value={simulatorResult.popups} />
                <MetricRow label="Какие изменения нужны в контрактах" value={simulatorResult.contracts} />
                <MetricRow label="Какие backend-компоненты нужны" value={simulatorResult.backend} />
                <MetricRow label="Рекомендация" value={simulatorResult.recommendation} />
                <MetricRow label="Ключевые риски" value={simulatorResult.risks} />
                <MetricRow label="Сложность внедрения" value={simulatorResult.difficulty} />
              </div>
              <div className="mt-6">
                <StatBar label="UX score" value={simulatorResult.score} />
              </div>
            </Card>
          </div>
        </Section>

        <Section
          id="faq"
          kicker="FAQ"
          title="FAQ для сценария DSF"
          subtitle="Ответы специально сформулированы под LP vault protocol, а не под абстрактную Ethereum-теорию."
        >
          <div className="grid gap-3">
            {faqItems.map(([question, answer], index) => {
              const open = faqOpen === index;
              return (
                <button
                  key={question}
                  onClick={() => setFaqOpen(open ? -1 : index)}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-left transition hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <CircleHelp className="mt-0.5 h-5 w-5 text-cyan-300" />
                        <h3 className="text-base font-semibold text-white md:text-lg">{question}</h3>
                      </div>
                      {open ? <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">{answer}</p> : null}
                    </div>
                    <span className="text-slate-500">{open ? "−" : "+"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Section>
      </main>
    </div>
  );
}

function HeroButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/12 hover:text-white"
    >
      {children}
    </a>
  );
}

function ProtocolBlock({ title, subtitle, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-2">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm leading-6 text-slate-400">{subtitle}</div>
      </div>
    </div>
  );
}

function SpecBox({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <div className="mt-3 text-sm leading-7 text-slate-200">{value}</div>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 md:flex-row md:items-center md:justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}

function SelectBlock({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {translateUiValue(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function scoreForLabel(label) {
  const map = {
    "Высокий эффект": 92,
    "Очень высокий эффект": 96,
    "Фокус на рост": 88,
    "Контекстный": 72,
    "Средняя": 58,
    "Низкая-средняя": 46,
    "Низкая": 34,
    "Средняя-высокая": 72
  };
  return map[label] || 64;
}

function translateUiValue(value) {
  const map = {
    deposit: "deposit",
    withdraw: "withdraw",
    standard: "standard",
    "permit + relayer": "permit + relayer",
    "protocol pays": "платит протокол",
    "relayer pays": "платит relayer",
    "paymaster pays": "платит paymaster",
    "first tx only": "только первая tx",
    "new user": "новый пользователь",
    "existing LP holder": "текущий LP-холдер",
    "mobile user": "мобильный пользователь",
    "power user": "опытный пользователь",
    "custom intent": "custom intent"
  };
  return map[value] || value;
}

export default App;
