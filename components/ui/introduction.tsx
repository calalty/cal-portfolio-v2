import Image from "next/image";
import { Badge } from "./badge";
import { Button } from "./button";
import { profile } from "@/assets";
import { DoorOpen } from "lucide-react";

export const Introduction = () => (
  <section className="text-center">
    <div className="flex relative justify-center items-center w-full m-auto">
      <h1 className="text-6xl font-semibold text-left">
        <span className="font-bold flex items-center gap-4">
          Hi, I'm
          <span className="relative w-[100px] h-[100px]">
            <Image
              src={profile}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-3xl border-4 border-black shadow"
            />
          </span>
          Cal Alton!
        </span>
        <span className="block mt-2 text-secondary">
          I'm a{" "}
          <span className="font-bold text-primary">Software Engineer</span>
        </span>
        <span className="block text-electric-blue mt-6 font-bold">
          <span className="text-primary">@</span> On the Beach.
        </span>
      </h1>

      <Badge
        variant="secondary"
        className="bg-green-200 hover:bg-mute text-green-700 absolute right-20 bottom-1 text-md rounded-full flex gap-1 items-center"
      >
        <DoorOpen size={20} />
        Open to work
      </Badge>
    </div>

    <div className="mt-16 flex justify-center items-center gap-4">
      <Button className="rounded-full px-6 font-semibold">Contact me</Button>
      <p className="text-left text-sm">
        Discover my portfolio and drop me a line <br />— I’m eager to
        collaborate!
      </p>
    </div>
  </section>
);
