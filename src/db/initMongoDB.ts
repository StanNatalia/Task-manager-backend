import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar";
import logger from "../utils/logger";

export const initMongoDB = async (): Promise<void> => {
  try {
    const user: string = getEnvVar("MONGODB_USER");
    const pwd: string = getEnvVar("MONGODB_PASSWORD");
    const url: string = getEnvVar("MONGODB_URL");
    const db: string = getEnvVar("MONGODB_DB");

    logger.info({ user, url, db }, "Connecting to MongoDB...");

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?appName=kamban`,
    );

    logger.info(" MongoDB connected successfully!");
  } catch (e: any) {
    logger.error(e, " MongoDB connection error");
    throw e;
  }
};
