import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createUser } from "@/lib/db/userdb";
import { SECRET_KEY } from "@/utils/constants/api";

export async function POST(req) {
  const { email, password, username, phone } = await req.json();

  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 500,
    });
  }

  if (!email || !password || !username) {
    return NextResponse.json(
      { message: "Email, password, and username are required" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const { exists, user } = await createUser({
    email,
    username,
    phone,
    password: hashedPassword,
  });

  if (exists) {
    return NextResponse.json(
      { message: "User already exists with this email" },
      { status: 409 }
    );
  }
  return NextResponse.json(
    { message: "User created successfully", userId: user },
    { status: 200 }
  );
}
