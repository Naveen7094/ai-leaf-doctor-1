import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, Lock, Loader2 } from "lucide-react";
import bg from "@/assets/login-bg.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — LeafDoctor" },
      { name: "description", content: "Sign in to LeafDoctor to scan leaves and track your crop health." },
      { property: "og:title", content: "Sign in — LeafDoctor" },
      { property: "og:description", content: "Sign in to LeafDoctor to scan leaves and track crop health." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/" }), 900);
  };
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full scale-105 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-foreground/40 to-foreground/90" />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-between px-6 py-10">
        <div className="flex items-center gap-2 text-primary-foreground">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary"><Leaf size={20} /></div>
          <span className="font-display text-2xl">LeafDoctor</span>
        </div>
        <div>
          <h1 className="font-display text-4xl leading-tight text-primary-foreground">Healthy leaves,<br /><em>healthier harvests.</em></h1>
          <p className="mt-2 text-sm text-primary-foreground/80">Sign in to diagnose your crops in seconds.</p>
          <form onSubmit={submit} className="mt-6 space-y-3 rounded-3xl border border-primary-foreground/20 bg-background/15 p-5 backdrop-blur-xl">
            <label className="flex items-center gap-3 rounded-xl bg-card/90 px-4 py-3">
              <Mail size={18} className="text-muted-foreground" />
              <input required type="email" placeholder="Email" className="w-full bg-transparent text-sm outline-none" />
            </label>
            <label className="flex items-center gap-3 rounded-xl bg-card/90 px-4 py-3">
              <Lock size={18} className="text-muted-foreground" />
              <input required type="password" placeholder="Password" className="w-full bg-transparent text-sm outline-none" />
            </label>
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground">
              {loading && <Loader2 size={16} className="animate-spin" />}Sign in
            </button>
            <p className="text-center text-xs text-primary-foreground/80">
              New here? <Link to="/login" className="font-semibold underline">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
