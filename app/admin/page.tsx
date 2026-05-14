"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LogOut, Plus, Trash2, Edit2, Save, X, CheckCircle,
  AlertCircle, Loader2, FolderOpen, User, Briefcase,
} from "lucide-react";
import type { PortfolioData, Project, Experience } from "@/lib/content";

/* ─── helpers ────────────────────────────────────────────────────────────── */
function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const emptyProject = (): Project => ({
  slug: "", title: "", description: "", category: "Full-Stack",
  featured: false, technologies: [], impact: "",
  coverUrl: "", liveUrl: "", githubUrl: "", caseStudy: "",
});

const emptyExperience = (): Experience => ({
  company: "", role: "", period: "", current: false, location: "",
  logoUrl: "", points: [], technologies: [],
});

/* ─── Login screen ───────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw]     = useState("");
  const [err, setErr]   = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setBusy(false);
    if (res.ok) { onLogin(); }
    else { setErr("Wrong password."); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm glass-card-accent p-8 space-y-5">
        <div>
          <h1 className="font-display text-2xl font-bold gradient-text">Portfolio Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your admin password to continue.</p>
        </div>
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold
                     hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center
                     justify-center gap-2"
        >
          {busy && <Loader2 size={15} className="animate-spin" />}
          Sign In
        </button>
      </form>
    </div>
  );
}

/* ─── Toast ──────────────────────────────────────────────────────────────── */
type ToastState = { msg: string; type: "success" | "error" } | null;

/* ─── Project form ───────────────────────────────────────────────────────── */
function ProjectForm({
  initial, onSave, onCancel,
}: {
  initial: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [p, setP] = useState<Project>({ ...initial });

  const set = (field: keyof Project, value: unknown) =>
    setP(prev => ({ ...prev, [field]: value }));

  return (
    <div className="glass-card p-6 space-y-4 border-primary/20">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Title *
          </label>
          <input
            value={p.title}
            onChange={e => { set("title", e.target.value); set("slug", slugify(e.target.value)); }}
            className={inputCls}
            placeholder="Project title"
            required
          />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <select value={p.category} onChange={e => set("category", e.target.value)} className={inputCls}>
            {["Full-Stack", "Frontend", "Backend", "Mobile", "DevOps"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Impact (short badge)</label>
          <input value={p.impact} onChange={e => set("impact", e.target.value)} className={inputCls} placeholder="e.g. 10k users" />
        </div>
        <div>
          <label className={labelCls}>Live URL</label>
          <input value={p.liveUrl} onChange={e => set("liveUrl", e.target.value)} className={inputCls} placeholder="https://..." />
        </div>
        <div>
          <label className={labelCls}>GitHub URL</label>
          <input value={p.githubUrl} onChange={e => set("githubUrl", e.target.value)} className={inputCls} placeholder="https://github.com/..." />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Technologies (comma-separated)</label>
          <input
            value={p.technologies.join(", ")}
            onChange={e => set("technologies", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
            className={inputCls}
            placeholder="React, Node.js, PostgreSQL"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Short Description *</label>
          <textarea
            value={p.description}
            onChange={e => set("description", e.target.value)}
            rows={2}
            className={`${inputCls} resize-none`}
            placeholder="Shown on the project card"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Case Study (shown on /projects/slug — separate paragraphs with blank lines)</label>
          <textarea
            value={p.caseStudy}
            onChange={e => set("caseStudy", e.target.value)}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Full case study text..."
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={p.featured}
            onChange={e => set("featured", e.target.checked)}
            className="accent-primary h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm text-foreground">Featured (shown by default)</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(p)}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground
                     font-semibold text-sm hover:opacity-90 transition-opacity">
          <Save size={14} /> Save Project
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2 rounded-xl glass-card text-muted-foreground
                     text-sm hover:text-foreground transition-colors">
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

/* ─── Shared CSS ─────────────────────────────────────────────────────────── */
const inputCls = `w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground
  placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40`;
const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1";

/* ─── Profile tab ────────────────────────────────────────────────────────── */
function ProfileTab({
  data, onChange,
}: {
  data: PortfolioData;
  onChange: (d: PortfolioData) => void;
}) {
  const p = data.profile;
  const setP = (field: string, value: unknown) =>
    onChange({ ...data, profile: { ...p, [field]: value } });

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name</label>
          <input value={p.name} onChange={e => setP("name", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Tagline</label>
          <input value={p.tagline} onChange={e => setP("tagline", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Location</label>
          <input value={p.location} onChange={e => setP("location", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Availability Label</label>
          <input value={p.availabilityLabel} onChange={e => setP("availabilityLabel", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>GitHub URL</label>
          <input value={p.social.github} onChange={e => setP("social", { ...p.social, github: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>LinkedIn URL</label>
          <input value={p.social.linkedin} onChange={e => setP("social", { ...p.social, linkedin: e.target.value })} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Bio paragraph 1</label>
          <textarea value={p.bio[0]} onChange={e => setP("bio", [e.target.value, p.bio[1] ?? ""])} rows={3} className={`${inputCls} resize-none`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Bio paragraph 2</label>
          <textarea value={p.bio[1] ?? ""} onChange={e => setP("bio", [p.bio[0], e.target.value])} rows={3} className={`${inputCls} resize-none`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Typing roles (one per line)</label>
          <textarea
            value={p.typingRoles.join("\n")}
            onChange={e => setP("typingRoles", e.target.value.split("\n").filter(Boolean))}
            rows={4}
            className={`${inputCls} resize-none font-mono text-xs`}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Projects tab ───────────────────────────────────────────────────────── */
function ProjectsTab({ data, onChange }: { data: PortfolioData; onChange: (d: PortfolioData) => void }) {
  const [editing, setEditing] = useState<number | "new" | null>(null);

  const save = (project: Project, idx: number | "new") => {
    const list = [...data.projects];
    if (idx === "new") list.push(project);
    else list[idx] = project;
    onChange({ ...data, projects: list });
    setEditing(null);
  };

  const remove = (idx: number) => {
    if (!confirm(`Delete "${data.projects[idx].title}"?`)) return;
    const list = [...data.projects];
    list.splice(idx, 1);
    onChange({ ...data, projects: list });
  };

  return (
    <div className="space-y-4">
      {data.projects.map((proj, i) => (
        <div key={proj.slug || i}>
          {editing === i ? (
            <ProjectForm initial={proj} onSave={p => save(p, i)} onCancel={() => setEditing(null)} />
          ) : (
            <div className="glass-card p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-sm text-foreground truncate">{proj.title}</p>
                  {proj.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Featured</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{proj.category} · {proj.technologies.slice(0, 3).join(", ")}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => setEditing(i)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-2 transition-colors"
                  title="Edit">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => remove(i)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-surface-2 transition-colors"
                  title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {editing === "new" ? (
        <ProjectForm initial={emptyProject()} onSave={p => save(p, "new")} onCancel={() => setEditing(null)} />
      ) : (
        <button onClick={() => setEditing("new")}
          className="w-full py-3 rounded-xl border-2 border-dashed border-border text-sm
                     text-muted-foreground hover:border-primary/40 hover:text-primary
                     transition-colors flex items-center justify-center gap-2">
          <Plus size={15} /> Add New Project
        </button>
      )}
    </div>
  );
}

/* ─── Experience tab ─────────────────────────────────────────────────────── */
function ExperienceTab({ data, onChange }: { data: PortfolioData; onChange: (d: PortfolioData) => void }) {
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [draft, setDraft] = useState<Experience>(emptyExperience());

  const startEdit = (idx: number | "new") => {
    setDraft(idx === "new" ? emptyExperience() : { ...data.experiences[idx] });
    setEditing(idx);
  };

  const save = () => {
    const list = [...data.experiences];
    if (editing === "new") list.unshift(draft);
    else if (typeof editing === "number") list[editing] = draft;
    onChange({ ...data, experiences: list });
    setEditing(null);
  };

  const remove = (idx: number) => {
    if (!confirm(`Delete "${data.experiences[idx].company}"?`)) return;
    const list = [...data.experiences];
    list.splice(idx, 1);
    onChange({ ...data, experiences: list });
  };

  return (
    <div className="space-y-4">
      {data.experiences.map((exp, i) => (
        <div key={i}>
          {editing === i ? (
            <div className="glass-card p-5 space-y-3 border-primary/20">
              <div className="grid sm:grid-cols-2 gap-3">
                {(["company", "role", "period", "location"] as const).map(f => (
                  <div key={f}>
                    <label className={labelCls}>{f}</label>
                    <input value={draft[f] as string} onChange={e => setDraft(d => ({ ...d, [f]: e.target.value }))} className={inputCls} />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className={labelCls}>Technologies (comma-separated)</label>
                  <input
                    value={draft.technologies.join(", ")}
                    onChange={e => setDraft(d => ({ ...d, technologies: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))}
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Bullet points (one per line)</label>
                  <textarea
                    value={draft.points.join("\n")}
                    onChange={e => setDraft(d => ({ ...d, points: e.target.value.split("\n") }))}
                    rows={5}
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={draft.current} onChange={e => setDraft(d => ({ ...d, current: e.target.checked }))} className="accent-primary h-4 w-4" />
                  <label className="text-sm text-foreground">Current role</label>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
                  <Save size={13} /> Save
                </button>
                <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl glass-card text-sm text-muted-foreground">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="glass-card p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-sm text-foreground">{exp.role} <span className="text-primary">@ {exp.company}</span></p>
                <p className="text-xs text-muted-foreground">{exp.period} · {exp.location}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => startEdit(i)} className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-2"><Edit2 size={14} /></button>
                <button onClick={() => remove(i)} className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-surface-2"><Trash2 size={14} /></button>
              </div>
            </div>
          )}
        </div>
      ))}

      {editing === "new" ? (
        <div className="glass-card p-5 space-y-3 border-primary/20">
          <div className="grid sm:grid-cols-2 gap-3">
            {(["company", "role", "period", "location"] as const).map(f => (
              <div key={f}>
                <label className={labelCls}>{f}</label>
                <input value={draft[f] as string} onChange={e => setDraft(d => ({ ...d, [f]: e.target.value }))} className={inputCls} />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className={labelCls}>Technologies (comma-separated)</label>
              <input value={draft.technologies.join(", ")} onChange={e => setDraft(d => ({ ...d, technologies: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Bullet points (one per line)</label>
              <textarea value={draft.points.join("\n")} onChange={e => setDraft(d => ({ ...d, points: e.target.value.split("\n") }))} rows={5} className={`${inputCls} resize-none`} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={draft.current} onChange={e => setDraft(d => ({ ...d, current: e.target.checked }))} className="accent-primary h-4 w-4" />
              <label className="text-sm text-foreground">Current role</label>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
              <Save size={13} /> Save
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl glass-card text-sm text-muted-foreground">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => startEdit("new")} className="w-full py-3 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors flex items-center justify-center gap-2">
          <Plus size={15} /> Add Experience
        </button>
      )}
    </div>
  );
}

/* ─── Main admin dashboard ───────────────────────────────────────────────── */
const TABS = [
  { id: "projects",   label: "Projects",   Icon: FolderOpen  },
  { id: "profile",    label: "Profile",    Icon: User        },
  { id: "experience", label: "Experience", Icon: Briefcase   },
] as const;
type Tab = (typeof TABS)[number]["id"];

export default function AdminPage() {
  const [authed, setAuthed]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData]       = useState<PortfolioData | null>(null);
  const [tab, setTab]         = useState<Tab>("projects");
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState<ToastState>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadContent = useCallback(async () => {
    const res = await fetch("/api/admin/content");
    if (res.ok) setData(await res.json());
  }, []);

  // Check session on mount
  useEffect(() => {
    fetch("/api/admin/content")
      .then(r => {
        if (r.ok) { setAuthed(true); return r.json(); }
        return null;
      })
      .then(d => { if (d) setData(d); })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async () => {
    setAuthed(true);
    await loadContent();
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    const json = await res.json();
    if (res.ok) showToast(json.message ?? "Saved!", "success");
    else showToast(json.error ?? "Save failed", "error");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false); setData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 sidebar-glass px-6 py-4
                          flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-lg gradient-text leading-tight">
            Portfolio Admin
          </h1>
          <p className="text-xs text-muted-foreground">Changes save to GitHub → auto-redeploy in ~60s</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || !data}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground
                       font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {saving
              ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
              : <><Save size={14} /> Publish Changes</>
            }
          </button>
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl glass-card text-muted-foreground hover:text-foreground transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5
                         rounded-xl text-sm font-semibold shadow-xl backdrop-blur-sm
                         ${toast.type === "success"
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-red-400/10 text-red-400 border border-red-400/20"}`}>
          {toast.type === "success"
            ? <CheckCircle size={15} />
            : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-border/50 px-6">
        <div className="flex gap-1">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors
                           ${tab === id
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {!data ? (
          <div className="text-center py-12 text-muted-foreground">Loading content…</div>
        ) : (
          <>
            {tab === "projects"   && <ProjectsTab   data={data} onChange={setData} />}
            {tab === "profile"    && <ProfileTab    data={data} onChange={setData} />}
            {tab === "experience" && <ExperienceTab data={data} onChange={setData} />}
          </>
        )}
      </main>
    </div>
  );
}
