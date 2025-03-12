import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { NextResponse } from "next/server";
import { Linkedin } from "@/types/linkedin";

function toCamelCase(str: string) {
  return str
    .replace(/\s(.)/g, (match) => match.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (match) => match.toLowerCase());
}

export async function GET(
  _request: Request,
  { params }: { params: { fileName: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "app/data", params.fileName);

    const fileStream = fs.createReadStream(filePath);

    const parser = parse({
      columns: (header) => header.map(toCamelCase),
      skip_empty_lines: true,
      trim: true,
    });

    const data = [];
    for await (const record of fileStream.pipe(parser)) {
      data.push(record);
    }

    return NextResponse.json<Linkedin[]>(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal server error: ${message}` },
      { status: 500 }
    );
  }
}
