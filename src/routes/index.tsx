import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Upload, RotateCcw, Loader2, Sparkles, Sprout, FlaskConical, ShieldCheck, Leaf, Sun, Focus, Hand } from "lucide-react";
import { addHistory, toThumb } from "@/lib/history";
import scanBg from "@/assets/scan-bg.jpg";
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
  return { top: pool[0]!, confidence, others: [{ d: pool[1]!, c: a }, { d: pool[2]!, c: rest - a }] };
}

function Scanner() {
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const [drag, setDrag] = useState(false);
  const onFile = (f?: File) => {
    if (!f || !f.type.startsWith("image/")) return;
    setImg(URL.createObjectURL(f));
    setResult(null);
    setScanning(true);
    const thumbP = toThumb(f);
    setTimeout(async () => {
      const r = diagnose();
      setResult(r); setScanning(false);
      addHistory({ id: crypto.randomUUID(), date: new Date().toISOString(), image: await thumbP, diseaseId: r.top.id, confidence: r.confidence });
    }, 2400);
  };
  const reset = () => { setImg(null); setResult(null); setScanning(false); };

  return (
    <AppShell>
      <section className="relative isolate mx-3 overflow-hidden rounded-3xl px-4 pt-6 pb-5">
        <img src={scanBg} alt="" width={768} height={1344} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/55 via-foreground/20 to-foreground/60" />
        <span className="inline-block rounded-full bg-background/25 px-3 py-1 text-xs text-primary-foreground backdrop-blur">AI leaf diagnosis</span>
        <h1 className="mt-2 font-display text-3xl leading-tight text-primary-foreground">Check your crop's health</h1>
        <p className="mt-1 text-sm text-primary-foreground/85">Snap or drop a photo of a single leaf.</p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files?.[0]); }}
          onClick={() => !img && fileRef.current?.click()}
          className={`relative mt-5 aspect-square cursor-pointer overflow-hidden rounded-3xl border border-primary-foreground/30 bg-background/20 backdrop-blur-md transition ${drag ? "ring-4 ring-primary" : ""}`}
        >
          {img ? <img src={img} alt="Leaf" className="h-full w-full object-cover" /> : (
            <div className="grid h-full place-items-center text-center text-primary-foreground">
              <div>
                <div className="mx-auto mb-3 grid h-20 w-20 place-items-center rounded-full bg-primary/80"><Leaf size={34} /></div>
                <p className="font-medium">Tap or drop a leaf photo</p>
                <p className="text-xs text-primary-foreground/75">JPG or PNG</p>
              </div>
            </div>
          )}
          {["top-3 left-3 border-t-4 border-l-4 rounded-tl-xl", "top-3 right-3 border-t-4 border-r-4 rounded-tr-xl", "bottom-3 left-3 border-b-4 border-l-4 rounded-bl-xl", "bottom-3 right-3 border-b-4 border-r-4 rounded-br-xl"].map((c) => (
            <span key={c} className={`pointer-events-none absolute h-8 w-8 border-primary-foreground ${c}`} />
          ))}
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
            <button onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl bg-card py-3 font-medium"><Upload size={18} />Upload</button>
          </div>
        ) : (
          <button onClick={reset} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-card py-3 font-medium"><RotateCcw size={18} />Scan another leaf</button>
        )}
        {!img && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-primary-foreground">
            {[[Sun, "Good light"], [Focus, "One leaf"], [Hand, "Hold steady"]].map(([I, t]) => {
              const Icon = I as typeof Sun;
              return <div key={t as string} className="rounded-xl bg-background/20 py-2 backdrop-blur"><Icon size={16} className="mx-auto mb-1" />{t as string}</div>;
            })}
          </div>
        )}
      </section>

      {!result && !scanning && (
        <section className="mt-6 px-5">
          <h2 className="mb-3 font-display text-xl">Features</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Sparkles, t: "AI diagnosis", d: "Instant results with confidence scores" },
              { icon: Sprout, t: "Organic care", d: "Natural, eco-friendly remedies" },
              { icon: FlaskConical, t: "Chemical options", d: "Targeted sprays with doses" },
              { icon: ShieldCheck, t: "Prevention", d: "Tips to protect future harvests" },
            ].map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-2xl bg-card p-4 shadow-sm">
                <div className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary"><I size={18} /></div>
                <p className="text-sm font-semibold">{t}</p>
                <p className="text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {result && (
        <section className="mt-6 space-y-4 px-5">
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            {img && <img src={img} alt="Scanned leaf" className="h-40 w-full object-cover" />}
            <div className="p-5">
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
