import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, MessagesSquare, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "AtomsAndEve — Deconstruct, together" },
      { name: "description", content: "Read scripture with verified historical context. Talk with people who actually get the African-household, deeply-rooted Christian experience." },
    ],
  }),
});

function Landing() {
  return (
    <div className="paper-grain">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Debate the claim, not the person
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Deconstruct the text.<br />
            <em className="italic text-muted-foreground">Reconstruct yourself.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
            A quiet study room and a loud, color-coded community — built for people leaving, questioning, or wrestling with Christianity. No downvotes. No bullies. Just sources and stories.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/read" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 transition">
              <BookOpen className="h-4 w-4" /> Open The Precipice
            </Link>
            <Link to="/community" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-card px-6 py-3 text-sm font-medium hover:bg-accent transition">
              <MessagesSquare className="h-4 w-4" /> Visit The Lounge
            </Link>
          </div>
        </motion.div>

        {/* Floating preview cards */}
        <div className="pointer-events-none absolute right-6 top-24 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="w-72 rounded-2xl border bg-card p-5 shadow-paper"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Verified annotation</div>
            <div className="mt-2 text-sm leading-relaxed">
              <span className="verse-num">2 Kings 2:24</span>
              The "she-bear" pericope is widely viewed by historians as etiological folklore appended to the Elisha cycle.
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-verified/15 px-2 py-0.5 text-verified font-medium">
                <ShieldCheck className="h-3 w-3" /> 5/5 reviewed
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="mt-5 ml-12 w-64 rounded-2xl p-5 shadow-card"
            style={{ background: "color-mix(in oklab, var(--terracotta) 50%, white)" }}
          >
            <div className="text-[10px] uppercase tracking-widest opacity-70">The Lounge · Terracotta</div>
            <p className="mt-2 font-display text-lg leading-snug text-terracotta-foreground">
              "Mum quoted Proverbs 22:6 to me again at Christmas dinner."
            </p>
            <div className="mt-2 text-xs opacity-70">42 replies · Lagos → London</div>
          </motion.div>
        </div>
      </section>

      {/* Two worlds */}
      <section className="border-y bg-parchment/60">
        <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-2">
          <WorldCard
            kicker="Part 1 — The Precipice"
            title="A quiet, scholarly room."
            body="Pick a translation. Click any verse. A sidebar opens with verified historical context — translation errors, internal contradictions, scientific disputes — every claim cited and peer-reviewed by 5 trusted readers."
            cta={{ label: "Open the reader", to: "/read" }}
            tone="ink"
          />
          <WorldCard
            kicker="Part 2 — The Lounge"
            title="A loud, colorful kitchen table."
            body="Pick a mood color when you post. Sage for the calm questions. Terracotta for the family-shaped wounds. Ochre for the wins. Every comment is tagged with its translation and language so context never gets lost."
            cta={{ label: "See the stream", to: "/community" }}
            tone="warm"
          />
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl">A reputation system that rewards <em className="italic">sources</em>, not shouting.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            { n: "+1", t: "Liked comment", d: "Your community thoughts get loved." },
            { n: "+10", t: "Verified annotation", d: "5 peers approve your sourced claim." },
            { n: "100", t: "Become a Reviewer", d: "Unlock the Pending Claims queue." },
            { n: "−20", t: "Personal attack", d: "Admins remove the post. Points drop." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border bg-card p-6">
              <div className="font-display text-4xl">{s.n}</div>
              <div className="mt-2 font-medium">{s.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t py-10 text-center text-xs text-muted-foreground">
        Built for the questioners. © AtomsAndEve
      </footer>
    </div>
  );
}

function WorldCard({ kicker, title, body, cta, tone }: { kicker: string; title: string; body: string; cta: { label: string; to: string }; tone: "ink" | "warm" }) {
  return (
    <div className={`p-10 md:p-14 ${tone === "ink" ? "bg-cream" : "bg-parchment"}`}>
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{kicker}</div>
      <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight">{title}</h3>
      <p className="mt-4 max-w-md text-muted-foreground">{body}</p>
      <Link to={cta.to} className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
        {cta.label} →
      </Link>
    </div>
  );
}
