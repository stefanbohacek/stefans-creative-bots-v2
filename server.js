import * as dotenv from "dotenv";
import fs from "fs";
import app from "./app.js";
import loadBots from "./modules/load-bots.js";
import checkBotPool from "./modules/check-bot-pool.js";

if (!process.env.PROJECT_NAME || !process.env.PROJECT_ID) {
  if (fs.existsSync(".env")) {
    dotenv.config();
  }
}

checkBotPool(app);
const bots = await loadBots(app);
app.set("bots", bots);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`🖥️ running on port ${listener.address().port}`);
  console.log(`🕒 server time: ${new Date().toTimeString()}`);
});
