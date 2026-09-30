import { Fragment, type CSSProperties } from "react";

/**
 * Headline whose words rise out of a mask as the heading scrolls into view.
 * The motion loop only writes one `--p` variable on the heading; each word
 * derives its own staggered offset in CSS. Without JS `--p` defaults to 1, so
 * the text is always fully rendered.
 */
export function SplitHeading({ id, text, className = "wm-h2", as: Tag = "h2" }: { id?: string; text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const words = text.split(" ");
  return (
    <Tag className={`${className} wm-split`} id={id} data-split="" aria-label={text} style={{ "--n": words.length } as CSSProperties}>
      {/* Real spaces between words so search engines and copy/paste read normal text. */}
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          {i > 0 ? " " : null}
          <span className="wm-split__w" aria-hidden="true">
            <span style={{ "--i": i } as CSSProperties}>{w}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
