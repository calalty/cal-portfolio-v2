import Image from "next/image";
import { TitleCard } from "./title-card";
import { map } from "@/assets";
import { MapPinIcon } from "lucide-react";

export const MapCard = async () => {
  return (
    <TitleCard
      title="Location"
      additionalClassNames={{
        root: "p-0 justify-between",
        heading: "z-50 m-6",
      }}
    >
      <div className="absolute w-full h-full">
        <Image
          src={map}
          alt="Map"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      <div className="relative z-50 text-center h-full items-center flex flex-col gap-2 py-4 bg-gradient-to-t from-white via-white/50 to-white/0 justify-end">
        <MapPinIcon className="stroke-white fill-red-600 h-8 w-8" />
        <span className="text-xl font-medium tracking-widest">MANCHESTER</span>
        <span className="text-base font-normal tracking-wide opacity-50">
          SALFORD
        </span>
      </div>
    </TitleCard>
  );
};
