import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Blocks,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Flame,
  Layers3,
  ShieldCheck,
  Wallet
} from "lucide-react";

export function Section({ id, kicker, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:p-8">
      <div className="mb-6 max-w-4xl">
        {kicker ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">{kicker}</p> : null}
        <h2 className="max-w-4xl font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
        {subtitle ? <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 ${className}`}>{children}</div>;
}

export function KpiPill({ label, value, detail }) {
  return (
    <Card className="h-full">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <div className="mt-4 text-3xl font-semibold text-white">{value}</div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
    </Card>
  );
}

export function Badge({ children }) {
  return <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">{children}</span>;
}

export function StepList({ steps, accent = "cyan" }) {
  const palette =
    accent === "pink"
      ? "from-fuchsia-400/30 to-fuchsia-500/0 text-fuchsia-200"
      : accent === "amber"
        ? "from-amber-300/30 to-amber-300/0 text-amber-100"
        : "from-cyan-400/30 to-cyan-400/0 text-cyan-100";

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
          <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${palette} font-semibold`}>
            {index + 1}
          </div>
          <p className="text-sm leading-6 text-slate-200">{step}</p>
        </div>
      ))}
    </div>
  );
}

export function DiagramRow({ items }) {
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-2">
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-3">
          <div className="min-w-[180px] rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm font-medium text-slate-100">
            {item}
          </div>
          {index < items.length - 1 ? <ArrowRight className="hidden text-cyan-300/70 md:block" /> : null}
        </div>
      ))}
    </div>
  );
}

export function StatBar({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}/100</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function InsightIcon({ type }) {
  const map = {
    wallet: Wallet,
    pay: CircleDollarSign,
    sponsor: BadgeDollarSign,
    vault: Layers3,
    burn: Flame,
    secure: ShieldCheck,
    arch: Blocks
  };
  const Icon = map[type] || CheckCircle2;
  return <Icon className="h-5 w-5 text-cyan-300" />;
}

export function AnimatedReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MiniChip({ children, active }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
        active ? "border-cyan-300/40 bg-cyan-400/12 text-cyan-100" : "border-white/10 bg-white/[0.03] text-slate-400"
      }`}
    >
      {children}
    </span>
  );
}

export function ActionHeader({ icon = "arch", title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
        <InsightIcon type={icon} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
      </div>
    </div>
  );
}

export function SectionLink({ href, children }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-white">
      {children}
      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </a>
  );
}
