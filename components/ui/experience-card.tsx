import { getExperience } from "@/lib/linkedin";
import { TitleCard } from "./title-card";

export const ExperienceCard = async () => {
  const { data: experience } = await getExperience();

  return (
    <TitleCard title="My Experience">
      <div className="overflow-y-auto p-1">
        {experience?.map(({ companyName, title, finishedOn, startedOn }) => (
          <div
            key={title}
            className="relative pl-4 border-l-2 border-gray-200 pb-4"
          >
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-card" />
            <p className="font-medium">{companyName}</p>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">
              {`${startedOn} - ${finishedOn.length ? finishedOn : "Current"}`}
            </p>
          </div>
        ))}
      </div>
    </TitleCard>
  );
};
