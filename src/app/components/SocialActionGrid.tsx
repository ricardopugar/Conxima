"use client";

import type { MouseEvent } from "react";
import { useAnimate } from "framer-motion";
import type { IconType } from "react-icons";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

type Side = "top" | "left" | "bottom" | "right";

type SocialActionItem = {
  href: string;
  label: string;
  Icon: IconType;
  target?: string;
  rel?: string;
};

type SocialActionGridProps = {
  items: SocialActionItem[];
  className?: string;
  columnsClassName?: string;
  compact?: boolean;
};

const ENTRANCE_KEYFRAMES: Record<Side, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP]
};

const EXIT_KEYFRAMES: Record<Side, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP]
};

export type { SocialActionItem };

export default function SocialActionGrid({
  items,
  className = "",
  columnsClassName = "grid-cols-2",
  compact = false
}: SocialActionGridProps) {
  return (
    <div className={`grid gap-3 ${columnsClassName} ${className}`.trim()}>
      {items.map((item) => (
        <SocialActionTile
          key={`${item.label}-${item.href}`}
          item={item}
          compact={compact}
        />
      ))}
    </div>
  );
}

function SocialActionTile({
  item,
  compact
}: {
  item: SocialActionItem;
  compact: boolean;
}) {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: MouseEvent<HTMLAnchorElement>): Side => {
    const box = e.currentTarget.getBoundingClientRect();

    const sortedProximity = [
      { proximity: Math.abs(box.left - e.clientX), side: "left" as Side },
      { proximity: Math.abs(box.right - e.clientX), side: "right" as Side },
      { proximity: Math.abs(box.top - e.clientY), side: "top" as Side },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" as Side }
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(
      scope.current,
      { clipPath: ENTRANCE_KEYFRAMES[side] },
      { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
    );
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(
      scope.current,
      { clipPath: EXIT_KEYFRAMES[side] },
      { duration: 0.24, ease: [0.55, 0.08, 0.68, 0.53] }
    );
  };

  const iconClassName = compact ? "h-4 w-4" : "h-5 w-5";
  const labelClassName = compact
    ? "text-[10px] tracking-[0.16em]"
    : "text-[11px] tracking-[0.18em]";

  return (
    <a
      href={item.href}
      target={item.target}
      rel={item.rel}
      aria-label={item.label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-slate-100 transition hover:-translate-y-0.5 hover:border-white/20 ${
        compact ? "min-h-[5.25rem]" : "min-h-[6.75rem]"
      }`}
    >
      <div className="relative z-10 flex h-full flex-col justify-between gap-3">
        <item.Icon
          className={`${iconClassName} text-[var(--color-secondary)]`}
          aria-hidden
        />
        <span className={`font-semibold uppercase ${labelClassName}`}>
          {item.label}
        </span>
      </div>

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 z-20 bg-[var(--color-secondary)] text-slate-950"
      >
        <div className="flex h-full flex-col justify-between gap-3 p-4">
          <item.Icon className={iconClassName} aria-hidden />
          <span className={`font-semibold uppercase ${labelClassName}`}>
            {item.label}
          </span>
        </div>
      </div>
    </a>
  );
}
