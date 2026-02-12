import mongoose from "mongoose";

const MONGO_COMPASS = process.env.MONGO_COMPASS!;
if (!MONGO_COMPASS) throw new Error("Please define MONGO_COMPASS in .env.local");

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & { mongoose?: MongooseCache };

// Use const now
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_COMPASS).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;
  return cached.conn;
}
