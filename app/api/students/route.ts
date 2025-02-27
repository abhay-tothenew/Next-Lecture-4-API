
import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const url = new URL(request.url);
  console.log(url.searchParams);  const filePath = path.join(
    process.cwd(),
    "public/data/studentsData/students.json"
  );

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(data);
    return NextResponse.json(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
