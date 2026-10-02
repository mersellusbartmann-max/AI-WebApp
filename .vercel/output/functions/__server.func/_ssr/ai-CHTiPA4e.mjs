import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as buildPrompt } from "./prompts-Cm6Y5dnX.mjs";
import { a as record, c as unknown, i as object, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-CHTiPA4e.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var historySchema = object({
	role: _enum(["user", "assistant"]),
	content: string().max(8e3)
});
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
var MAX_INPUT = 1e4;
function asString(v, fallback = "") {
	return typeof v === "string" ? v : fallback;
}
function clamp(s) {
	return s.length > MAX_INPUT ? s.slice(0, MAX_INPUT) : s;
}
function parsePayload(raw) {
	const module = raw.module;
	const d = raw.data;
	switch (module) {
		case "email": return {
			module,
			data: {
				purpose: clamp(asString(d.purpose)),
				audience: [
					"client",
					"manager",
					"team"
				].includes(asString(d.audience)) ? asString(d.audience) : "team",
				tone: [
					"formal",
					"informal",
					"persuasive"
				].includes(asString(d.tone)) ? asString(d.tone) : "formal",
				details: clamp(asString(d.details))
			}
		};
		case "meeting": return {
			module,
			data: { notes: clamp(asString(d.notes)) }
		};
		case "planner": return {
			module,
			data: {
				goal: clamp(asString(d.goal)),
				horizon: asString(d.horizon) === "weekly" ? "weekly" : "daily",
				tasks: clamp(asString(d.tasks)),
				constraints: clamp(asString(d.constraints))
			}
		};
		case "research": return {
			module,
			data: {
				topic: clamp(asString(d.topic)),
				focus: clamp(asString(d.focus))
			}
		};
		case "chat": {
			const history = (Array.isArray(d.history) ? d.history : []).slice(-8).map((item) => historySchema.parse(item)).map((h) => ({
				role: h.role,
				content: clamp(h.content)
			}));
			return {
				module,
				data: {
					message: clamp(asString(d.message)),
					history
				}
			};
		}
	}
}
var generateNexora_createServerFn_handler = createServerRpc({
	id: "f2046c965d48d4e33caf812cf4b73963097ad13484d3345c190cd36088c32a35",
	name: "generateNexora",
	filename: "src/lib/ai.ts"
}, (opts) => generateNexora.__executeServer(opts));
var generateNexora = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(generateNexora_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment."
	};
	const payload = parsePayload(data);
	const { system, user } = buildPrompt(payload);
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .4,
			max_tokens: 1400,
			messages: [{
				role: "system",
				content: system
			}, {
				role: "user",
				content: user
			}]
		})
	});
	if (!res.ok) {
		if (res.status === 403) return {
			ok: false,
			error: "The assistant is temporarily unavailable because the project AI quota is exhausted. You can still draft in the form fields and copy them later."
		};
		return {
			ok: false,
			error: `The model could not complete this request (${res.status}). Try again in a moment.`
		};
	}
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Empty response from the model."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { generateNexora_createServerFn_handler };
