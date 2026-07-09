import type { Metadata } from "next";
import { CV_STRINGS } from "@/lib/cvContent";
import { CVDocument } from "./CVDocument";

export const metadata: Metadata = {
  title: CV_STRINGS.en.metaTitle,
  description: CV_STRINGS.en.metaDescription,
  robots: { index: false, follow: false },
  alternates: { languages: { es: "/cv/es", en: "/cv" } },
};

export default function CVPage() {
  return <CVDocument lang="en" />;
}
