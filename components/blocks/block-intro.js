import React from "react";

export default function BlockIntro({ data }) {
  return (
    <div
      className={`flex flex-col justify-end relative px-8 ${
        data.primaryPageHeader === true ? "h-vhh" : "h-vh33"
      }`}
    >
      <div className="grid grid-cols-12 gap-3 py-10">
      
        {data.overview && (
          <div className="flex flex-col col-span-10 gap-3 self-start rounded-lg md:col-span-7 lg:col-span-8">
            <div style={{ color: "var(--text-color)" }}>
              <span
                className="inline mr-3 italic"
                style={{ color: "var(--subtext-color)" }}
              >
                Overview
              </span>
            </div>

            <div style={{ color: "var(--text-color)" }}>{data.overview}</div>
          </div>
        )}

        <div className="flex flex-col col-span-10 gap-8 text-sm md:col-span-4 lg:col-span-3">
          {data.duration && (
            <div style={{ color: "var(--text-color)" }}>
              <span
                className="mr-2 italic"
                style={{ color: "var(--subtext-color)" }}
              >
                Duration
              </span>
              {data.duration}
            </div>
          )}

          {data.client && (
            <div style={{ color: "var(--text-color)" }}>
              <span
                className="mr-2 italic"
                style={{ color: "var(--subtext-color)" }}
              >
                Client
              </span>
              {data.client}
            </div>
          )}
          {data.role && (
            <div style={{ color: "var(--text-color)" }}>
              <span
                className="mr-2 italic"
                style={{ color: "var(--subtext-color)" }}
              >
                Role
              </span>
              {data.role}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

