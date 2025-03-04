import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";
import { TitleCard } from "@/components/ui/title-card";
import { Introduction } from "@/components/ui/introduction";
import { Logo } from "@/icons/logo";

export default function Page() {
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

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-16">
        <Introduction />

        <section className="grid md:grid-cols-3 gap-8">
          <TitleCard title="My Experience">
            <div className="">
              <div className="relative pl-4 border-l-2 border-gray-200 pb-4">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-black" />
                <h3 className="font-medium">...</h3>
                <p className="text-sm text-muted-foreground">
                  2024 - On Job - Full time
                </p>
              </div>
              <div className="relative pl-4 border-l-2 border-gray-200 pb-4">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-black" />
                <h3 className="font-medium">...</h3>
                <p className="text-sm text-muted-foreground">
                  2023 - Hybrid - Full time
                </p>
              </div>
              <div className="relative pl-4 border-l-2 border-gray-200">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-black" />
                <h3 className="font-medium">...</h3>
                <p className="text-sm text-muted-foreground">
                  2022 - Remote - Full time
                </p>
              </div>
            </div>
          </TitleCard>
        </section>
      </main>
    </div>
  );
}
