import { connectDatabase } from "@/app/database/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signupUser } from "@/app/models/signupUser";

export async function POST(request) {
  await connectDatabase();
  const { username, password } = await request.json();
  try {
    const user = await signupUser.findOne({ username });
    if (!user) {
      return NextResponse.json({ msg: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch && user) {
      return NextResponse.json({
        data: user,
        msg: "logged in successfull",
      });
    } else {
      return NextResponse.json({ msg: "Enter valid password" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to login",
      success: false,
    });
  }
}
