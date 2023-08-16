import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { roomName, content } = await req.json();

    const contentCollection = collection(db, "content");
    const newContent = {
      roomName: roomName,
      content: content,
      created_at: new Date(),
    };

    const docRef = await addDoc(contentCollection, newContent);

    return NextResponse.json({ id: docRef.id, ...newContent });
  } catch (error) {
    return NextResponse.json(error);
  }
}
