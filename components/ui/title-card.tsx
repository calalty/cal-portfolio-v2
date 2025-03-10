import { ReactNode } from "react";
import { Card } from "./card";

export type Props = {
  title: string;
  children: ReactNode;
};

export const TitleCard = ({ title, children }: Props) => {
  return (
    <Card className="p-6 max-h-72 min-w-80">
      <h2 className="bg-white py-2 px-4 font-semibold mb-6 rounded-xl w-fit">
        {title}
      </h2>
      {children}
    </Card>
  );
};
