import app from "./app";
import { initMongoDB } from "./db/initMongoDB";

const PORT = process.env.PORT || 3000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
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
