import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar";

export const initMongoDB = async (): Promise<void> => {
  try {
    const user: string = getEnvVar("MONGODB_USER");
    const pwd: string = getEnvVar("MONGODB_PASSWORD");
    const url: string = getEnvVar("MONGODB_URL");
    const db: string = getEnvVar("MONGODB_DB");

    console.log("USER:", user);
    console.log("PWD:", pwd ? "***" : "empty");
    console.log("URL:", url);
    console.log("DB:", db);

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("✅ MongoDB connected!");
  } catch (e: any) {
    console.error("❌ Error while setting up mongo connection");
    console.error(e);
    throw e;
  }
};
