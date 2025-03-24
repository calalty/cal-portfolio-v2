import { ReactNode } from "react";
import { Card } from "./card";

export type Props = {
  additionalClassNames?: { root?: string; heading?: string };
  title: string;
  children: ReactNode;
};

export const TitleCard = ({ title, children, additionalClassNames }: Props) => {
  return (
    <Card
      className={`h-72 min-w-80 relative overflow-hidden p-6 flex flex-col bg-[#222] text-card ${additionalClassNames?.root}`}
    >
      <span className="absolute inset-0 bg-[url('/images/stars-bg.png')] bg-repeat-y bg-cover opacity-50"></span>
      <h2
        className={`bg-card pt-2 pb-1 px-4 font-semibold mb-6 rounded-xl w-fit text-[#222] ${additionalClassNames?.heading}`}
      >
        {title}
      </h2>
      {children}
    </Card>
  );
};
