import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { FlairBadge } from "@/components/Flair";
import type { Flair } from "@/data/scripture";

export const Route = createFileRoute("/community")({
  component: Community,
  head: () => ({
    meta: [
      { title: "Community — AtomsAndEve" },
      { name: "description", content: "A vertical, color-coded stream of Q&A and discussion topics. Pick a mood. Drop your story." },
    ],
  }),
});

type Mood = "sage" | "terracotta" | "ochre" | "lavender" | "slate-blue";

const MOOD_LABEL: Record<Mood, string> = {
  sage: "Sage",
  terracotta: "Terracotta",
  ochre: "Ochre",
  lavender: "Lavender",
  "slate-blue": "Slate Blue",
};

type Post = {
  id: string;
  mood: Mood;
  title: string;
  excerpt: string;
  author: { name: string; flair: Flair; location: string };
  likes: number;
  replies: number;
  hours: number;
};

const POSTS: Post[] = [
  {
    id: "p1",
    mood: "terracotta",
    title: "How do you survive Christmas dinner with a Pentecostal mother?",
    excerpt: "She's already sent me three voice notes about 'spiritual covering.' I love her. I also can't go through this again. Anyone in the African diaspora found a script that works?",
    author: { name: "Adunni", flair: "Deconstructing", location: "Lagos → Manchester" },
    likes: 312, replies: 87, hours: 4,
  },
  {
    id: "p2",
    mood: "sage",
    title: "Genuinely curious — what's your favorite deconstruction podcast?",
    excerpt: "Not looking for a fight. I'm a practicing Christian but I think the questions matter. Drop your top one and one sentence on why.",
    author: { name: "Mark", flair: "Practicing Christian", location: "Nairobi" },
    likes: 128, replies: 54, hours: 9,
  },
  {
    id: "p3",
    mood: "ochre",
    title: "Win: I told my dad I'm not coming to crusade this year. He said 'okay.'",
    excerpt: "After 6 years of silent treatments, that 'okay' was everything. Small win. Posting so future-me can scroll back to it.",
    author: { name: "Chinedu", flair: "Left the Faith", location: "Abuja" },
    likes: 894, replies: 41, hours: 12,
  },
  {
    id: "p4",
    mood: "lavender",
    title: "Therapists who actually understand religious trauma — recs?",
    excerpt: "Bonus points if they understand African Pentecostal contexts specifically. Most of the directories I've found are very American-evangelical-flavored.",
    author: { name: "Sade", flair: "Deconstructing", location: "Accra" },
    likes: 220, replies: 73, hours: 18,
  },
  {
    id: "p5",
    mood: "slate-blue",
    title: "The Acts 8:37 thing broke my brain this week",
    excerpt: "Spent 20 years memorizing a verse that wasn't in the original manuscripts. The reader's annotation tab on this site changed how I see the whole NT.",
    author: { name: "Naomi", flair: "Reviewer", location: "Kingston" },
    likes: 411, replies: 96, hours: 22,
  },
  {
    id: "p6",
    mood: "terracotta",
    title: "Funeral coming up. Family expects me to pray. Help.",
    excerpt: "I don't want to disrespect the moment. I also can't fake it anymore. How have you handled the in-between?",
    author: { name: "T.", flair: "Questioning Believer", location: "Johannesburg" },
    likes: 156, replies: 62, hours: 30,
  },
  {
    id: "p7",
    mood: "sage",
    title: "Reading list for ex-evangelicals who still love poetry",
    excerpt: "Started with Christian Wiman. Where do I go next? I want the questions, not the answers.",
    author: { name: "Émile", flair: "Left the Faith", location: "Paris" },
    likes: 73, replies: 28, hours: 36,
  },
];

const MOODS: Mood[] = ["sage", "terracotta", "ochre", "lavender", "slate-blue"];

function Community() {
  const [filter, setFilter] = useState<Mood | "all">("all");
  const filtered = useMemo(() => filter === "all" ? POSTS : POSTS.filter((p) => p.mood === filter), [filter]);

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-5 pt-12 pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">The Stream</div>
            <h1 className="mt-1 font-display text-5xl md:text-6xl leading-none">Community</h1>
            <p className="mt-3 text-muted-foreground max-w-md">Pick a mood. Drop your story. No downvotes — ever.</p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:opacity-90">
            <Plus className="h-4 w-4" /> New post
          </button>
        </div>

        {/* Mood filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All" />
          {MOODS.map((m) => (
            <FilterChip
              key={m}
              active={filter === m}
              onClick={() => setFilter(m)}
              label={MOOD_LABEL[m]}
              swatchVar={`var(--${m})`}
            />
          ))}
        </div>

        {/* Stream */}
        <div className="mt-8 space-y-5">
          {filtered.map((p, i) => (
            <PostCard key={p.id} post={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label, swatchVar }: { active: boolean; onClick: () => void; label: string; swatchVar?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${active ? "bg-foreground text-background border-foreground" : "bg-card hover:bg-accent"}`}
    >
      {swatchVar && <span className="h-2.5 w-2.5 rounded-full" style={{ background: swatchVar }} />}
      {label}
    </button>
  );
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const moodVar = `var(--${post.mood})`;
  const fgVar = `var(--${post.mood}-foreground)`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border shadow-card cursor-pointer"
      style={{ background: `color-mix(in oklab, ${moodVar} 55%, white)`, color: fgVar }}
      whileHover={{ y: -2 }}
    >
      <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: moodVar }} />
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-70">
          <span className="h-2 w-2 rounded-full" style={{ background: moodVar }} />
          {MOOD_LABEL[post.mood]} · {post.hours}h
        </div>
        <h2 className="mt-3 font-display text-2xl md:text-3xl leading-tight" style={{ color: fgVar }}>
          {post.title}
        </h2>
        <p className="mt-3 text-sm md:text-base leading-relaxed opacity-85">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-medium">{post.author.name}</span>
          <FlairBadge flair={post.author.flair} />
          <span className="opacity-60">· {post.author.location}</span>
          <div className="ml-auto flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" /> {post.likes}</span>
            <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> {post.replies}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
