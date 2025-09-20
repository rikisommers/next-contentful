'use client';

import React from "react";
import Link from "next/link";
import { logoStyle, logoBackground } from "../../utils/theme";

export function LogoImage({logo}) {
  return (
    <div className={`flex justify-center items-center p-1 w-[32px] h-[32px]`}>
      <img src={logo.url} alt={logo.title} title={logo.title} className="h-full" />
    </div>
  );
}

export function LogoText({title}) {
  return (
    <span className="pr-2 text-base font-semibold text-[var(--text-color)]">{title}</span>
  );
}

export function LogoImageAndText({logo, title}) {
  return (
    <div className="flex gap-2 items-center">
      <LogoImage logo={logo} />
      <LogoText title={title} />
    </div>
  );
}

const getLogoType = (type, logo, title) => {
  switch (type) {
    case logoStyle.image:
      return <LogoImage logo={logo} />;
    case logoStyle.imageAndText:
      return <LogoImageAndText logo={logo} title={title} />;
    case logoStyle.text:
      return <LogoText title={title} />;
  }
}

export default function Logo({logo, type, title, background}) {


  return (
    <Link href="/" passHref>
     <div
     layoutid="logo"
     className={`flex relative z-50 items-center p-1 rounded-xl cursor-pointer pointer-events-auto ${background == logoBackground.solid  ? "bg-[var(--surface2)]" : "bg-transparent"}`}
    >
      {getLogoType(type, logo, title)}
    </div>
    </Link>
  );
}