import type { CSSProperties } from "react";

/**
 * Headline whose words rise out of a mask as the heading scrolls into view.
 * The motion loop only writes one `--p` variable on the heading; each word
 * derives its own staggered offset in CSS. Without JS `--p` defaults to 1, so
 * the text is always fully rendered.
 */
export function SplitHeading({ id, text, className = "wm-h2" }: { id?: string; text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h2 className={`${className} wm-split`} id={id} data-split="" aria-label={text}>
      {words.map((w, i) => (
        <span className="wm-split__w" key={`${w}-${i}`} aria-hidden="true">
          <span style={{ "--i": i } as CSSProperties}>{w}</span>
        </span>
      ))}
    </h2>
  );
}
