import { httpClient } from "@/lib/http-client";
import { NextResponse } from "next/server";

export type RedditListing = {
  data: {
    children: RedditChild[];
  };
};

export type RedditChild = {
  data: RedditPost;
};

export type RedditPost = {
  title: string;
  subreddit_name_prefixed: string;
  link_flair_text_color: string;
  link_flair_text: string;
  link_flair_background_color: string;
};

export type RefinedRedditPost = {
  title: string;
  subredditName: string;
  linkTextColor: "dark" | "light";
  linkText: string;
  linkBackgroundColor: string;
};

export async function GET(
  _request: Request,
  { params }: { params: { subreddit: string } }
) {
  try {
    const { data, isError } = await httpClient.get<RedditListing>(
      `/r/${params.subreddit}/top.json?t=year`,
      { headers: { "User-Agent": "calaton-portfolio/1.0" } },
      "https://www.reddit.com"
    );

    if (isError || !data) {
      return NextResponse.json(
        { error: "Invalid subreddit string" },
        { status: 404 }
      );
    }

    const subreddit: RefinedRedditPost[] = data.data.children.map(
      ({
        data: {
          title,
          link_flair_background_color,
          link_flair_text,
          link_flair_text_color,
          subreddit_name_prefixed,
        },
      }) => ({
        title,
        linkBackgroundColor: link_flair_background_color,
        linkText: link_flair_text,
        linkTextColor: link_flair_text_color,
        subredditName: subreddit_name_prefixed,
      })
    );

    return NextResponse.json({ subreddit });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal server error: ${message}` },
      { status: 500 }
    );
  }
}
