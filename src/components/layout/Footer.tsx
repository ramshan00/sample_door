import { DeraNextLogo } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row">
        <DeraNextLogo className="h-7 w-auto" />
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DeraNext. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
