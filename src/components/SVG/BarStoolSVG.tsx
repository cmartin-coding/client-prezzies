import React from "react";

const BarStool: React.FC = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stool Seat */}
      <circle cx="100" cy="100" r="40" fill="#8B4513" />

      {/* Stool Legs */}
      {/* Leg 1 */}
      <line
        x1="100"
        y1="100"
        x2="50"
        y2="50"
        stroke="#8B4513"
        strokeWidth="5"
      />
      {/* Leg 2 */}
      <line
        x1="100"
        y1="100"
        x2="150"
        y2="50"
        stroke="#8B4513"
        strokeWidth="5"
      />
      {/* Leg 3 */}
      <line
        x1="100"
        y1="100"
        x2="150"
        y2="150"
        stroke="#8B4513"
        strokeWidth="5"
      />
      {/* Leg 4 */}
      <line
        x1="100"
        y1="100"
        x2="50"
        y2="150"
        stroke="#8B4513"
        strokeWidth="5"
      />

      {/* Leg Ends (foot of legs) */}
      {/* Foot 1 */}
      <circle cx="50" cy="50" r="5" fill="#8B4513" />
      {/* Foot 2 */}
      <circle cx="150" cy="50" r="5" fill="#8B4513" />
      {/* Foot 3 */}
      <circle cx="150" cy="150" r="5" fill="#8B4513" />
      {/* Foot 4 */}
      <circle cx="50" cy="150" r="5" fill="#8B4513" />

      {/* Connecting Rings */}
      {/* Inner Ring */}
      <circle
        cx="100"
        cy="100"
        r="30"
        stroke="#8B4513"
        strokeWidth="3"
        fill="none"
      />
      {/* Outer Ring */}
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke="#8B4513"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
};

export default BarStool;
