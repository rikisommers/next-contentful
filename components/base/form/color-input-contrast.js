import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { checkColorContrast } from "../../utils/accessibility-helper";

/**
 * Color input with WCAG contrast ratio warning indicator
 * Extends the basic color picker with live contrast feedback
 * The user retains full control -- warnings are advisory, not blocking
 * @component
 * @category base
 *
 * @param {Object} props
 * @param {string} props.label - Input label text
 * @param {string} props.value - Current hex color value
 * @param {Function} props.onChange - Callback when color changes
 * @param {string} [props.contrastAgainst] - Hex color to check contrast against
 * @param {string} [props.contrastLabel] - Label for the contrast pairing (e.g. "text on background")
 *
 * @example
 * // Basic usage with contrast checking
 * <ColorInputContrast
 *   label="Text Color"
 *   value="#ffffff"
 *   onChange={(hex) => setTextColor(hex)}
 *   contrastAgainst="#000000"
 *   contrastLabel="text on background"
 * />
 *
 * @example
 * // Without contrast checking (behaves like regular ColorInput)
 * <ColorInputContrast
 *   label="Accent Color"
 *   value="#ff5500"
 *   onChange={(hex) => setAccent(hex)}
 * />
 */
export default function ColorInputContrast({
  label,
  value,
  onChange,
  contrastAgainst,
  contrastLabel,
  ...props
}) {
  const contrastResult = useMemo(() => {
    if (!contrastAgainst || !value) return null;
    return checkColorContrast(value, contrastAgainst);
  }, [value, contrastAgainst]);

  const getContrastIndicator = () => {
    if (!contrastResult) return null;

    const { ratio, wcagAA, wcagAALarge } = contrastResult;
    const ratioDisplay = ratio.toFixed(1);

    if (wcagAA) {
      return (
        <span
          className="text-[10px] px-1 py-0.5 rounded bg-green-800/30 text-green-400"
          title={`Contrast ratio ${ratioDisplay}:1 – Passes WCAG AA`}
          role="status"
          aria-live="polite"
        >
          AA {ratioDisplay}:1
        </span>
      );
    }

    if (wcagAALarge) {
      return (
        <span
          className="text-[10px] px-1 py-0.5 rounded bg-yellow-800/30 text-yellow-400"
          title={`Contrast ratio ${ratioDisplay}:1 – Passes for large text only (18pt+)`}
          role="status"
          aria-live="polite"
        >
          AA-lg {ratioDisplay}:1
        </span>
      );
    }

    return (
      <span
        className="text-[10px] px-1 py-0.5 rounded bg-red-800/30 text-red-400"
        title={`Contrast ratio ${ratioDisplay}:1 – Does not meet WCAG AA (needs 4.5:1${contrastLabel ? ` for ${contrastLabel}` : ''})`}
        role="alert"
        aria-live="assertive"
      >
        ⚠ {ratioDisplay}:1
      </span>
    );
  };

  return (
    <label className="grid grid-cols-[1fr_auto_32px] items-center justify-between gap-2">
      {label && <span className="flex-grow text-xs">{label}</span>}
      {getContrastIndicator()}
      <input
        className="flex-grow w-full h-10"
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label || "Color picker"}
        {...props}
        style={{ width: 32, height: 32, border: "none", background: "none" }}
      />
    </label>
  );
}

ColorInputContrast.propTypes = {
  /** Input label text */
  label: PropTypes.string,
  /** Current hex color value */
  value: PropTypes.string.isRequired,
  /** Callback when color changes */
  onChange: PropTypes.func.isRequired,
  /** Hex color to check contrast against */
  contrastAgainst: PropTypes.string,
  /** Label for the contrast pairing */
  contrastLabel: PropTypes.string,
};
