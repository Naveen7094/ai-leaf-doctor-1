import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Upload, RotateCcw, Loader2 } from "lucide-react";
import { AppShell, TreatmentBlock } from "@/components/AppShell";
import { DISEASES, type Disease } from "@/lib/diseases";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LeafDoctor — AI Crop Disease Scanner" },
      { name: "description", content: "Scan a leaf photo to detect crop diseases and get organic and chemical treatments." },
      { property: "og:title", content: "LeafDoctor — AI Crop Disease Scanner" },
      { property: "og:description", content: "Scan a leaf photo to detect crop diseases and get treatments." },
    ],
  }),
  component: Scanner,
});

type Result = { top: Disease; confidence: number; others: { d: Disease; c: number }[] };

function diagnose(): Result {
  const pool = [...DISEASES].sort(() => Math.random() - 0.5);
  const confidence = 78 + Math.random() * 20;
  const rest = 100 - confidence;
  const a = rest * (0.5 + Math.random() * 0.3);
  return { top: pool[0], confidence, others: [{ d: pool[1], c: a }, { d: pool[2], c: rest - a }] };
}

function Scanner() {
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const onFile = (f?: File) => {
    if (!f) return;
    setImg(URL.createObjectURL(f));
    setResult(null);
    setScanning(true);
    setTimeout(() => { setResult(diagnose()); setScanning(false); }, 2400);
  };
  const reset = () => { setImg(null); setResult(null); setScanning(false); };

  return (
    <AppShell>
      <section className="px-5">
        <h1 className="font-display text-3xl leading-tight">Check your crop's health</h1>
        <p className="mt-1 text-sm text-muted-foreground">Photograph a single leaf in good light.</p>

        <div className="relative mt-5 aspect-square overflow-hidden rounded-3xl border-2 border-dashed border-primary/40 bg-card">
          {img ? <img src={img} alt="Leaf" className="h-full w-full object-cover" /> : (
            <div className="grid h-full place-items-center text-center text-muted-foreground">
              <div><div className="mx-auto mb-3 h-24 w-24 rounded-full border-4 border-primary/30" /><p className="text-sm">Align the leaf inside the frame</p></div>
            </div>
          )}
          {scanning && (
            <>
              <div className="scan-line absolute inset-x-0 h-1 bg-primary shadow-[0_0_20px] shadow-primary" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-background/80 py-3 text-sm"><Loader2 className="animate-spin" size={16} />Analysing leaf patterns…</div>
            </>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
        <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onFile(e.target.files?.[0])} />
        {!img ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={() => camRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground"><Camera size={18} />Camera</button>
            <button onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl border bg-card py-3 font-medium"><Upload size={18} />Upload</button>
          </div>
        ) : (
          <button onClick={reset} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border bg-card py-3 font-medium"><RotateCcw size={18} />Scan another leaf</button>
        )}
      </section>

      {result && (
        <section className="mt-6 space-y-4 px-5">
          <div className="rounded-2xl bg-card p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Diagnosis · {result.top.crop}</p>
            <h2 className="font-display text-2xl">{result.top.name}</h2>
            <p className="text-sm italic text-muted-foreground">{result.top.pathogen}</p>
            <div className="mt-4 flex items-center justify-between text-sm"><span>Confidence</span><span className="font-semibold">{result.confidence.toFixed(1)}%</span></div>
            <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${result.confidence}%` }} /></div>
            <p className="mt-3 inline-block rounded-full bg-accent px-3 py-1 text-xs">Severity: {result.top.severity}</p>
            <div className="mt-4 space-y-1 text-xs text-muted-foreground">
              {result.others.map((o) => <div key={o.d.id} className="flex justify-between"><span>{o.d.crop} · {o.d.name}</span><span>{o.c.toFixed(1)}%</span></div>)}
            </div>
          </div>
          <div className="rounded-2xl bg-card p-5">
            <h3 className="mb-2 font-semibold">Symptoms</h3>
            <ul className="space-y-1 text-sm">{result.top.symptoms.map((s) => <li key={s}>• {s}</li>)}</ul>
          </div>
          <TreatmentBlock title="🌿 Organic treatment" items={result.top.organic} tone="organic" />
          <TreatmentBlock title="🧪 Chemical treatment" items={result.top.chemical} tone="chemical" />
          <p className="rounded-xl bg-muted p-4 text-sm"><b>Prevention:</b> {result.top.prevention}</p>
          <p className="pb-4 text-center text-xs text-muted-foreground">Prototype — results are simulated. Consult an agronomist before spraying.</p>
        </section>
      )}
    </AppShell>
  );
}
