import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as MODULES } from "./prompts-Cm6Y5dnX.mjs";
import { a as record, c as unknown, i as object, o as string, t as _enum } from "../_libs/zod.mjs";
import { a as NotebookPen, c as LoaderCircle, d as CalendarCheck, i as Search, l as Copy, n as Sparkles, o as MessageSquare, r as Send, s as Mail, u as Check } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DxsSAYXO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var inputSchema = object({
	module: _enum([
		"email",
		"meeting",
		"planner",
		"research",
		"chat"
	]),
	data: record(string(), unknown())
});
var generateNexora = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(createSsrRpc("f2046c965d48d4e33caf812cf4b73963097ad13484d3345c190cd36088c32a35"));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function NexoraMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "1.5",
				y: "1.5",
				width: "29",
				height: "29",
				rx: "8",
				stroke: "currentColor",
				strokeWidth: "1.4",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 22V10h3.2l6.2 8.2V10H21v12h-3.2L11.6 13.8V22H8Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7 25.5h18",
				stroke: "currentColor",
				strokeWidth: "1.6",
				strokeLinecap: "round",
				opacity: "0.85"
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,box-shadow,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-h-11", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] hover:opacity-92",
			ghost: "bg-transparent text-fg hover:bg-elevated",
			outline: "bg-transparent text-fg shadow-[inset_0_0_0_1px_var(--color-border)] hover:shadow-[inset_0_0_0_1px_var(--color-border-strong)] hover:bg-elevated",
			subtle: "bg-elevated text-fg hover:bg-surface"
		},
		size: {
			md: "rounded-md px-4 text-sm",
			sm: "min-h-9 rounded-sm px-3 text-sm",
			lg: "min-h-12 rounded-lg px-5 text-base",
			icon: "size-11 rounded-md p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
function OutputPane({ title, text, loading, error, emptyHint }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		if (!text) return;
		await navigator.clipboard.writeText(text);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-1 flex-col rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-sm font-semibold tracking-tight text-fg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: copy,
				disabled: !text || loading,
				"aria-label": "Copy output",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-64 flex-1 overflow-auto rounded-lg bg-elevated p-4 shadow-[inset_0_0_0_1px_var(--color-border)]",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mt-0.5 size-4 shrink-0 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-fg",
					children: "Composing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 shimmer rounded-sm py-1 text-muted",
					children: "Structured prompt in flight — keep this panel open."
				})] })]
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-danger",
				children: error
			}) : text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg",
				children: text
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: emptyHint
			})
		})]
	});
}
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 rounded-full px-3.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150", active ? "bg-primary text-primary-fg" : "bg-elevated text-muted shadow-[inset_0_0_0_1px_var(--color-border)] hover:text-fg"),
		children
	});
}
function Badge({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full bg-elevated px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-ice", "shadow-[inset_0_0_0_1px_var(--color-border)]", className),
		children
	});
}
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "shadow-[inset_0_0_0_1px_var(--color-border)] outline-none", "transition-[box-shadow] duration-150", "focus-visible:shadow-[inset_0_0_0_1px_var(--color-primary)]", className),
	...props
}));
Input.displayName = "Input";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted uppercase", className),
		...props
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("min-h-36 w-full rounded-lg bg-elevated px-3 py-3 text-sm leading-relaxed text-fg placeholder:text-subtle", "shadow-[inset_0_0_0_1px_var(--color-border)] outline-none resize-y", "transition-[box-shadow] duration-150", "focus-visible:shadow-[inset_0_0_0_1px_var(--color-primary)]", className),
	...props
}));
Textarea.displayName = "Textarea";
var ICONS = {
	email: Mail,
	meeting: NotebookPen,
	planner: CalendarCheck,
	research: Search,
	chat: MessageSquare
};
var EMAIL_SAMPLES = [{
	label: "Delay follow-up",
	purpose: "Follow up on a delayed delivery and confirm the new date",
	details: "Client: Northline Logistics. Original delivery 8 Oct. New expected date 15 Oct. Keep polite but firm. Ask them to confirm warehouse receiving hours."
}, {
	label: "Status to manager",
	purpose: "Weekly status update on the onboarding redesign",
	details: "Shipped prototype review, 2 remaining accessibility tickets, blocked on legal copy. Request 30 minutes Thursday."
}];
var MEETING_SAMPLE = `Standup — 1 Oct — Product, Design, Eng
Attendees: Maya (PM), Jules (Design), Ari (Eng), Sam (CS)
Maya: Q3 review deck due Friday. Need final numbers from Ari by Wednesday EOD.
Jules: Onboarding flow mock is ready for review today.
Ari: Auth bug in staging; ETA tomorrow noon. Cannot start analytics until that's merged.
Decision: Ship onboarding behind a feature flag next Tuesday.
Action: Sam to send customer quotes for the deck by Thursday 3pm.
Open: Do we include the EU pricing table? Maya to confirm with finance.`;
var PLANNER_SAMPLE = {
	goal: "Prepare a quarterly business review presentation for Friday",
	tasks: "Sales data exported. Need narrative, 12 slides, dry-run with manager Thursday.",
	constraints: "About 6 focused hours this week. No designer available."
};
var RESEARCH_SAMPLE = {
	topic: "Adopting AI meeting assistants in mid-sized professional services firms",
	focus: "Productivity gains, data privacy risks, and rollout recommendations. Prefer last 2 years."
};
function Workspace() {
	const [module, setModule] = (0, import_react.useState)("email");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [output, setOutput] = (0, import_react.useState)("");
	const [purpose, setPurpose] = (0, import_react.useState)(EMAIL_SAMPLES[0].purpose);
	const [audience, setAudience] = (0, import_react.useState)("client");
	const [tone, setTone] = (0, import_react.useState)("formal");
	const [details, setDetails] = (0, import_react.useState)(EMAIL_SAMPLES[0].details);
	const [notes, setNotes] = (0, import_react.useState)(MEETING_SAMPLE);
	const [goal, setGoal] = (0, import_react.useState)(PLANNER_SAMPLE.goal);
	const [horizon, setHorizon] = (0, import_react.useState)("weekly");
	const [tasks, setTasks] = (0, import_react.useState)(PLANNER_SAMPLE.tasks);
	const [constraints, setConstraints] = (0, import_react.useState)(PLANNER_SAMPLE.constraints);
	const [topic, setTopic] = (0, import_react.useState)(RESEARCH_SAMPLE.topic);
	const [focus, setFocus] = (0, import_react.useState)(RESEARCH_SAMPLE.focus);
	const [chatInput, setChatInput] = (0, import_react.useState)("");
	const [chat, setChat] = (0, import_react.useState)([]);
	const meta = (0, import_react.useMemo)(() => MODULES.find((m) => m.id === module), [module]);
	function switchModule(id) {
		setModule(id);
		setError(null);
		if (id !== "chat") setOutput("");
	}
	async function run(payload) {
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
	async function onGenerate(e) {
		e.preventDefault();
		if (module === "chat") return;
		if (module === "email") await run({
			module: "email",
			data: {
				purpose,
				audience,
				tone,
				details
			}
		});
		else if (module === "meeting") await run({
			module: "meeting",
			data: { notes }
		});
		else if (module === "planner") await run({
			module: "planner",
			data: {
				goal,
				horizon,
				tasks,
				constraints
			}
		});
		else if (module === "research") await run({
			module: "research",
			data: {
				topic,
				focus
			}
		});
	}
	async function onChat(e) {
		e.preventDefault();
		const message = chatInput.trim();
		if (!message || loading) return;
		setChatInput("");
		const nextHistory = [...chat, {
			role: "user",
			content: message
		}];
		setChat(nextHistory);
		setLoading(true);
		setError(null);
		try {
			const result = await generateNexora({ data: {
				module: "chat",
				data: {
					message,
					history: chat
				}
			} });
			if (!result.ok) {
				setError(result.error);
				setChat((prev) => [...prev, {
					role: "assistant",
					content: result.error
				}]);
				return;
			}
			setOutput(result.text);
			setChat((prev) => [...prev, {
				role: "assistant",
				content: result.text
			}]);
		} catch {
			setError("Could not reach the assistant. Try again.");
		} finally {
			setLoading(false);
		}
	}
	const NavIcon = ICONS[module];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid-bg min-h-dvh",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-7xl flex-col lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col border-b border-border px-4 py-4 lg:w-64 lg:border-r lg:border-b-0 lg:px-5 lg:py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NexoraMark, { className: "size-9 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold tracking-tight leading-none",
							children: "NEXORA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Workplace command deck"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-col lg:overflow-visible",
						"aria-label": "Modules",
						children: MODULES.map((item) => {
							const Icon = ICONS[item.id];
							const active = item.id === module;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => switchModule(item.id),
								className: cn("flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg px-3 text-left text-sm transition-[background-color,color] duration-150", active ? "bg-elevated text-fg shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]" : "text-muted hover:bg-elevated hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", active && "text-primary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: item.label
								})]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto hidden pt-8 lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-subtle",
							children: "Each module runs a structured prompt: role, task, context, constraints, and output format."
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "stagger-in mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Live Grok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavIcon, { className: "mt-1 size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl",
							children: meta.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
							children: meta.blurb
						})] })]
					})]
				}), module === "chat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-80 flex-1 overflow-auto rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
							children: chat.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full min-h-64 flex-col justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-medium",
										children: "Ask NEXORA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-w-md text-sm leading-relaxed text-muted",
										children: "Draft a reply, unpack a messy brief, or pressure-test a plan. Workplace topics only."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 flex flex-wrap gap-2",
										children: [
											"Help me rewrite this status update so it is shorter.",
											"What should I cover in a 15-minute 1:1 with my manager?",
											"Give me a checklist for handing a project to another team."
										].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "max-w-full rounded-lg bg-elevated px-3 py-2 text-left text-sm text-fg shadow-[inset_0_0_0_1px_var(--color-border)] hover:shadow-[var(--shadow-border-hover)]",
											onClick: () => setChatInput(q),
											children: q
										}, q))
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "space-y-4",
								children: [chat.map((turn, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("rounded-lg px-3 py-3 text-sm leading-relaxed whitespace-pre-wrap", turn.role === "user" ? "ml-8 bg-elevated text-fg" : "mr-4 bg-bg text-fg shadow-[inset_0_0_0_1px_var(--color-border)]"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-1 text-xs font-medium uppercase tracking-wider text-muted",
										children: turn.role === "user" ? "You" : "NEXORA"
									}), turn.content]
								}, `${turn.role}-${i}`)), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "mr-4 rounded-lg bg-bg px-3 py-3 text-sm text-muted shadow-[inset_0_0_0_1px_var(--color-border)]",
									children: "Thinking…"
								}) : null]
							})
						}),
						error && chat.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onChat,
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: chatInput,
								onChange: (e) => setChatInput(e.target.value),
								placeholder: "Ask about email, meetings, plans, or research…",
								"aria-label": "Assistant message",
								disabled: loading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: loading || !chatInput.trim(),
								"aria-label": "Send",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), "Send"]
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid flex-1 gap-4 lg:grid-cols-2 lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onGenerate,
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
						children: [
							module === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Purpose",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: purpose,
											onChange: (e) => setPurpose(e.target.value),
											required: true,
											maxLength: 400
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Audience" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: [
											"client",
											"manager",
											"team"
										].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											active: audience === a,
											onClick: () => setAudience(a),
											children: a
										}, a))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: [
											"formal",
											"informal",
											"persuasive"
										].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											active: tone === t,
											onClick: () => setTone(t),
											children: t
										}, t))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Details",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: details,
											onChange: (e) => setDetails(e.target.value),
											maxLength: 6e3
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: EMAIL_SAMPLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-xs text-ice underline-offset-2 hover:underline",
											onClick: () => {
												setPurpose(s.purpose);
												setDetails(s.details);
											},
											children: s.label
										}, s.label))
									})
								]
							}) : null,
							module === "meeting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Notes or transcript",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									className: "min-h-72",
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									required: true,
									maxLength: 8e3
								})
							}) : null,
							module === "planner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Goal",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: goal,
											onChange: (e) => setGoal(e.target.value),
											required: true,
											maxLength: 400
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Horizon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: ["daily", "weekly"].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											active: horizon === h,
											onClick: () => setHorizon(h),
											children: h
										}, h))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Current tasks",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: tasks,
											onChange: (e) => setTasks(e.target.value),
											maxLength: 3e3
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Constraints",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											className: "min-h-24",
											value: constraints,
											onChange: (e) => setConstraints(e.target.value),
											maxLength: 2e3
										})
									})
								]
							}) : null,
							module === "research" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Topic",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: topic,
										onChange: (e) => setTopic(e.target.value),
										required: true,
										maxLength: 400
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Focus",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: focus,
										onChange: (e) => setFocus(e.target.value),
										maxLength: 2e3
									})
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "mt-5 w-full",
								disabled: loading,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), loading ? "Generating" : "Generate"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutputPane, {
						title: "Output",
						text: output,
						loading,
						error,
						emptyHint: "Fill the brief, then generate. Output stays here so you can copy it into mail, docs, or a ticket."
					})]
				})]
			})]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {});
}
//#endregion
export { Home as component };
