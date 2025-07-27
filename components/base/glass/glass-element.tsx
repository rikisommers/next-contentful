import React, { CSSProperties, ReactNode, useState } from "react";
import {
  getDisplacementFilter,
  DisplacementOptions,
} from "./getDisplacementFIlter.ts";
import { getDisplacementMap } from "./getDisplacementMap.ts";
import styles from "./glass-element.module.css";

type GlassElementProps = DisplacementOptions & {
  children?: ReactNode | undefined;
  blur?: number;
  debug?: boolean;
};

export const GlassElement = ({
  height,
  width,
  depth: baseDepth,
  radius,
  children,
  strength,
  chromaticAberration,
  blur = 2,
  debug = false,
}: GlassElementProps) => {
  /* Change element depth on click */
  const [clicked, setClicked] = useState(false);
  let depth = baseDepth / (clicked ? 0.7 : 1);

  /* Dynamic CSS properties */
  const style: CSSProperties = {
    height: `${height}px`,
    width: `${width}px`,
    borderRadius: `${radius}px`,
    backdropFilter: `blur(${blur / 2}px) url('${getDisplacementFilter({
      height,
      width,
      radius,
      depth,
      strength,
      chromaticAberration,
    })}') blur(${blur}px) brightness(1.1) saturate(1.5) `,
    filter: 'url(#goo)', // Add goo effect

  };

  /* Debug mode: display the displacement map instead of actual effect */
  if (debug === true) {
    style.background = `url("${getDisplacementMap({
      height,
      width,
      radius,
      depth,
    })}")`;
    style.boxShadow = "none";
  }
  return (
    <div
      className={styles.box}
      style={style}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
    >
      {children}
    </div>
  );
};
