export type ModuleId = "email" | "meeting" | "planner" | "research" | "chat";

export type EmailTone = "formal" | "informal" | "persuasive";
export type Audience = "client" | "manager" | "team";
export type PlanHorizon = "daily" | "weekly";

export const MODULES: {
  id: ModuleId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "email",
    label: "Email",
    blurb: "Audience-aware drafts with tone control",
  },
  {
    id: "meeting",
    label: "Meetings",
    blurb: "Decisions, owners, and deadlines extracted",
  },
  {
    id: "planner",
    label: "Planner",
    blurb: "Prioritized plans with time strategy",
  },
  {
    id: "research",
    label: "Research",
    blurb: "Briefings with insights, not filler",
  },
  {
    id: "chat",
    label: "Assistant",
    blurb: "A live workplace copilot",
  },
];

export type EmailPayload = {
  purpose: string;
  audience: Audience;
  tone: EmailTone;
  details: string;
};

export type MeetingPayload = {
  notes: string;
};

export type PlannerPayload = {
  goal: string;
  horizon: PlanHorizon;
  tasks: string;
  constraints: string;
};

export type ResearchPayload = {
  topic: string;
  focus: string;
};

export type ChatPayload = {
  message: string;
  history: { role: "user" | "assistant"; content: string }[];
};

export type GeneratePayload =
  | { module: "email"; data: EmailPayload }
  | { module: "meeting"; data: MeetingPayload }
  | { module: "planner"; data: PlannerPayload }
  | { module: "research"; data: ResearchPayload }
  | { module: "chat"; data: ChatPayload };

function wrapStructured(parts: {
  role: string;
  task: string;
  context: string;
  userInput: string;
  constraints: string;
  output: string;
}) {
  return [
    `Role: ${parts.role}`,
    `Task: ${parts.task}`,
    `Context: ${parts.context}`,
    `User input:\n${parts.userInput}`,
    `Constraints:\n${parts.constraints}`,
    `Required output format:\n${parts.output}`,
  ].join("\n\n");
}

export function buildPrompt(payload: GeneratePayload): {
  system: string;
  user: string;
} {
  switch (payload.module) {
    case "email": {
      const d = payload.data;
      return {
        system:
          "You are NEXORA, a workplace productivity assistant. Follow the structured prompt exactly. Never invent names, dates, or commitments.",
        user: wrapStructured({
          role: "You are a professional workplace communication specialist who writes clear, concise, tone-appropriate emails.",
          task: "Generate a complete, ready-to-send email based on the user’s request.",
          context: `Workplace email. Audience: ${d.audience}. Tone: ${d.tone}. Adapt language to that relationship. Preserve facts, deadlines, and action items the user supplies.`,
          userInput: `Purpose: ${d.purpose}\nAudience: ${d.audience}\nTone: ${d.tone}\nDetails:\n${d.details || "(none extra)"}`,
          constraints: `- 150–220 words unless the purpose clearly needs more.
- No emojis, slang, or filler.
- Never invent facts, dates, names, or commitments not provided.
- Include a subject line.
- End with a professional closing and a signature placeholder.`,
          output: `Subject: [subject]

[Email body]

[Closing]
[Name / Title placeholder]`,
        }),
      };
    }
    case "meeting": {
      return {
        system:
          "You are NEXORA, a workplace productivity assistant. Extract only what is in the notes. Never invent owners or deadlines.",
        user: wrapStructured({
          role: "You are an expert executive assistant specializing in accurate, actionable meeting notes.",
          task: "Produce a structured summary of the meeting notes provided.",
          context:
            "The summary will be shared with attendees and stakeholders who may not have attended. Focus on decisions, action items, owners, and deadlines. Ignore small talk.",
          userInput: payload.data.notes,
          constraints: `- Do not invent decisions, action items, or owners that are not present.
- Keep the summary concise (under 400 words).
- Use neutral, professional language.
- Clearly distinguish decisions from open items.`,
          output: `**Meeting Summary**
- Date / Topic:
- Attendees:

**Key Discussion Points**
-

**Decisions Made**
-

**Action Items**
| Action | Owner | Deadline | Status |
|--------|-------|----------|--------|
|        |       |          |        |

**Open Questions / Next Steps**
-`,
        }),
      };
    }
    case "planner": {
      const d = payload.data;
      return {
        system:
          "You are NEXORA, a workplace productivity assistant. Plans must be realistic and concrete.",
        user: wrapStructured({
          role: "You are a productivity coach and project planner skilled in breaking work into clear, prioritized, realistic tasks.",
          task: `Create a practical ${d.horizon} task plan based on the user’s goal and constraints.`,
          context:
            "Knowledge-work environment with limited time and competing priorities. Plans should be realistic, time-boxed, and focused on progress.",
          userInput: `Goal: ${d.goal}
Horizon: ${d.horizon}
Existing tasks / current status:
${d.tasks || "(none listed)"}
Constraints:
${d.constraints || "(none listed)"}`,
          constraints: `- Concrete next steps only (no vague items).
- Assign priority (High/Med/Low) and rough time estimates.
- 5–12 tasks.
- Flag missing information.
- Do not assume tools, teammates, or resources not mentioned.
- Include one short time-optimization strategy.`,
          output: `**Goal:**
**Deadline / Timeframe:**

**Prioritized Task List**
1. [Task] – Priority – Est. time – Notes

**Suggested Order / Timeline**
-

**Time optimization**
-

**Potential Risks or Blockers**
-

**What I still need from you**
-`,
        }),
      };
    }
    case "research": {
      const d = payload.data;
      return {
        system:
          "You are NEXORA, a workplace productivity assistant. Separate facts from analysis. Do not present opinions as facts.",
        user: wrapStructured({
          role: "You are a thorough and efficient research analyst who delivers reliable, well-sourced workplace research.",
          task: "Conduct focused research on the topic and deliver a clear, actionable briefing.",
          context:
            "The research supports workplace decisions. Prefer recent, credible knowledge. Distinguish established facts from emerging or contested information.",
          userInput: `Topic: ${d.topic}\nFocus: ${d.focus || "key insights, risks, and recommendations"}`,
          constraints: `- Stay on the requested scope.
- Separate facts, analysis, and recommendations.
- Note recency/reliability when relevant.
- If information is insufficient or conflicting, say so.
- Do not invent citations. If you cannot verify a source, label it as general knowledge.`,
          output: `**Research Briefing: [Topic]**

**Key Findings**
-

**Supporting Evidence**
-

**Implications for the Workplace**
-

**Recommendations / Next Questions**
-

**Limitations of this research**
-`,
        }),
      };
    }
    case "chat": {
      const historyBlock =
        payload.data.history.length === 0
          ? "(no prior turns)"
          : payload.data.history
              .slice(-8)
              .map((m) => `${m.role === "user" ? "User" : "NEXORA"}: ${m.content}`)
              .join("\n\n");
      return {
        system:
          "You are NEXORA, a helpful professional AI workplace productivity assistant.",
        user: wrapStructured({
          role: "You are a helpful, professional AI workplace productivity assistant.",
          task: "Answer the user’s question or help with their request in a clear, practical way.",
          context:
            "You support knowledge workers with everyday productivity, communication, planning, and light research. Stay within professional workplace topics. If the request is outside your scope (personal advice, medical, legal, etc.), politely redirect. If they ask for email, meeting summary, task plan, or research, still help — produce that artifact in this chat.",
          userInput: `Conversation so far:\n${historyBlock}\n\nLatest message:\n${payload.data.message}`,
          constraints: `- Be concise and actionable.
- Ask clarifying questions when the request is ambiguous.
- Never invent company-specific data, policies, or personal details.
- Maintain a helpful, neutral, professional tone.
- No emojis unless the user asks.`,
          output: `- Direct answer or solution first.
- Supporting steps or options if useful.
- Clarifying question(s) only when needed.`,
        }),
      };
    }
  }
}
