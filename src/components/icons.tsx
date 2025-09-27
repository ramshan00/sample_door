import type { SVGProps } from 'react';

export function DeraNextLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="200"
      height="50"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
        </linearGradient>
      </defs>
      <div className="leading-tight">
            <h1 className="text-4xl font-bold museo tracking-wide">next.</h1>
            <h2 className="text-[10px] mont tracking-[2px] text-gray-300">
              DOOR MATE
            </h2>
          </div>
    </svg>
  );
}
