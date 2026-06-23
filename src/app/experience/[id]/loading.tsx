export default function ExperienceLoading() {
  return (
    <main className="min-h-screen bg-background text-text-primary font-body grid-bg">
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-heading font-bold text-2xl tracking-tighter">
            <span className="text-accent">R</span>P
          </div>
          <div className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-widest">
            LOADING_LOG...
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <div className="border border-[var(--color-border)] bg-surface">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-surface-alt">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-4 text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-widest">
              fetching experience_log — please wait
            </span>
          </div>

          <div className="p-8 space-y-6 font-mono text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="text-accent">$</span>
              <span className="text-text-secondary">cat</span>
              <span>/var/log/experience/[id]</span>
            </div>

            <div className="space-y-3">
              <div className="h-3 bg-[var(--color-border-subtle)] animate-pulse w-32" />
              <div className="h-12 bg-[var(--color-border-subtle)] animate-pulse w-3/4" />
              <div className="h-3 bg-[var(--color-border-subtle)] animate-pulse w-48 mt-8" />
              <div className="flex flex-wrap gap-2 mt-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-7 w-20 bg-[var(--color-border-subtle)] animate-pulse"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <span className="text-accent">$</span>
              <span className="inline-block w-3 h-5 bg-accent align-middle animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
