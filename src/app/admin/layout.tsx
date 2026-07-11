import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin Panel | SYSTEM_CORE",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-text-primary font-mono selection:bg-accent selection:text-black grid-bg">
      {/* Top Warning Bar */}
      <div className="bg-accent text-black text-[10px] font-bold py-1 px-4 text-center uppercase tracking-widest overflow-hidden border-b border-black">
        <div className="flex gap-8 justify-center whitespace-nowrap animate-marquee">
          <span>CAUTION: RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY // NO_INDEX ACTIVE</span>
          <span>CAUTION: RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY // NO_INDEX ACTIVE</span>
        </div>
      </div>

      <div className="flex flex-col min-h-screen">
        <AdminNav />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
          {children}
        </main>

        <footer className="p-8 border-t border-accent/20 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-accent/50 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              SYSTEM_STATUS: OK // SESSION_ENCRYPTED: TRUE
            </div>
            <div>
              [ ROOT@PORTFOLIO:~# ] © {new Date().getFullYear()} RP_DEV_NULL
            </div>
          </div>
        </footer>
      </div>

      {/* Screen Effects Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-10">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}
