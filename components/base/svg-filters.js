/**
 * Global SVG filter definitions used across the application
 * Includes goo effect, notch mask/clip, and CRT path filters
 * @component
 * @category base
 */
const SvgFilters = () => (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg-filter">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>

    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <mask
          id="notchMask"
          maskUnits="objectBoundingBox"
          maskContentUnits="objectBoundingBox"
          x="0"
          y="0"
          width="1"
          height="1"
          mask-type="alpha"
        >
          <rect x="0" y="0" width="1" height="1" fill="black" />
          <rect x="0.8" y="0.8" width="0.2" height="0.2" rx="0.2" ry="0.2" fill="black" />
        </mask>
        <clipPath id="notchClip" clipPathUnits="objectBoundingBox">
          <path
            clipRule="evenodd"
            d="M0 0 H1 V1 H0 Z M1 1 V0.8 H0.85 A0.05 0.05 0 0 0 0.8 0.85 V1 Z"
          />
        </clipPath>
      </defs>
    </svg>

    <svg height="0" width="0" viewBox="0 0 93.88 76.19">
      <clipPath id="crtPath" clipPathUnits="objectBoundingBox" transform="scale(0.01065 0.01312)">
        <path d="M47.78.5c11.65,0,38,.92,41.81,4,3.59,3,3.79,22.28,3.79,34.19,0,11.67-.08,27.79-3.53,31.24S60.3,75.69,47.78,75.69c-11.2,0-39.89-1.16-44-5.27S.57,52.42.57,38.73.31,8.56,4,4.88,34.77.5,47.78.5Z" />
      </clipPath>
    </svg>
  </>
);

export default SvgFilters;
