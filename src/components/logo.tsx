import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 50"
      width="220"
      height="50"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
        </linearGradient>
      </defs>
      <text
        x="10"
        y="35"
        fontFamily="var(--font-headline), sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="url(#logo-gradient)"
        className="tracking-wide"
      >
        door mate
      </text>
    </svg>
  );
}
