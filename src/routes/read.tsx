import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Languages, ShieldCheck, Clock, X, BookMarked } from "lucide-react";
import {
  SAMPLE_CHAPTER,
  SAMPLE_ANNOTATIONS,
  SAMPLE_COMMENTS,
  type Translation,
  type Verse,
} from "@/data/scripture";
import { FlairBadge } from "@/components/Flair";

export const Route = createFileRoute("/read")({
  component: Reader,
  head: () => ({
    meta: [
      { title: "Reader — AtomsAndEve" },
      { name: "description", content: "Click any verse to open verified historical context, translation notes, and community discussion." },
    ],
  }),
});

const TRANSLATIONS: Translation[] = ["KJV", "ESV", "NIV"];

function Reader() {
  const [translation, setTranslation] = useState<Translation>("ESV");
  const [activeVerse, setActiveVerse] = useState<Verse | null>(null);

  return (
    <div className="flex-1 bg-cream paper-grain">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[1fr_460px]">
        {/* TEXT COLUMN */}
        <article className="px-6 py-12 md:px-12 md:py-16 max-w-3xl">
          <div className="mb-8 flex items-end justify-between gap-4 border-b pb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Book · Chapter</div>
              <h1 className="mt-1 font-display text-5xl md:text-6xl leading-none">
                {SAMPLE_CHAPTER.book} <span className="italic text-muted-foreground">{SAMPLE_CHAPTER.chapter}</span>
              </h1>
            </div>
            <TranslationPicker value={translation} onChange={setTranslation} />
          </div>

          <div className="space-y-1.5 font-display text-xl md:text-[1.4rem] leading-[1.7]">
            {SAMPLE_CHAPTER.verses.map((v) => (
              <VerseLine
                key={v.num}
                verse={v}
                translation={translation}
                isActive={activeVerse?.num === v.num}
                onClick={() => setActiveVerse(v)}
              />
            ))}
          </div>

          <div className="mt-16 flex items-center gap-3 text-xs text-muted-foreground">
            <BookMarked className="h-4 w-4" />
            Click any verse to open its annotations & community thread.
          </div>
        </article>

        {/* SIDEBAR — DESKTOP */}
        <aside className="hidden lg:block border-l bg-parchment/50 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-hidden">
          <ContextPanel verse={activeVerse} onClose={() => setActiveVerse(null)} />
        </aside>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {activeVerse && (
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="lg:hidden fixed inset-x-0 bottom-0 top-16 z-40 rounded-t-3xl border-t bg-parchment shadow-card overflow-hidden"
          >
            <ContextPanel verse={activeVerse} onClose={() => setActiveVerse(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TranslationPicker({ value, onChange }: { value: Translation; onChange: (t: Translation) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-mono"
      >
        {value} <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-32 overflow-hidden rounded-xl border bg-card shadow-card">
          {TRANSLATIONS.map((t) => (
            <button
              key={t}
              onClick={() => { onChange(t); setOpen(false); }}
              className={`block w-full px-4 py-2 text-left text-sm font-mono hover:bg-accent ${t === value ? "bg-accent" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function VerseLine({ verse, translation, isActive, onClick }: { verse: Verse; translation: Translation; isActive: boolean; onClick: () => void }) {
  const text = verse.text[translation];
  const isGhost = verse.ghost && !text;

  if (isGhost) {
    return (
      <button
        onClick={onClick}
        className={`group block w-full text-left rounded-md border border-dashed border-foreground/25 bg-background/40 px-3 py-2 text-sm font-sans italic text-muted-foreground hover:bg-accent/60 transition ${isActive ? "ring-1 ring-foreground/40" : ""}`}
      >
        <span className="verse-num not-italic">{verse.num}</span>
        [Verse {verse.num} — Omitted in {translation}. Click to view annotations from other versions]
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`group block w-full text-left rounded-md px-3 py-1.5 transition ${isActive ? "bg-foreground/[0.06] ring-1 ring-foreground/15" : "hover:bg-foreground/[0.04]"}`}
    >
      <span className="verse-num">{verse.num}</span>
      <span>{text}</span>
    </button>
  );
}

function ContextPanel({ verse, onClose }: { verse: Verse | null; onClose: () => void }) {
  const [tab, setTab] = useState<"annotations" | "comments">("annotations");

  if (!verse) {
    return (
      <div className="h-full grid place-items-center p-10 text-center">
        <div className="max-w-xs">
          <div className="mx-auto h-10 w-10 rounded-full border grid place-items-center text-muted-foreground">
            <BookMarked className="h-4 w-4" />
          </div>
          <p className="mt-4 font-display text-2xl leading-tight">Pick a verse.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Verified annotations on the left tab. Community on the right.
          </p>
        </div>
      </div>
    );
  }

  const annotations = SAMPLE_ANNOTATIONS[verse.num] ?? [];
  const comments = SAMPLE_COMMENTS[verse.num] ?? [];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b p-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{SAMPLE_CHAPTER.book} {SAMPLE_CHAPTER.chapter}:{verse.num}</div>
          <div className="mt-1 font-display text-xl leading-snug max-w-sm">
            {verse.text.KJV ?? verse.text.ESV ?? verse.text.NIV}
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1.5 hover:bg-accent"><X className="h-4 w-4" /></button>
      </div>

      <div className="grid grid-cols-2 border-b text-sm">
        <TabButton active={tab === "annotations"} onClick={() => setTab("annotations")}>
          <ShieldCheck className="h-3.5 w-3.5" />
          Annotations <span className="text-muted-foreground">({annotations.length})</span>
        </TabButton>
        <TabButton active={tab === "comments"} onClick={() => setTab("comments")}>
          <Languages className="h-3.5 w-3.5" />
          Community <span className="text-muted-foreground">({comments.length})</span>
        </TabButton>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {tab === "annotations" ? (
          annotations.length === 0 ? <Empty text="No academic annotations yet. Be the first to cite a source." /> :
          annotations.map((a) => (
            <div key={a.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider rounded-full bg-accent px-2 py-0.5">{a.category}</span>
                {a.status === "verified" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-verified font-medium">
                    <ShieldCheck className="h-3 w-3" /> Verified · {a.reviewers}/5
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-pending font-medium">
                    <Clock className="h-3 w-3" /> Pending · {a.reviewers}/5
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed">{a.body}</p>
              <div className="mt-3 border-t pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground italic">{a.source}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-medium">{a.author.name}</span>
                  <FlairBadge flair={a.author.flair} />
                </div>
              </div>
            </div>
          ))
        ) : (
          comments.length === 0 ? <Empty text="No comments on this verse yet." /> :
          comments.map((c) => (
            <div key={c.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{c.author.name}</span>
                <FlairBadge flair={c.author.flair} />
                <span className="ml-auto rounded-full border px-2 py-0.5 text-[10px] font-mono">
                  {c.translation} · {c.language}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{c.body}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <button className="inline-flex items-center gap-1 hover:text-foreground transition">
                  <Heart className="h-3.5 w-3.5" /> {c.likes}
                </button>
                <button className="inline-flex items-center gap-1 hover:text-foreground transition">
                  🌐 Translate
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 px-4 py-3 text-xs uppercase tracking-wider font-medium transition ${active ? "bg-cream border-b-2 border-foreground -mb-px" : "text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">{text}</div>;
}
