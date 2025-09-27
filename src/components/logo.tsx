import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 50"
      width="150"
      height="50"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
        </linearGradient>
      </defs>
      <g style={{ lineHeight: '1' }}>
        <text
          x="0"
          y="25"
          fontFamily="var(--font-headline), sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="url(#logo-gradient)"
          className="tracking-wide"
        >
          next.
        </text>
        <text
          x="0"
          y="40"
          fontFamily="var(--font-body), sans-serif"
          fontSize="10"
          letterSpacing="2"
          fill="hsl(var(--muted-foreground))"
          className="uppercase"
        >
          Door Mate
        </text>
      </g>
    </svg>
  );
}
