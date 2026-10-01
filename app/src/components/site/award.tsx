import { useId } from "react";

import { AWARD_ICON, AWARD_TITLE, AWARD_YEAR } from "./award-paths";

/**
 * "Златна фирма 2026" badge in a gold gradient. On load the icon draws itself
 * and the text wipes in; afterwards a light sweep crosses the gold every few seconds.
 */
export function AwardBadge() {
  const id = useId().replace(/:/g, "");
  const gold = `wm-aw-gold-${id}`;
  const shine = `wm-aw-shine-${id}`;
  const shapes = `wm-aw-shapes-${id}`;
  return (
    <div className="wm-award-row">
    <div className="wm-award">
      <svg className="wm-award__mark" viewBox="0 0 83 19.8" role="img" aria-label="Златна фирма 2026">
        <defs>
          <linearGradient id={gold} x1="0" y1="0" x2="83" y2="19.8" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#b8893f" />
            <stop offset="0.35" stopColor="#f3d98f" />
            <stop offset="0.6" stopColor="#d4ab5c" />
            <stop offset="1" stopColor="#f6e2a8" />
          </linearGradient>
          <linearGradient id={shine} x1="-24" y1="0" x2="-4" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
            <animateTransform attributeName="gradientTransform" type="translate" values="0 0;112 0;112 0" keyTimes="0;0.28;1" dur="5.5s" begin="2.2s" repeatCount="indefinite" />
          </linearGradient>
          <g id={shapes}>
            <rect className="wm-award__rule" x="17.9" y="0" width="0.6" height="19.8" />
            <g className="wm-award__words">
              <path d={AWARD_TITLE} />
              <path d={AWARD_YEAR} />
            </g>
          </g>
        </defs>
        <g className="wm-award__icon" fill={`url(#${gold})`} stroke={`url(#${gold})`}>
          {AWARD_ICON.map((d) => (
            <path d={d} key={d} pathLength={1} />
          ))}
        </g>
        <use href={`#${shapes}`} fill={`url(#${gold})`} />
        <g className="wm-award__shine" fill={`url(#${shine})`}>
          {AWARD_ICON.map((d) => (
            <path d={d} key={d} />
          ))}
          <use href={`#${shapes}`} />
        </g>
      </svg>
      <span className="wm-award__txt">
        Отличени с приза <b>„Златна фирма 2026“</b>
      </span>
    </div>
    </div>
  );
}
