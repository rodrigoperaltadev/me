import { getExperienceData } from "@/lib/experienceDataEs";
import {
  CV_CONTACT,
  CV_STRINGS,
  getSkillGroups,
  type CvLang,
} from "@/lib/cvContent";
import { PrintButton } from "./PrintButton";
import {
  MailIcon,
  GlobeIcon,
  GithubIcon,
  LinkedinIcon,
  MapPinIcon,
} from "./icons";
import "./cv.css";

// Reusable tag list — used in Core Skills and in each experience stack.
function Tags({ items }: { items: string[] }) {
  return (
    <div className="cv-tags">
      {items.map((t) => (
        <span key={t} className="cv-tag">
          {t}
        </span>
      ))}
    </div>
  );
}

/**
 * The full CV document, localized by `lang`.
 * Rendered by /cv (en) and /cv/es (es). Single component, single CSS —
 * keeps both languages structurally identical and in sync.
 */
export function CVDocument({ lang }: { lang: CvLang }) {
  const s = CV_STRINGS[lang];
  const experience = getExperienceData(lang);
  const skillGroups = getSkillGroups(lang);

  const contactItems = [
    { icon: <MailIcon />, label: CV_CONTACT.email, href: `mailto:${CV_CONTACT.email}` },
    { icon: <GlobeIcon />, label: CV_CONTACT.website, href: CV_CONTACT.websiteUrl },
    { icon: <GithubIcon />, label: CV_CONTACT.github, href: CV_CONTACT.githubUrl },
    { icon: <LinkedinIcon />, label: CV_CONTACT.linkedin, href: CV_CONTACT.linkedinUrl },
    { icon: <MapPinIcon />, label: s.location, href: null },
  ];

  return (
    <main className="cv-root">
      <PrintButton />

      <article className="cv-sheet">
        {/* Header (page 1). Pages 2+ get breathing room from the @page margin. */}
        <header className="cv-header">
          <div>
            <h1 className="cv-name">{CV_CONTACT.name}</h1>
            <p className="cv-role">{s.role}</p>
          </div>
          <ul className="cv-contact">
            {contactItems.map((item) => (
              <li key={item.label}>
                <span className="cv-contact-icon">{item.icon}</span>
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </header>

        {/* Summary */}
        <section className="cv-section">
          <h2 className="cv-section-title">{s.sections.summary}</h2>
          <p className="cv-summary">{s.summary}</p>
        </section>

        {/* Skills */}
        <section className="cv-section">
          <h2 className="cv-section-title">{s.sections.skills}</h2>
          <div className="cv-skills">
            {skillGroups.map((g) => (
              <div key={g.label} className="cv-skill-row">
                <span className="cv-skill-label">{g.label}</span>
                <Tags items={g.items} />
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="cv-section">
          <h2 className="cv-section-title">{s.sections.experience}</h2>
          <div className="cv-timeline">
            {experience.map((exp) => (
              <div key={exp.id} className="cv-entry">
                <div className="cv-entry-head">
                  <div className="cv-entry-title">
                    <span className="cv-company">{exp.company}</span>
                    <span className="cv-role-line">{exp.role}</span>
                  </div>
                  <div className="cv-entry-meta">
                    <span className="cv-year">{exp.year}</span>
                    <span className="cv-industry">{exp.industry}</span>
                  </div>
                </div>
                <ul className="cv-points">
                  {exp.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <Tags items={exp.stack} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer — appears once at the end (not repeated per page). */}
        <footer className="cv-footer">
          <span>{CV_CONTACT.website}</span>
          <span>{s.footerRight}</span>
        </footer>
      </article>
    </main>
  );
}
