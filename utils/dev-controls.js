import { useMemo } from "react";

/**
 * Leva debug panel, development only.
 *
 * In development this is Leva's `useControls` (a live tweak panel). In production the
 * panel is never shown and Leva is not bundled: the hook just returns each control's
 * default value.
 *
 * `process.env.NODE_ENV` is inlined at build time, so the unused branch is removed.
 */
const leva = process.env.NODE_ENV === "development" ? require("leva") : null;

const defaultsOf = (schema) =>
  Object.fromEntries(
    Object.entries(schema).map(([key, control]) => [
      key,
      control !== null && typeof control === "object" && "value" in control
        ? control.value
        : control,
    ])
  );

export function useControls(schema, ...rest) {
  if (leva) return leva.useControls(schema, ...rest);
  // eslint-disable-next-line react-hooks/rules-of-hooks -- branch is constant per build
  return useMemo(() => defaultsOf(schema), []);
}
