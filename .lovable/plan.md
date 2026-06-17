text
## Plan

### 1. Rename the two product surfaces
Update all user-facing copy that still calls the sections "Bible Engine" / "Community" / "Community Stream" to the new names:
- **Landing page (`src/routes/index.tsx`)**
  - CTA: "Open the Bible Engine" → "Open The Precipice"
  - CTA: "Visit the Community" → "Visit The Lounge"
  - Floating card label: "Community · Terracotta" → "The Lounge · Terracotta"
  - Section kicker: "Part 1 — The Bible Engine" → "Part 1 — The Precipice"
  - Section kicker: "Part 2 — The Community Stream" → "Part 2 — The Lounge"
- **Community feed (`src/routes/community.tsx`)**
  - Page title: "Community — AtomsAndEve" → "The Lounge — AtomsAndEve"
  - Kicker: "The Stream" → "The Lounge"
  - Page heading: "Community" → "The Lounge"
- **Reader (`src/routes/read.tsx`)**
  - Sidebar tab: "Community" → "The Lounge"
  - Empty-state hint: "Community on the right" → "The Lounge on the right"
- Route files (`/read`, `/community`) and URLs stay the same unless you want them changed later.

### 2. Detailed visual design description

**Overall direction**
Two emotional zones in one app: a quiet, premium academic study room (The Precipice) and a warm, color-coded community kitchen table (The Lounge). The aesthetic is editorial, bookish, and textured — like a high-end literary magazine crossed with a carefully moderated community board.

**Typography**
- Global font: `Baskerville, Libre Baskerville, Times New Roman, Georgia, serif` used for both headings and body text.
- Display font: same serif stack with slight negative letter-spacing (`-0.01em`) and tight leading for a premium, classic feel.
- Monospace: `JetBrains Mono` for verse numbers, translation pickers, and metadata chips.
- Result: every screen reads like a printed page rather than a generic app.

**Color palette**
- Editorial base: warm cream background (`oklch(0.975 0.012 85)`), deep ink text (`oklch(0.18 0.01 60)`), parchment accents (`oklch(0.955 0.02 85)`).
- Cards: white or translucent cream on the reader; on the community feed they are tinted by topic.
- Verification states: sage green for verified, warm amber/gold for pending.
- Community topic colors (used for card backgrounds, left accent bars, filter chips, and flair badges):
  - Sage green → Family & Culture
  - Terracotta → Personal Stories
  - Ochre → Theology & Logic
  - Lavender → Media & Resources
  - Slate blue → General Q&A
- Each community card is rendered as a 55% mix of its topic color with white, plus a 1.5px solid left bar of the pure topic color.

**Layout**
- Landing page: generous whitespace, max-width 6xl container, large serif headline, floating preview cards on the right on desktop.
- Reader: split-screen on desktop (text column + sticky 460px sidebar); on mobile the context panel slides up as a spring-animated drawer.
- Community feed: single-column centered feed at max-w-3xl, with a filter chip bar and a category legend above the cards.

**Components**
- `VerseLine`: serif verse text, small mono verse numbers, subtle hover highlight. Ghost verses (e.g., Acts 8:37 in ESV/NIV) show as dashed italic placeholders that invite a click.
- `ContextPanel`: tabbed sidebar with Annotations / The Lounge tabs, cards showing category badges, reviewer status, and `UserMeta`.
- `PostCard`: rounded-3xl, color-coded by topic, left accent bar, hover lift animation.
- `UserMeta`: name + flair badge + country flag/country badge + reviewer verification badge.
- `FlairBadge`: colored by flair (Deconstructing, Left the Faith, Questioning Believer, Practicing Christian, Reviewer).

**Motion & texture**
- Framer Motion handles hero fade-in, staggered card entry, and the mobile drawer spring slide.
- Hover effects: community cards lift `-2px`, verse lines get a subtle background tint.
- `.paper-grain`: a two-layer radial dot pattern at 24px and 13px offsets, very subtle (~2% / 1.5% opacity), applied to the landing and reader backgrounds to give the feel of textured paper.

**Dark mode**
- Tokens invert to dark parchment/ink while keeping the same accent and topic colors, so the mood stays consistent at night.

If you want this design description saved as a permanent design.md or memory file for future reference, let me know and I'll add it to the project.