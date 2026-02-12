import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://Momolio:aQSJhbZbUQCPXAdk@nextjs-app.767etz2.mongodb.net/?appName=nextjs-appE";

async function test() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully");
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
