"use client";

import React, { useRef } from "react";
import {
    motion,
    useTransform,
    useScroll,
} from "../../utils/motion";;
import { ClipPathElement } from "./clippath-element";

export const ParalaxElement = ({ children, offset}) => {

    const elemRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: elemRef,

        offset: ["start end", "end end"],
        onChange: (latest) => {
            console.log("Latest scroll position:", latest);
            // You can perform any other actions or state updates here
        },
    });

    const yTransform = useTransform(scrollYProgress, [0, 1], [offset, 0]);





    return (
        <ClipPathElement>
        <div ref={elemRef} className="relative flex flex-col justify-start overflow-clip h-vhh ">
                <div className="z-20 grid items-start w-full grid-cols-12 gap-3 px-8 py-16"

>
  <div className="col-span-12 md:col-span-6">
            {children}
            </div>
            </div>
            <motion.div
                className="absolute w-full h-full"
                style={{
                  //  y: yTransform,
                    //clipPath: "inset( 1rem round 1rem )",
                    backgroundColor: 'var(--accent)',
                }} />
        </div>
        </ClipPathElement>
    );
}