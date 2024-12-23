import {ConnectDB} from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    
    await ConnectDB();

    
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    
    const user = await EmailModel.findOne({ email }).select("_id");

  
    console.log("user: ", user);

    
    return NextResponse.json({ exists: !!user });
  } catch (error) {
    
    console.error("Error in POST /api/userExists: ", error);

    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
