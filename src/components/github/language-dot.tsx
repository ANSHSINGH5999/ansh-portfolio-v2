const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Solidity: "#AA6746",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Shell: "#89e051",
};

export function languageColor(language: string | null): string {
  if (!language) return "#8b97a3";
  return LANGUAGE_COLORS[language] ?? "#8b97a3";
}

export function LanguageDot({ language }: { language: string | null }) {
  if (!language) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-muted">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: languageColor(language) }}
        aria-hidden="true"
      />
      {language}
    </span>
  );
}
