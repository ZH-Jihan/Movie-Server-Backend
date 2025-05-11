import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES_IN,
  salt_round: process.env.SALT_ROUNDS,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_AIP_KEY,
  cloud_api_secret: process.env.CLOUD_AIP_SECRET,
};

export default config;
