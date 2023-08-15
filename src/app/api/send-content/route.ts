import dbConnect from "@/db";
import Content from "@/models/content";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { roomName, content } = await req.json();

    const newContent = new Content({
      RoomName: roomName,
      content: content,
    });

    const savedContent = await newContent.save();

    return NextResponse.json(savedContent);
  } catch (error) {
    return NextResponse.json(error);
  }
}
