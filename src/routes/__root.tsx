import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AtomsAndEve — Deconstruct, together" },
      { name: "description", content: "A study + community platform for people deconstructing from religion. Read scripture with verified context. Talk it out with people who get it." },
      { property: "og:title", content: "AtomsAndEve — Deconstruct, together" },
      { property: "og:description", content: "Verified historical context for every verse. A community that debates the claim, not the person." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex flex-col"><Outlet /></main>
      </div>
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isReader = path.startsWith("/read");
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur ${isReader ? "bg-cream/85" : "bg-background/85"}`}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-full border border-foreground/80 grid place-items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
          </div>
          <span className="font-display text-xl tracking-tight">AtomsAndEve</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink to="/read" current={path}>Read</NavLink>
          <NavLink to="/community" current={path}>Community</NavLink>
          <Link to="/" className="ml-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:opacity-90 transition">
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, current, children }: { to: string; current: string; children: React.ReactNode }) {
  const active = current === to || (to !== "/" && current.startsWith(to));
  return (
    <Link to={to} className={`px-3 py-1.5 rounded-full transition ${active ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
      {children}
    </Link>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-2 text-muted-foreground">This passage was omitted in your translation.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2 text-sm text-background">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again, or head back home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-foreground px-4 py-2 text-sm text-background">Try again</button>
          <a href="/" className="rounded-full border px-4 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}
