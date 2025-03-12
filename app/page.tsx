import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";
import { TitleCard } from "@/components/ui/title-card";
import { Introduction } from "@/components/ui/introduction";
import { Logo } from "@/icons/logo";

import { SpotifyCard } from "@/components/ui/spotify-card";
import { RedditCard } from "@/components/ui/reddit-card";
import { MapCard } from "@/components/ui/map-card";
import { ExperienceCard } from "@/components/ui/experience-card";

export default async function Page() {
  return (
    <div className="min-h-screen bg-card">
      <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-sm text-muted-foreground">
            hey@calalton.com
          </span>
        </div>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        <Introduction />

        <section className="grid grid-cols-3 gap-8">
          <ExperienceCard />
          <SpotifyCard />
          <RedditCard />
          <MapCard />
        </section>
      </main>
    </div>
  );
}
