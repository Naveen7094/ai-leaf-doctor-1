import { Link } from "@tanstack/react-router";
import { ScanLine, BookOpen, Leaf, History } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const item = "flex flex-1 flex-col items-center gap-1 py-2 text-xs text-muted-foreground";
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
      <header className="flex items-center gap-2 px-5 pt-6 pb-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Leaf size={18} /></div>
        <span className="font-display text-xl">LeafDoctor</span>
        <Link to="/login" className="ml-auto text-sm font-medium text-primary">Sign in</Link>
      </header>
      {children}
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md border-t bg-card">
        <Link to="/" className={item} activeProps={{ className: "text-primary font-semibold" }} activeOptions={{ exact: true }}><ScanLine size={20} />Scan</Link>
        <Link to="/history" className={item} activeProps={{ className: "text-primary font-semibold" }}><History size={20} />History</Link>
        <Link to="/library" className={item} activeProps={{ className: "text-primary font-semibold" }}><BookOpen size={20} />Library</Link>
      </nav>
    </div>
  );
}

export function TreatmentBlock({ title, items, tone }: { title: string; items: string[]; tone: "organic" | "chemical" }) {
  return (
    <div className={`rounded-xl p-4 ${tone === "organic" ? "bg-secondary" : "bg-accent"}`}>
      <h4 className="mb-2 text-sm font-semibold">{title}</h4>
      <ul className="space-y-1 text-sm">{items.map((i) => <li key={i}>• {i}</li>)}</ul>
    </div>
  );
}
