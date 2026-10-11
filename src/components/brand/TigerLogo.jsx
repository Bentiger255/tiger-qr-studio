import { useId } from "react";

function TigerLogo({ size = 38, showText = true }) {
  const id = useId();

  return (
    <div
      className={`tiger-brand ${showText ? "" : "tiger-brand-mark-only"}`}
      style={{ "--logo-size": `${size}px` }}
    >
      <svg
        className="tiger-logo"
        viewBox="0 0 48 48"
        role="img"
        aria-label="TIGER QR STUDIO"
      >
        <defs>
          <linearGradient
            id={`tiger-gradient-${id}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#303030" />
          </linearGradient>
        </defs>

        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="11"
          fill={`url(#tiger-gradient-${id})`}
        />

        {/* QR finder patterns */}
        <path
          d="M9 9h11v11H9V9Zm4 4v3h3v-3h-3Z"
          fill="#fff"
        />

        <path
          d="M28 9h11v11H28V9Zm4 4v3h3v-3h-3Z"
          fill="#fff"
        />

        <path
          d="M9 28h11v11H9V28Zm4 4v3h3v-3h-3Z"
          fill="#fff"
        />

        {/* QR data pattern */}
        <path
          d="
            M25 24h5v5h-5v-5Zm7 0h5v3h-5v-3Zm-7 8h3v7h-3v-7Zm7 4h6v3h-6v-3Zm-4-9h3v5h-3v-5Zm7-3h3v3h-3v-3Z
          "
          fill="#92E3A9"
        />
      </svg>

      {showText && (
        <div className="tiger-brand-copy">
          <strong>TIGER</strong>
          <span>QR STUDIO</span>
        </div>
      )}
    </div>
  );
}

export default TigerLogo;