import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const EMAIL = "sofortrechner@gmx.net";

function Paragraph({ text }) {
  const parts = text.split(EMAIL);

  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {EMAIL}
            </a>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default function LegalArticle({ content }) {
  const { lang, t } = useI18n();
  const page = content[lang] ?? content.de;

  return (
    <article className="rise max-w-2xl py-8 sm:py-12">
      <Link
        to="/"
        className="text-[12px] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        {t("← Zurück zum Rechner")}
      </Link>

      <h1 className="mt-4 font-heading text-[26px] font-semibold tracking-tight text-foreground sm:text-[32px]">
        {page.title}
      </h1>
      <p className="mt-1.5 text-[13px] text-muted-foreground">{page.subtitle}</p>

      <div className="mt-7 space-y-7 text-[13.5px] leading-relaxed text-foreground/85">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-1.5 font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "whitespace-pre-line" : "mt-2 whitespace-pre-line"}>
                <Paragraph text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
