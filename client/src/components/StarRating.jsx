import React, { useId, useState, useEffect, useRef } from "react";

/**
 * Props:
 * - rating: number (0-5) controlled
 * - defaultValue: number initial value when uncontrolled
 * - size: number (px)
 * - editable: boolean (clickable)
 * - onChange: (newValue:number) => void
 */
export default function StarRating({
  rating,
  defaultValue = 0,
  size = 16,
  editable = false,
  onChange,
}) {
  const id = useId();
  const isControlled = rating !== undefined;
  const [value, setValue] = useState(isControlled ? Number(rating) : Number(defaultValue || 0));
  const [hover, setHover] = useState(null);
  const groupRef = useRef(null);

  useEffect(() => {
    if (isControlled) setValue(Number(rating) || 0);
  }, [rating, isControlled]);

  const commit = (v) => {
    if (!isControlled) setValue(v);
    if (typeof onChange === "function") onChange(v);
  };

  const displayValue = hover !== null ? hover : value;
  const full = Math.floor(displayValue);
  const hasHalf = (displayValue - full) >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  const handleKey = (e) => {
    if (!editable) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(5, Math.ceil(value + 1));
      commit(next);
      focusStar(groupRef.current, next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(0, Math.floor(value - 1));
      commit(prev);
      focusStar(groupRef.current, prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(0);
      focusStar(groupRef.current, 0);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(5);
      focusStar(groupRef.current, 5);
    }
  };

  return (
    <div
      ref={groupRef}
      className="flex items-center gap-2"
      title={`Rating ${displayValue.toFixed(1)} / 5`}
      aria-label={`Rating ${displayValue.toFixed(1)} out of 5`}
      role={editable ? "radiogroup" : "img"}
      onKeyDown={handleKey}
    >
      <div className="flex items-center" aria-hidden={!editable}>
        {/* interactive stars */}
        {Array.from({ length: 5 }).map((_, i) => {
          const idx = i + 1;
          const filled = displayValue >= idx;
          const halfStar = !filled && displayValue + 0.01 >= idx - 0.5 && displayValue < idx;
          const colorClass = filled || halfStar ? "text-amber-400" : "text-gray-300";

          if (!editable) {
            // static SVGs as before (supports half via gradient)
            if (filled) {
              return (
                <svg key={idx} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`${colorClass} inline-block mr-0.5`} aria-hidden="true">
                  <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.523L18.834 23 12 19.412 5.166 23l.999-7.727L.5 9.75l7.832-1.732L12 .587z" />
                </svg>
              );
            }
            if (halfStar) {
              const gradId = `halfGrad-${id}-${idx}`;
              return (
                <svg key={idx} width={size} height={size} viewBox="0 0 24 24" className={`inline-block mr-0.5`} aria-hidden="true">
                  <defs>
                    <linearGradient id={gradId}>
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.523L18.834 23 12 19.412 5.166 23l.999-7.727L.5 9.75l7.832-1.732L12 .587z" fill={`url(#${gradId})`} stroke="currentColor" />
                </svg>
              );
            }
            return (
              <svg key={idx} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`${colorClass} inline-block mr-0.5`} aria-hidden="true">
                <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.523L18.834 23 12 19.412 5.166 23l.999-7.727L.5 9.75l7.832-1.732L12 .587z" />
              </svg>
            );
          }

          // editable: render button per star
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={value >= idx}
              tabIndex={idx === Math.max(1, Math.round(value)) ? 0 : -1}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(idx)}
              onBlur={() => setHover(null)}
              onClick={() => commit(idx)}
              className="mr-0.5 p-0 border-0 bg-transparent"
              style={{ lineHeight: 0, display: "inline-block" }}
              title={`${idx} star`}
            >
              <svg width={size} height={size} viewBox="0 0 24 24" fill={filled || halfStar ? "currentColor" : "none"} stroke="currentColor" className={`${colorClass}`} aria-hidden="true">
                <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.523L18.834 23 12 19.412 5.166 23l.999-7.727L.5 9.75l7.832-1.732L12 .587z" />
              </svg>
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-500">{displayValue.toFixed(1)}</div>
    </div>
  );
}

// helper to focus a star button by index (if present)
function focusStar(container, index) {
  if (!container) return;
  const buttons = container.querySelectorAll("button[role='radio']");
  if (!buttons || buttons.length === 0) return;
  const idx = Math.max(1, Math.min(buttons.length, index)) - 1;
  const btn = buttons[idx];
  if (btn && typeof btn.focus === "function") btn.focus();
}