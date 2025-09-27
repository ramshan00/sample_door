import { Logo } from '@/components/logo';

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row">
        <Logo className="h-7 w-auto" />
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} door mate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
