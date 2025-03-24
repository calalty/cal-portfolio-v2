import { TitleCard } from "./title-card";
import { getSubreddit } from "@/lib/reddit";

export const RedditCard = async () => {
  const { data } = await getSubreddit("Showerthoughts");

  if (!data || data.length === 0) return null;

  const { subredditName, title, linkBackgroundColor, linkText, linkTextColor } =
    data[Math.floor(Math.random() * data.length)];

  let backgroundColor;
  let textColor;

  if (linkBackgroundColor.length > 0) {
    backgroundColor = linkBackgroundColor;
    textColor = linkTextColor === "light" ? "#f8f8f8" : "#0a0a0a";
  } else if (!linkText) {
    backgroundColor = "#ff4500";
    textColor = "#f8f8f8";
  } else {
    textColor = "#f8f8f8";
    backgroundColor = "#0a0a0a";
  }

  return (
    <TitleCard title={subredditName}>
      <div className="flex flex-col justify-between items-start w-full h-full overflow-auto gap-6">
        <span>{title}</span>

        <span
          className="px-4 py-1 rounded-full font-semibold text-sm"
          style={{
            backgroundColor,
            color: textColor,
          }}
        >
          {linkText ?? "General"}
        </span>
      </div>
    </TitleCard>
  );
};
