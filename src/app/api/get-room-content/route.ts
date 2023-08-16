import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const queryParams = new URLSearchParams(req.nextUrl.search);
    const nameRoom = queryParams.get("nameRoom");

    const messagesCollection = collection(db, "content");
    const q = query(messagesCollection, where("roomName", "==", nameRoom));

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => doc.data());

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(error);
  }
}
