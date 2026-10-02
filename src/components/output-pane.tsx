import { Check, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function OutputPane({
  title,
  text,
  loading,
  error,
  emptyHint,
}: {
  title: string;
  text: string;
  loading: boolean;
  error: string | null;
  emptyHint: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-sm font-semibold tracking-tight text-fg">
          {title}
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copy}
          disabled={!text || loading}
          aria-label="Copy output"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <div className="min-h-64 flex-1 overflow-auto rounded-lg bg-elevated p-4 shadow-[inset_0_0_0_1px_var(--color-border)]">
        {loading ? (
          <div className="flex items-start gap-3 text-sm text-muted">
            <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin text-primary" />
            <div>
              <p className="font-medium text-fg">Composing</p>
              <p className="mt-1 shimmer rounded-sm py-1 text-muted">
                Structured prompt in flight — keep this panel open.
              </p>
            </div>
          </div>
        ) : error ? (
          <p className="text-sm leading-relaxed text-danger">{error}</p>
        ) : text ? (
          <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg">
            {text}
          </pre>
        ) : (
          <p className="text-sm leading-relaxed text-muted">{emptyHint}</p>
        )}
      </div>
    </section>
  );
}
