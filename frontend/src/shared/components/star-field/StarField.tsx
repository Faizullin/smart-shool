import React from "react";
import "./StarField.scss";

export default function StarField({ className }: { className: string }) {
  return (
    <svg
      className={`star-field ${className ? className : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      width="573"
      height="517"
      viewBox="0 0 573 517"
      fill="none"
    >
      <g filter="url(#filter0_f_49_1211)">
        <ellipse cx="286.703" cy="258.5" rx="86.2033" ry="58" fill="#00A991" />
      </g>
      <defs>
        <filter
          id="filter0_f_49_1211"
          x="0.5"
          y="0.5"
          width="572.406"
          height="516"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_49_1211"
          />
        </filter>
      </defs>
    </svg>
  );
}
