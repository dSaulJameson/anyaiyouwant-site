import type { ReactNode } from "react";

function inline(value: string): ReactNode[] {
  const parts = value.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https:\/\/[^)]+\))/g);
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/);
    if (link)
      return (
        <a key={index} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      );
    return part;
  });
}

export function EditorialMarkdown({ value }: { value: string }) {
  const blocks = value.trim().split(/\n\s*\n/);
  return (
    <div className="editorial-article-body">
      {blocks.map((block, index) => {
        const text = block.trim();
        if (text.startsWith("### "))
          return <h3 key={index}>{inline(text.slice(4))}</h3>;
        if (text.startsWith("## "))
          return <h2 key={index}>{inline(text.slice(3))}</h2>;
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        if (lines.length && lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index}>
              {lines.map((line, itemIndex) => (
                <li key={itemIndex}>{inline(line.slice(2))}</li>
              ))}
            </ul>
          );
        }
        if (lines.length && lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index}>
              {lines.map((line, itemIndex) => (
                <li key={itemIndex}>{inline(line.replace(/^\d+\.\s/, ""))}</li>
              ))}
            </ol>
          );
        }
        return <p key={index}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
