import React from "react";
import PropTypes from "prop-types";

/**
 * Introduction block component that displays project metadata such as overview,
 * duration, client, and role in a responsive grid layout
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful intro entry data
 * @param {string} props.data.overview - Project overview or summary text
 * @param {string} props.data.duration - Project duration (e.g., "3 months")
 * @param {string} props.data.client - Client name for the project
 * @param {string} props.data.role - Role or responsibilities in the project
 * @param {boolean} props.data.primaryPageHeader - When true, uses full viewport height; otherwise uses 33vh
 * @example
 * // Full intro block with all fields
 * <BlockIntro
 *   data={{
 *     overview: "A comprehensive redesign of the mobile banking experience.",
 *     duration: "6 months",
 *     client: "FinTech Corp",
 *     role: "Lead Designer",
 *     primaryPageHeader: true,
 *   }}
 * />
 * @example
 * // Minimal intro block with overview only
 * <BlockIntro
 *   data={{
 *     overview: "Exploring new interaction patterns for data visualization.",
 *     primaryPageHeader: false,
 *   }}
 * />
 */
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

BlockIntro.propTypes = {
  /** Contentful intro entry data */
  data: PropTypes.shape({
    /** Project overview or summary text */
    overview: PropTypes.string,
    /** Project duration */
    duration: PropTypes.string,
    /** Client name */
    client: PropTypes.string,
    /** Role or responsibilities */
    role: PropTypes.string,
    /** Whether to use full viewport height */
    primaryPageHeader: PropTypes.bool,
  }),
};

