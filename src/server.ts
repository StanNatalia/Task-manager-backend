import { getEnvVar } from "utils/getEnvVar";
import app from "./app";
import { initMongoDB } from "./db/initMongoDB";

const port = Number(getEnvVar("PORT", "3000"));
const startServer = () => {
  app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
  });
};

const bootstrap = async () => {
  try {
    await initMongoDB();
    startServer();
  } catch (err: any) {
    console.error(
      "❌ Failed to start server due to MongoDB error:",
      err.message
    );
    process.exit(1);
  }
};

bootstrap();
