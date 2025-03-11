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
      className={`min-h-72 min-w-80 relative overflow-hidden p-6 flex flex-col ${additionalClassNames?.root}`}
    >
      <h2
        className={`bg-white py-2 px-4 font-semibold mb-6 rounded-xl w-fit ${additionalClassNames?.heading}`}
      >
        {title}
      </h2>
      {children}
    </Card>
  );
};
