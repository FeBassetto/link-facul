import dbConnect from "@/db";
import Content from "@/models/content";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const queryParams = new URLSearchParams(req.nextUrl.search);
    const nameRoom = queryParams.get("nameRoom");

    const messages = await Content.find({ RoomName: nameRoom }).sort({
      createdTime: -1,
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(error);
  }
}
