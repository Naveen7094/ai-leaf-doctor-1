import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, History as HistoryIcon, X } from "lucide-react";
import { AppShell, TreatmentBlock } from "@/components/AppShell";
import { DISEASES } from "@/lib/diseases";
import { clearHistory, getHistory, removeHistory, type HistoryItem } from "@/lib/history";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Diagnosis History — LeafDoctor" },
      { name: "description", content: "Review your past leaf scans, diagnoses and treatments." },
      { property: "og:title", content: "Diagnosis History — LeafDoctor" },
      { property: "og:description", content: "Review your past leaf scans and diagnoses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: History,
});

function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => setItems(getHistory()), []);

  return (
    <AppShell>
      <section className="px-5">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl">Diagnosis history</h1>
            <p className="text-sm text-muted-foreground">{items.length} saved scan{items.length === 1 ? "" : "s"} on this device</p>
          </div>
          {items.length > 0 && (
            <button onClick={() => { clearHistory(); setItems([]); }} className="text-sm text-destructive">Clear all</button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-card p-8 text-center">
            <HistoryIcon className="mx-auto mb-3 text-muted-foreground" size={36} />
            <p className="font-medium">No scans yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Your diagnoses will appear here.</p>
            <Link to="/" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">Scan a leaf</Link>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {items.map((h) => {
              const d = DISEASES.find((x) => x.id === h.diseaseId);
              if (!d) return null;
              const isOpen = open === h.id;
              return (
                <li key={h.id} className="overflow-hidden rounded-2xl bg-card shadow-sm">
                  <button onClick={() => setOpen(isOpen ? null : h.id)} className="flex w-full items-center gap-3 p-3 text-left">
                    {h.image ? <img src={h.image} alt="" className="h-16 w-16 rounded-xl object-cover" /> : <div className="h-16 w-16 rounded-xl bg-muted" />}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">{d.crop} · {new Date(h.date).toLocaleString()}</p>
                      <p className="truncate font-semibold">{d.name}</p>
                      <p className="text-xs text-primary">{h.confidence.toFixed(1)}% confidence · {d.severity}</p>
                    </div>
                    <span onClick={(e) => { e.stopPropagation(); removeHistory(h.id); setItems(getHistory()); }} className="p-2 text-muted-foreground" aria-label="Delete"><Trash2 size={16} /></span>
                  </button>
                  {isOpen && (
                    <div className="space-y-3 border-t p-4">
                      <ul className="space-y-1 text-sm">{d.symptoms.map((s) => <li key={s}>• {s}</li>)}</ul>
                      <TreatmentBlock title="🌿 Organic treatment" items={d.organic} tone="organic" />
                      <TreatmentBlock title="🧪 Chemical treatment" items={d.chemical} tone="chemical" />
                      <button onClick={() => setOpen(null)} className="flex items-center gap-1 text-xs text-muted-foreground"><X size={12} />Close</button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </AppShell>
  );
}
