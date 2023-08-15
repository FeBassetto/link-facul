import mongoose from "mongoose";

const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!NEXT_PUBLIC_MONGODB_URI) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_MONGODB_URI não foi configurada."
  );
}

let cachedDbConnection: any | null = null;

async function connectDb() {
  try {
    if (cachedDbConnection) {
      return cachedDbConnection;
    }

    const conn = await mongoose.connect(NEXT_PUBLIC_MONGODB_URI);
    console.log("Conectado ao MongoDB");
    cachedDbConnection = conn;

    return conn;
  } catch (error) {
    console.error(error);
  }
}

export default connectDb;
