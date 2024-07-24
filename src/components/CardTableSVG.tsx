import { ReactNode, SVGProps } from "react";

export function CardTableSVG(
  props: { children?: ReactNode } & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="60 60 170 170"
      width="100%"
      height="100%"
      className={`relative`}
      {...props}
    >
      <defs>
        <linearGradient id="brownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#562B00", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#884400", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#562B00", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <ellipse
        fill="url(#brownGradient)"
        stroke="#000"
        rx={79.037}
        ry={73.634}
        className={`z-10 absolute`}
        transform="matrix(1.02439 0 0 1.09955 147.002 144.27)"
      />
    </svg>
  );
}
