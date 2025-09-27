import { Button } from '@/components/ui/button';
import { DeraNextLogo } from '@/components/icons';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-students');

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <DeraNextLogo className="h-12 w-auto" />
            </div>
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-b from-primary to-secondary">
              Smarter Student Living
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:mx-0">
              Find your perfect roommate and ideal home with our AI-powered platform. Built for students in Pakistan, DeraNext makes finding your next 'dera' safe, transparent, and intelligent.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full bg-transparent sm:w-auto">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={400}
                data-ai-hint={heroImage.imageHint}
                className="rounded-xl shadow-2xl shadow-primary/20"
                priority
              />
            )}
            <div className="absolute -inset-2 -z-10 rounded-2xl bg-primary/20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BgGrid() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  );
}
