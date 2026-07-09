import type { Metadata } from "next";
import { CV_STRINGS } from "@/lib/cvContent";
import { CVDocument } from "../CVDocument";

export const metadata: Metadata = {
  title: CV_STRINGS.es.metaTitle,
  description: CV_STRINGS.es.metaDescription,
  robots: { index: false, follow: false },
  alternates: { languages: { es: "/cv/es", en: "/cv" } },
};

export default function CVPageEs() {
  return <CVDocument lang="es" />;
}
