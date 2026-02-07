"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";

/* ─── Tunable Configuration ────────────────────────────────────────────── */

/**
 * Adjust these values to change the look and feel of the cube transition.
 */
const CUBE_CONFIG = {
  /** Total animation duration in seconds. */
  duration: 1.5,
  /** Scale factor when the cube is "pulled back" (0–1). */
  scaleDown: 0.65,
  /**
   * CSS perspective distance.  Larger = subtler foreshortening.
   * Using viewport-relative units keeps the effect consistent across screens.
   */
  perspective: "175vw",
  /**
   * Half-depth of the cube — how far each face sits from the cube centre.
   * Using 40vw means the cube is almost as deep as it is wide, so each face
   * swings ~40 % of the viewport width to the side during the rotation.
   * The two `translateZ` values (−depth then +depth after rotateY) cancel
   * at 0°; at −90° the post-rotation Z becomes an X-offset.
   */
  depth: "40vw",
  /** CSS easing function applied to the keyframes. */
  easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
};

/* ─── CSS Builder ──────────────────────────────────────────────────────── */

/**
 * Generates the CSS that styles the view-transition pseudo-elements as a
 * rotating 3-D cube.  Injected into <head> once on mount.
 *
 * The cube geometry comes from a pair of `translateZ` calls that sandwich
 * the `rotateY`:
 *
 *   perspective(P) · scale(S) · translateZ(−D) · rotateY(θ) · translateZ(D)
 *
 *  • At θ = 0 °  the two Z-translations cancel → face sits at Z = 0 (natural size).
 *  • At θ = −90° the post-rotation Z becomes an X-offset and the pre-rotation
 *    Z pushes the face into depth, so it physically separates from the other face.
 *
 * Both faces share the same scale at every point in time so they move as one cube.
 *
 * Timeline (percentage of total duration):
 *   0 – 60 %   Scale down AND rotate simultaneously  (cube shrinks + turns)
 *  60 – 100 %  Scale new page back up                (cube grows to fill viewport)
 */
const buildCubeCSS = ({ duration, scaleDown, perspective, depth, easing }) => {
  const dur = `${duration}s`;
  const p = perspective;
  const d = depth;
  const s = scaleDown;

  return `
/* ── View Transition · 3-D Cube ──────────────────────────────────────── */

/*
 * Shared perspective on the group gives BOTH faces the same vanishing point.
 * Without this each face would project through its own centre — the edges
 * would never line up as a true cube.
 */
::view-transition-group(root) {
  perspective: ${p};
  overflow: visible !important;
}

/*
 * preserve-3d lets the old/new children live in the same 3-D space
 * so their translateZ offsets and rotations compose correctly.
 */
::view-transition-image-pair(root) {
  isolation: auto;
  overflow: visible !important;
  transform-style: preserve-3d;
}

/* ── Old page (front face) ───────────────────────────────────────────── */

::view-transition-old(root) {
  mix-blend-mode: normal;
  backface-visibility: hidden;
  animation: vt-cube-out ${dur} ${easing} both;
}

/* ── New page (right face) ───────────────────────────────────────────── */

::view-transition-new(root) {
  mix-blend-mode: normal;
  backface-visibility: hidden;
  animation: vt-cube-in ${dur} ${easing} both;
}

/*
 * Front face (outgoing):
 *   0 – 60 %   scale 1→${s}  +  rotate 0→−90°  (cube shrinks & turns)
 *  60 – 100 %  hold at −90° / hidden
 *
 *  translateZ(-D) · rotateY(θ) · translateZ(D)
 *  At θ=0:   net Z = 0         → natural size  (no perspective distortion)
 *  At θ=-90: net = X:-D, Z:-D  → face swings left & into depth
 */
@keyframes vt-cube-out {
  0%      { transform: scale(1)    translateZ(-${d}) rotateY(0deg)    translateZ(${d}); opacity: 1; }
  60%     { transform: scale(${s}) translateZ(-${d}) rotateY(-90deg)  translateZ(${d}); opacity: 1; }
  60.01%  { opacity: 0; }
  100%    { transform: scale(${s}) translateZ(-${d}) rotateY(-90deg)  translateZ(${d}); opacity: 0; }
}

/*
 * Right face (incoming):
 *   0 – 60 %   scale 1→${s}  +  rotate +90°→0°  (swings into view)
 *  60 – 100 %  scale ${s}→1  (grows back to fill viewport)
 *
 *  At θ=+90°: net = X:+D, Z:-D  → face sits to the right & in depth
 *  At θ=0°:   net Z = 0         → natural size
 */
@keyframes vt-cube-in {
  0%      { transform: scale(1)    translateZ(-${d}) rotateY(90deg)   translateZ(${d}); opacity: 0; }
  0.01%   { opacity: 1; }
  60%     { transform: scale(${s}) translateZ(-${d}) rotateY(0deg)    translateZ(${d}); opacity: 1; }
  100%    { transform: scale(1)    translateZ(-${d}) rotateY(0deg)    translateZ(${d}); opacity: 1; }
}
`;
};

/* ─── Custom Hook: View Transition Router ──────────────────────────────── */

/**
 * Wires the native View Transition API into Next.js page-router events.
 *
 *  routeChangeStart    → capture old-state snapshot, begin transition
 *  routeChangeComplete → resolve callback, capture new-state snapshot
 *  routeChangeError    → clean up gracefully
 *
 * The browser freezes the visual output (shows the old snapshot) while
 * Next.js fetches data and React re-renders, so the user never sees a
 * partially-loaded page.  When the route change completes we resolve the
 * promise and the CSS keyframe animation takes over.
 */
const useViewTransitionRouter = () => {
  const router = useRouter();
  const resolveRef = useRef(null);
  const transitionRef = useRef(null);

  /** Start a new view transition (or skip an in-progress one). */
  const startTransition = useCallback(() => {
    if (transitionRef.current) {
      transitionRef.current.skipTransition();
      resolveRef.current?.();
      resolveRef.current = null;
    }

    const vt = document.startViewTransition(
      () =>
        new Promise((resolve) => {
          resolveRef.current = resolve;
        })
    );

    transitionRef.current = vt;
    vt.finished.finally(() => {
      transitionRef.current = null;
    });
  }, []);

  /** Resolve the pending transition (tells the browser: new DOM is ready). */
  const finishTransition = useCallback(() => {
    resolveRef.current?.();
    resolveRef.current = null;
  }, []);

  useEffect(() => {
    if (!("startViewTransition" in document)) return;

    router.events.on("routeChangeStart", startTransition);
    router.events.on("routeChangeComplete", finishTransition);
    router.events.on("routeChangeError", finishTransition);

    return () => {
      router.events.off("routeChangeStart", startTransition);
      router.events.off("routeChangeComplete", finishTransition);
      router.events.off("routeChangeError", finishTransition);
    };
  }, [router, startTransition, finishTransition]);
};

/* ─── Component ────────────────────────────────────────────────────────── */

/**
 * 3-D cube page transition powered by the **native View Transition API**.
 *
 * How it works:
 *
 *  1. On `routeChangeStart` the browser captures a bitmap snapshot of the
 *     current viewport (the "old" page).
 *  2. Next.js fetches the new page; React re-renders behind the frozen
 *     snapshot so the user sees no flash.
 *  3. On `routeChangeComplete` we tell the browser the DOM is ready.  It
 *     captures the "new" page and exposes both as `::view-transition-old`
 *     and `::view-transition-new` pseudo-elements.
 *  4. CSS keyframes animate those pseudo-elements as the two visible faces
 *     of a 3-D cube: scale down → rotate -90° → scale back up.
 *
 * Falls back to an instant (no-animation) navigation in browsers that
 * do not support the View Transition API.
 */
const TransitionCarousel = ({ children }) => {
  /* Inject the cube keyframe CSS into <head>. */
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "vt-cube-styles";
    style.textContent = buildCubeCSS(CUBE_CONFIG);
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  /* Hook router events into the View Transition API. */
  useViewTransitionRouter();

  /* No wrapper div needed — the API operates on document-level snapshots. */
  return <>{children}</>;
};

export default TransitionCarousel;
