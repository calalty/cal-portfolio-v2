import { getPlaylist } from "@/lib/spotify";
import { TitleCard } from "./title-card";
import Image from "next/image";
import { PlayIcon } from "lucide-react";

export const SpotifyCard = async () => {
  const { data } = await getPlaylist("4BSr2hkZVjR0dJ1KCwLkBx");

  if (!data?.name) return;

  return (
    <TitleCard title="My music playlist">
      <div className="flex flex-col items-center w-full">
        <div className="relative flex w-full justify-center h-32">
          {data.images?.map(({ url }, index) => {
            const positions = [
              "-rotate-[20deg] -translate-x-40 translate-y-5",
              "-rotate-12 -translate-x-20 translate-y-2",
              "z-10",
              "rotate-12 translate-x-20 translate-y-2",
              "rotate-[20deg] translate-x-40 translate-y-5",
            ];
            return (
              <div
                key={index}
                className={`absolute w-24 h-24 rounded-xl overflow-hidden shadow-md transition-transform ${positions[index]} border-white border-4`}
              >
                <Image
                  src={url}
                  alt=""
                  width={96}
                  height={96}
                  objectFit="cover"
                />
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="font-semibold">{data.name}</p>
          <a
            href={`https://open.spotify.com/playlist/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 flex items-center justify-center mt-1"
          >
            <span>
              <PlayIcon className="stroke-[#1cd760] h-4" />
            </span>
            Play on Spotify
          </a>
        </div>
      </div>
    </TitleCard>
  );
};
