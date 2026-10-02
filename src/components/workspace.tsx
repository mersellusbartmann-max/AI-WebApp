import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import {
  CalendarCheck,
  Mail,
  MessageSquare,
  NotebookPen,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import { generateNexora } from "@/lib/ai";
import {
  MODULES,
  type Audience,
  type EmailTone,
  type ModuleId,
  type PlanHorizon,
} from "@/lib/prompts";
import { cn } from "@/lib/utils";
import { NexoraMark } from "@/components/mark";
import { OutputPane } from "@/components/output-pane";
import { Chip } from "@/components/chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ICONS: Record<ModuleId, typeof Mail> = {
  email: Mail,
  meeting: NotebookPen,
  planner: CalendarCheck,
  research: Search,
  chat: MessageSquare,
};

type ChatTurn = { role: "user" | "assistant"; content: string };

const EMAIL_SAMPLES = [
  {
    label: "Delay follow-up",
    purpose: "Follow up on a delayed delivery and confirm the new date",
    details:
      "Client: Northline Logistics. Original delivery 8 Oct. New expected date 15 Oct. Keep polite but firm. Ask them to confirm warehouse receiving hours.",
  },
  {
    label: "Status to manager",
    purpose: "Weekly status update on the onboarding redesign",
    details:
      "Shipped prototype review, 2 remaining accessibility tickets, blocked on legal copy. Request 30 minutes Thursday.",
  },
];

const MEETING_SAMPLE = `Standup — 1 Oct — Product, Design, Eng
Attendees: Maya (PM), Jules (Design), Ari (Eng), Sam (CS)
Maya: Q3 review deck due Friday. Need final numbers from Ari by Wednesday EOD.
Jules: Onboarding flow mock is ready for review today.
Ari: Auth bug in staging; ETA tomorrow noon. Cannot start analytics until that's merged.
Decision: Ship onboarding behind a feature flag next Tuesday.
Action: Sam to send customer quotes for the deck by Thursday 3pm.
Open: Do we include the EU pricing table? Maya to confirm with finance.`;

const PLANNER_SAMPLE = {
  goal: "Prepare a quarterly business review presentation for Friday",
  tasks: "Sales data exported. Need narrative, 12 slides, dry-run with manager Thursday.",
  constraints: "About 6 focused hours this week. No designer available.",
};

const RESEARCH_SAMPLE = {
  topic: "Adopting AI meeting assistants in mid-sized professional services firms",
  focus: "Productivity gains, data privacy risks, and rollout recommendations. Prefer last 2 years.",
};

export function Workspace() {
  const [module, setModule] = useState<ModuleId>("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  const [purpose, setPurpose] = useState(EMAIL_SAMPLES[0].purpose);
  const [audience, setAudience] = useState<Audience>("client");
  const [tone, setTone] = useState<EmailTone>("formal");
  const [details, setDetails] = useState(EMAIL_SAMPLES[0].details);

  const [notes, setNotes] = useState(MEETING_SAMPLE);
  const [goal, setGoal] = useState(PLANNER_SAMPLE.goal);
  const [horizon, setHorizon] = useState<PlanHorizon>("weekly");
  const [tasks, setTasks] = useState(PLANNER_SAMPLE.tasks);
  const [constraints, setConstraints] = useState(PLANNER_SAMPLE.constraints);
  const [topic, setTopic] = useState(RESEARCH_SAMPLE.topic);
  const [focus, setFocus] = useState(RESEARCH_SAMPLE.focus);

  const [chatInput, setChatInput] = useState("");
  const [chat, setChat] = useState<ChatTurn[]>([]);

  const meta = useMemo(
    () => MODULES.find((m) => m.id === module)!,
    [module],
  );

  function switchModule(id: ModuleId) {
    setModule(id);
    setError(null);
    if (id !== "chat") {
      setOutput("");
    }
  }

  async function run(payload: {
    module: "email" | "meeting" | "planner" | "research" | "chat";
    data: Record<string, unknown>;
  }) {
    setLoading(true);
    setError(null);
    try {
      const result = await generateNexora({ data: payload });
      if (!result.ok) {
        setError(result.error);
        return null;
      }
      setOutput(result.text);
      return result.text;
    } catch {
      setError("Could not reach the assistant. Try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function onGenerate(e: FormEvent) {
    e.preventDefault();
    if (module === "chat") return;
    if (module === "email") {
      await run({
        module: "email",
        data: { purpose, audience, tone, details },
      });
    } else if (module === "meeting") {
      await run({ module: "meeting", data: { notes } });
    } else if (module === "planner") {
      await run({ module: "planner", data: { goal, horizon, tasks, constraints } });
    } else if (module === "research") {
      await run({ module: "research", data: { topic, focus } });
    }
  }

  async function onChat(e: FormEvent) {
    e.preventDefault();
    const message = chatInput.trim();
    if (!message || loading) return;
    setChatInput("");
    const nextHistory = [...chat, { role: "user" as const, content: message }];
    setChat(nextHistory);
    setLoading(true);
    setError(null);
    try {
      const result = await generateNexora({
        data: {
          module: "chat",
          data: { message, history: chat },
        },
      });
      if (!result.ok) {
        setError(result.error);
        setChat((prev) => [
          ...prev,
          { role: "assistant", content: result.error },
        ]);
        return;
      }
      setOutput(result.text);
      setChat((prev) => [...prev, { role: "assistant", content: result.text }]);
    } catch {
      setError("Could not reach the assistant. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const NavIcon = ICONS[module];

  return (
    <div className="grid-bg min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-7xl flex-col lg:flex-row">
        <aside className="flex flex-col border-b border-border px-4 py-4 lg:w-64 lg:border-r lg:border-b-0 lg:px-5 lg:py-6">
          <div className="flex items-center gap-3">
            <NexoraMark className="size-9 text-primary" />
            <div>
              <p className="font-display text-lg font-semibold tracking-tight leading-none">
                NEXORA
              </p>
              <p className="mt-1 text-xs text-muted">Workplace command deck</p>
            </div>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-col lg:overflow-visible" aria-label="Modules">
            {MODULES.map((item) => {
              const Icon = ICONS[item.id];
              const active = item.id === module;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => switchModule(item.id)}
                  className={cn(
                    "flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg px-3 text-left text-sm transition-[background-color,color] duration-150",
                    active
                      ? "bg-elevated text-fg shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]"
                      : "text-muted hover:bg-elevated hover:text-fg",
                  )}
                >
                  <Icon className={cn("size-4", active && "text-primary")} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto hidden pt-8 lg:block">
            <p className="text-xs leading-relaxed text-subtle">
              Each module runs a structured prompt: role, task, context, constraints, and output format.
            </p>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <header className="stagger-in mb-6">
            <Badge>Live Grok</Badge>
            <div className="mt-3 flex items-start gap-3">
              <NavIcon className="mt-1 size-5 text-primary" />
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  {meta.label}
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {meta.blurb}
                </p>
              </div>
            </div>
          </header>

          {module === "chat" ? (
            <div className="flex min-h-0 flex-1 flex-col gap-4">
              <div className="min-h-80 flex-1 overflow-auto rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
                {chat.length === 0 ? (
                  <div className="flex h-full min-h-64 flex-col justify-center">
                    <p className="font-display text-lg font-medium">Ask NEXORA</p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      Draft a reply, unpack a messy brief, or pressure-test a plan. Workplace topics only.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        "Help me rewrite this status update so it is shorter.",
                        "What should I cover in a 15-minute 1:1 with my manager?",
                        "Give me a checklist for handing a project to another team.",
                      ].map((q) => (
                        <button
                          key={q}
                          type="button"
                          className="max-w-full rounded-lg bg-elevated px-3 py-2 text-left text-sm text-fg shadow-[inset_0_0_0_1px_var(--color-border)] hover:shadow-[var(--shadow-border-hover)]"
                          onClick={() => setChatInput(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ol className="space-y-4">
                    {chat.map((turn, i) => (
                      <li
                        key={`${turn.role}-${i}`}
                        className={cn(
                          "rounded-lg px-3 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                          turn.role === "user"
                            ? "ml-8 bg-elevated text-fg"
                            : "mr-4 bg-bg text-fg shadow-[inset_0_0_0_1px_var(--color-border)]",
                        )}
                      >
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                          {turn.role === "user" ? "You" : "NEXORA"}
                        </p>
                        {turn.content}
                      </li>
                    ))}
                    {loading ? (
                      <li className="mr-4 rounded-lg bg-bg px-3 py-3 text-sm text-muted shadow-[inset_0_0_0_1px_var(--color-border)]">
                        Thinking…
                      </li>
                    ) : null}
                  </ol>
                )}
              </div>
              {error && chat.length === 0 ? (
                <p className="text-sm text-danger">{error}</p>
              ) : null}
              <form onSubmit={onChat} className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about email, meetings, plans, or research…"
                  aria-label="Assistant message"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !chatInput.trim()} aria-label="Send">
                  <Send className="size-4" />
                  Send
                </Button>
              </form>
            </div>
          ) : (
            <div className="grid flex-1 gap-4 lg:grid-cols-2 lg:items-start">
              <form
                onSubmit={onGenerate}
                className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
              >
                {module === "email" ? (
                  <div className="space-y-4">
                    <Field label="Purpose">
                      <Input
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                        maxLength={400}
                      />
                    </Field>
                    <div>
                      <Label>Audience</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(["client", "manager", "team"] as Audience[]).map((a) => (
                          <Chip key={a} active={audience === a} onClick={() => setAudience(a)}>
                            {a}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Tone</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(["formal", "informal", "persuasive"] as EmailTone[]).map((t) => (
                          <Chip key={t} active={tone === t} onClick={() => setTone(t)}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <Field label="Details">
                      <Textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        maxLength={6000}
                      />
                    </Field>
                    <div className="flex flex-wrap gap-2">
                      {EMAIL_SAMPLES.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          className="text-xs text-ice underline-offset-2 hover:underline"
                          onClick={() => {
                            setPurpose(s.purpose);
                            setDetails(s.details);
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {module === "meeting" ? (
                  <Field label="Notes or transcript">
                    <Textarea
                      className="min-h-72"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      required
                      maxLength={8000}
                    />
                  </Field>
                ) : null}

                {module === "planner" ? (
                  <div className="space-y-4">
                    <Field label="Goal">
                      <Input
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        required
                        maxLength={400}
                      />
                    </Field>
                    <div>
                      <Label>Horizon</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(["daily", "weekly"] as PlanHorizon[]).map((h) => (
                          <Chip key={h} active={horizon === h} onClick={() => setHorizon(h)}>
                            {h}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <Field label="Current tasks">
                      <Textarea
                        value={tasks}
                        onChange={(e) => setTasks(e.target.value)}
                        maxLength={3000}
                      />
                    </Field>
                    <Field label="Constraints">
                      <Textarea
                        className="min-h-24"
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                        maxLength={2000}
                      />
                    </Field>
                  </div>
                ) : null}

                {module === "research" ? (
                  <div className="space-y-4">
                    <Field label="Topic">
                      <Input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        maxLength={400}
                      />
                    </Field>
                    <Field label="Focus">
                      <Textarea
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        maxLength={2000}
                      />
                    </Field>
                  </div>
                ) : null}

                <Button type="submit" className="mt-5 w-full" disabled={loading}>
                  <Sparkles className="size-4" />
                  {loading ? "Generating" : "Generate"}
                </Button>
              </form>

              <OutputPane
                title="Output"
                text={output}
                loading={loading}
                error={error}
                emptyHint="Fill the brief, then generate. Output stays here so you can copy it into mail, docs, or a ticket."
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
