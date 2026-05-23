import type { Flair, UserIdentity } from "@/data/scripture";
import { ShieldCheck, User } from "lucide-react";

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

export function CountryBadge({ flag, country }: { flag: string; country: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium">
      <span aria-hidden>{flag}</span>
      <span>{country}</span>
    </span>
  );
}

export function VerificationBadge({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-verified/15 px-2 py-0.5 text-[10px] font-medium text-verified">
        <ShieldCheck className="h-3 w-3" /> Verified Reviewer
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      <User className="h-3 w-3" /> Regular Member
    </span>
  );
}

export function UserMeta({ user, compact = false }: { user: UserIdentity; compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${compact ? "text-[11px]" : "text-xs"}`}>
      <span className="font-medium">{user.name}</span>
      <FlairBadge flair={user.flair} />
      <CountryBadge flag={user.flag} country={user.country} />
      <VerificationBadge verified={user.verifiedReviewer} />
    </div>
  );
}
