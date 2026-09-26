import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { AppShell, TreatmentBlock } from "@/components/AppShell";
import { DISEASES } from "@/lib/diseases";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Crop Disease Encyclopedia — LeafDoctor" },
      { name: "description", content: "Search crop diseases by name, crop or symptom with organic and chemical treatments." },
      { property: "og:title", content: "Crop Disease Encyclopedia — LeafDoctor" },
      { property: "og:description", content: "Searchable library of crop diseases and treatments." },
    ],
  }),
  component: Library,
});

function Library() {
  const [q, setQ] = useState("");
  const [crop, setCrop] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const crops = ["All", ...new Set(DISEASES.filter((d) => d.id !== "healthy").map((d) => d.crop))];
  const list = useMemo(() => DISEASES.filter((d) => d.id !== "healthy")
    .filter((d) => crop === "All" || d.crop === crop)
    .filter((d) => (d.name + d.crop + d.pathogen + d.symptoms.join(" ")).toLowerCase().includes(q.toLowerCase())), [q, crop]);

  return (
    <AppShell>
      <section className="px-5">
        <h1 className="font-display text-3xl">Disease library</h1>
        <div className="mt-4 flex items-center gap-2 rounded-xl border bg-card px-3">
          <Search size={18} className="text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search disease, crop, symptom…" className="w-full bg-transparent py-3 text-sm outline-none" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {crops.map((c) => (
            <button key={c} onClick={() => setCrop(c)} className={`shrink-0 rounded-full px-3 py-1 text-sm ${crop === c ? "bg-primary text-primary-foreground" : "border bg-card"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {list.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No diseases match your search.</p>}
          {list.map((d) => (
            <div key={d.id} className="rounded-2xl bg-card p-4">
              <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen(open === d.id ? null : d.id)}>
                <div>
                  <p className="text-xs text-muted-foreground">{d.crop} · {d.severity} risk</p>
                  <p className="font-display text-lg">{d.name}</p>
                </div>
                <ChevronDown className={`transition ${open === d.id ? "rotate-180" : ""}`} size={18} />
              </button>
              {open === d.id && (
                <div className="mt-3 space-y-3 text-sm">
                  <p className="italic text-muted-foreground">{d.pathogen}</p>
                  <ul className="space-y-1">{d.symptoms.map((s) => <li key={s}>• {s}</li>)}</ul>
                  <TreatmentBlock title="🌿 Organic" items={d.organic} tone="organic" />
                  <TreatmentBlock title="🧪 Chemical" items={d.chemical} tone="chemical" />
                  <p><b>Prevention:</b> {d.prevention}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
