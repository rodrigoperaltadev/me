import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-text-primary font-body grid-bg flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        <div className="border border-[var(--color-border)] bg-surface brutalist-border">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-surface-alt">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-4 text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-widest">
              rodrigoperalta.ar — bash — 80×24
            </span>
          </div>

          <div className="p-8 space-y-4 font-mono text-sm md:text-base">
            <div className="text-[var(--color-muted)] text-xs">
              Last login: {new Date().toUTCString()}
            </div>

            <div>
              <span className="text-accent">visitor@rodrigoperalta.ar</span>
              <span className="text-text-secondary">:</span>
              <span className="text-accent">~</span>
              <span className="text-text-secondary">$ </span>
              <span>cd /requested-page</span>
            </div>

            <div className="text-[#FF5F56]">
              bash: cd: /requested-page: No such file or directory
            </div>

            <div className="text-[#FF5F56]">
              ERROR 404 — ROUTE_NOT_FOUND
            </div>

            <div>
              <span className="text-accent">visitor@rodrigoperalta.ar</span>
              <span className="text-text-secondary">:</span>
              <span className="text-accent">~</span>
              <span className="text-text-secondary">$ </span>
              <span className="inline-block w-3 h-5 bg-accent align-middle animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h1 className="text-[120px] md:text-[180px] font-heading font-bold tracking-tighter text-accent glow-cyan leading-none">
            404
          </h1>
          <div className="mt-2 font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-[0.3em]">
            {"// ROUTE_NOT_FOUND"}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="font-mono text-xs text-background bg-accent border border-accent px-6 py-3 hover:bg-background hover:text-accent transition-colors text-center uppercase tracking-widest"
          >
            → RETURN_TO_BASE
          </Link>
          <Link
            href="/#experience"
            className="font-mono text-xs text-text-secondary border border-[var(--color-border)] hover:border-accent/30 hover:text-accent px-6 py-3 transition-colors text-center uppercase tracking-widest"
          >
            → VIEW_EXPERIENCE_LOG
          </Link>
        </div>
      </div>
    </main>
  );
}
