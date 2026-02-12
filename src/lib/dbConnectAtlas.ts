import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_ATLAS as string;
if (!MONGO_URI) throw new Error("MONGO_ATLAS not defined");

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // allow global `mongoose` across hot reloads
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;

  return cached.conn;
}
