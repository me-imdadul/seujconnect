import { SECRET_KEY } from "@/utils/constants/api";
import { NextResponse } from "next/server";

export default async function GET(request, { params }) {
  const { category } = params;
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== SECRET_KEY) {
    return NextResponse.json({ message: "Unauthorized" }).status(401);
  }
}
