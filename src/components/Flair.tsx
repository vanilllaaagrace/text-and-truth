import type { Flair } from "@/data/scripture";

const STYLES: Record<Flair, string> = {
  "Deconstructing": "bg-ochre/30 text-ochre-foreground",
  "Left the Faith": "bg-slate-blue/30 text-slate-blue-foreground",
  "Questioning Believer": "bg-lavender/30 text-lavender-foreground",
  "Practicing Christian": "bg-sage/30 text-sage-foreground",
  "Reviewer": "bg-foreground text-background",
};

export function FlairBadge({ flair }: { flair: Flair }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STYLES[flair]}`}>
      {flair}
    </span>
  );
}
