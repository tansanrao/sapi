import dotenv from "dotenv";
import fs from "fs";

interface ServerConfig {
  port: number;
  sql_db: string;
  sql_user: string;
  sql_pass: string;
  sql_host: string;
  sql_port: number;
}

if (fs.existsSync("../../.env")) {
  dotenv.config({ path: "../../.env" });
}

const config: ServerConfig = {
  port: normalizePort(process.env.port || 3000),
  sql_user: process.env.SQL_USER || "devuser",
  sql_pass: process.env.SQL_PASS || "devpassword",
  sql_db: process.env.SQL_DB || "dbname",
  sql_host: process.env.SQL_HOST || "postgres",
  sql_port: normalizePort(process.env.SQL_PORT || 5432),
};

function normalizePort(val: string | number) {
  const port = parseInt(<string>val, 10);

  if (port >= 0) {
    // port number
    return port;
  }

  throw new Error("Port number Invalid");
}
export default config;
